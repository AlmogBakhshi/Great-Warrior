using GreatWarriorDataAccess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace server.Controllers
{
    public class FiguresInGamesController : ApiController
    {
        public IHttpActionResult Get()
        {
            try
            {
                using (var entities = new GreatWarriorEntities())
                {
                    return Content(HttpStatusCode.OK, entities.FiguresInGames.ToList());
                }
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, ex);
            }
        }

        public IHttpActionResult Post([FromBody]FiguresInGame figuresInGame)
        {
            try
            {
                using (var entities = new GreatWarriorEntities())
                {
                    entities.FiguresInGames.Add(figuresInGame);
                    entities.SaveChanges();
                    return Content(HttpStatusCode.OK, true);
                }
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, ex);
            }
        }

        public IHttpActionResult Put([FromBody]FiguresInGame figuresInGame)
        {
            try
            {
                using (var entities = new GreatWarriorEntities())
                {
                    var editFiguresInGame = entities.FiguresInGames.SingleOrDefault(
                                                            f => f.Player_One_Email == figuresInGame.Player_One_Email &&
                                                            f.Player_Two_Email == figuresInGame.Player_Two_Email &&
                                                            f.Game_Date == figuresInGame.Game_Date && 
                                                            f.Player_Email == figuresInGame.Player_Email &&
                                                            f.Figure_Name == figuresInGame.Figure_Name);
                    if (editFiguresInGame == null) return Content(HttpStatusCode.NotFound, false);
                    entities.FiguresInGames.Remove(editFiguresInGame);
                    entities.FiguresInGames.Add(figuresInGame);
                    entities.SaveChanges();
                    return Content(HttpStatusCode.OK, true);
                }
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, ex);
            }
        }

        public IHttpActionResult Delete([FromBody]FiguresInGame figuresInGame)
        {
            try
            {
                using (var entities = new GreatWarriorEntities())
                {
                    var existFiguresInGame = entities.FiguresInGames.SingleOrDefault(
                                                            f => f.Player_One_Email == figuresInGame.Player_One_Email &&
                                                            f.Player_Two_Email == figuresInGame.Player_Two_Email &&
                                                            f.Game_Date == figuresInGame.Game_Date &&
                                                            f.Player_Email == figuresInGame.Player_Email &&
                                                            f.Figure_Name == figuresInGame.Figure_Name);
                    if (existFiguresInGame == null) return Content(HttpStatusCode.NotFound, false);
                    entities.FiguresInGames.Remove(existFiguresInGame);
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
