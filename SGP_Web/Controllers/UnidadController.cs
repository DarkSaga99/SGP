using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using SGP_Data;
using SGP_Entity;
using System.Web.Script.Serialization;

namespace SGP_Web.Controllers
{
    public class UnidadController : Controller
    {
        // GET: Unidad
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public JsonResult Sel_Unidad(SGP_Entity.Unidad Datos)
        {
            try
            {
                var data = SGP_Data.Unidad.Instance.Sel_Unidad(Datos);

                return Json(data, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                return Json(e.Message, JsonRequestBehavior.AllowGet);
            }

        }

        [HttpPost]
        public JsonResult Ins_Unidad(SGP_Entity.Unidad Datos)
        {
            try
            {
                Datos.co_usuario_registro = HttpContext.Application["gUsuario"].ToString();
                var data = SGP_Data.Unidad.Instance.Ins_Unidad(Datos);

                return Json(data, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                return Json(e.Message, JsonRequestBehavior.AllowGet);
            }

        }

        [HttpPost]
        public JsonResult Upd_Unidad(SGP_Entity.Unidad Datos)
        {
            try
            {
                Datos.co_usuario_modificacion = HttpContext.Application["gUsuario"].ToString();
                var data = SGP_Data.Unidad.Instance.Upd_Unidad(Datos);

                return Json(data, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                return Json(e.Message, JsonRequestBehavior.AllowGet);
            }

        }

        [HttpPost]
        public JsonResult Del_Unidad(SGP_Entity.Unidad Datos)
        {
            try
            {
                Datos.co_usuario_eliminacion = HttpContext.Application["gUsuario"].ToString();
                var data = SGP_Data.Unidad.Instance.Del_Unidad(Datos);

                return Json(data, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                return Json(e.Message, JsonRequestBehavior.AllowGet);
            }

        }

    }
}