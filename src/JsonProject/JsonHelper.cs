using System;
using System.Collections.Generic;

namespace JsonProject
{
    /// <summary>
    /// Json Rules:
    /// <list type="bullet">
    /// <item>
    /// <description>Data is in name/value pairs</description>
    /// </item>
    /// <item>
    /// <description>Data is separated by commas</description>
    /// </item>
    /// <item>
    /// <description>Objects are encapsulated within the opening and closing curly brackets</description>
    /// </item>
    /// <item>
    /// <description>An empty object can be represented by {}</description>
    /// </item>
    /// <item>
    /// <description>Arrays are encapsulated within opening and closing square brackets</description>
    /// </item>
    /// <item>
    /// <description>An empty array can be represented by []</description>
    /// </item>
    /// <item>
    /// <description>A member is represented by a key-value pair, contained in double quotes</description>
    /// </item>
    /// <item>
    /// <description>Each member should have a unique key within an object structure</description>
    /// </item>
    /// <item>
    /// <description>The value of a member must be contained in double quotes, if it's a string</description>
    /// </item>
    /// <item>
    /// <description>Boolean values are represented using the true or false literals in lower case</description>
    /// </item>
    /// <item>
    /// <description>Number values are represented using double-precision floating-point format and shouldn't have leading zeroes</description>
    /// </item>
    /// <item>
    /// <description>"Offensive" characters in a string need to be escaped using the backslash character Null values are represented by the null literal in lower case</description>
    /// </item>
    /// <item>
    /// <description>Dates, and similar object types, aren't adequately supported and should be converted to strings</description>
    /// </item>
    /// <item>
    /// <description>Each member of an object or array value must be followed by a comma, except for the last one</description>
    /// </item>
    /// </list>
    /// </summary>
    public static class JsonHelper
    {
        /// <summary>
        /// Given a Json, try to format it. A failure to format means the json is invalid. Returns formatted json or error
        /// </summary>
        public static bool TryFormat(out string result)
        {
            result = "\"hello\": 1, 2, 3";
            result += "\n          ^ expected }";
            return false;
        }

        public static bool TryTokenize(string json, out List<JsonToken> jsonTokens)
        {
            jsonTokens = new List<JsonToken>();
            var inString = false;
            var inNum = false;
            for (int i = 0; i < json.Length; i++)
            {
                if (json[i] == '{')
                {
                    jsonTokens.Add(new JsonToken(JsonTokenType.OpenBrace, "{"));
                }
                else if (json[i] == '}')
                {
                    jsonTokens.Add(new JsonToken(JsonTokenType.CloseBrace, "}"));
                }
                else if (json[i] == '[')
                {
                    jsonTokens.Add(new JsonToken(JsonTokenType.OpenBracket, "["));
                }
                else if (json[i] == ']')
                {
                    jsonTokens.Add(new JsonToken(JsonTokenType.CloseBracket, "]"));
                }
                else if (json[i] == '"')
                {
                    jsonTokens.Add(new JsonToken(JsonTokenType.Quote, "\""));
                    inString = !inString;
                }
            }

            return true;
        }
    }
}
