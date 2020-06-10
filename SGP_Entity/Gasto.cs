using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SGP_Entity
{
    public class Gasto
    {
        public int co_proveedor { get; set; }
        public int co_ccosto { get; set; }
        public string co_proyecto { get; set; }
        public int id_gasto { get; set; }
        public DateTime fecha { get; set; }
        public string ti_gasto { get; set; }
        public string fg_gasto { get; set; }
        public string st_gasto { get; set; }
        public decimal mo_gasto { get; set; }
        public decimal mo_impuesto { get; set; }
        public decimal mo_base { get; set; }
        public int co_moneda { get; set; }
        public decimal mo_tc { get; set; }
        public decimal mo_real { get; set; }
    }
}
