using System;
namespace JsonProject
{
    public enum JsonTokenType
    {
        OpenBrace = 0,
        CloseBrace = 1,
        OpenBracket = 2,
        CloseBracket = 3,
        Quote = 4,
        Colon = 5,
        String = 6,
        Number = 7,
        True = 8,
        False = 9,
        Null = 10,
        Comma = 11
    }

    public class JsonToken : IEquatable<JsonToken>
    {
        public JsonTokenType Type { get; set; }
        public string Value { get; set; } = null!;

        public JsonToken(JsonTokenType type, string value = "")
        {
            Type = type;

            switch (type)
            {
                case JsonTokenType.OpenBrace:
                    Value = "{";
                    return;
                case JsonTokenType.CloseBrace:
                    Value = "}";
                    return;
                case JsonTokenType.OpenBracket:
                    Value = "[";
                    return;
                case JsonTokenType.CloseBracket:
                    Value = "]";
                    return;
                case JsonTokenType.Quote:
                    Value = "\"";
                    return;
                case JsonTokenType.Colon:
                    Value = ":";
                    return;
                case JsonTokenType.Comma:
                    Value = ",";
                    return;
                default:
                    Validate(type, value);
                    Value = value;
                    break;
            }
            Type = type;
            Value = value;
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
            if (numDecimals > 1 || s[s.Length - 1] == '.')
            {
                return false;
            }
            return true;
        }

        private void Validate(JsonTokenType type, string value)
        {
            if (type == JsonTokenType.Number && !IsValidNum(value))
            {
                throw new ArgumentException();
            }
            else if (type == JsonTokenType.String)
            {

            }
            else if (type == JsonTokenType.True && value != "true")
            {
                throw new ArgumentException();
            }
            else if (type == JsonTokenType.False && value != "false")
            {
                throw new ArgumentException();
            }
            else if (type == JsonTokenType.Null)
            {
                throw new ArgumentException();
            }
        }

        public bool Equals(JsonToken? jsonToken)
        {
            if (jsonToken == null)
            {
                return false;
            }
            var ans = true;
            ans &= Type == jsonToken.Type;
            ans &= string.Equals(Value, jsonToken.Value);
            return ans;
        }
    }
}
