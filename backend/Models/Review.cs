using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class Review
    {
        [Key]
        public int ReviewID { get; set; }
        public User? User { get; set; }
        public Hotel? Hotel { get; set; }
        public string? Content { get; set; }
        public DateTime? ReviewDate { get; set; }
        public int? Likes { get; set; }
    }
}
