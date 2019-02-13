using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Xml;
using testAppWebApi.Models;

namespace testAppWebApi.Controllers
{
    public class UserController : ApiController
    {
        [Route("api/testAppWebApi/getUserInfo")]
        [HttpGet]
        [Authorize]
        public Users getUserInfo()
        {
            Users user = new Users();
            string path = ConfigurationManager.AppSettings["xmlpath"];
            using (XmlReader reader = XmlReader.Create(path))
            {
                while (reader.Read())
                {
                    if (reader.IsStartElement())
                    {
                        switch (reader.Name)
                        {
                            case "user":
                                break;
                            case "username":
                                if (reader.Read())
                                {
                                    user.username = reader.Value.Trim();
                                }
                                break;
                            case "firstname":
                                if (reader.Read())
                                {
                                    user.firstname = reader.Value.Trim();
                                }
                                break;
                            case "lastname":
                                if (reader.Read())
                                {
                                    user.lastname = reader.Value.Trim();
                                }
                                break;
                            case "email":
                                if (reader.Read())
                                {
                                    user.email = reader.Value.Trim();
                                }
                                break;
                        }
                    }
                }
            }

            return user;             
        }
    }
}
