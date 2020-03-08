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
    [Authorize]
    public class GirlsController : ApiController
    {
        private GetYoGirlAGiftContext db = new GetYoGirlAGiftContext();

        // GET: api/Girls
        public IQueryable<Girls> GetGirls()
        {
            return db.Girls;
        }

        // GET: api/Girls/5
        [ResponseType(typeof(Girls))]
        public IHttpActionResult GetGirls(int id)
        {
            Girls girls = db.Girls.Find(id);
            if (girls == null)
            {
                return NotFound();
            }

            return Ok(girls);
        }

        // PUT: api/Girls/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutGirls(int id, Girls girls)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != girls.Id)
            {
                return BadRequest();
            }

            db.Entry(girls).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GirlsExists(id))
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

        // POST: api/Girls
        [ResponseType(typeof(Girls))]
        public IHttpActionResult PostGirls(Girls girls)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Girls.Add(girls);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = girls.Id }, girls);
        }

        // DELETE: api/Girls/5
        [ResponseType(typeof(Girls))]
        public IHttpActionResult DeleteGirls(int id)
        {
            Girls girls = db.Girls.Find(id);
            if (girls == null)
            {
                return NotFound();
            }

            db.Girls.Remove(girls);
            db.SaveChanges();

            return Ok(girls);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool GirlsExists(int id)
        {
            return db.Girls.Count(e => e.Id == id) > 0;
        }
    }
}