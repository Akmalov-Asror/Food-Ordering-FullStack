using Food.Entities;
using Food.Entities.EntityInterface;
using System.Linq.Expressions;

namespace Food.Services.Generics;

public interface IGenericRepository<T> where T : class, IEntity
{
    Task<IEnumerable<T>> GetAllAsync();
    Task<IEnumerable<T>> GetAllIncludingAsync(params Expression<Func<T, object>>[] includeProperties);
    Task<List<T>> GetAll();
    Task<T?> Get(int id);
    Task<T> Add(T entity);
    Task<T> Update(T entity);
    Task<T> Delete(int id);
    Task SaveAsync();
}