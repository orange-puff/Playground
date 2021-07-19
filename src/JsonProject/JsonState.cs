using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;

namespace JsonProject
{
    public class JsonState : IEqualityComparer<JsonState>
    {
        private static Dictionary<int, List<JsonTokenType>> JsonStateValues = new Dictionary<int, List<JsonTokenType>>
        {
            {0, new List<JsonTokenType>{JsonTokenType.OpenBrace, JsonTokenType.OpenBracket} },
            {1, new List<JsonTokenType>{JsonTokenType.String, JsonTokenType.CloseBrace} },
            {2, new List<JsonTokenType>
                {JsonTokenType.CloseBracket, JsonTokenType.OpenBrace, JsonTokenType.String, JsonTokenType.Number, JsonTokenType.True, JsonTokenType.False, JsonTokenType.Null}
            },
            {3, new List<JsonTokenType>{JsonTokenType.Comma, JsonTokenType.CloseBracket} },
            {4, new List<JsonTokenType>{JsonTokenType.Colon } },
        };

        public int State { get; set; }
        public JsonTokenType JsonTokenType { get; set; }

        public JsonState(int state, JsonTokenType jsonTokenType)
        {
            State = state;
            JsonTokenType = jsonTokenType;
        }

        public static bool TryGetJsonStateValue(int state, out List<JsonTokenType> jsonTokenTypes)
        {
            if (JsonStateValues.TryGetValue(state, out var tokenTypes))
            {
                jsonTokenTypes = tokenTypes;
                return true;
            }
            else
            {
                jsonTokenTypes = new List<JsonTokenType>();
                return false;
            }
        }

        public bool Equals(JsonState? x, JsonState? y)
        {
            if ((x == null && y != null) || (x != null && y == null))
            {
                return false;
            }
            return (x == null && y == null) || (x?.State == y?.State && x?.JsonTokenType == y?.JsonTokenType);
        }

        public int GetHashCode(JsonState obj)
        {
            var tot = 0;
            foreach (var c in obj.JsonTokenType.ToString())
            {
                tot += (int)c;
            }
            return obj.State + tot;
        }
    }
}
