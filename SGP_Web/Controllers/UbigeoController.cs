using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using SGP_Data;
using System.Web.Script.Serialization;

namespace SGP_Web.Controllers
{
    public class UbigeoController : Controller
    {
        // GET: Ubigeo
        public ActionResult Index()
        {
            return View();
        }
        
        [HttpPost][Authorize]
        public JsonResult CargaComboUbigeo(SGP_Entity.Ubigeo Datos)
        {
            try
            {
                var data = Ubigeo.Instance.Sel_ComboUbigeo(Datos);

                return Json(data, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                return Json(e.Message, JsonRequestBehavior.AllowGet);
            }
        }

    }
}