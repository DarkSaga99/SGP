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
    public class GrupoPartidaController : Controller
    {
        // GET: GrupoPartida
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public JsonResult Sel_ComboGrupoPartida(SGP_Entity.GrupoPartida Datos)
        {
            try
            {
                var data = SGP_Data.GrupoPartida.Instance.Sel_ComboGrupoPartida(Datos);

                return Json(data, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                return Json(e.Message, JsonRequestBehavior.AllowGet);
            }

        }

        [HttpPost]
        public JsonResult Sel_GrupoPartida(SGP_Entity.GrupoPartida Datos)
        {
            try
            {
                var data = SGP_Data.GrupoPartida.Instance.Sel_GrupoPartida(Datos);

                return Json(data, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                return Json(e.Message, JsonRequestBehavior.AllowGet);
            }

        }

        [HttpPost]
        public JsonResult Ins_GrupoPartida(SGP_Entity.GrupoPartida Datos)
        {
            try
            {
                Datos.co_usuario_registro = HttpContext.Application["gUsuario"].ToString();
                var data = SGP_Data.GrupoPartida.Instance.Ins_GrupoPartida(Datos);

                return Json(data, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                return Json(e.Message, JsonRequestBehavior.AllowGet);
            }

        }

        [HttpPost]
        public JsonResult Upd_GrupoPartida(SGP_Entity.GrupoPartida Datos)
        {
            try
            {
                Datos.co_usuario_modificacion = HttpContext.Application["gUsuario"].ToString();
                var data = SGP_Data.GrupoPartida.Instance.Upd_GrupoPartida(Datos);

                return Json(data, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                return Json(e.Message, JsonRequestBehavior.AllowGet);
            }

        }

        [HttpPost]
        public JsonResult Del_GrupoPartida(SGP_Entity.GrupoPartida Datos)
        {
            try
            {
                Datos.co_usuario_eliminacion = HttpContext.Application["gUsuario"].ToString();
                var data = SGP_Data.GrupoPartida.Instance.Del_GrupoPartida(Datos);

                return Json(data, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                return Json(e.Message, JsonRequestBehavior.AllowGet);
            }
        }

    }
}