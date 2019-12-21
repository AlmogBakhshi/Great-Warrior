using GreatWarriorDataAccess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Cryptography;
using System.Text;
using System.Web.Http;

namespace server.Controllers
{
    [RoutePrefix("api/Admins")]
    public class AdminsController : ApiController
    {
        [Route("")]
        public IHttpActionResult Get()
        {
            try
            {
                using (var entities = new GreatWarriorEntities())
                {
                    return Content(HttpStatusCode.OK, entities.Admins.ToList());
                }
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, ex);
            }
        }

        [HttpPost]
        [Route("Login")]
        public IHttpActionResult Login([FromBody]Admin admin)
        {
            try
            {
                using (var entities = new GreatWarriorEntities())
                {
                    var password = GenerateSHA512String(admin.Admin_Password);
                    var exist = entities.Admins.SingleOrDefault(a => a.Admin_Email == admin.Admin_Email && a.Admin_Password == password);
                    if (exist == null) return Content(HttpStatusCode.NotFound, false);
                    return Content(HttpStatusCode.OK, true);
                }
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, ex);
            }
        }

        [Route("")]
        public IHttpActionResult Post([FromBody]Admin admin)
        {
            try
            {
                using (var entities = new GreatWarriorEntities())
                {
                    admin.Admin_Password = GenerateSHA512String(admin.Admin_Password != null ? admin.Admin_Password : "");
                    entities.Admins.Add(admin);
                    entities.SaveChanges();
                    return Content(HttpStatusCode.OK, true);
                }
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, ex);
            }
        }

        [Route("{email}")]
        public IHttpActionResult Put([FromUri] string email, [FromBody]Admin admin)
        {
            try
            {
                using (var entities = new GreatWarriorEntities())
                {
                    var editAdmin = entities.Admins.SingleOrDefault(a => a.Admin_Email == email);
                    if (editAdmin == null) return Content(HttpStatusCode.NotFound, false);
                    admin.Admin_Password = admin.Admin_Password.Trim() != "" ?
                        GenerateSHA512String(admin.Admin_Password != null ? admin.Admin_Password : "") :
                        admin.Admin_Password = editAdmin.Admin_Password;
                    entities.Admins.Remove(editAdmin);
                    entities.Admins.Add(admin);
                    entities.SaveChanges();
                    return Content(HttpStatusCode.OK, true);
                }
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, ex);
            }
        }

        [Route("{email}")]
        public IHttpActionResult Delete(string email)
        {
            try
            {
                using (var entities = new GreatWarriorEntities())
                {
                    var admin = entities.Admins.SingleOrDefault(a => a.Admin_Email == email);
                    if (admin == null) return Content(HttpStatusCode.NotFound, false);
                    entities.Admins.Remove(admin);
                    entities.SaveChanges();
                    return Content(HttpStatusCode.OK, true);
                }
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, ex);
            }
        }

        #region Encrypt
        /// <summary>
        /// Encrypt password with key
        /// </summary>
        /// <param name="password">String of password</param>
        /// <returns></returns>
        private string GenerateSHA512String(string password)
        {
            var keyByte = Encoding.UTF8.GetBytes("greatWarrior");
            var passwordBytes = Encoding.UTF8.GetBytes(password);
            using (var hmac = new HMACSHA512(keyByte))
            {
                byte[] hashPassword = hmac.ComputeHash(passwordBytes);
                return GetStringFromHash(hashPassword);
            }
        }

        /// <summary>
        /// Change byte password to hex 
        /// </summary>
        /// <param name="hash">The Password in byte</param>
        /// <returns></returns>
        private string GetStringFromHash(byte[] hash)
        {
            StringBuilder result = new StringBuilder();
            for (int i = 0; i < hash.Length; i++)
            {
                result.Append(hash[i].ToString("x2"));
            }
            return result.ToString();
        }
        #endregion

    }
}
