using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using SGP_Data;
using System.Web.Script.Serialization;
using System.IO;

namespace SGP_Web.Controllers
{
    public class RecursoController : Controller
    {
        // GET: Recurso

        static string NombreImagen = "";
        public ActionResult Index()
        {
            return View();
        }
        [HttpPost]
        public JsonResult CargaGrilla(SGP_Entity.Recurso Datos)
        {
            try
            {
                //var data = Recurso.Instance.Sel_Recurso(Datos);
                string imageDataURL = "";
                List<SGP_Entity.Recurso> data = Recurso.Instance.Sel_Recurso(Datos);
                //foreach (SGP_Entity.Recurso item in data)
                //{
                //    imageDataURL = "";
                //    //item.URLImagenRecurso = Path.Combine(Server.MapPath("~/App_Data/Recursos"), item.nu_documento + ".JPG");
                //    string path = Path.Combine(Server.MapPath("~/App_Data/Recursos"), item.nu_documento + ".JPG");
                //    if (System.IO.File.Exists(Path.Combine(Server.MapPath("~/App_Data/Recursos"), item.nu_documento + ".JPG")))
                //    {
                //        byte[] imageByteData = System.IO.File.ReadAllBytes(path);
                //        string imageBase64Data = Convert.ToBase64String(imageByteData);
                //        imageDataURL = string.Format("data:image/png;base64,{0}", imageBase64Data);
                //    }
                //    item.URLImagenRecurso = imageDataURL;
                //}
                var jsonResult = Json(data, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception e)
            {
                return Json(e.Message, JsonRequestBehavior.AllowGet);
            }
        }
        [HttpPost]
        public JsonResult Ins_Recurso(SGP_Entity.Recurso Datos)
        {
            try
            {
                Datos.co_usuario_registro = HttpContext.Application["gUsuario"].ToString();
                //Datos.ImagenRecurso = System.IO.File.ReadAllBytes(Datos.URLImagenRecurso);
                var data = Recurso.Instance.Ins_Recurso(Datos);
                NombreImagen = Datos.nu_documento;
                return Json(data, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                return Json(e.Message, JsonRequestBehavior.AllowGet);
            }
        }
        [HttpPost]
        public JsonResult Upd_Recurso(SGP_Entity.Recurso Datos)
        {
            try
            {
                Datos.co_usuario_modificacion = HttpContext.Application["gUsuario"].ToString();
                var data = Recurso.Instance.Upd_Recurso(Datos);
                NombreImagen = Datos.nu_documento;
                return Json(data, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                return Json(e.Message, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public JsonResult SubirImagen()
        {
            try
            {
                //var file2 = Request.Files[0];
                //byte[] ImagenRecurso = System.IO.File.ReadAllBytes(file2.FileName);
                for (int i = 0; i < Request.Files.Count; i++)
                {
                    var file = Request.Files[i];
                    var fileName = Path.GetFileName(file.FileName);

                    if (System.IO.File.Exists(Path.Combine(Server.MapPath("~/App_Data/Recursos"), NombreImagen + ".JPG")))
                    {
                        System.IO.File.Delete(Path.Combine(Server.MapPath("~/App_Data/Recursos"), NombreImagen + ".JPG"));
                    }

                    var path = Path.Combine(Server.MapPath("~/App_Data/Recursos"), NombreImagen + ".JPG");
                    file.SaveAs(path);
                }


                var data = "";

                return Json(data, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                return Json(e.Message, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult Del_Recurso(SGP_Entity.Recurso Datos)
        {
            try
            {
                Datos.co_usuario_eliminacion = HttpContext.Application["gUsuario"].ToString();
                var data = Recurso.Instance.Del_Recurso(Datos);

                return Json(data, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                return Json(e.Message, JsonRequestBehavior.AllowGet);
            }

        }


        [HttpPost]
        public JsonResult ObtenerFoto(SGP_Entity.Recurso Datos)
        {
            try
            {
                string imageDataURL = string.Empty;
                string path = Path.Combine(Server.MapPath("~/App_Data/Recursos"), Datos.nu_documento + ".JPG");
                if (System.IO.File.Exists(Path.Combine(Server.MapPath("~/App_Data/Recursos"), Datos.nu_documento + ".JPG")))
                {
                    byte[] imageByteData = System.IO.File.ReadAllBytes(path);
                    string imageBase64Data = Convert.ToBase64String(imageByteData);
                    imageDataURL = string.Format("data:image/png;base64,{0}", imageBase64Data);
                }

                var jsonResult = Json(imageDataURL, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception e)
            {
                return Json(e.Message, JsonRequestBehavior.AllowGet);
            }
        }

    }
}