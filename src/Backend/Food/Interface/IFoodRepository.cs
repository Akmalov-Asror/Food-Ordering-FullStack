using Food.Dto_s;
using Food.Entities;

namespace Food.Interface;

public interface IFoodRepository
{
    Task<List<Entities.Food>> GetAllByTime();
    Task<List<Entities.Food>> GetAllByPrice();
} 