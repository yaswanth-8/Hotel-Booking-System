using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LikesController : ControllerBase
    {
        private readonly backendContext _context;

        public LikesController(backendContext context)
        {
            _context = context;
        }

        // GET: api/Likes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Like>>> GetLike()
        {
          if (_context.Like == null)
          {
              return NotFound();
          }
            return await _context.Like.Include(x => x.User).Include(x => x.Review).ToListAsync();
        }

        [HttpGet]
        [Route("/api/getlikes")]
        public async Task<ActionResult<IEnumerable<Booking>>> GetBookingProfile(int userId)
        {
            Console.WriteLine("Inside profile function " + userId);
            // Assuming "id" corresponds to the User ID field
            var userLikes = await _context.Like.Include(x => x.User).Include(x => x.Review).Where(b => b.User.UserID == userId).ToListAsync();

            if (userLikes == null)
            {
                return NotFound();
            }

            return Ok(userLikes);
        }

        // GET: api/Likes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Like>> GetLike(int id)
        {
          if (_context.Like == null)
          {
              return NotFound();
          }
            var like = await _context.Like.FindAsync(id);

            if (like == null)
            {
                return NotFound();
            }

            return like;
        }

        // PUT: api/Likes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutLike(int id, Like like)
        {
            if (id != like.LikeID)
            {
                return BadRequest();
            }

            _context.Entry(like).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LikeExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Likes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Like>> PostLike(Like like)
        {
            var user = await _context.User.FindAsync(like.User.UserID);
            var review = await _context.Review.FindAsync(like.Review.ReviewID);
            like.User = user;
            like.Review = review;

            if (_context.Like == null || review == null)
            {
                return Problem("Entity set 'backendContext.Like' or 'Review' is null.");
            }

            // Increment likes for the corresponding review
            review.Likes++;
            _context.Like.Add(like);
            await _context.SaveChangesAsync();

            // Update the likes count in the Review table
            _context.Entry(review).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetLike", new { id = like.LikeID }, like);
        }


        // DELETE: api/Likes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLike(int id)
        {
            var like = await _context.Like.Include(l => l.Review).FirstOrDefaultAsync(l => l.LikeID == id);

            if (like == null)
            {
                return NotFound();
            }

            _context.Like.Remove(like);

            // Decrement likes for the corresponding review
            like.Review.Likes--;
            _context.Entry(like.Review).State = EntityState.Modified;

            await _context.SaveChangesAsync();

            return NoContent();
        }


        private bool LikeExists(int id)
        {
            return (_context.Like?.Any(e => e.LikeID == id)).GetValueOrDefault();
        }
    }
}
