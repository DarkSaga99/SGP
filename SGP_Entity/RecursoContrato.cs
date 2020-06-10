using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SGP_Entity
{
    public class RecursoContrato:TGeneral
    {
        public int CodigoRecursoContrato { get; set; }
        public int CodigoRecurso { get; set; }
        public string FechaInicioContrato { get; set; }
        public string FechaFinContrato { get; set; }
        public int CodigoMoneda { get; set; }
        public string sm_moneda { get; set; }
        public decimal ImporteContrato { get; set; }
        public string de_TipoContrato { get; set; }
        public int TipoContrato { get; set; }
        public string de_EstadoContrato { get; set; }
        public int EstadoContrato { get; set; }
        public string Sustento { get; set; }
        public string st_registro { get; set; }
        public string de_recurso { get; set; }
    }
}
