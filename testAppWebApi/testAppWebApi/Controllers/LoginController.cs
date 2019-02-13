using System;
using System.Collections.Generic;
using System.Configuration;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Web.Http;
using testAppWebApi.Models;

namespace testAppWebApi.Controllers
{
    [Route("api/testAppWebApi")]
    public class LoginController : ApiController
    {

        [Route("api/testAppWebApi/login/")]
        [HttpPost]
        public IHttpActionResult isAuthenticated(LoginUser user)
        {
            bool found = false;

            if(user.userName == "testuser" && user.password == "password")
            {
                found = true;
            }

            
            IHttpActionResult response;
            HttpResponseMessage responseMsg = new HttpResponseMessage();

            if (found)
            {
                string token = createToken(user.userName);
                return Ok<string>(token);
            }
            else
            {
                return Content(HttpStatusCode.Unauthorized, "Login Failed");
            }

        }

        private string createToken(string username)
        {

            DateTime issuedAt = DateTime.UtcNow;

            DateTime expires = DateTime.UtcNow.AddDays(7);

            var tokenHandler = new JwtSecurityTokenHandler();

            //create a identity and add claims to the user which we want to log in
            ClaimsIdentity claimsIdentity = new ClaimsIdentity(new[]
            {
                new Claim(ClaimTypes.Name, username)
            });

            string sec = ConfigurationManager.AppSettings["sectoken"];
            var securityKey = new Microsoft.IdentityModel.Tokens.SymmetricSecurityKey(System.Text.Encoding.Default.GetBytes(sec));
            var signingCredentials = new Microsoft.IdentityModel.Tokens.SigningCredentials(securityKey, Microsoft.IdentityModel.Tokens.SecurityAlgorithms.HmacSha256Signature);
            string issuer = ConfigurationManager.AppSettings["issuer"];
            string audience = ConfigurationManager.AppSettings["audience"];

            //create the jwt
            var token =
                (JwtSecurityToken)
                    tokenHandler.CreateJwtSecurityToken(issuer: issuer, audience: audience,
                        subject: claimsIdentity, notBefore: issuedAt, expires: expires, signingCredentials: signingCredentials);
            var tokenString = tokenHandler.WriteToken(token);

            return tokenString;
        }
    }
}
