using System;
using System.Collections.Generic;

namespace GetYoGirlAGift.Models
{
    public partial class Interest
    {
        public int Id { get; set; }

        public int GirlId { get; set; }

        public string Value { get; set; }
    }
}
