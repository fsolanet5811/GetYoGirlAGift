using System;
using System.Collections.Generic;

namespace GetYoGirlAGift.Models
{
    public partial class ImportantDates
    {
        public int Id { get; set; }
        public int? GirlId { get; set; }
        public DateTime? Date { get; set; }
        public string Occasion { get; set; }

        public virtual Girls Girl { get; set; }
    }
}
