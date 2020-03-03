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
    public class ImportantDatesController : ApiController
    {
        private GetYoGirlAGiftContext db = new GetYoGirlAGiftContext();

        // GET: api/ImportantDates
        public IQueryable<ImportantDates> GetImportantDates()
        {
            return db.ImportantDates;
        }

        // GET: api/ImportantDates/5
        [ResponseType(typeof(ImportantDates))]
        public IHttpActionResult GetImportantDates(int id)
        {
            ImportantDates importantDates = db.ImportantDates.Find(id);
            if (importantDates == null)
            {
                return NotFound();
            }

            return Ok(importantDates);
        }

        // PUT: api/ImportantDates/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutImportantDates(int id, ImportantDates importantDates)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != importantDates.Id)
            {
                return BadRequest();
            }

            db.Entry(importantDates).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ImportantDatesExists(id))
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

        // POST: api/ImportantDates
        [ResponseType(typeof(ImportantDates))]
        public IHttpActionResult PostImportantDates(ImportantDates importantDates)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.ImportantDates.Add(importantDates);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = importantDates.Id }, importantDates);
        }

        // DELETE: api/ImportantDates/5
        [ResponseType(typeof(ImportantDates))]
        public IHttpActionResult DeleteImportantDates(int id)
        {
            ImportantDates importantDates = db.ImportantDates.Find(id);
            if (importantDates == null)
            {
                return NotFound();
            }

            db.ImportantDates.Remove(importantDates);
            db.SaveChanges();

            return Ok(importantDates);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ImportantDatesExists(int id)
        {
            return db.ImportantDates.Count(e => e.Id == id) > 0;
        }
    }
}