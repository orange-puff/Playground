using Newtonsoft.Json;

namespace Playground.Web.Models
{
    public class JsonProjectModel
    {
        [JsonProperty("json")]
        public string Json { get; set; } = null!;
    }
}
