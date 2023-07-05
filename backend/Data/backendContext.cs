using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Data
{
    public class backendContext : DbContext
    {
        public backendContext (DbContextOptions<backendContext> options)
            : base(options)
        {
        }

        public DbSet<backend.Models.Hotel> Hotel { get; set; } = default!;

        public DbSet<backend.Models.User>? User { get; set; }

        public DbSet<backend.Models.Booking>? Booking { get; set; }

        public DbSet<backend.Models.Review>? Review { get; set; }
    }
}
