using SGP_Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SGP_Web.Controllers
{
    public class ReportesController : Controller
    {
        // GET: Reportes
        
        public ActionResult Index()
        {
            return View();
        }



        [HttpPost]
        public ActionResult ProgramacionFacturacion(Reportes Obj)
        {
            try
            {
                var data = SGP_Data.Reportes.Instance.Sp_Sel_ProgramacionFacturacion(Obj);
                return Json(data, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                return Json(e.Message, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult FacturacionMes()
        {
            return View();
        }

        [HttpPost]
        public ActionResult FacturacionMes(Reportes Obj)
        {
            try
            {
                var data = SGP_Data.Reportes.Instance.Sp_Sel_FacturacionMes(Obj);
                return Json(data, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                return Json(e.Message, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult CrecimientoFacturacionMes()
        {
            return View();
        }

        [HttpPost]
        public ActionResult CrecimientoFacturacionMes(Reportes Obj)
        {
            try
            {
                var data = SGP_Data.Reportes.Instance.Sp_Sel_FacturacionMes(Obj);
                return Json(data, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                return Json(e.Message, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult ComparacionAnual()
        {
            return View();
        }
        [HttpPost]
        public ActionResult ComparacionAnio(Reportes Obj)
        {
            try
            {
                var data = SGP_Data.Reportes.Instance.Sp_Sel_ComparativoAnio(Obj);
                return Json(data, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                return Json(e.Message, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult ReporteEjecucionPago()
        {
            return View();
        }
        [HttpPost]
        public ActionResult ConsultaEjecucionPago(Reportes.ConsultaEjecucionPago Obj)
        {
            try
            {
                var data = SGP_Data.Reportes.Instance.Sp_Sel_ConsultaEjecucionPago(Obj);
                return Json(data, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                return Json(e.Message, JsonRequestBehavior.AllowGet);
            }
        }


        public ActionResult ReporteProgramacionPago()
        {
            return View();
        }
        [HttpPost]
        public ActionResult ConsultaProgramacionPago(Reportes.ConsultaProgramacionPago Obj)
        {
            try
            {
                var data = SGP_Data.Reportes.Instance.Sp_Sel_ConsultaProgramacionPago(Obj);
                return Json(data, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                return Json(e.Message, JsonRequestBehavior.AllowGet);
            }
        }

    }
}