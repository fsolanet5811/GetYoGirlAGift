using System;
using System.Collections.Generic;

namespace GetYoGirlAGift.Models
{
    public partial class GirlImage
    {
        public int Id { get; set; }

        public int GirlId { get; set; }

        public byte[] Image { get; set; }

        public bool IsNew
        {
            get
            {
                return Id == 0;
            }
        }
    }
}
