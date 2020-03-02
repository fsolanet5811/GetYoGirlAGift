using System;
using System.Collections.Generic;

namespace GetYoGirlAGift.Models
{
    public partial class Images
    {
        public int Id { get; set; }
        public int GirlId { get; set; }
        public byte[] Image { get; set; }

        public virtual Girls Girl { get; set; }
    }
}
