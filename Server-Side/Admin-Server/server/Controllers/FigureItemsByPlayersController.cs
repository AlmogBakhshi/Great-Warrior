using GreatWarriorDataAccess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace server.Controllers
{
    public class FigureItemsByPlayersController : ApiController
    {
        public IHttpActionResult Get()
        {
            try
            {
                using (var entities = new GreatWarriorEntities())
                {
                    return Content(HttpStatusCode.OK, entities.FigureItemsByPlayers.ToList());
                }
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, ex);
            }
        }

        public IHttpActionResult Post([FromBody]FigureItemsByPlayer figureItemsByPlayer)
        {
            try
            {
                using (var entities = new GreatWarriorEntities())
                {
                    entities.FigureItemsByPlayers.Add(figureItemsByPlayer);
                    entities.SaveChanges();
                    return Content(HttpStatusCode.OK, true);
                }
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, ex);
            }
        }

        public IHttpActionResult Put([FromBody]FigureItemsByPlayer figureItemsByPlayer)
        {
            try
            {
                using (var entities = new GreatWarriorEntities())
                {
                    var editFigureItem = entities.FigureItemsByPlayers.SingleOrDefault(
                                                        f => f.Player_Email == figureItemsByPlayer.Player_Email &&
                                                        f.Figure_Name == figureItemsByPlayer.Figure_Name &&
                                                        f.FigureItem_Name == figureItemsByPlayer.FigureItem_Name);
                    if (editFigureItem == null) return Content(HttpStatusCode.NotFound, false);
                    entities.FigureItemsByPlayers.Remove(editFigureItem);
                    entities.FigureItemsByPlayers.Add(figureItemsByPlayer);
                    entities.SaveChanges();
                    return Content(HttpStatusCode.OK, true);
                }
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, ex);
            }
        }

        public IHttpActionResult Delete([FromBody]FigureItemsByPlayer figureItemsByPlayer)
        {
            try
            {
                using (var entities = new GreatWarriorEntities())
                {
                    var figureItem = entities.FigureItemsByPlayers.SingleOrDefault(
                                                         f => f.Player_Email == figureItemsByPlayer.Player_Email &&
                                                         f.Figure_Name == figureItemsByPlayer.Figure_Name &&
                                                         f.FigureItem_Name == figureItemsByPlayer.FigureItem_Name);
                    if (figureItem == null) return Content(HttpStatusCode.NotFound, false);
                    entities.FigureItemsByPlayers.Remove(figureItem);
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
