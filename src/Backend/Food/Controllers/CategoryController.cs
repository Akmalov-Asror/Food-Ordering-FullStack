using Food.Entities;
using Food.Entities.EntityInterface;
using Food.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using Food.Dto_s;
using Food.Interface;
using Microsoft.AspNetCore.Authorization;

namespace Food.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize]

public class CategoryController : ControllerBase
{
    private readonly ICategoryRepository _categoryRepository;

    public CategoryController(ICategoryRepository categoryRepository) => _categoryRepository = categoryRepository;

    [HttpGet]
    public async Task<IActionResult> GetAll() => Ok(await _categoryRepository.GetAll());

    [HttpGet("Id")]
    public async Task<IActionResult> GetById(string name) => Ok(await _categoryRepository.GetByName(name));

    [HttpPost]
    public async Task<IActionResult> CreateCategory(CategoryDto category) => Ok(await _categoryRepository.CreateCategory(category));

    [HttpPut]
    public async Task<IActionResult> UpdateCategory(int id, CategoryDto category) => Ok(await _categoryRepository.UpdateCategory(id, category));

    [HttpDelete]
    public async Task<IActionResult> DeleteCategory(int id)
    {
        await _categoryRepository.DeleteCategory(id);
        return Ok();
    }
}