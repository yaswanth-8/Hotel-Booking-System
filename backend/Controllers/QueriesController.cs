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
    public class QueriesController : ControllerBase
    {
        private readonly backendContext _context;

        public QueriesController(backendContext context)
        {
            _context = context;
        }

        // GET: api/Queries
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Query>>> GetQuery()
        {
          if (_context.Query == null)
          {
              return NotFound();
          }
            return await _context.Query.Include(x => x.User).ToListAsync();
        }

        [HttpGet]
        [Route("/api/pending")]
        public async Task<int> GetPendingCount()
        {
            Console.WriteLine("In pending....");
            int count = await _context.Query.CountAsync(x => x.Status == "pending");
            return count;
        }

        // GET: api/Queries/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Query>> GetQuery(int id)
        {
          if (_context.Query == null)
          {
              return NotFound();
          }
            var query = await _context.Query.FindAsync(id);

            if (query == null)
            {
                return NotFound();
            }

            return query;
        }

        // PUT: api/Queries/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutQuery(int id, Query query)
        {
            if (id != query.QueryID)
            {
                return BadRequest();
            }

            _context.Entry(query).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!QueryExists(id))
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

        // POST: api/Queries
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Query>> PostQuery(Query query)
        {
            var user = await _context.User.FindAsync(query.User.UserID);
            query.User = user;
            query.QueryDate = DateTime.Now;
            if (_context.Query == null)
          {
              return Problem("Entity set 'backendContext.Query'  is null.");
          }
            _context.Query.Add(query);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetQuery", new { id = query.QueryID }, query);
        }

        // DELETE: api/Queries/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteQuery(int id)
        {
            if (_context.Query == null)
            {
                return NotFound();
            }
            var query = await _context.Query.FindAsync(id);
            if (query == null)
            {
                return NotFound();
            }

            _context.Query.Remove(query);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool QueryExists(int id)
        {
            return (_context.Query?.Any(e => e.QueryID == id)).GetValueOrDefault();
        }
    }
}
