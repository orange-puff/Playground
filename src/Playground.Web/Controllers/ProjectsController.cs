using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Playground.EF;
using Playground.Web.Models.JsonProjectModels;
using Playground.Utilities.TypingProject;
using JsonProject;
using System.Threading.Tasks;
using Playground.Models;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Collections.Generic;

namespace Playground.Web.Controllers
{
    public class ProjectsController : ApiController
    {
        private readonly ILogger<ProjectsController> _logger;
        private readonly PlaygroundDbContext _playgroundDbContext;
        private readonly SemaphoreSlim _typingProjectLock = new SemaphoreSlim(1, 1);

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
            var data = await _playgroundDbContext.Set<WordsPerMinuteFrequency>()
                .ToDictionaryAsync(wpmf => wpmf.WordsPerMinute, wpmf => wpmf.Frequency);
            return Ok(data);
        }

        [HttpPost("[controller]/typing_project")]
        public async Task<IActionResult> TypingProject([FromBody] int wordsPerMinute)
        {
            _logger.LogInformation($"Adding new entry for TypingProject: {wordsPerMinute}");
            await _typingProjectLock.WaitAsync();
            var data = new Dictionary<int, int>();
            try
            {
                data = await _playgroundDbContext.Set<WordsPerMinuteFrequency>()
                .ToDictionaryAsync(wpmf => wpmf.WordsPerMinute, wpmf => wpmf.Frequency);

                TypingProjectHelper.AddEntry(data, wordsPerMinute, out var key);
                var entry = await _playgroundDbContext.Set<WordsPerMinuteFrequency>()
                    .FirstOrDefaultAsync(wpmf => wpmf.WordsPerMinute == key);
                entry.WordsPerMinute++;
                await _playgroundDbContext.SaveChangesAsync();
            }
            finally
            {
                _typingProjectLock.Release();
            }
            return Ok(data);
        }
    }
}
