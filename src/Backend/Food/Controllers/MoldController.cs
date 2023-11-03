using System.Collections.Generic;
using System.Threading.Tasks;
using Food.Entities;
using Food.Entities.EntityInterface;
using Food.Services;
using Food.Services.Generics;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Food.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public abstract class MoldController<TEntity, TRepository> : ControllerBase where TEntity : class, IEntity where TRepository : IGenericRepository<TEntity>
{
    private readonly IGenericRepository<TEntity> _genericRepository;
    protected MoldController(IGenericRepository<TEntity> genericRepository)
    {
        _genericRepository = genericRepository;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<TEntity>>> Get() => await _genericRepository.GetAll();

    [HttpGet("{id}")]
    public virtual async Task<ActionResult<TEntity>> Get(int id)
    {
        var movie = await _genericRepository.Get(id);
        if (movie == null) return NotFound();
        return movie;
    }

    [HttpPut("{id}")]
    [Authorize(Roles = "ADMIN,OWNER")]
    public virtual async Task<IActionResult> Put(int id, TEntity movie)
    {
        if (id != movie.Id)
            return BadRequest();
        await _genericRepository.Update(movie);
        return NoContent();
    }

    [HttpPost]
    [Authorize(Roles = "ADMIN,OWNER")]
    public virtual async Task<ActionResult<TEntity>> Post(TEntity movie)
    {
        
        await _genericRepository.Add(movie);
        return (movie);
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "ADMIN,OWNER")]
    public virtual async Task<ActionResult<TEntity>> Delete(int id)
    {
        var movie = await _genericRepository.Delete(id);
        return movie;
    }

    [HttpGet("Asynchronous")]
    public virtual async Task<ActionResult<IEnumerable<TEntity>>> GetAllAsync()
    {
        var entities = await _genericRepository.GetAllAsync();
        return Ok(entities);
    }
}   