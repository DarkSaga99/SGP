using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SGP_Entity
{
    public class Presupuesto
    {
        public string co_partida { get; set; }
        public string co_proyecto { get; set; }
        public decimal mo_presupuestado { get; set; }
        public decimal mo_ejecutado { get; set; }
        public decimal mo_total { get; set; }
        public string ti_presupuesto { get; set; }
        public string fg_presupuesto { get; set; }
        public string st_presupuesto { get; set; }
        public DateTime fe_apliacion { get; set; }
        public string co_usuairo_ampliacion { get; set; }
        public decimal mo_cantidad { get; set; }
        public int co_moneda { get; set; }
        public int co_unidad { get; set; }
    }
}
