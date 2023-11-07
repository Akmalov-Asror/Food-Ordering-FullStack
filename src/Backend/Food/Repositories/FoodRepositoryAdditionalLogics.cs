using Food.Data;
using Food.Dto_s;
using Food.Interface;
using Microsoft.EntityFrameworkCore;
using Foods = Food.Entities.Food;

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

    public async Task<Entities.Food> CreateFoodByCategory(FoodDto foodDto, int categoryId)
    {
        var findCategory = await _context.Category.Include(category => category.Food).FirstOrDefaultAsync(x => x.Id == categoryId);
        if (findCategory != null)
        {
            var food = new Entities.Food
            {
                Name = foodDto.Name,
                Description = foodDto.Description,
                ImageUrl = foodDto.ImageUrl,
                Price = foodDto.Price,
                CreatedTime = DateTime.UtcNow,
                Count = foodDto.Count
            };

            var t = await _context.Foods.AddAsync(food);
            await _context.SaveChangesAsync();

            if (findCategory.Food is null)
            {
                findCategory.Food = new List<Entities.Food> { t.Entity };
            }
            else
            {
                findCategory.Food.Add(t.Entity);
            }
            await _context.SaveChangesAsync();
            return food;
        }

        var categories = await _context.Category.ToListAsync();
        if (categories == null || categories.Count == 0)
        {
            throw new BadHttpRequestException("No categories found");
        }

        string categoryList = "Please Choose from the following categories: \n";
        foreach (var category in categories)
        {
            categoryList += $"{category.Id}, ";
            categoryList += $"{category.Name}, ";
        }

        categoryList = categoryList.TrimEnd(' ', ',');

        throw new BadHttpRequestException(categoryList);
    }

    public async Task<Foods> CreateFoodAddWithCategory(FoodAddWithCategory foodAddWithCategory)
    {
        var checkCategory = await _context.Category.Include(x => x.Food).FirstOrDefaultAsync(c => c.Name == foodAddWithCategory.Name);
        var check = await _context.Foods.FirstOrDefaultAsync(x => x.Id == foodAddWithCategory.FoodId);

        if (checkCategory is not null)
        {
            if (foodAddWithCategory.FoodCount is not 0)
            {
                var counts = check.Count - foodAddWithCategory.FoodCount;
                check.Count = counts;
                _context.Foods.Add(check);
                await _context.SaveChangesWithAudit(true);
            }
        }
        else
        {
            var categories = await _context.Category.ToListAsync();
            if (categories == null || categories.Count == 0)
            {
                throw new BadHttpRequestException("No categories found");
            }

            string categoryList = "Please Choose from the following categories: \n";
            foreach (var category in categories)
            {
                categoryList += $"{category.Id}, ";
                categoryList += $"{category.Name}, ";
            }

            categoryList = categoryList.TrimEnd(' ', ',');

            throw new BadHttpRequestException(categoryList);
        }
        var result = await _context.Foods.FirstOrDefaultAsync(x => x.Id == foodAddWithCategory.FoodId);
        return result ?? new Entities.Food();
    }
}