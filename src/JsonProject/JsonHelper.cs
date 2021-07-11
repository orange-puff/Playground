﻿using System;
using System.Collections.Generic;
using System.Text;

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
        private static readonly List<char> _offensiveCharacters = new List<char> { '\\', '\t', '\n', ' ' };
        private static readonly List<char> _jsonTokens = new List<char> { '{', '}', '[', ']', ':', ',' };

        /// <summary>
        /// Given a Json, try to format it. Return means the json is invalid. Returns formatted json or error
        /// </summary>
        public static bool TryFormat(string json, out string result)
        {
            if (!TryTokenize(json, out var jsonTokens, out var error))
            {
                result = error;
                return false;
            }

            result = "GOOD ONE!";
            return true;
        }

        private static bool TryFormateCore(List<JsonToken> jsonTokens, int currIndex, StringBuilder curr, bool objectParent, bool listParent, int tabSize, int level)
        {
            return false;
        }

        /// <summary>
        /// Given a Json, try to tokenize it into separate JsonToken. Return false means some incorrect input prevents us from tokenizing
        /// </summary>
        public static bool TryTokenize(string json, out List<JsonToken> jsonTokens, out string error)
        {
            error = string.Empty;
            jsonTokens = new List<JsonToken>();
            var i = 0;
            var curr = new List<char>();
            while (i < json.Length)
            {
                // handling string amongst everything else is too tricky. Just handle it seperately
                if (json[i] == '"')
                {
                    if (curr.Count != 0)
                    {
                        return false;
                    }

                    var j = i;
                    while (j < json.Length)
                    {
                        curr.Add(json[j]);
                        if (j > 0 && j != i && json[j] == '"' && json[j - 1] != '\\')
                        {
                            break;
                        }
                        j++;
                    }
                    i = j + 1;
                    try
                    {
                        jsonTokens.Add(new JsonToken(JsonTokenType.String, new string(curr.ToArray())));
                    }
                    catch (ArgumentException ex)
                    {
                        error = ex.ToString();
                        return false;
                    }
                    curr = new List<char>();
                    continue;
                }

                if (_jsonTokens.Contains(json[i]))
                {
                    if (curr.Count > 0)
                    {
                        var s = new string(curr.ToArray());
                        if (!TryIdentifyJsonToken(s, out var jsonTokenType))
                        {
                            return false;
                        }
                        try
                        {
                            jsonTokens.Add(new JsonToken(jsonTokenType, s));
                        }
                        catch (ArgumentException ex)
                        {
                            error = ex.ToString();
                            return false;
                        }

                        curr = new List<char>();
                    }
                }

                if (json[i] == '{')
                {
                    jsonTokens.Add(new JsonToken(JsonTokenType.OpenBrace));
                }
                else if (json[i] == '}')
                {
                    jsonTokens.Add(new JsonToken(JsonTokenType.CloseBrace));
                }
                else if (json[i] == '[')
                {
                    jsonTokens.Add(new JsonToken(JsonTokenType.OpenBracket));
                }
                else if (json[i] == ']')
                {
                    jsonTokens.Add(new JsonToken(JsonTokenType.CloseBracket));
                }
                else if (json[i] == ':')
                {
                    jsonTokens.Add(new JsonToken(JsonTokenType.Colon));
                }
                else if (json[i] == ',')
                {
                    jsonTokens.Add(new JsonToken(JsonTokenType.Comma));
                }
                else if (!_offensiveCharacters.Contains(json[i]))
                {
                    curr.Add(json[i]);
                }

                i++;
            }

            return true;
        }

        private static bool TryIdentifyJsonToken(string s, out JsonTokenType jsonTokenType)
        {
            if (s == "true")
            {
                jsonTokenType = JsonTokenType.True;
                return true;
            }
            else if (s == "false")
            {
                jsonTokenType = JsonTokenType.False;
                return true;
            }
            else if (s == "null")
            {
                jsonTokenType = JsonTokenType.Null;
                return true;
            }
            else if (JsonToken.IsValidNum(s))
            {
                jsonTokenType = JsonTokenType.Number;
                return true;
            }
            else
            {
                jsonTokenType = JsonTokenType.Null;
                return false;
            }
        }

        private static string CreateIndent(int tabSize, int level)
        {
            var tot = tabSize * level;
            var array = new char[tot];
            for (int i = 0; i < tot; i++)
            {
                array[i] = ' ';
            }
            return new string(array);
        }
    }
}
