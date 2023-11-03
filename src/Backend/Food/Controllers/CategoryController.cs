using Food.Entities;
using Food.Entities.EntityInterface;
using Food.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Food.Dto_s;
using Food.Interface;
using Microsoft.AspNetCore.Authorization;
using FluentValidation;

namespace Food.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class CategoryController : ControllerBase
{
    private readonly ICategoryRepository _categoryRepository;
    private readonly IValidator<CategoryDto> _categoryValidator;

    public CategoryController(ICategoryRepository categoryRepository, IValidator<CategoryDto> categoryValidator)
    {
        _categoryRepository = categoryRepository;
        _categoryValidator = categoryValidator;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll() => Ok(await _categoryRepository.GetAll());

    [HttpGet("Id")]
    public async Task<IActionResult> GetById(string name) => Ok(await _categoryRepository.GetByName(name));
    [HttpPost]
    public async Task<IActionResult> CreateCategory(CategoryDto categoryDto)
    {
        var validationResult = await _categoryValidator.ValidateAsync(categoryDto);
        if (!validationResult.IsValid)
        {
            return BadRequest(validationResult.Errors);
        }

        var category = await _categoryRepository.CreateCategory(categoryDto);
        return Ok(category);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateCategory(int id, CategoryDto categoryDto)
    {
        var validationResult = await _categoryValidator.ValidateAsync(categoryDto); 
        if (!validationResult.IsValid)
        {
            return BadRequest(validationResult.Errors);
        }

        var updatedCategory = await _categoryRepository.UpdateCategory(id, categoryDto);
        return Ok(updatedCategory);
    }

    [HttpDelete]
    public async Task<IActionResult> DeleteCategory(int id)
    {
        await _categoryRepository.DeleteCategory(id);
        return Ok();
    }
}