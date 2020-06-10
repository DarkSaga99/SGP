using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using System.Data;

using SGP_Data;
using System.Web.Script.Serialization;

namespace SGP_Web.Controllers
{
    public class ClienteController : Controller
    {
        // GET: Cliente
        public ActionResult Index()
        {
            return View();
        }

        [Authorize]
        [HttpPost]
        public JsonResult CargaGrilla(SGP_Entity.Cliente Datos)
        {
            try
            {
                var data = Cliente.Instance.Sel_Cliente(Datos);
                return Json(data, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                return Json(e.Message, JsonRequestBehavior.AllowGet);
            }

        }


        [HttpPost]
        public JsonResult Ins_Cliente(SGP_Entity.Cliente Datos)
        {
            try
            {
                Datos.co_usuario_registro = HttpContext.Application["gUsuario"].ToString();
                var data = Cliente.Instance.Ins_Cliente(Datos);
                return Json(data, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                return Json(e.Message, JsonRequestBehavior.AllowGet);
            }

        }

        [HttpPost]
        public JsonResult Upd_Cliente(SGP_Entity.Cliente Datos)
        {
            try
            {
                Datos.co_usuario_modificacion = HttpContext.Application["gUsuario"].ToString();
                var data = Cliente.Instance.Upd_Cliente(Datos);
                return Json(data, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                return Json(e.Message, JsonRequestBehavior.AllowGet);
            }

        }

        [HttpPost]
        public JsonResult Del_Cliente(SGP_Entity.Cliente Datos)
        {
            try
            {
                Datos.co_usuario_eliminacion = HttpContext.Application["gUsuario"].ToString();
                var data = Cliente.Instance.Del_Cliente(Datos);
                return Json(data, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                return Json(e.Message, JsonRequestBehavior.AllowGet);
            }

        }

    }
}