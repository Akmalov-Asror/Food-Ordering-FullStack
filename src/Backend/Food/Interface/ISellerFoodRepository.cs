using Food.Dto_s;
using Food.Entities;
using System.Security.Claims;
using SellerFood = Food.Dto_s.SellerFood;

namespace Food.Interface;

public interface ISellerFoodRepository
{
    Task<Entities.SellerFood> SellerFood(int foodId, SellerFood sellerFood);
    Task<List<Entities.SellerFood>> GetTopSellerFoodsByPrice();
    Task<PaymentForOrder> GetNameFromClaims(ClaimsPrincipal claims, PaymentForOrderDto paymentForOrder);


}