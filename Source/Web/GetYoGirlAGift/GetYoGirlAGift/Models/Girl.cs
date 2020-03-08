using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;

namespace GetYoGirlAGift.Models
{
    public partial class Girl
    {
        public Girl()
        {
            Images = new List<GirlImage>();
            ImportantDates = new List<ImportantDate>();
            Interests = new List<Interest>();
        }

        public int Id { get; set; }

        public int UserId { get; set; }

        public Relationship Relationship { get; set; }

        public string Name { get; set; }

        public bool HasInterests
        {
            get
            {
                return Interests.Count > 0;
            }
        }

        public virtual List<GirlImage> Images { get; set; }

        public virtual List<ImportantDate> ImportantDates { get; set; }

        public virtual List<Interest> Interests { get; set; }

        public List<string> GetGiftSearchQueries(string occassion)
        {
            // We will perform a search with the interest and one with the interest + occassion.
            // If no interests were submitted, we will use just the occasion and the relationship.
            // We will always tack on gift at the end to rule out items that are not gifts.
            List<string> queries = new List<string>();

            if(!HasInterests)
            {
                queries.Add($"{Enum.GetName(typeof(Relationship), Relationship)} {occassion}");
            }
            else
            {
                string interest = GetRandomInterest().Value;
                queries.Add($"{interest} {occassion}");
                queries.Add(interest);
            }

            return queries;
        }

        public Bitmap GetRandomImage()
        {
            Random r = new Random();
            int index = r.Next(Images.Count);
            return new Bitmap(new MemoryStream(Images[index].Image));
        }

        public void PutIdInProperties()
        {
            foreach (GirlImage image in Images)
                image.GirlId = Id;

            foreach (ImportantDate date in ImportantDates)
                date.GirlId = Id;

            foreach (Interest interest in Interests)
                interest.GirlId = Id;
        }

        private Interest GetRandomInterest()
        {
            Random r = new Random();
            int index = r.Next(Interests.Count);
            return Interests[index];
        }
    }
}
