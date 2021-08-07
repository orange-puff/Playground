﻿using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace Playground.Utilities.TypingProject
{
    public static class TypingProjectHelper
    {
        private static readonly string _fileName = "./data.json";

        public static async Task<Dictionary<int, int>> ReadData()
        {
            var contents = await File.ReadAllTextAsync(_fileName);
            return JsonConvert.DeserializeObject<Dictionary<int, int>>(contents);
        }

        public static async Task<Dictionary<int, int>> AddEntry(int wordsPerMinute)
        {
            var data = await ReadData();
            if (wordsPerMinute <= data.Keys.Min())
            {
                data[data.Keys.Min()]++;
            }
            else if (wordsPerMinute >= data.Keys.Max())
            {
                data[data.Keys.Max()]++;
            }
            else
            {
                data[wordsPerMinute]++;
            }

            await File.WriteAllTextAsync(_fileName, JsonConvert.SerializeObject(data));
            return data;
        }
    }
}
