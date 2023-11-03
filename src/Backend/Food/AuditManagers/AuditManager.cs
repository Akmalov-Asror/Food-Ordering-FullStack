using Food.Data;
using Food.Entities;
using Microsoft.EntityFrameworkCore;

namespace Food.AuditManagers;

public class AuditManager : IAuditManager
{
    private readonly AppDbContext _context;

    public AuditManager(AppDbContext context) => _context = context;

    public async Task WriteAuditLog(AuditLog log)
    {
        _context.AuditLogs.Add(log);
        await _context.SaveChangesAsync();
    }

    public async Task<IEnumerable<AuditLog>> GetAuditLogs()
    {
        return await _context.AuditLogs.ToListAsync();
    }
}