using GreatWarriorDataAccess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace server.Controllers
{
    public class PlayerGiftsController : ApiController
    {
        public IHttpActionResult Get()
        {
            try
            {
                using (var entities = new GreatWarriorEntities())
                {
                    return Content(HttpStatusCode.OK, entities.PlayerGifts.ToList());
                }
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, ex);
            }
        }

        public IHttpActionResult Post([FromBody]PlayerGift playerGift)
        {
            try
            {
                using (var entities = new GreatWarriorEntities())
                {
                    entities.PlayerGifts.Add(playerGift);
                    entities.SaveChanges();
                    return Content(HttpStatusCode.OK, true);
                }
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, ex);
            }
        }

        public IHttpActionResult Put([FromBody]PlayerGift playerGift)
        {
            try
            {
                using (var entities = new GreatWarriorEntities())
                {
                    var editPlayerGift = entities.PlayerGifts.SingleOrDefault(f => f.Gift_Code == playerGift.Gift_Code);
                    if (editPlayerGift == null) return Content(HttpStatusCode.NotFound, false);
                    editPlayerGift.Gift_Code = playerGift.Gift_Code;
                    editPlayerGift.Player_Email = playerGift.Player_Email;
                    editPlayerGift.Gift_Level = playerGift.Gift_Level;
                    editPlayerGift.Gift_Receive = playerGift.Gift_Receive;
                    entities.SaveChanges();
                    return Content(HttpStatusCode.OK, true);
                }
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, ex);
            }
        }

        public IHttpActionResult Delete([FromBody]PlayerGift playerGift)
        {
            try
            {
                using (var entities = new GreatWarriorEntities())
                {
                    var existPlayerGift = entities.PlayerGifts.SingleOrDefault(f => f.Gift_Code == playerGift.Gift_Code);
                    if (existPlayerGift == null) return Content(HttpStatusCode.NotFound, false);
                    entities.PlayerGifts.Remove(existPlayerGift);
                    entities.SaveChanges();
                    return Content(HttpStatusCode.OK, true);
                }
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, ex);
            }
        }
    }
}
