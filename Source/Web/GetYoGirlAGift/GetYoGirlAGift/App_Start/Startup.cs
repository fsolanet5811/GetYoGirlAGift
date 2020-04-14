using System;
using Microsoft.Owin;
using Owin;
using Microsoft.Owin.Security.OAuth;
using Microsoft.Owin.Cors;
using GetYoGirlAGift.Authentication;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;


[assembly: OwinStartup(typeof(GetYoGirlAGift.Startup))]
namespace GetYoGirlAGift
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            // Enable CORS.
            app.UseCors(CorsOptions.AllowAll);

            OAuthAuthorizationServerOptions options = new OAuthAuthorizationServerOptions
            {
                AllowInsecureHttp = true,
                TokenEndpointPath = new PathString("/token"),
                AccessTokenExpireTimeSpan = TimeSpan.FromDays(1),
                Provider = new AuthorizationServerProvider()
            };

    }
    }
}
