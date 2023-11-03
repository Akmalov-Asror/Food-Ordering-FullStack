using Food.Data;
using Food.Entities;
using Food.Services.Generics;
namespace Food.Repositories;

public class InformationRepository : GenericRepository<Information, AppDbContext>
{
    public InformationRepository(AppDbContext context) : base(context) { }
}