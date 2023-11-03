using Food.Entities;
using Food.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Food.Controllers;

[Route("api/[controller]")]
[ApiController]
public class PaymentController : MoldController<Payment, PaymentRepository>
{
    public PaymentController(PaymentRepository repository) : base(repository) { }
}
