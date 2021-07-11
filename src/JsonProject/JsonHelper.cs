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
        private static readonly List<char> _badInStringChars = new List<char>{'\\', '\t', '\n'};
        /// <summary>
        /// Given a Json, try to format it. Return means the json is invalid. Returns formatted json or error
        /// </summary>
        public static bool TryFormat(out string result)
        {
            result = "\"hello\": 1, 2, 3";
            result += "\n          ^ expected }";
            return false;
        }

        /// <summary>
        /// Returns true if this is a valid number
        /// </summary>
        public static bool IsValidNum(string s)
        {
            if (s[0] < '1' || s[0] > '9')
            {
                return false;
            }
            var numDecimals = 0;
            foreach (var c in s)
            {
                if (c == '.')
                {
                    numDecimals++;
                }
                else if (c < '0' || c > '9')
                {
                    return false;
                }
            }
            if (numDecimals > 1 || s[-1] == '.')
            {
                return false;
            }
            return true;
        }

        /// <summary>
        /// Given a Json, try to tokenize it into separate JsonToken. Return false means some incorrect input prevents us from tokenizing
        /// </summary>
        public static bool TryTokenize(string json, out List<JsonToken> jsonTokens)
        {
            jsonTokens = new List<JsonToken>();
            var inString = false;
            var i = 0;
            var curr = new List<char>();
            while (i < json.Length)
            {
                if (inString)
                {
                    if (curr.Count > 0)
                    {
                        var tmp = new string(curr.ToArray());
                        if (tmp == "true")
                        {
                            jsonTokens.Add(new JsonToken(JsonTokenType.True, tmp));
                        }
                        else if (tmp == "false")
                        {
                            jsonTokens.Add(new JsonToken(JsonTokenType.False, tmp));
                        }
                        else if (tmp == "null")
                        {
                            jsonTokens.Add(new JsonToken(JsonTokenType.Null, tmp));
                        }
                        else if (IsValidNum(tmp))
                        {
                            jsonTokens.Add(new JsonToken(JsonTokenType.Number, tmp));
                        }
                        else
                        {
                            return false;
                        }
                    }

                    var j = i;
                    curr = new List<char>();
                    while (j < json.Length && (json[i] != '"' || json[i-1] == '\\'))
                    {
                        curr.Add(json[i]);
                        j++;
                    }
                    jsonTokens.Add(new JsonToken(JsonTokenType.String, new string(curr.ToArray())));

                    i = j;
                    curr = new List<char>();
                    continue;
                }

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
                else if (json[i] == ':')
                {
                    jsonTokens.Add(new JsonToken(JsonTokenType.Colon, ":"));
                }

                i++;
            }

            return true;
        }
    }
}
