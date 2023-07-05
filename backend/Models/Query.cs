using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class Query
    {
        [Key]
        public int QueryID { get; set; }
        public User? User { get; set; }
        public string? Subject { get; set; }
        public string? Content { get; set; }
        public string? Status { get; set; }
        public DateTime? QueryDate { get; set; }
    }
}
