using System;
using System.Collections.Generic;

namespace JsonProject
{
    public static class JsonHelper
    {
        public static bool TryFormat(out string json, out string error)
        {
            json = "{\n\"hello\": [1, 2, 3]\n}";
            error = "thing was bad";
            return true;
            /*
            var toRet = new List<char>();

            json = new string(toRet.ToArray());
            return true;*/
        }
    }
}
