using GreatWarriorDataAccess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace server.Controllers
{
    public class FigureItemsController : ApiController
    {
        public IHttpActionResult Get()
        {
            try
            {
                using (var entities = new GreatWarriorEntities())
                {
                    return Content(HttpStatusCode.OK, entities.FigureItems.ToList());
                }
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, ex);
            }
        }

        public IHttpActionResult Post([FromBody]FigureItem figureItems)
        {
            try
            {
                using (var entities = new GreatWarriorEntities())
                {
                    entities.FigureItems.Add(figureItems);
                    entities.SaveChanges();
                    return Content(HttpStatusCode.OK, true);
                }
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, ex);
            }
        }

        public IHttpActionResult Put([FromBody]FigureItem figureItem)
        {
            try
            {
                using (var entities = new GreatWarriorEntities())
                {
                    var editFigureItem = entities.FigureItems.SingleOrDefault(f => f.FigureItem_Name == figureItem.FigureItem_Name );
                    if (editFigureItem == null) return Content(HttpStatusCode.NotFound, false);
                    entities.FigureItems.Remove(editFigureItem);
                    entities.FigureItems.Add(figureItem);
                    entities.SaveChanges();
                    return Content(HttpStatusCode.OK, true);
                }
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, ex);
            }
        }

        public IHttpActionResult Delete([FromBody]FigureItem figureItem)
        {
            try
            {
                using (var entities = new GreatWarriorEntities())
                {
                    var figure = entities.FigureItems.SingleOrDefault(f => f.FigureItem_Name == figureItem.FigureItem_Name);
                    if (figureItem == null) return Content(HttpStatusCode.NotFound, false);
                    entities.FigureItems.Remove(figureItem);
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
