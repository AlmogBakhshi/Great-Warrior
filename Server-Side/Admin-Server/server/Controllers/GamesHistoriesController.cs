using GreatWarriorDataAccess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace server.Controllers
{
    public class GamesHistoriesController : ApiController
    {
            public IHttpActionResult Get()
            {
                try
                {
                    using (var entities = new GreatWarriorEntities())
                    {
                        return Content(HttpStatusCode.OK, entities.GamesHistories.ToList());
                    }
                }
                catch (Exception ex)
                {
                    return Content(HttpStatusCode.InternalServerError, ex);
                }
            }

            public IHttpActionResult Post([FromBody]GamesHistory gamesHistory)
            {
                try
                {
                    using (var entities = new GreatWarriorEntities())
                    {
                        entities.GamesHistories.Add(gamesHistory);
                        entities.SaveChanges();
                        return Content(HttpStatusCode.OK, true);
                    }
                }
                catch (Exception ex)
                {
                    return Content(HttpStatusCode.InternalServerError, ex);
                }
            }

            public IHttpActionResult Put([FromBody]GamesHistory gamesHistory)
            {
                try
                {
                    using (var entities = new GreatWarriorEntities())
                    {
                        var editGamesHistory = entities.GamesHistories.SingleOrDefault(
                                                                f => f.Player_One_Email == gamesHistory.Player_One_Email &&
                                                                f.Player_Two_Email == gamesHistory.Player_Two_Email &&
                                                                f.Game_Date == gamesHistory.Game_Date);
                        if (editGamesHistory == null) return Content(HttpStatusCode.NotFound, false);
                        entities.GamesHistories.Remove(editGamesHistory);
                        entities.GamesHistories.Add(gamesHistory);
                        entities.SaveChanges();
                        return Content(HttpStatusCode.OK, true);
                    }
                }
                catch (Exception ex)
                {
                    return Content(HttpStatusCode.InternalServerError, ex);
                }
            }

            public IHttpActionResult Delete([FromBody]GamesHistory gamesHistory)
            {
                try
                {
                    using (var entities = new GreatWarriorEntities())
                    {
                        var existGamesHistory = entities.GamesHistories.SingleOrDefault(
                                                                f => f.Player_One_Email == gamesHistory.Player_One_Email &&
                                                                f.Player_Two_Email == gamesHistory.Player_Two_Email &&
                                                                f.Game_Date == gamesHistory.Game_Date);
                    if (existGamesHistory == null) return Content(HttpStatusCode.NotFound, false);
                        entities.GamesHistories.Remove(existGamesHistory);
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
