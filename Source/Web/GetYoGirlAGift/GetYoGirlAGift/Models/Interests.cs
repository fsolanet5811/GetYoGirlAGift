using System;
using System.Collections.Generic;

namespace GetYoGirlAGift.Models
{
    public partial class Interests
    {
        public int Id { get; set; }
        public int GirlId { get; set; }
        public string Value { get; set; }

        public virtual Girls Girl { get; set; }
    }
}
