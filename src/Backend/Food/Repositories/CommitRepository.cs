using Food.Data;
using Food.Dto_s;
using Food.Entities;
using Food.Exceptions;
using Food.Interface;
using Microsoft.EntityFrameworkCore;

namespace Food.Repositories;

public class CommitRepository : ICommitRepository
{
    private readonly AppDbContext _context;
    public CommitRepository(AppDbContext context) => _context = context;

    public async Task<List<Commit>> GetCommitsAsync() => await _context.Commits.Include(x => x.User).ToListAsync();
    public async Task<CommitDto> CreateCommit(CommitDto commit)
    {
        var commits = new Commit();
        commits.WriteCommitTime = DateTime.UtcNow;
        commits.Description = commit.Description;

        var checkUser = await _context.Users.FirstOrDefaultAsync(x => x.UserName == commit.Name);
        if (checkUser != null)
        {
            commits.User = checkUser;
            _context.Commits.Add(commits);
            await _context.SaveChangesAsync();
        }

        return commit;
    }
}