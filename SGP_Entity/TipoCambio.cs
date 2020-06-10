using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SGP_Entity
{
    public class TipoCambio:TGeneral
    {
        public int CodigoTipoCambio { get; set; }
        public int CodigoMoneda { get; set; }
        public string Fecha { get; set; }
        public decimal PrecioCompra { get; set; }
        public decimal PrecioVenta { get; set; }
        public string st_registro { get; set; }
        public string sm_moneda { get; set; }
        public string de_moneda { get; set; }
    }
}
