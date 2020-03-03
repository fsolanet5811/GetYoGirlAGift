using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using GetYoGirlAGift.Data;
using GetYoGirlAGift.Models;

namespace GetYoGirlAGift.Controllers
{
    public class InterestsController : ApiController
    {
        private GetYoGirlAGiftContext db = new GetYoGirlAGiftContext();

        // GET: api/Interests
        public IQueryable<Interests> GetInterests()
        {
            return db.Interests;
        }

        // GET: api/Interests/5
        [ResponseType(typeof(Interests))]
        public IHttpActionResult GetInterests(int id)
        {
            Interests interests = db.Interests.Find(id);
            if (interests == null)
            {
                return NotFound();
            }

            return Ok(interests);
        }

        // PUT: api/Interests/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutInterests(int id, Interests interests)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != interests.Id)
            {
                return BadRequest();
            }

            db.Entry(interests).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!InterestsExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Interests
        [ResponseType(typeof(Interests))]
        public IHttpActionResult PostInterests(Interests interests)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Interests.Add(interests);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = interests.Id }, interests);
        }

        // DELETE: api/Interests/5
        [ResponseType(typeof(Interests))]
        public IHttpActionResult DeleteInterests(int id)
        {
            Interests interests = db.Interests.Find(id);
            if (interests == null)
            {
                return NotFound();
            }

            db.Interests.Remove(interests);
            db.SaveChanges();

            return Ok(interests);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool InterestsExists(int id)
        {
            return db.Interests.Count(e => e.Id == id) > 0;
        }
    }
}