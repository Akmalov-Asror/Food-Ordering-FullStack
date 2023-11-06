using Food.Data;
using Food.Interface;
using Microsoft.EntityFrameworkCore;

namespace Food.Repositories;
public partial class FoodRepository : IFoodRepository
{
    private readonly AppDbContext _context;
    public async Task<List<Entities.Food>> GetAllByTime()
    {
        DateTime currentTime = DateTime.UtcNow;
        DateTime twentyFourHoursAgo = currentTime.AddHours(-24);

        return await _context.Foods
            .Where(food => food.CreatedTime >= twentyFourHoursAgo && food.CreatedTime <= currentTime)
            .ToListAsync();
    }

    public async Task<List<Entities.Food>> GetAllByPrice()
    {
        decimal minPrice = 1;
        decimal maxPrice = 1000;
        List<Entities.Food> result = await _context.Foods
            .Where(food => food.Price >= minPrice && food.Price <= maxPrice)
            .ToListAsync();

        return result;
    }
}