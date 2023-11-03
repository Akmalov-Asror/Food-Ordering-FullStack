using Food.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Food.Filters;

public class ExitsFoodEntity : ActionFilterAttribute
{
    private readonly AppDbContext _context;
    public ExitsFoodEntity(AppDbContext context) => _context = context;

    public override void OnActionExecuting(ActionExecutingContext context)
    {
        var param = context.ActionArguments.SingleOrDefault();
        if (param.Value == null)
        {
            context.Result = new BadRequestObjectResult("Model Is null");
            return;
        }

        if (!context.ModelState.IsValid)
        {
            context.Result = new BadRequestObjectResult(context.ModelState);
        }
    }
}