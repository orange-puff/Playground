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
        String = 5,
        Number = 6,
        True = 7,
        False = 8,
        Null = 9
    }

    public class JsonToken
    {
        public JsonTokenType JsonTokenType { get; set; }
        public string JsonTokenValue { get; set; } = null!;

        public JsonToken(JsonTokenType jsonTokenType, string jsonTokenValue)
        {
            JsonTokenType = jsonTokenType;
            JsonTokenValue = jsonTokenValue;
        }
    }
}
