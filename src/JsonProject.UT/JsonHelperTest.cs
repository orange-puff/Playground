using System.Collections.Generic;
using Xunit;

namespace JsonProject.UT
{
    public class JsonHelperTest
    {
        [Theory]
        [InlineData("hello", false)]
        [InlineData("1.23232323", true)]
        [InlineData("1.2.3", false)]
        [InlineData(".333", false)]
        [InlineData("0.1", false)]
        [InlineData("1.0", true)]
        public void is_valid_number_test(string input, bool expected)
        {
            // execute
            var ans = JsonToken.IsValidNum(input);

            // verify
            Assert.Equal(expected, ans);
        }

        [Theory]
        [InlineData("\"ab\"", true)]
        [InlineData("\"asdasdasd adas da sda da\\\" asdasdsadasd", false)]
        [InlineData("\"asdasdasd adas da sda da\\\" asdasdsadasd\"", true)]
        [InlineData("", false)]
        [InlineData("\"\"", true)]
        public void is_valid_string_test(string input, bool expected)
        {
            // execute
            var ans = JsonToken.IsValidString(input);

            // verify
            Assert.Equal(expected, ans);
        }

        [Fact]
        public void try_tokenize_with_valid_input()
        {
            // setup
            var input = "{   \"hello\"   :  [   1.2 , \"world  \"  ]  }";
            var expectedAns = true;
            var expected = new List<JsonToken>
            {
                new JsonToken(JsonTokenType.OpenBrace, "{"),
                new JsonToken(JsonTokenType.String, "\"hello\""),
                new JsonToken(JsonTokenType.Colon, ":"),
                new JsonToken(JsonTokenType.OpenBracket, "["),
                new JsonToken(JsonTokenType.Number, "1.2"),
                new JsonToken(JsonTokenType.Comma, ","),
                new JsonToken(JsonTokenType.String, "\"world  \""),
                new JsonToken(JsonTokenType.CloseBracket, "]"),
                new JsonToken(JsonTokenType.CloseBrace, "}")
            };

            // execute
            var output = JsonHelper.TryTokenize(input, out var jsonTokens, out var error);

            // verify
            Assert.Equal(expectedAns, output);
            Assert.Equal(expected.Count, jsonTokens.Count);
            for (int i = 0; i < expected.Count; i++)
            {
                Assert.True(expected[i].Equals(jsonTokens[i]));
            }
        }

        [Fact]
        public void try_tokenize_with_invalid_input()
        {
            // setup
            var input = "{   \"hello\"   :  [   1.2.3 , \"world  \"  ]  }";
            var expectedAns = false;
            var expected = new List<JsonToken>
            {
                new JsonToken(JsonTokenType.OpenBrace, "{"),
                new JsonToken(JsonTokenType.String, "\"hello\""),
                new JsonToken(JsonTokenType.Colon, ":"),
                new JsonToken(JsonTokenType.OpenBracket, "[")
            };

            // execute
            var output = JsonHelper.TryTokenize(input, out var jsonTokens, out var error);

            // verify
            Assert.Equal(expectedAns, output);
            Assert.Equal(expected.Count, jsonTokens.Count);
            for (int i = 0; i < expected.Count; i++)
            {
                Assert.True(expected[i].Equals(jsonTokens[i]));
            }
        }

        [Fact]
        public void try_tokenize_with_valid_input_complex_string()
        {
            // setup
            var input = "{   \"hello\\\"bye\"   :  [   1.2 , \"world[]{} \"  ]  }";
            var expectedAns = true;
            var expected = new List<JsonToken>
            {
                new JsonToken(JsonTokenType.OpenBrace, "{"),
                new JsonToken(JsonTokenType.String, "\"hello\\\"bye\""),
                new JsonToken(JsonTokenType.Colon, ":"),
                new JsonToken(JsonTokenType.OpenBracket, "["),
                new JsonToken(JsonTokenType.Number, "1.2"),
                new JsonToken(JsonTokenType.Comma, ","),
                new JsonToken(JsonTokenType.String, "\"world[]{} \""),
                new JsonToken(JsonTokenType.CloseBracket, "]"),
                new JsonToken(JsonTokenType.CloseBrace, "}")
            };

            // execute
            var output = JsonHelper.TryTokenize(input, out var jsonTokens, out var error);

            // verify
            Assert.Equal(expectedAns, output);
            Assert.Equal(expected.Count, jsonTokens.Count);
            for (int i = 0; i < expected.Count; i++)
            {
                Assert.True(expected[i].Equals(jsonTokens[i]));
            }
        }

        [Fact]
        public void try_tokenize_with_invalid_input_complex_string_with_offensive_characters()
        {
            // setup
            var input = "{ \"\n\t\": 1.2  }";
            var expectedAns = false;
            var expected = new List<JsonToken>
            {
                new JsonToken(JsonTokenType.OpenBrace, "{")
            };

            // execute
            var output = JsonHelper.TryTokenize(input, out var jsonTokens, out var error);

            // verify
            Assert.Equal(expectedAns, output);
            Assert.Equal(expected.Count, jsonTokens.Count);
            for (int i = 0; i < expected.Count; i++)
            {
                Assert.True(expected[i].Equals(jsonTokens[i]));
            }
        }

        [Fact]
        public void try_tokenize_with_trivial_invalid_input()
        {
            // setup
            var input = "asdasdasd";
            var expectedAns = false;
            var expected = new List<JsonToken>();

            // execute
            var output = JsonHelper.TryTokenize(input, out var jsonTokens, out var error);

            // verify
            Assert.Equal(expectedAns, output);
            Assert.Equal(expected.Count, jsonTokens.Count);
            for (int i = 0; i < expected.Count; i++)
            {
                Assert.True(expected[i].Equals(jsonTokens[i]));
            }
        }

        [Fact]
        public void try_tokenize_with_trivial_invalid_input_and_braces()
        {
            // setup
            var input = "asdasdasd { }";
            var expectedAns = false;
            var expected = new List<JsonToken>();

            // execute
            var output = JsonHelper.TryTokenize(input, out var jsonTokens, out var error);

            // verify
            Assert.Equal(expectedAns, output);
            Assert.Equal(expected.Count, jsonTokens.Count);
            for (int i = 0; i < expected.Count; i++)
            {
                Assert.True(expected[i].Equals(jsonTokens[i]));
            }
        }

        [Fact]
        public void try_tokenize_with_trivial_valid_input()
        {
            // setup
            var input = "1.23456 { }";
            var expectedAns = true;
            var expected = new List<JsonToken>
            {
                new JsonToken(JsonTokenType.Number, "1.23456"),
                new JsonToken(JsonTokenType.OpenBrace),
                new JsonToken(JsonTokenType.CloseBrace)
            };

            // execute
            var output = JsonHelper.TryTokenize(input, out var jsonTokens, out var error);

            // verify
            Assert.Equal(expectedAns, output);
            Assert.Equal(expected.Count, jsonTokens.Count);
            for (int i = 0; i < expected.Count; i++)
            {
                Assert.True(expected[i].Equals(jsonTokens[i]));
            }
        }
    }
}
