using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GetYoGirlAGift.Models
{
    public class Rating
    {
        private double _likability;
        private double _returnChance;
        private double _friendsJealousy;

        /// <summary>
        /// On a scale from 0 to 10, how much she will like the gift.
        /// </summary>
        public double Likability
        {
            get
            {
                // We round the likability to the nearest tenth.
                return Math.Round(_likability, 1);
            }
            set
            {
                _likability = value;
            }
        }

        /// <summary>
        /// The probability that she will return the gift.
        /// </summary>
        public double ReturnChance
        {
            get
            {
                // We round the percentage to a whole number.
                return Math.Round(_returnChance, 2);
            }
            set
            {
                _returnChance = value;
            }
        }

        /// <summary>
        /// On a scale from 0 to 10, how jealous will her friends be.
        /// </summary>
        public double FriendsJealousy
        {
            get
            {
                return Math.Round(_friendsJealousy, 1);
            }
            set
            {
                _friendsJealousy = value;
            }
        }

        public double Overall
        {
            get
            {
                // We will use the exact values for our rating for a slightly more accurate overall.
                return Math.Round(CalculateOverall(_likability, _returnChance, _friendsJealousy));
            }
        }

        private static double CalculateOverall(double likability, double returnChance, double friendsJealousy)
        {
            return (likability + 10 * (1 - returnChance) + friendsJealousy) / 3;
        }
    }
}