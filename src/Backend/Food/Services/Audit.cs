using Food.AuditManagers;
using Food.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using System.Security.Claims;
using Food.Data;

namespace Food.Services;

public class Audit
{
    private readonly AppDbContext _dbContext;
    private readonly IServiceProvider _services;
    private readonly HttpContext _context;
    public Audit(AppDbContext dbContext, IServiceProvider services, IHttpContextAccessor context)
    {
        _dbContext = dbContext;
        _services = services;
        _context = context.HttpContext;
    }

    public async Task SaveChangesWithAudit(bool auditChanges)
    {
        if (!auditChanges)
        {
            await _dbContext.SaveChangesAsync();
            return;
        }

        var changes = _dbContext.ChangeTracker.Entries();

        var auditManager = _services.CreateScope().ServiceProvider.GetRequiredService<IAuditManager>();

        foreach (var ch in changes)
        {
            if (ch.State == EntityState.Modified)
            {
                var originalValues = ch.OriginalValues.ToObject().ToString();
                var oldData = ch.CurrentValues.ToObject().ToString();
                var userName = _context.User.Identity.Name;
                if (string.IsNullOrEmpty(userName))
                {
                    userName = _context.User.FindFirst(ClaimTypes.Name)?.Value;
                }
                userName = string.IsNullOrEmpty(userName) ? "Coma" : userName;

                var members= ch.Members.ToArray();

                await auditManager.WriteAuditLog(new AuditLog
                {
                    UserName = userName,
                    Action = Enum.GetName(ch.State)!,
                    Data = originalValues,
                    OldData = oldData,
                    Path = _context.Request.Path,
                    Timestamp = DateTime.UtcNow,
                    ResponseStatusCode = _context.Response.StatusCode,
                });
            }
        }

        await _dbContext.SaveChangesAsync();
    }
}