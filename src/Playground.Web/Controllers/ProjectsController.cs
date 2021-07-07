using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Playground.EF;
using Playground.Web.Models;
using JsonProject;

namespace Playground.Web.Controllers
{
    public class ProjectsController : ApiController
    {
        private readonly ILogger<ProjectsController> _logger;
        private readonly PlaygroundDbContext _playgroundDbContext;

        public ProjectsController(
            ILogger<ProjectsController> logger,
            PlaygroundDbContext playgroundDbContext
            )
        {
            _logger = logger;
            _playgroundDbContext = playgroundDbContext;
        }

        [HttpPost("[controller]/json_project")]
        public IActionResult JsonProject(JsonProjectModel json)
        {
            if (JsonHelper.TryFormat(out var s))
            {
                _logger.LogInformation(s);
            }
            return Ok();
        }
    }
}
