using SGP_Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SGP_Web.Controllers
{
    public class MenuController : Controller
    {
        // GET: Menu
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public JsonResult CargaGrilla(SGP_Entity.Menu Datos)
        {
            var data = Menu.Instance.Sel_Menu(Datos);

            return Json(data, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Ins_Menu(SGP_Entity.Menu Datos)
        {
            try
            {
                Datos.co_usuario_registro = HttpContext.Application["gUsuario"].ToString();
                var data = Menu.Instance.Ins_Menu(Datos);

                return Json(data, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {

                return Json(e.Message, JsonRequestBehavior.AllowGet);
            }

        }

        [HttpPost]
        public JsonResult Upd_Menu(SGP_Entity.Menu Datos)
        {
            try
            {
                Datos.co_usuario_modificacion = HttpContext.Application["gUsuario"].ToString();
                var data = Menu.Instance.Upd_Menu(Datos);

                return Json(data, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {

                return Json(e.Message, JsonRequestBehavior.AllowGet);
            }

        }

        [HttpPost]
        public JsonResult Del_Menu(SGP_Entity.Menu Datos)
        {
            try
            {
                Datos.co_usuario_eliminacion = HttpContext.Application["gUsuario"].ToString();
                var data = Menu.Instance.Del_Menu(Datos);

                return Json(data, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {

                return Json(e.Message, JsonRequestBehavior.AllowGet);
            }

        }
    }
}