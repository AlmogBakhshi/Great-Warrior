using GreatWarriorDataAccess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace server.Controllers
{
    public class FiguresOfPlayersController : ApiController
    {
        public IHttpActionResult Get()
        {
            try
            {
                using (var entities = new GreatWarriorEntities())
                {
                    return Content(HttpStatusCode.OK, entities.FiguresOfPlayers.ToList());
                }
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, ex);
            }
        }

        public IHttpActionResult Post([FromBody]FiguresOfPlayer figuresOfPlayer)
        {
            try
            {
                using (var entities = new GreatWarriorEntities())
                {
                    entities.FiguresOfPlayers.Add(figuresOfPlayer);
                    entities.SaveChanges();
                    return Content(HttpStatusCode.OK, true);
                }
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, ex);
            }
        }

        public IHttpActionResult Put([FromBody]FiguresOfPlayer figuresOfPlayer)
        {
            try
            {
                using (var entities = new GreatWarriorEntities())
                {
                    var editFiguresOfPlayer = entities.FiguresOfPlayers.SingleOrDefault(
                                                            f => f.Player_Email == figuresOfPlayer.Player_Email &&
                                                            f.Figure_Name == figuresOfPlayer.Figure_Name);
                    if (editFiguresOfPlayer == null) return Content(HttpStatusCode.NotFound, false);
                    entities.FiguresOfPlayers.Remove(editFiguresOfPlayer);
                    entities.FiguresOfPlayers.Add(figuresOfPlayer);
                    entities.SaveChanges();
                    return Content(HttpStatusCode.OK, true);
                }
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, ex);
            }
        }

        public IHttpActionResult Delete([FromBody]FiguresOfPlayer figuresOfPlayer)
        {
            try
            {
                using (var entities = new GreatWarriorEntities())
                {
                    var existFiguresOfPlayer = entities.FiguresOfPlayers.SingleOrDefault(
                                                            f => f.Player_Email == figuresOfPlayer.Player_Email &&
                                                            f.Figure_Name == figuresOfPlayer.Figure_Name);
                    if (existFiguresOfPlayer == null) return Content(HttpStatusCode.NotFound, false);
                    entities.FiguresOfPlayers.Remove(existFiguresOfPlayer);
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
