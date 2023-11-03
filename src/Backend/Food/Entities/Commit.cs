using Food.Entities.EntityInterface;
using System.ComponentModel.DataAnnotations.Schema;

namespace Food.Entities;

public class Commit
{
    public int Id { get; set; }
    public string Description { get; set; }
    public DateTime WriteCommitTime { get; set; }
    public User User { get; set; }

}