using Food.Dto_s;
using Food.Entities;

namespace Food.Interface;

public interface ICommitRepository
{
    Task<List<Commit>> GetCommitsAsync();
    Task<CommitDto> CreateCommit(CommitDto commit);
}