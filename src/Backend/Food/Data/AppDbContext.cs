using Food.AuditManagers;
using Food.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using System.Text.Json;

namespace Food.Data;

public class AppDbContext : IdentityDbContext<User>
{
    private readonly IHttpContextAccessor _accessor;

    public AppDbContext(DbContextOptions<AppDbContext> options, IServiceProvider services,IHttpContextAccessor accessor) : base(options)
    {
        _accessor = accessor;
        this.Services = services;
    }
    public IServiceProvider Services { get; set; }
    public DbSet<AuditLog> AuditLogs { get; set; }
    public DbSet<Commit> Commits { get; set; }
    public DbSet<Payment> Payment { get; set; }
    public DbSet<Category> Category { get; set; }
    public DbSet<Order> Orders { get; set; }
    public DbSet<Information> Information { get; set; }
    public DbSet<Entities.Food> Foods { get; set; }
    public DbSet<SellerFood> SellerFoods { get; set; }
    public DbSet<Hide> Hides { get; set; }
    public DbSet<UserChatModel> UserChatModels { get; set; }
    public DbSet<MessageModel> MessageModels { get; set; }
    public DbSet<PaymentForOrder> PaymentForOrders { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        builder.ApplyConfiguration<IdentityRole>(new RoleConfiguration(Services));
    }

    public async Task SaveChangesWithAudit(bool auditChanges)
    {
        if (!auditChanges)
        {
            await SaveChangesAsync();
            return;
        }

        var context = _accessor.HttpContext;
        var changes = ChangeTracker.Entries();

        var auditManager = Services.CreateScope().ServiceProvider.GetRequiredService<IAuditManager>();

        foreach (var ch in changes)
        {
            var originalValues = JsonSerializer.Serialize(ch.OriginalValues.ToObject());
            var userName = context.User.Identity.Name;
            if (string.IsNullOrEmpty(userName))
            {
                userName = context.User.FindFirst(ClaimTypes.Name)?.Value;
            }
            userName = string.IsNullOrEmpty(userName) ? "Coma" : userName;

            if (ch.State == EntityState.Modified)
            {
                var currentValues = JsonSerializer.Serialize(ch.CurrentValues.ToObject());

                await auditManager.WriteAuditLog(new AuditLog
                {
                    UserName = userName,
                    Action = Enum.GetName(ch.State)!,
                    Data = currentValues,
                    OldData = originalValues,
                    Path = context.Request.Path,
                    Timestamp = DateTime.UtcNow,
                    ResponseStatusCode = context.Response.StatusCode,
                });
            }
            else if (ch.State == EntityState.Added)
            {
                await auditManager.WriteAuditLog(new AuditLog
                {
                    UserName = userName,
                    Action = Enum.GetName(ch.State)!,
                    Data = originalValues,
                    Path = context.Request.Path,
                    Timestamp = DateTime.UtcNow,
                    ResponseStatusCode = context.Response.StatusCode,
                });
            }
            else if (ch.State == EntityState.Deleted)
            {
                await auditManager.WriteAuditLog(new AuditLog
                {
                    UserName = userName,
                    Action = Enum.GetName(ch.State)!,
                    Data = originalValues,
                    Path = context.Request.Path,
                    Timestamp = DateTime.UtcNow,
                    ResponseStatusCode = context.Response.StatusCode,
                });

                ch.State = EntityState.Unchanged;
            }
        }

        await SaveChangesAsync();
    }
}