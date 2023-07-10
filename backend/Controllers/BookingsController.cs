using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;
using backend.Classes;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingsController : ControllerBase
    {
        private readonly backendContext _context;

        public BookingsController(backendContext context)
        {
            _context = context;
        }

        // GET: api/Bookings
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Booking>>> GetBooking()
        {
          if (_context.Booking == null)
          {
              return NotFound();
          }
            return await _context.Booking.Include(x=>x.User).Include(x=>x.Hotel).ToListAsync();
        }

        [HttpGet]
        [Route("/api/profile")]
        public async Task<ActionResult<IEnumerable<Booking>>> GetBookingProfile(int id)
        {
            Console.WriteLine("Inside profile function " + id);
            // Assuming "id" corresponds to the User ID field
            var userBookings = await _context.Booking.Include(x => x.User).Include(x => x.Hotel).Where(b => b.User.UserID == id).ToListAsync();

            if (userBookings == null)
            {
                return NotFound();
            }

            return Ok(userBookings);
        }



        // GET: api/Bookings/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Booking>> GetBooking(int id)
        {
          if (_context.Booking == null)
          {
              return NotFound();
          }
            var booking = await _context.Booking.FindAsync(id);

            if (booking == null)
            {
                return NotFound();
            }

            return booking;
        }

        // PUT: api/Bookings/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBooking(int id, Booking booking)
        {
            if (id != booking.BookingID)
            {
                return BadRequest();
            }

            _context.Entry(booking).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BookingExists(id))
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

        // POST: api/Bookings
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Booking>> PostBooking(Booking booking)
        {
            var user = await _context.User.FindAsync(booking.User.UserID);
            var hotel = await _context.Hotel.FindAsync(booking.Hotel.HotelID);
            booking.User = user;
            booking.Hotel= hotel;
            Console.WriteLine(booking.CheckInDate + " checkin");
            Console.WriteLine(booking.CheckOutDate + " checkout");
            string mailSubject = "Thank You ✨ for Booking with Presidio Bookings!(Capstone Project)";

            string mailContent = "Booking Confirmed: " + booking.Hotel.Name + ". Dear " + booking.User.Name + ", Thank you for choosing Presidio Bookings. Your booking at " + booking.Hotel.Name + " has been confirmed. Check-in 📆: " + ((DateTime)booking.CheckInDate).ToString("dd/MM/yyyy") + ". Check-out 📆: " + ((DateTime)booking.CheckOutDate).ToString("dd/MM/yyyy") + ". We look forward to providing you with a remarkable stay at " + booking.Hotel.Name + ". If you have any questions or special requests, please don't hesitate to contact us. Warm regards, The Presidio Bookings Team.";



            if (_context.Booking == null)
          {
              return Problem("Entity set 'backendContext.Booking'  is null.");
          }
            _context.Booking.Add(booking);
            await _context.SaveChangesAsync();
            MailService.sendConfirmationEmail(mailSubject, mailContent, booking.User.Email);

            return CreatedAtAction("GetBooking", new { id = booking.BookingID }, booking);
        }


        [HttpPost]
        [Route("/api/checkdate")]
        public async Task<string> CheckDate(Booking booking)
        {
            var hotel = await _context.Hotel.FindAsync(booking.Hotel.HotelID);
            booking.Hotel = hotel;
            Console.Write(booking.CheckInDate + " is check-in date");
            Console.Write(booking.CheckOutDate + " is check-out date");

            bool isSlotFilled = await IsBookingSlotFilled(booking);
            if (isSlotFilled)
            {
                return "filled";
            }

            return "available";
        }

        private async Task<bool> IsBookingSlotFilled(Booking booking)
        {
            var bookings = await _context.Booking
                .Where(b => b.Hotel.HotelID == booking.Hotel.HotelID &&
                            b.CheckOutDate >= booking.CheckInDate &&
                            b.CheckInDate <= booking.CheckOutDate)
                .ToListAsync();

            return bookings.Any();
        }

        // DELETE: api/Bookings/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBooking(int id)
        {
            if (_context.Booking == null)
            {
                return NotFound();
            }
            var booking = await _context.Booking.FindAsync(id);
            if (booking == null)
            {
                return NotFound();
            }

            _context.Booking.Remove(booking);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BookingExists(int id)
        {
            return (_context.Booking?.Any(e => e.BookingID == id)).GetValueOrDefault();
        }
    }
}
