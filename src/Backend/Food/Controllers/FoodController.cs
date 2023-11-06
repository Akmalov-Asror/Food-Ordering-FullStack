using Food.Dto_s;
using Food.Interface;
using Food.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Foods = Food.Entities.Food;

namespace Food.Controllers;

[Route("api/[controller]")]
[ApiController]
public class FoodController : MoldController<Foods, FoodRepository>
{
    private readonly IFoodRepository _foodRepository;
    public FoodController(FoodRepository repository, IFoodRepository foodRepository) : base(repository) => _foodRepository = foodRepository;

    [HttpGet("GetByPrice")]
    public async Task<IActionResult> GetAllFoodByPrice() => Ok(await _foodRepository.GetAllByPrice());
}