using Newtonsoft.Json;

namespace Playground.Web.Models.JsonProjectModels
{
    public class JsonProjectErrorModel
    {
        [JsonProperty("error")]
        public string Error { get; set; } = null!;
    }
}
