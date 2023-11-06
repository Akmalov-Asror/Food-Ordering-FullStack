using Food.Entities.EntityInterface;
using System.ComponentModel.DataAnnotations.Schema;

namespace Food.Entities;    

public class Food : IEntity
{
    public int Id { get; set; }
    public string ImageUrl { get; set; }
    public string Name { get; set; }
    public decimal Price { get; set; }
    public string Description { get; set; }
    public DateTime CreatedTime { get; set; }
    public int Count { get; set; }
}