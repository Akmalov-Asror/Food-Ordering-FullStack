using Food.Entities;
using Food.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Food.Controllers;

[Route("api/[controller]")]
[ApiController]
public class InformationController : MoldController<Information, InformationRepository>
{
    public InformationController(InformationRepository repository) : base(repository) { }
}
