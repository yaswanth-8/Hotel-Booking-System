using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class Like
    {
        [Key]
        public int LikeID { get; set; }
        public Review? Review { get; set; }
        public User? User { get; set; }
    }
}
