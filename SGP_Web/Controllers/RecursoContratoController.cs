using SGP_Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SGP_Web.Controllers
{
    public class RecursoContratoController : Controller
    {
        // GET: RecursoContrato
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public JsonResult CargaGrilla(SGP_Entity.RecursoContrato Datos)
        {
            try
            {
                var data = RecursoContrato.Instance.Sel_RecursoContrato(Datos);
                return Json(data, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                return Json(e.Message, JsonRequestBehavior.AllowGet);
            }

        }
        [HttpPost]
        public JsonResult Ins_RecursoContrato(SGP_Entity.RecursoContrato Datos)
        {
            try
            {
                Datos.co_usuario_registro = HttpContext.Application["gUsuario"].ToString();
                var data = RecursoContrato.Instance.Ins_RecursoContrato(Datos);
                return Json(data, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                return Json(e.Message, JsonRequestBehavior.AllowGet);
            }

        }
        [HttpPost]
        public JsonResult Upd_RecursoContrato(SGP_Entity.RecursoContrato Datos)
        {
            try
            {
                Datos.co_usuario_modificacion = HttpContext.Application["gUsuario"].ToString();
                var data = RecursoContrato.Instance.Upd_RecursoContrato(Datos);
                return Json(data, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                return Json(e.Message, JsonRequestBehavior.AllowGet);
            }

        }
        [HttpPost]
        public JsonResult Del_RecursoContrato(SGP_Entity.RecursoContrato Datos)
        {
            try
            {
                Datos.co_usuario_eliminacion = HttpContext.Application["gUsuario"].ToString();
                var data = RecursoContrato.Instance.Del_RecursoContrato(Datos);
                return Json(data, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                return Json(e.Message, JsonRequestBehavior.AllowGet);
            }

        }

    }
}