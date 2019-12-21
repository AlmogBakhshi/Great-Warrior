using GreatWarriorDataAccess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace server.Controllers
{
    public class FiguresController : ApiController
    {
        public IHttpActionResult Get()
        {
            try
            {
                using (var entities = new GreatWarriorEntities())
                {
                    return Content(HttpStatusCode.OK, entities.Figures.ToList());
                }
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, ex);
            }
        }

        public IHttpActionResult Post([FromBody]Figure figure)
        {
            try
            {
                using (var entities = new GreatWarriorEntities())
                {
                    entities.Figures.Add(figure);
                    entities.SaveChanges();
                    return Content(HttpStatusCode.OK, true);
                }
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, ex);
            }
        }

        public IHttpActionResult Put([FromBody]Figure figure)
        {
            try
            {
                using (var entities = new GreatWarriorEntities())
                {
                    var editFigure = entities.Figures.SingleOrDefault(f => f.Figure_Name == figure.Figure_Name);
                    if (editFigure == null) return Content(HttpStatusCode.NotFound, false);
                    editFigure.Figure_Name = figure.Figure_Name;
                    editFigure.Figure_Attack = figure.Figure_Attack;
                    editFigure.Figure_Defense = figure.Figure_Defense;
                    entities.SaveChanges();
                    return Content(HttpStatusCode.OK, true);
                }
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, ex);
            }
        }

        public IHttpActionResult Delete([FromBody]Figure figure)
        {
            try
            {
                using (var entities = new GreatWarriorEntities())
                {
                    var existFigure = entities.Figures.SingleOrDefault(f => f.Figure_Name == figure.Figure_Name);
                    if (existFigure == null) return Content(HttpStatusCode.NotFound, false);
                    entities.Figures.Remove(existFigure);
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
