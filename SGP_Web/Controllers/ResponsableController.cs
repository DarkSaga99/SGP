using SGP_Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SGP_Web.Controllers
{
    public class ResponsableController : Controller
    {
        // GET: Responsable
        public ActionResult Index()
        {
            return View();
        }
        [HttpPost]
        public JsonResult CargaGrilla(SGP_Entity.Responsable Datos)
        {
            var data = Responsable.Instance.Sel_Responsable(Datos);

            return Json(data, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Ins_Responsable(SGP_Entity.Responsable Datos)
        {
            try
            {
                Datos.co_usuario_registro = HttpContext.Application["gUsuario"].ToString();
                var data = Responsable.Instance.Ins_Responsable(Datos);

                return Json(data, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {

                return Json(e.Message, JsonRequestBehavior.AllowGet);
            }

        }

        [HttpPost]
        public JsonResult Upd_Responsable(SGP_Entity.Responsable Datos)
        {
            try
            {
                Datos.co_usuario_modificacion = HttpContext.Application["gUsuario"].ToString();
                var data = Responsable.Instance.Upd_Responsable(Datos);

                return Json(data, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {

                return Json(e.Message, JsonRequestBehavior.AllowGet);
            }

        }

        [HttpPost]
        public JsonResult Del_Responsable(SGP_Entity.Responsable Datos)
        {
            try
            {
                Datos.co_usuario_eliminacion = HttpContext.Application["gUsuario"].ToString();
                var data = Responsable.Instance.Del_Responsable(Datos);

                return Json(data, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {

                return Json(e.Message, JsonRequestBehavior.AllowGet);
            }

        }
    }
}