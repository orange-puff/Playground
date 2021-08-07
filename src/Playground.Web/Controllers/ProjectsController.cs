using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Playground.EF;
using Playground.Web.Models.JsonProjectModels;
using Playground.Utilities.TypingProject;
using JsonProject;
using System.Threading.Tasks;

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
            if (JsonHelper.TryFormat(json.Json, out var result))
            {
                return Ok(new JsonProjectModel
                {
                    Json = result
                });
            }
            else
            {
                return Ok(new JsonProjectErrorModel
                {
                    Error = result
                });
            }
        }

        [HttpGet("[controller]/typing_project")]
        public async Task<IActionResult> TypingProject()
        {
            var data = await TypingProjectHelper.ReadData();
            return Ok(data);
        }

        [HttpPost("[controller]/typing_project")]
        public async Task<IActionResult> TypingProject(int wordsPerMinute)
        {
            var data = await TypingProjectHelper.AddEntry(wordsPerMinute);
            return Ok(data);
        }
    }
}
