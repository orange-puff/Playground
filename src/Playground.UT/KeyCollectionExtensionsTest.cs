using Xunit;
using Playground.Utilities.TypingProject;
using System.Collections.Generic;

namespace Playground.UT
{
    public class KeyCollectionExtensions
    {
        [Fact]
        public void Min_Test()
        {
            // setup
            var d = new Dictionary<int, int>
            {
                {1, 2},
                {-1, 3},
                {4, 5}
            };
            var expected = -1;

            // execute
            var min = d.Keys.Min();

            // verify
            Assert.Equal(expected, min);
        }

        [Fact]
        public void Max_Test()
        {
            // setup
            var d = new Dictionary<int, int>
            {
                {1, 2},
                {-1, 3},
                {4, 5}
            };
            var expected = 4;

            // execute
            var min = d.Keys.Max();

            // verify
            Assert.Equal(expected, min);
        }
    }
}
