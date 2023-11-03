using Food.Dto_s;
using Food.Entities;

namespace Food.Interface;

public interface IOrderRepository
{
    Task<Order> GetById(int id);
    Task<List<Order>> GetListAsync();
    Task<OrderDto> CreateUser(OrderDto order);
    Task<OrderDto> UpdateUser(int id, OrderDto order);
    Task DeleteUser(int id);
}