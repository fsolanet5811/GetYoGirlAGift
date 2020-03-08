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
using GetYoGirlAGift.Models;

namespace GetYoGirlAGift.Controllers
{
    [Authorize]
    public class GirlsController : ApiController
    {
        private GetYoGirlAGiftContext db = new GetYoGirlAGiftContext();

        // GET: api/Girls
        public IQueryable<Girl> GetGirls()
        {
            return db.Girls;
        }

        // GET: api/Girls/5
        [ResponseType(typeof(Girl))]
        public IHttpActionResult GetGirls(int id)
        {
            Girl girls = db.Girls.Find(id);
            if (girls == null)
            {
                return NotFound();
            }

            return Ok(girls);
        }

        // PUT: api/Girls/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutGirl(int id, Girl girl)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != girl.Id)
            {
                return BadRequest();
            }

            // We need to set the girl id of all the images that this girl has.
            girl.PutIdInProperties();
            db.Entry(girl).State = EntityState.Modified;

            // This will let EF know that a change to the girl's properties has been made.
            AlertEntityFrameworkOfPropertyChanges(girl);

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
        [ResponseType(typeof(Girl))]
        public IHttpActionResult PostGirl(Girl girl)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Girls.Add(girl);
            db.SaveChanges();

            // We need to set the girl id of all the images, interests, and important dates that this girl has.
            girl.PutIdInProperties();

            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = girl.Id }, girl);
        }

        // DELETE: api/Girls/5
        [ResponseType(typeof(Girl))]
        public IHttpActionResult DeleteGirls(int id)
        {
            Girl girls = db.Girls.Find(id);
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

        private void AlertEntityFrameworkOfPropertyChanges(Girl girl)
        {
            foreach (GirlImage image in girl.Images)
                db.Entry(image).State = image.IsNew ? EntityState.Added : EntityState.Modified;

            foreach (Interest interest in girl.Interests)
                db.Entry(interest).State = interest.IsNew ? EntityState.Added : EntityState.Modified;

            foreach (ImportantDate date in girl.ImportantDates)
                db.Entry(date).State = date.IsNew ? EntityState.Added : EntityState.Modified;
        }

        private bool GirlsExists(int id)
        {
            return db.Girls.Count(e => e.Id == id) > 0;
        }
    }
}