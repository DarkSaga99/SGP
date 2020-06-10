using SGP_Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SGP_Web.Controllers
{
    public class CronogramaPagoController : Controller
    {
        // GET: CronogramaPago
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public JsonResult CargaGrilla(SGP_Entity.CronogramaPago Datos)
        {
            try
            {
                var data = CronogramaPago.Instance.Sel_CronogramaPago(Datos);
                return Json(data, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                return Json(e.Message, JsonRequestBehavior.AllowGet);
            }

        }
        [HttpPost]
        public JsonResult Ins_CronogramaPago(SGP_Entity.CronogramaPago Datos)
        {
            try
            {
                Datos.co_usuario_registro = HttpContext.Application["gUsuario"].ToString();
                var data = CronogramaPago.Instance.Ins_CronogramaPago(Datos);
                return Json(data, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                return Json(e.Message, JsonRequestBehavior.AllowGet);
            }

        }
        [HttpPost]
        public JsonResult Upd_CronogramaPago(SGP_Entity.CronogramaPago Datos)
        {
            try
            {
                Datos.co_usuario_modificacion = HttpContext.Application["gUsuario"].ToString();
                var data = CronogramaPago.Instance.Upd_CronogramaPago(Datos);
                return Json(data, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                return Json(e.Message, JsonRequestBehavior.AllowGet);
            }

        }
        [HttpPost]
        public JsonResult Del_CronogramaPago(SGP_Entity.CronogramaPago Datos)
        {
            try
            {
                Datos.co_usuario_eliminacion = HttpContext.Application["gUsuario"].ToString();
                var data = CronogramaPago.Instance.Del_CronogramaPago(Datos);
                return Json(data, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                return Json(e.Message, JsonRequestBehavior.AllowGet);
            }

        }

    }
}