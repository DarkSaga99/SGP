using SGP_Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SGP_Web.Controllers
{
    public class TGeneralController : Controller
    {
        // GET: TGenerica
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public JsonResult CargaTGeneral(SGP_Entity.TGeneral Datos)
        {
            try
            {
                var data = TGeneral.Instance.Sel_TGeneral(Datos);
                return Json(data, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                return Json(e.Message, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public JsonResult Sel_TGeneral(SGP_Entity.TGeneral Datos)
        {
            try
            {
                var data = SGP_Data.TGeneral.Instance.Sel_TGeneral(Datos);

                return Json(data, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                return Json(e.Message, JsonRequestBehavior.AllowGet);
            }

        }

        [HttpPost]
        public JsonResult Ins_TGeneral(SGP_Entity.TGeneral Datos)
        {
            try
            {
                Datos.co_usuario_registro = HttpContext.Application["gUsuario"].ToString();
                var data = SGP_Data.TGeneral.Instance.Ins_TGeneral(Datos);

                return Json(data, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                return Json(e.Message, JsonRequestBehavior.AllowGet);
            }

        }

        [HttpPost]
        public JsonResult Upd_TGeneral(SGP_Entity.TGeneral Datos)
        {
            try
            {
                Datos.co_usuario_modificacion = HttpContext.Application["gUsuario"].ToString();
                var data = TGeneral.Instance.Upd_TGeneral(Datos);

                return Json(data, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                return Json(e.Message, JsonRequestBehavior.AllowGet);
            }

        }

        [HttpPost]
        public JsonResult Del_TGeneral(SGP_Entity.TGeneral Datos)
        {
            try
            {
                Datos.co_usuario_eliminacion = HttpContext.Application["gUsuario"].ToString();
                var data = TGeneral.Instance.Del_TGeneral(Datos);

                return Json(data, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                return Json(e.Message, JsonRequestBehavior.AllowGet);
            }

        }

        [HttpPost]
        public JsonResult Sel_ComboTGeneral(SGP_Entity.TGeneral Datos)
        {
            try
            {
                var data = TGeneral.Instance.Sel_ComboTGeneral(Datos);

                return Json(data, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                return Json(e.Message, JsonRequestBehavior.AllowGet);
            }

        }

    }
}