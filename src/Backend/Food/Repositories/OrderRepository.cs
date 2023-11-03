using Food.Data;
using Food.Entities;
using Food.Services.Generics;
namespace Food.Repositories;

public class OrderRepository : GenericRepository<Order, AppDbContext>
{
    public OrderRepository(AppDbContext context) : base(context) { }
}