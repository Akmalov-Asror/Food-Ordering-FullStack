using Food.Dto_s;
using Food.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Food.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class CommitController : ControllerBase
{
    private readonly ICommitRepository _commitRepository;

    public CommitController(ICommitRepository commitRepository) => _commitRepository = commitRepository;

    [HttpGet]
    public async Task<IActionResult> GetAllCommits() => Ok(await _commitRepository.GetCommitsAsync());

    [HttpPost]
    public async Task<IActionResult> CreateCommit(CommitDto commitDto) => Ok(await _commitRepository.CreateCommit(commitDto));
}