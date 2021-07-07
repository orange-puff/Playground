using System;
using System.Collections.Generic;

namespace JsonProject
{
    public static class JsonHelper
    {
        public static bool TryFormat(out string json)
        {
            var toRet = new List<char>();


            json = new string(toRet.ToArray());
            return true;
        }
    }
}
