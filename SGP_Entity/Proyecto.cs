using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SGP_Entity
{
    public class Proyecto : TGeneral
    {
        public int co_proyecto { get; set; }
        public string de_proyecto { get; set; }
        public string co_SRT { get; set; }
        public string ti_proyecto { get; set; }
        public string fg_proyecto { get; set; }
        public string st_proyecto { get; set; }
        public string fe_inicio { get; set; }
        public string fe_fin { get; set; }
        public decimal mo_total { get; set; }
        public decimal mo_avance { get; set; }
        public decimal mo_pendiente { get; set; }
        public decimal mo_adicional { get; set; }
        public int co_moneda { get; set; }
        public string sm_moneda { get; set; }
        public int co_cliente { get; set; }
        public int co_responsable { get; set; }
        public int co_recurso { get; set; }
        public decimal mo_presupuestado { get; set; }
        public int cn_recursos { get; set; }
    }
}
