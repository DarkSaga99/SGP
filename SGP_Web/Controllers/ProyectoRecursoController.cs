using SGP_Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SGP_Web.Controllers
{
    public class ProyectoRecursoController : Controller
    {
        // GET: ProyectoRecurso
        public ActionResult Index()
        {
            return View();
        }
        [HttpPost]
        public JsonResult CargaGrilla(SGP_Entity.ProyectoRecurso Datos)
        {
            try
            {
                var data = ProyectoRecurso.Instance.Sel_ProyectoRecurso(Datos);
                return Json(data, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                return Json(e.Message, JsonRequestBehavior.AllowGet);
            }

        }
        [HttpPost]
        public JsonResult Ins_ProyectoRecurso(List<SGP_Entity.ProyectoRecurso> Datos)
        {
            try
            {
                var data = 0;
                ProyectoRecurso.Instance.Del_ProyectoRecurso(Datos[0]);
                foreach (SGP_Entity.ProyectoRecurso item in Datos)
                {
                    if (item.st_estado >0)
                    {
                        item.co_usuario_registro = HttpContext.Application["gUsuario"].ToString();
                        data = ProyectoRecurso.Instance.Ins_ProyectoRecurso(item);
                    }
                }
                return Json(data, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                return Json(e.Message, JsonRequestBehavior.AllowGet);
            }

        }
        [HttpPost]
        public JsonResult Upd_ProyectoRecurso(SGP_Entity.ProyectoRecurso Datos)
        {
            try
            {
                Datos.co_usuario_modificacion = HttpContext.Application["gUsuario"].ToString();
                var data = ProyectoRecurso.Instance.Upd_ProyectoRecurso(Datos);
                return Json(data, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                return Json(e.Message, JsonRequestBehavior.AllowGet);
            }

        }
        [HttpPost]
        public JsonResult Del_ProyectoRecurso(SGP_Entity.ProyectoRecurso Datos)
        {
            try
            {
                Datos.co_usuario_eliminacion = HttpContext.Application["gUsuario"].ToString();
                var data = ProyectoRecurso.Instance.Del_ProyectoRecurso(Datos);
                return Json(data, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                return Json(e.Message, JsonRequestBehavior.AllowGet);
            }

        }
    }
}