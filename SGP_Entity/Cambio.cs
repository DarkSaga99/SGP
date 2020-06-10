using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SGP_Entity
{
    public class Cambio
    {
        public DateTime fecha { get; set; }
        public decimal mo_compra { get; set; }
        public decimal mo_venta { get; set; }
        public string ti_cambio { get; set; }
        public string fg_cambio { get; set; }
        public string st_cambio { get; set; }
        public int co_moneda { get; set; }
    }
}
