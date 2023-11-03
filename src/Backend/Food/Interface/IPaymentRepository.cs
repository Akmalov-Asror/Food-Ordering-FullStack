using Food.Dto_s;
using Food.Entities;

namespace Food.Interface;

public interface IPaymentRepository
{
    Task<Payment> GetById(int id);
    Task<List<Payment>> GetListAsync();
    Task<PaymentDto> CreateUser(PaymentDto food);
    Task<Payment> UpdateUser(int id, PaymentDto food);
    Task DeleteUser(int id);
}