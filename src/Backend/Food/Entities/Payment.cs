using Food.Entities.EntityInterface;
using System.ComponentModel.DataAnnotations.Schema;

namespace Food.Entities;

public class Payment : IEntity
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string CardNumber { get; set; }
    public string CardPassword { get; set; }
    public string TableNumber { get; set; }
    public DateTime DateTime { get; set; }  
}