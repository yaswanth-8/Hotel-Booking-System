using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class Booking
    {
        [Key]
        public int BookingID { get; set; }

        public User? User { get; set; }
        public Hotel? Hotel { get; set; }

        public DateTime? CheckInDate { get; set; }
        public DateTime? CheckOutDate { get; set; }

        public int? AdultCount { get; set; }
        public int? ChildrenCount { get; set; }
        public int? Price { get; set; }
    }
}
