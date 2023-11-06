using Food.AuditManagers.Attributes;
using Food.AuditManagers;
using Food.Entities;
using System.Security.Claims;

namespace Food.Middleware;

public class AuditMiddleware
{
    private readonly RequestDelegate _next;
    private readonly IServiceProvider _serviceProvider;
    public AuditMiddleware(RequestDelegate next, IServiceProvider serviceProvider)
    {
        _next = next;
        _serviceProvider = serviceProvider;
    }

    public async Task Invoke(HttpContext context)
    {
        using (var scope = _serviceProvider.CreateScope())
        {
            var endpoint = context.GetEndpoint();
            var ignoreAttribute = endpoint.Metadata.FirstOrDefault(x => x is IgnoreAuditAttribute);

            if (ignoreAttribute is not null)
            {
                await _next(context);
                return;
            }

            var _auditManager = scope.ServiceProvider.GetRequiredService<IAuditManager>();
            var userName = context.User.Identity.Name;
            if (string.IsNullOrEmpty(userName))
            {
                userName = context.User.FindFirst(ClaimTypes.Name)?.Value;
            }
            userName = string.IsNullOrEmpty(userName) ? "Coma" : userName;

            var auditLog = new AuditLog
            {
                UserName = userName,
                Action = context.Request.Method,
                Path = context.Request.Path,
                Timestamp = DateTime.UtcNow
            };

            await _next(context);

            auditLog.ResponseStatusCode = context.Response.StatusCode;
            auditLog.ResponseTimestamp = DateTime.UtcNow;
            auditLog.UserName = userName;

            await _auditManager.WriteAuditLog(auditLog);
        }
    }
}