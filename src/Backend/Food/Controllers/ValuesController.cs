using Food.Data;
using Food.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Food.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ValuesController : ControllerBase
{
    private readonly AppDbContext _context;

    public ValuesController(AppDbContext context) => _context = context;

    [HttpGet]
    public async Task<IActionResult> GetAll() => Ok(await _context.Hides.ToListAsync());

    [HttpPost]
    public async Task<IActionResult> Create(Hide hides)
    {
        var hide = new Hide();
        hide.Description = hides.Description;
        hide.Name = hides.Name;
        _context.Hides.Add(hide);
        await _context.SaveChangesAsync();
        return Ok(hide);
    }

    [HttpDelete]
    public async Task<IActionResult> Delete(int id)
    {
        var findHide = await _context.Hides.FindAsync(id);
        _context.Hides.Remove(findHide);
        await _context.SaveChangesAsync();
        return Ok();
    }
}