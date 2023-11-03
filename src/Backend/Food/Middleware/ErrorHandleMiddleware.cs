
using Food.Exceptions;

namespace Food.Middleware;

public class ErrorHandleMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger _logger;
    public ErrorHandleMiddleware(RequestDelegate next, ILogger<ErrorHandleMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task Invoke(HttpContext httpContext)
    {
        try
        {
            await _next(httpContext);
        }
        catch (NotFoundException e)
        {
            httpContext.Response.StatusCode = StatusCodes.Status404NotFound;
            await httpContext.Response.WriteAsJsonAsync(new { error = e.Message });
        }
        catch (BadRequestException e)
        {
            httpContext.Response.StatusCode = e.ErrorCode;
            await httpContext.Response.WriteAsJsonAsync(new { error = e.Message });
        }
        catch (Exception e)
        {
            _logger.LogError(e, "Internal error");
            throw;
        }
    }
}

public static class ErrorHandlerMiddlewareExtensions
{
    public static IApplicationBuilder UseErrorHandlerMiddleware(this IApplicationBuilder builder)
    {
        return builder.UseMiddleware<ErrorHandleMiddleware>();
    }
}
