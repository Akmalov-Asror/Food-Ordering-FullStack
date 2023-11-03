using Food.Entities;
using Food.Interface;
using Food.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Food.Controllers;

[Route("api/[controller]")]
[ApiController]
public class OrderController : MoldController<Order, OrderRepository>
{
    private readonly IFoodRepository _foodRepository;
    public OrderController(OrderRepository repository, IFoodRepository foodRepository) : base(repository) => _foodRepository = foodRepository;

    [HttpGet("GetByTime")]
    public async Task<IActionResult> GetAllFoodByDate() => Ok(await _foodRepository.GetAllByTime());
}