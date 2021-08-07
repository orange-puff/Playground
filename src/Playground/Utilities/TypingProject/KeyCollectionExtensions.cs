using System;
using System.Collections.Generic;

namespace Playground.Utilities.TypingProject
{
    public static class KeyCollectionExtensions
    {
        public static int Min(this Dictionary<int, int>.KeyCollection keys)
        {
            var toRet = Int32.MaxValue;
            foreach (var key in keys)
            {
                toRet = Math.Min(toRet, key);
            }
            return toRet;
        }

        public static int Max(this Dictionary<int, int>.KeyCollection keys)
        {
            var toRet = Int32.MinValue;
            foreach (var key in keys)
            {
                toRet = Math.Max(toRet, key);
            }
            return toRet;
        }
    }
}
