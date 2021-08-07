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

        public ProjectsController(
            ILogger<ProjectsController> logger
            )
        {
            _logger = logger;
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
        public async Task<IActionResult> TypingProject([FromBody] int wordsPerMinute)
        {
            _logger.LogInformation($"Adding new entry for TypingProject: {wordsPerMinute}");
            var data = await TypingProjectHelper.AddEntry(wordsPerMinute);
            return Ok(data);
        }
    }
}
