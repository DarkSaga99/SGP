using SGP_Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SGP_Web.Controllers
{
    public class ProveedorController : Controller
    {
        // GET: Proveedor
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public JsonResult CargaGrilla(SGP_Entity.Proveedor Datos)
        {
            var data = Proveedor.Instance.Sel_Proveedor(Datos);

            return Json(data, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Ins_Proveedor(SGP_Entity.Proveedor Datos)
        {
            try
            {
                Datos.co_usuario_registro = HttpContext.Application["gUsuario"].ToString();
                var data = Proveedor.Instance.Ins_Proveedor(Datos);

                return Json(data, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {

                return Json(e.Message, JsonRequestBehavior.AllowGet);
            }
            
        }

        [HttpPost]
        public JsonResult Upd_Proveedor(SGP_Entity.Proveedor Datos)
        {
            try
            {
                Datos.co_usuario_modificacion = HttpContext.Application["gUsuario"].ToString();
                var data = Proveedor.Instance.Upd_Proveedor(Datos);

                return Json(data, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {

                return Json(e.Message, JsonRequestBehavior.AllowGet);
            }
            
        }

        [HttpPost]
        public JsonResult Del_Proveedor(SGP_Entity.Proveedor Datos)
        {
            try
            {
                Datos.co_usuario_eliminacion = HttpContext.Application["gUsuario"].ToString();
            var data = Proveedor.Instance.Del_Proveedor(Datos);

            return Json(data, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {

                return Json(e.Message, JsonRequestBehavior.AllowGet);
            }
            
        }
    }
}