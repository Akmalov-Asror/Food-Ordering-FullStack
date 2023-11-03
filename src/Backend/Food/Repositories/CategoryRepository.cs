using Food.Data;
using Food.Dto_s;
using Food.Entities;
using Food.Interface;
using Food.Services.Generics;
using Microsoft.EntityFrameworkCore;
using System.Xml.Linq;

namespace Food.Repositories;

public class CategoryRepository : ICategoryRepository
{
    private readonly AppDbContext _context;

    public CategoryRepository(AppDbContext context) => _context = context;

    public async Task<List<Category>> GetAll() => await _context.Category.Include(x => x.Food).ToListAsync();

    public async Task<Category> GetByName(string name) => await _context.Category.Include(x => x.Food).FirstOrDefaultAsync(x => x.Name == name);

    public async Task<Category> CreateCategory(CategoryDto category)
    {
        var getCategory = await _context.Category
            .Include(c => c.Food)
            .FirstOrDefaultAsync(x => x.Name == category.Name);

        if (getCategory is null)
        {
            var newCategory = new Category
            {
                Name = category.Name,
            };

            if (newCategory != null)
            {
                _context.Category.Add(newCategory);
                await _context.SaveChangesAsync();
                return newCategory;
            }
        }

        return getCategory;
    }

    public async Task<Category> UpdateCategory(int id, CategoryDto category)
    {
        var getItem = await _context.Category.FirstOrDefaultAsync(x => x.Id == id);
        if (getItem is not null)
        {
            getItem.Name = category.Name;
            _context.Entry(getItem).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return getItem;
        }
        return getItem;
    }

    public async Task DeleteCategory(int id)
    {
        var getCategory = await _context.Category.FirstOrDefaultAsync(x => x.Id == id);
        if (getCategory is not null)
        {
            _context.Category.Remove(getCategory);
            await _context.SaveChangesAsync();
        }
    }
}