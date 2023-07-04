using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class Hotel
    {
        [Key]
        public int HotelID { get; set; }
        public string? Name { get; set; }
        public string? Address { get; set; }
        public string? Location { get; set; }
        public string? Country { get; set; }
        public string? FoodStyle { get; set; }
        public int? Rating { get; set; }
        public string? Url1 { get; set; }
        public string? Url2 { get; set; }
        public string? Url3 { get; set; }
        public string? Url4 { get; set; }
        public string? Url5 { get; set; }
        public string? Description { get; set; }
        public string? About { get; set; }
        public int? PricePerNight { get; set; }
        public int? Offer { get; set; }
        public string? Site { get; set; }
    }
}
