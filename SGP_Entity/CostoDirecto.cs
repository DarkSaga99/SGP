using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SGP_Entity
{
    public class CostoDirecto:TGeneral
    {
        public int CodigoCostoDirecto { get; set; }
        public string Fecha { get; set; }
        public int CodigoRecurso { get; set; }
        public string de_recurso { get; set; }
        public int CodigoEquipo { get; set; }
        public string DescripcionEquipo { get; set; }
        public int TipoCosto { get; set; }
        public int CodigoMoneda { get; set; }
        public string sm_moneda { get; set; }
        public decimal Importe { get; set; }
        public decimal CostoLocal { get; set; }
        public decimal TipoCambio { get; set; }
        public int CodigoEquipoRecurso { get; set; }
        public int CodigoCentroCosto { get; set; }
        public string Observacion { get; set; }
        public int st_registro { get; set; }
    }
}
