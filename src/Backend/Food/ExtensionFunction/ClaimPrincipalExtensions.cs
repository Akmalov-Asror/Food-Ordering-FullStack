using System.Security.Claims;

namespace Food.ExtensionFunction;

public static class ClaimPrincipalExtensions
{
    public static string GetUserName(this ClaimsPrincipal principal)
    {
        if (principal == null)
        {
            throw new ArgumentNullException(nameof(principal));
        }
        var claim = principal.FindFirst(ClaimTypes.Name);
        return claim != null ? claim.Value : null;
    }
}