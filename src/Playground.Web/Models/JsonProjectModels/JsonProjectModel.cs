using Newtonsoft.Json;

namespace Playground.Web.Models.JsonProjectModels
{
    public class JsonProjectModel
    {
        [JsonProperty("json")]
        public string Json { get; set; } = null!;
    }
}
