using System;
using System.Collections.Generic;

namespace JsonProject
{
    public static class JsonHelper
    {
        public static bool TryFormat(out string? json, out string? error)
        {
            var toRet = new List<char>();

            json = new string(toRet.ToArray());
            error = null;
            return true;
        }
    }
}
