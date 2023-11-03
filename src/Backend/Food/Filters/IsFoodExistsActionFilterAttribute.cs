using Food.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.EntityFrameworkCore;

namespace Food.Filters;

public class IsFoodExistsActionFilterAttribute : ActionFilterAttribute
{
    private readonly AppDbContext _context;
    public IsFoodExistsActionFilterAttribute(AppDbContext context) => _context = context;

    public override async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
    {
        if (!context.ActionArguments.ContainsKey("Id"))
        {
            await next();
            return;
        }
        var foodId = (int?)context.ActionArguments["Id"];
        if (!await _context.Foods.AnyAsync(food => food.Id == foodId))
        {
            context.Result = new NotFoundResult();
            return;
        }

        await next();
    }
}