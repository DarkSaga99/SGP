using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using System.Data;

using SGP_Data;
using SGP_Entity;
using System.Web.Script.Serialization;

namespace SGP_Web.Controllers
{
    public class AreaController : Controller
    {
        // GET: Area
        public ActionResult Index()
        {
            return View();
        }
        [HttpPost]
        public JsonResult CargaComboArea(SGP_Entity.Area Datos)
        {
            try
            {
                var data = SGP_Data.Area.Instance.Sel_ComboArea(Datos);
                return Json(data, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                return Json(e.Message, JsonRequestBehavior.AllowGet);
            }
            
        }
        [HttpPost]
        public JsonResult Sel_Area(SGP_Entity.Area Datos)
        {
            try
            {
                var data = SGP_Data.Area.Instance.Sel_Area(Datos);

                return Json(data, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                return Json(e.Message, JsonRequestBehavior.AllowGet);
            }

        }
        [HttpPost]
        public JsonResult Ins_Area(SGP_Entity.Area Datos)
        {
            try
            {
                Datos.co_usuario_registro = HttpContext.Application["gUsuario"].ToString();
                var data = SGP_Data.Area.Instance.Ins_Area(Datos);
                return Json(data, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                return Json(e.Message, JsonRequestBehavior.AllowGet);
            }
        }
        [HttpPost]
        public JsonResult Upd_Area(SGP_Entity.Area Datos)
        {
            try
            {
                Datos.co_usuario_modificacion = HttpContext.Application["gUsuario"].ToString();
                var data = SGP_Data.Area.Instance.Upd_Area(Datos);

                return Json(data, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                return Json(e.Message, JsonRequestBehavior.AllowGet);
            }

        }
        [HttpPost]
        public JsonResult Del_Area(SGP_Entity.Area Datos)
        {
            try
            {
                Datos.co_usuario_eliminacion = HttpContext.Application["gUsuario"].ToString();
                var data = SGP_Data.Area.Instance.Del_Area(Datos);

                return Json(data, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                return Json(e.Message, JsonRequestBehavior.AllowGet);
            }

        }

    }
}