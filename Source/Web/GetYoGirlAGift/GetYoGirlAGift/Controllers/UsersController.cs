﻿using System;
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
using Newtonsoft.Json;
using System.IO;
using System.Web;

namespace GetYoGirlAGift.Controllers
{
    public class PasswordChangeRequest
    {
        public string OldPassword { get; set; }

        public string NewPassword { get; set; }
    }

    public class LoginRequest
    {
        public string Username { get; set; }

        public string Password { get; set; }
    }

    public class SignUpRequest : LoginRequest
    {
        public string Email { get; set; }
    }

    public class UsersController : ApiController
    {
        private GetYoGirlAGiftContext db = new GetYoGirlAGiftContext();

        // GET: api/Users
        [Authorize]
        public IHttpActionResult GetUser()
        {
            List<User> users = (from user in db.Users
                                select user).ToList();

            return Ok(users);
        }

        // GET: api/Users/5
        [Authorize]
        [ResponseType(typeof(User))]
        public IHttpActionResult GetUser(int id)
        {
            User users = db.Users.Find(id);
            if (users == null)
            {
                return NotFound();
            }

            return Ok(users);
        }

        // PUT: api/Users/5
        [Authorize]
        [ResponseType(typeof(void))]
        public IHttpActionResult PutUser(int id, User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != user.Id)
            {
                return BadRequest();
            }

            db.Entry(user).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UsersExists(id))
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

        // POST: api/Users
        [Authorize]
        [ResponseType(typeof(User))]
        public IHttpActionResult PostUser(User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Users.Add(user);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = user.Id }, user);
        }

        // DELETE: api/Users/5
        [Authorize]
        [ResponseType(typeof(User))]
        public IHttpActionResult DeleteUser(int id)
        {
            User users = db.Users.Find(id);
            if (users == null)
            {
                return NotFound();
            }

            db.Users.Remove(users);
            db.SaveChanges();

            return Ok(users);
        }

        [HttpPost]
        [Authorize]
        [Route("api/users/manage")]
        public IHttpActionResult ChangePassword(int userId, [FromBody] PasswordChangeRequest request)
        {
            try
            {
                User user = db.Users.Find(userId);
                if (user is null)
                    return NotFound();

                if (user.Password != request.OldPassword)
                    return BadRequest("Wrong password.");

                user.Password = request.NewPassword;
                db.SaveChanges();

                return Ok(user);
            }
            catch(Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpPut]
        [Authorize]
        [Route("api/users/manage")]
        public IHttpActionResult SendVerificationEmail(int userId)
        {
            try
            {
                User user = db.Users.Find(userId);
                if (user is null)
                    return NotFound();

                EmailVerificationToken token = user.SendVerificationEmail();
                db.EmailVerificationTokens.Add(token);
                db.SaveChanges();
                
                return Ok();
            }
            catch(Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpGet]
        [Route("api/users/verify")]
        public HttpResponseMessage VerifyEmail(string token)
        {
            try
            {
                // Remove the expired tokens.
                DateTime exactlyOneDayAgo = DateTime.Now.AddDays(-1);
                db.EmailVerificationTokens.RemoveRange(from evt in db.EmailVerificationTokens
                                                       where evt.CreatedAt < exactlyOneDayAgo
                                                       select evt);

                // The api will url-decode the token in the url, so we have to encode it again when we do our comparison.
                token = WebUtility.UrlEncode(token);
                EmailVerificationToken emailToken = (from evt in db.EmailVerificationTokens
                                                     where evt.Token == token
                                                     select evt).FirstOrDefault();

                if (emailToken is null)
                    return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Email verification token could not be found or has expired.");

                User user = db.Users.Find(emailToken.UserId);
                if (user is null)
                    return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "The user for this token no longer exists.");

                user.IsEmailVerified = true;
                db.SaveChanges();

                HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK)
                {
                    Content = new StringContent(LoadEmailVerifiedHtml())
                };
                response.Content.Headers.ContentType.MediaType = "text/html";
                return response;
            }
            catch(Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex);
            }
        }
        
        [HttpPost]
        [Authorize]
        [Route("api/users/login")]
        public IHttpActionResult Login([FromBody] LoginRequest request)
        {
            try
            {
                User user = (from u in db.Users
                            where u.Username == request.Username && u.Password == request.Password
                            select u).FirstOrDefault();

                return Ok(new { Success = user != null, User = user });
            }
            catch(Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpPost]
        [Authorize]
        [Route("api/users/signup")]
        public IHttpActionResult SignUp([FromBody] SignUpRequest request)
        {
            try
            {
                User user = (from u in db.Users
                             where u.Username == request.Username
                             select u).FirstOrDefault();

                if (user != null)
                    return Ok(new { Success = false, Message = "That username is already taken." });

                user = (from u in db.Users
                        where u.Email == request.Email
                        select u).FirstOrDefault();

                if (user != null)
                    return Ok(new { Success = false, Message = "An account with that email already exists." });

                user = new User()
                {
                    Username = request.Username,
                    Password = request.Password,
                    Email = request.Email,
                    IsEmailVerified = false
                };

                db.Users.Add(user);

                db.SaveChanges();

                // Send this user a verification email.
                EmailVerificationToken token = user.SendVerificationEmail();
                db.EmailVerificationTokens.Add(token);
                db.SaveChanges();

                return Ok(new { Success = true, User = user });
            }
            catch(Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private string LoadEmailVerifiedHtml()
        {
            return File.ReadAllText(HttpContext.Current.Server.MapPath("~/bin/EmailVerifiedPage.html"));
        }

        private bool UsersExists(int id)
        {
            return db.Users.Count(e => e.Id == id) > 0;
        }
    }
}