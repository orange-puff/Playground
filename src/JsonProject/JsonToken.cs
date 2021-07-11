using System;
namespace JsonProject
{
    public enum JsonTokenType
    {
        OpenBrace = 0,
        CloseBrace = 1,
        OpenBracket = 2,
        CloseBracket = 3,
        Colon = 4,
        String = 5,
        Number = 6,
        True = 7,
        False = 8,
        Null = 9,
        Comma = 10
    }

    /// <summary>
    /// Represents a valid token in a Json. Eeach instance is validated.
    /// </summary>
    public class JsonToken : IEquatable<JsonToken>
    {
        public JsonTokenType Type { get; }
        public string Value { get; } = null!;

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
        /// Returns true if this is a valid Json number
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

        /// <summary>
        /// Returns true if this is a valid Json string
        /// </summary>
        public static bool IsValidString(string s)
        {
            if (s.Length < 2)
            {
                return false;
            }
            if (s[0] != '"' || s[s.Length - 1] != '"')
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
            else if (type == JsonTokenType.String && !IsValidString(value))
            {
                throw new ArgumentException();
            }
            else if (type == JsonTokenType.True && value != "true")
            {
                throw new ArgumentException();
            }
            else if (type == JsonTokenType.False && value != "false")
            {
                throw new ArgumentException();
            }
            else if (type == JsonTokenType.Null && value != "null")
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
