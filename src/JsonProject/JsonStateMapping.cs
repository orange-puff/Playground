using System.Collections.Generic;

namespace JsonProject
{
    public static class JsonStateMapping
    {
        public static Dictionary<JsonState, List<JsonTokenType>> State = new Dictionary<JsonState, List<JsonTokenType>>
        {
            {
                new JsonState(0, JsonTokenType.OpenBracket), new List<JsonTokenType>
                {
                    JsonTokenType.CloseBrace,
                    JsonTokenType.CloseBracket,
                    JsonTokenType.String,
                    JsonTokenType.Number,
                    JsonTokenType.True,
                    JsonTokenType.False,
                    JsonTokenType.Null
                }
            },
            {
                new JsonState()
            }
        };
    }
}
