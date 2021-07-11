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
        Null = 10
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
