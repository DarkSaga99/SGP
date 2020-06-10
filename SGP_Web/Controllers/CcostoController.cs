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
    public class CcostoController : Controller
    {
        // GET: Ccosto
        public ActionResult Index()
        {
            return View();
        }
        [HttpPost]
        public JsonResult Sel_Ccosto(SGP_Entity.Ccosto Datos)
        {
            try
            {
                var data = SGP_Data.Ccosto.Instance.Sel_Ccosto(Datos);
                return Json(data, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                return Json(e.Message, JsonRequestBehavior.AllowGet);
            }

        }

        [HttpPost]
        public JsonResult Ins_Ccosto(SGP_Entity.Ccosto Datos)
        {
            try
            {
                Datos.co_usuario_registro = HttpContext.Application["gUsuario"].ToString();
                var data = SGP_Data.Ccosto.Instance.Ins_Ccosto(Datos);

                return Json(data, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                return Json(e.Message, JsonRequestBehavior.AllowGet);
            }

        }

        [HttpPost]
        public JsonResult Upd_Ccosto(SGP_Entity.Ccosto Datos)
        {
            try
            {
                Datos.co_usuario_modificacion = HttpContext.Application["gUsuario"].ToString();
                var data = SGP_Data.Ccosto.Instance.Upd_Ccosto(Datos);

                return Json(data, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                return Json(e.Message, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public JsonResult Del_Ccosto(SGP_Entity.Ccosto Datos)
        {
            try
            {
                Datos.co_usuario_eliminacion = HttpContext.Application["gUsuario"].ToString();
                var data = SGP_Data.Ccosto.Instance.Del_Ccosto(Datos);

                return Json(data, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                return Json(e.Message, JsonRequestBehavior.AllowGet);
            }

        }

    }
}