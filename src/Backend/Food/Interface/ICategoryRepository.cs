using Food.Dto_s;
using Food.Entities;

namespace Food.Interface;
public interface ICategoryRepository
{
    public Task<List<Category>> GetAll();
    public Task<Category> GetByName(string name);
    public Task<Category> CreateCategory(CategoryDto category);
    public Task<Category> UpdateCategory(int id, CategoryDto category);
    public Task DeleteCategory(int id);

}