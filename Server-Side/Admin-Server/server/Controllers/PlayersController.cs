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
    [RoutePrefix("api/Players")]
    public class PlayersController : ApiController
    {
        [Route("")]
        public IHttpActionResult Get()
        {
            try
            {
                using (var entities = new GreatWarriorEntities())
                {
                    return Content(HttpStatusCode.OK, entities.Players.ToList());
                }
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, ex);
            }
        }

        [Route("")]
        public IHttpActionResult Post([FromBody]Player player)
        {
            try
            {
                using (var entities = new GreatWarriorEntities())
                {
                    player.Player_Password = GenerateSHA512String(player.Player_Password != null ? player.Player_Password : "");
                    entities.Players.Add(player);
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
        public IHttpActionResult Put([FromUri] string email, [FromBody]Player player)
        {
            try
            {
                using (var entities = new GreatWarriorEntities())
                {
                    var editPlayer = entities.Players.SingleOrDefault(p => p.Player_Email == email);
                    if (editPlayer == null) return Content(HttpStatusCode.NotFound, false);
                    editPlayer.Player_Name = player.Player_Name;
                    editPlayer.Player_Password = player.Player_Password.Trim() != "" ?
                        GenerateSHA512String(player.Player_Password != null ? player.Player_Password : "") :
                        player.Player_Password = editPlayer.Player_Password;
                    editPlayer.Player_Name = player.Player_Name;
                    editPlayer.Player_Score = player.Player_Score;
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
                    var player = entities.Players.SingleOrDefault(p => p.Player_Email == email);
                    if (player == null) return Content(HttpStatusCode.NotFound, false);
                    entities.Players.Remove(player);
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
