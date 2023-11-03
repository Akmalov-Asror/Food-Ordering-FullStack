using Food.Entities;

namespace Food.Dto_s;

public class CommitDto
{
    public string Description { get; set; }
    public DateTime WriteCommitTime { get; set; }
    public string Name { get; set; }
}