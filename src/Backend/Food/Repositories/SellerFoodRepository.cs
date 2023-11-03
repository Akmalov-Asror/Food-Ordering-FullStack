using Food.Data;
using Food.Dto_s;
using Food.Entities;
using Food.Interface;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using SellerFood = Food.Dto_s.SellerFood;

namespace Food.Repositories;

public class SellerFoodRepository : ISellerFoodRepository
{
    private readonly AppDbContext _context;
    public SellerFoodRepository(AppDbContext context) => _context = context;

    public async Task<Entities.SellerFood> SellerFood(int foodId, SellerFood sellerFood)
    {
        var checkCount = await _context.Foods.FirstOrDefaultAsync(x => x.Count == 0);
        if (checkCount.Count != 0)
        {
            var findFood = await _context.Foods.FirstOrDefaultAsync(x => x.Id == foodId);
            var foodSeller = new Entities.SellerFood();
            if (findFood is not null)
            {
                foodSeller.Name = findFood.Name;
                var countFood = findFood.Count - sellerFood.Count;
                foodSeller.Count = sellerFood.Count;
                foodSeller.Price = findFood.Price * sellerFood.Count;
                foodSeller.ImgUrl = findFood.ImageUrl;
                findFood.Count = countFood;
                _context.Foods.Update(findFood);
                await _context.SaveChangesAsync();
                var checkSellerFood = await _context.SellerFoods.FirstOrDefaultAsync(x => x.Name == sellerFood.Name);
                if (checkSellerFood is not null)
                {
                    checkSellerFood.Count += sellerFood.Count;
                    checkSellerFood.Price += findFood.Price * sellerFood.Count;

                    _context.SellerFoods.Update(checkSellerFood);
                    await _context.SaveChangesAsync();
                    return checkSellerFood;
                }
                _context.SellerFoods.Add(foodSeller);
                await _context.SaveChangesAsync();
                return foodSeller;

            }
            return foodSeller;
        }

        return new Entities.SellerFood();
    }

    public async Task<List<Entities.SellerFood>> GetTopSellerFoodsByPrice()
    {
        var count = 3;
        var topSellerFoods = await _context.SellerFoods
            .OrderByDescending(sf => sf.Count)
            .Take(count)
            .ToListAsync(); 

        return topSellerFoods;
    }

    public async Task<PaymentForOrder> GetNameFromClaims(ClaimsPrincipal claims, PaymentForOrderDto paymentForOrder)
    {
        var nameClaimEmail = claims.FindFirst(claim => claim.Type == ClaimTypes.Email);
        var nameClaim = claims.FindFirst(claim => claim.Type == ClaimTypes.Name);

        var payment = new PaymentForOrder();
        if (nameClaimEmail != null && nameClaim != null)
        {
            payment.UserEmail = nameClaimEmail.Value;
            payment.UserName = nameClaim.Value;
            payment.Name = paymentForOrder.Name;
            payment.CardNumber = paymentForOrder.CardNumber;
            payment.CardPassword = paymentForOrder.CardPassword;
            payment.TableNumber = paymentForOrder.TableNumber;
            payment.DateTime = DateTime.UtcNow;

            _context.PaymentForOrders.Add(payment);
            await _context.SaveChangesAsync();
        }

        return payment;
    }

}