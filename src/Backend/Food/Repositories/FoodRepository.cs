using Food.Data;
using Food.Services.Generics;
using Foods = Food.Entities.Food;

namespace Food.Repositories;

public partial class FoodRepository : GenericRepository<Foods, AppDbContext>
{
    public FoodRepository(AppDbContext context) : base(context)
    {
        _context = context;
    }
}