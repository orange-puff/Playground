using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Playground.EF;

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
        public string JsonProject(string json)
        {

            return "hello, world";
        }
    }
}
