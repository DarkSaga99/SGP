using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using SGP_Data;
namespace SGP_Web.Controllers
{
    public class CronogramaEjecucionController : Controller
    {
        // GET: CronogramaEjecucion
        public ActionResult Index()
        {
            return View();
        }


        [HttpPost]
        public JsonResult CargaGrilla(SGP_Entity.CronogramaEjecucion Datos)
        {
            try
            {
                var data = CronogramaEjecucion.Instance.Sel_CronogramaEjecucion(Datos);
                return Json(data, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                return Json(e.Message, JsonRequestBehavior.AllowGet);
            }

        }
        [HttpPost]
        public JsonResult Ins_CronogramaEjecucion(SGP_Entity.CronogramaEjecucion Datos)
        {
            try
            {
                Datos.co_usuario_registro = HttpContext.Application["gUsuario"].ToString();
                var data = CronogramaEjecucion.Instance.Ins_CronogramaEjecucion(Datos);
                return Json(data, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                return Json(e.Message, JsonRequestBehavior.AllowGet);
            }

        }
        [HttpPost]
        public JsonResult Upd_CronogramaEjecucion(SGP_Entity.CronogramaEjecucion Datos)
        {
            try
            {
                Datos.co_usuario_modificacion = HttpContext.Application["gUsuario"].ToString();
                var data = CronogramaEjecucion.Instance.Upd_CronogramaEjecucion(Datos);
                return Json(data, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                return Json(e.Message, JsonRequestBehavior.AllowGet);
            }

        }
        [HttpPost]
        public JsonResult Del_CronogramaEjecucion(SGP_Entity.CronogramaEjecucion Datos)
        {
            try
            {
                Datos.co_usuario_eliminacion = HttpContext.Application["gUsuario"].ToString();
                var data = CronogramaEjecucion.Instance.Del_CronogramaEjecucion(Datos);
                return Json(data, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                return Json(e.Message, JsonRequestBehavior.AllowGet);
            }

        }
    }
}