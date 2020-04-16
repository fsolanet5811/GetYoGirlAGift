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
        public IHttpActionResult GetGirls()
        {
            List<Girl> girls = (from girl in db.Girls
                                select girl).ToList();

            return Ok(girls);
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
            
            // This will let EF know that a change to the girl's properties has been made.
            AlertEntityFrameworkOfPropertyChanges(girl);
            db.Entry(girl).State = EntityState.Modified;


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

        //Added function to get all girls for a specific user
        [HttpGet]
        [Route("api/Girls/forUser/{userId}")]
        public IHttpActionResult getGirlByUser(int userId) {
            
            List<Girl> girls = (from girl in db.Girls
                                where girl.UserId == userId
                                select girl).ToList();

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

            // Remove the images that no longer exist.
            List<int> imageIds = girl.Images.Select(im => im.Id).ToList();

            IEnumerable<GirlImage> images = from img in db.Images
                                            where img.GirlId == girl.Id
                                            select img;

            foreach (GirlImage image in images)
                if(!imageIds.Contains(image.Id))
                    db.Entry(image).State = EntityState.Deleted;

            // Remove the dates that no longer exist.
            List<int> dateIds = girl.ImportantDates.Select(d => d.Id).ToList();

            IEnumerable<ImportantDate> dates = from date in db.ImportantDates
                                               where date.GirlId == girl.Id
                                               select date;
          
            foreach(ImportantDate date in dates)
                if(!dateIds.Contains(date.Id))
                    db.Entry(date).State = EntityState.Deleted;

            // Remove the interests that no longer exist.
            List<int> interestIds = girl.Interests.Select(i => i.Id).ToList();

            IEnumerable<Interest> interests = from interest in db.Interests
                                              where interest.GirlId == girl.Id
                                              select interest;

            foreach(Interest interest in interests)
                if(!interestIds.Contains(interest.Id))
                    db.Entry(interest).State = EntityState.Deleted;
        }

        private bool GirlsExists(int id)
        {
            return db.Girls.Count(e => e.Id == id) > 0;
        }
    }
}
