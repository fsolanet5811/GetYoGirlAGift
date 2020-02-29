using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json;
using System.IO;

namespace GetYoGirlAGift.Models
{
    public class RainforestKeyManager
    {
        private static readonly string KEYS_FILE_NAME = "RainforestKeys.json";

        private class RainforestKey
        {
            [JsonProperty("key")]
            public string Key { get; set; }

            [JsonProperty("credits")]
            public int Credits { get; set; }
        }

        private List<RainforestKey> _keys;

        public RainforestKeyManager()
        {
            _keys = LoadKeys();
        }
        
        /// <summary>
        /// Gets the key with the most credits remaining.
        /// </summary>
        /// <returns>
        /// The key.
        /// </returns>
        public string GetKey()
        {
            return _keys.OrderByDescending(k => k.Credits).First().Key;
        }

        /// <summary>
        /// Removes a credit from the given key.
        /// </summary>
        /// <param name="key">
        /// The key that will be consumed.
        /// </param>
        /// <returns>
        /// True if the key has no more credits, false otherwise.
        /// </returns>
        public bool ConsumeKey(string key)
        {
            RainforestKey rKey = _keys.FirstOrDefault(k => k.Key == key);
            if (rKey is null)
                throw new Exception($"Could not find rainforest key {key}.");

            // Consume a credit.
            rKey.Credits--;

            // If this key has no more credits, we can just remove it.
            bool emptyKey = rKey.Credits == 0;
            if (emptyKey)
                _keys.Remove(rKey);

            // Save the consumption/potential removal of the key.
            SaveKeys();

            return emptyKey;
        }

        private void SaveKeys()
        {
            using (StreamWriter sw = new StreamWriter(Path.Combine(Directory.GetCurrentDirectory(), KEYS_FILE_NAME)))
            using (JsonWriter jw = new JsonTextWriter(sw))
            {
                JsonSerializer serializer = new JsonSerializer();
                serializer.Serialize(jw, _keys);
            }
        }

        private static List<RainforestKey> LoadKeys()
        {
            using (StreamReader reader = File.OpenText(Path.Combine(Directory.GetCurrentDirectory(), KEYS_FILE_NAME)))
            {
                JsonSerializer serializer = new JsonSerializer();
                return (List<RainforestKey>)serializer.Deserialize(reader, typeof(List<RainforestKey>));
            }
        }
    }
}