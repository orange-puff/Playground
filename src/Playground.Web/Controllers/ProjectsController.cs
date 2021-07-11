using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Playground.EF;
using Playground.Web.Models.JsonProjectModels;
using JsonProject;
using System.Collections.Generic;
using System.Linq;

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
            var x = new List<char>(json.Json.ToCharArray()).Select(c => (int)c).ToList();
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
    }
}
