using Food.Entities.EntityInterface;
using Food.Entities.Enums;

namespace Food.Entities;

public class Order : IEntity
{
    public int Id { get; set; }
    public Food Food { get; set; }
    public decimal Total { get; set; }
    public int Count { get; set; }
    public DateTime CreatedTime { get; set; }
    public EOrderType EOrderType { get; set; }
    public EStatus EStatus { get; set; }
}