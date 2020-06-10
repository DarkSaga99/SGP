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
    public class PartidaController : Controller
    {
        // GET: Partida
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public JsonResult Sel_Partida(SGP_Entity.Partida Datos)
        {
            try
            {
                var data = SGP_Data.Partida.Instance.Sel_Partida(Datos);

                return Json(data, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                return Json(e.Message, JsonRequestBehavior.AllowGet);
            }

        }

        [HttpPost]
        public JsonResult Ins_Partida(SGP_Entity.Partida Datos)
        {
            try
            {
                Datos.co_usuario_registro = HttpContext.Application["gUsuario"].ToString();
                var data = SGP_Data.Partida.Instance.Ins_Partida(Datos);

                return Json(data, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                return Json(e.Message, JsonRequestBehavior.AllowGet);
            }

        }

        [HttpPost]
        public JsonResult Upd_Partida(SGP_Entity.Partida Datos)
        {
            try
            {
                Datos.co_usuario_modificacion = HttpContext.Application["gUsuario"].ToString();
                var data = SGP_Data.Partida.Instance.Upd_Partida(Datos);

                return Json(data, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                return Json(e.Message, JsonRequestBehavior.AllowGet);
            }

        }

        [HttpPost]
        public JsonResult Del_Partida(SGP_Entity.Partida Datos)
        {
            try
            {
                Datos.co_usuario_eliminacion = HttpContext.Application["gUsuario"].ToString();
                var data = SGP_Data.Partida.Instance.Del_Partida(Datos);

                return Json(data, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                return Json(e.Message, JsonRequestBehavior.AllowGet);
            }

        }
    }
}