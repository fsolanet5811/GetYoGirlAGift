using System;
using System.Collections.Generic;

namespace GetYoGirlAGift.Models
{
    public partial class Girls
    {
        public Girls()
        {
            Images = new HashSet<Images>();
            ImportantDates = new HashSet<ImportantDates>();
            Interests = new HashSet<Interests>();
        }

        public int Id { get; set; }
        public int UserId { get; set; }
        public int? Relationship { get; set; }
        public string Name { get; set; }

        public virtual ICollection<Images> Images { get; set; }
        public virtual ICollection<ImportantDates> ImportantDates { get; set; }
        public virtual ICollection<Interests> Interests { get; set; }
        public virtual Users User { get; set; }
    }
}
