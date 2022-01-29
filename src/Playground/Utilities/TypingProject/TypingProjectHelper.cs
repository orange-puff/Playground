using System.Collections.Generic;
using System.IO;
using System.Reflection;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace Playground.Utilities.TypingProject
{
    public static class TypingProjectHelper
    {
        public static Dictionary<int, int> AddEntry(Dictionary<int, int> data, int wordsPerMinute, out int key)
        {
            if (wordsPerMinute <= data.Keys.Min())
            {
                key = data.Keys.Min();
            }
            else if (wordsPerMinute >= data.Keys.Max())
            {
                key = data.Keys.Max();
            }
            else
            {
                key = wordsPerMinute;
            }

            data[key]++;
            return data;
        }
    }
}
