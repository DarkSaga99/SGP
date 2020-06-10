using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace SGP_Entity
{
    public class Recurso : TGeneral
    {
        public string co_recurso { get; set; }
        public string de_recurso { get; set; }
        public string no_recurso { get; set; }
        public string ap_recurso { get; set; }
        public string am_recurso { get; set; }
        public string nu_documento { get; set; }
        public string fe_ingreso { get; set; }
        public string ti_documento { get; set; }
        public string ti_recurso { get; set; }
        public string fg_recurso { get; set; }
        public string st_recurso { get; set; }
        public int co_area { get; set; }
        public string de_area { get; set; }
        public int co_moneda { get; set; }
        public string de_moneda { get; set; }
        public decimal mo_tarifa { get; set; }
        public string di_recurso { get; set; }
        public string tf_recurso { get; set; }
        public string co_ubigeo { get; set; }
        public string fe_cese { get; set; }
        public byte[] ImagenRecurso { get; set; }
        public string URLImagenRecurso { get; set; }
        public HttpPostedFileBase ImageFile { get; set; }

    }
}
