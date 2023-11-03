using Food.Entities;

namespace Food.AuditManagers;

public interface IAuditManager
{
    Task WriteAuditLog(AuditLog log);
    Task<IEnumerable<AuditLog>> GetAuditLogs();
}