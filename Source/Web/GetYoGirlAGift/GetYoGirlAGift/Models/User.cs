using System;
using System.Collections.Generic;
using System.Net.Mail;
using System.Net;
using System.IO;
using System.Web;

namespace GetYoGirlAGift.Models
{
    public partial class User
    {
        private static readonly string EMAIL_SERVICE_ADDRESS = "getyogirlagift.emailservice@gmail.com";//"getyogirlagift.emailservice@gmail.com";

        public User()
        {
            Girls = new List<Girl>();
        }

        public int Id { get; set; }

        public string Username { get; set; }

        public string Password { get; set; }

        public string Email { get; set; }

        public bool IsEmailVerified { get; set; }

        public virtual List<Girl> Girls { get; set; }

        private EmailVerificationToken GenerateEmailVerificationToken()
        {
            // We url encode the token so that it can safely be used in the url of the link in the verification email.
            return new EmailVerificationToken()
            {
                Token = WebUtility.UrlEncode(Convert.ToBase64String(Guid.NewGuid().ToByteArray())),
                CreatedAt = DateTime.Now,
                UserId = Id
            };
        }

        public EmailVerificationToken SendVerificationEmail()
        {
            EmailVerificationToken token = GenerateEmailVerificationToken();

            SmtpClient client = new SmtpClient("smtp.gmail.com");

            client.Port = 587;
            client.UseDefaultCredentials = false;
            client.Credentials = new NetworkCredential(EMAIL_SERVICE_ADDRESS, "yeet1234");
            client.DeliveryMethod = SmtpDeliveryMethod.Network;
            client.EnableSsl = true;

            MailMessage mail = new MailMessage
            {
                From = new MailAddress(EMAIL_SERVICE_ADDRESS, "Get Yo Girl A Gift"),
                IsBodyHtml = true,
                Body = GetEmailBody(token.Token),
                Subject = "Verify Your Email Address"
            };
            mail.To.Add(Email);

            client.Send(mail);
            return token;
        }

        private string GetEmailBody(string token)
        {
            string bodyHtml = File.ReadAllText(HttpContext.Current.Server.MapPath("~/bin/VerificationEmailBody.html"));
            Uri uri = HttpContext.Current.Request.Url;

            // If we are running this in the debugger, we have to attach the port number.
            string host = uri.Host == "localhost" ? $"{uri.Host}:{uri.Port}" : uri.Host;

            string verifyEmailApiCall = $"http://{host}/api/users/verify?token={token}";
            return bodyHtml.Replace("@VerifyEmailApiCall", verifyEmailApiCall);
        }
    }
}
