using System.Security.Claims;
using Food.AuditManagers.Attributes;
using Food.Dto_s;
using Food.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Food.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class FoodSellerController : ControllerBase
{
    private readonly ISellerFoodRepository _foodRepository;
    public FoodSellerController(ISellerFoodRepository foodRepository) => _foodRepository = foodRepository;

    [HttpPost]
    public async Task<IActionResult> BuyNewProducts(int foodId, SellerFood sellerFood) => Ok(await _foodRepository.SellerFood(foodId, sellerFood));

    [HttpGet]
    public async Task<IActionResult> GetByCount() => Ok(await _foodRepository.GetTopSellerFoodsByPrice());

    [HttpPost("User")]
    [IgnoreAudit("Some reason")]    
    public async Task<IActionResult> GetUser(PaymentForOrderDto paymentForOrder) => Ok(await _foodRepository.GetNameFromClaims(User, paymentForOrder));
}