﻿using System;
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
    public class ReviewsController : ControllerBase
    {
        private readonly backendContext _context;

        public ReviewsController(backendContext context)
        {
            _context = context;
        }

        // GET: api/Reviews
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Review>>> GetReview()
        {
          if (_context.Review == null)
          {
              return NotFound();
          }
           return await _context.Review.Include(x => x.User).Include(x => x.Hotel).ToListAsync();
        }

        // GET: api/Reviews/5
        [HttpGet("{id}")]
        public async Task<ActionResult<List<Review>>> GetReviewsForHotel(int id)
        {
            var reviews = await _context.Review
                .Include(x => x.User)
                .Include(x => x.Hotel)
                .Where(x => x.Hotel.HotelID == id)
                .ToListAsync();

            if (reviews == null)
            {
                return NotFound();
            }

            return reviews;
        }



        // PUT: api/Reviews/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutReview(int id, Review review)
        {
            if (id != review.ReviewID)
            {
                return BadRequest();
            }

            _context.Entry(review).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ReviewExists(id))
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

        // POST: api/Reviews
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Review>> PostReview(Review review)
        {
            var user = await _context.User.FindAsync(review.User.UserID);
            var hotel = await _context.Hotel.FindAsync(review.Hotel.HotelID);
            review.User = user;
            review.Hotel = hotel;
            review.ReviewDate = DateTime.Now;

            if (_context.Review == null)
          {
              return Problem("Entity set 'backendContext.Review'  is null.");
          }
            _context.Review.Add(review);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetReview", new { id = review.ReviewID }, review);
        }

        // DELETE: api/Reviews/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReview(int id)
        {
            if (_context.Review == null)
            {
                return NotFound();
            }
            var review = await _context.Review.FindAsync(id);
            if (review == null)
            {
                return NotFound();
            }

            _context.Review.Remove(review);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ReviewExists(int id)
        {
            return (_context.Review?.Any(e => e.ReviewID == id)).GetValueOrDefault();
        }
    }
}
