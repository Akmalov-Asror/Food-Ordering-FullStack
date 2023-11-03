using Food.Data;
using Food.Entities;
using Food.Services.Generics;
namespace Food.Repositories;

public class PaymentRepository : GenericRepository<Payment, AppDbContext>
{
    public PaymentRepository(AppDbContext context) : base(context) { }
}