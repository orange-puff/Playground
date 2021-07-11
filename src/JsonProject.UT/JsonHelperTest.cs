using System;
using Xunit;

namespace JsonProject.UT
{
    public class JsonHelperTest
    {
        [Theory]
        [InlineData("hello")]
        [InlineData("1.23232323")]
        [InlineData("1.2.3")]
        [InlineData(".333")]
        [InlineData("0.1")]
        public void is_valid_number_test(string input)
        {
            // execute
            var ans = JsonHelper.IsValidNum(input);

            // verify
            Assert.True(ans);
        }
    }
}
