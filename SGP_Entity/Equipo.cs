using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SGP_Entity
{
    public class Equipo: TGeneral
    {
        public int CodigoEquipo { get; set; }
        public string DescripcionEquipo { get; set; }
        public int TipoEquipo { get; set; }
        public string de_TipoEquipo { get; set; }
        public int CodigoMoneda { get; set; }
        public string sm_moneda { get; set; }
        public string de_moneda { get; set; }
        public decimal TarifaEquipo { get; set; }
        public int CodigoRecursoAsociado { get; set; }
        public string de_recurso { get; set; }
        public int EstadoEquipo { get; set; }
        public string de_EstadoEquipo { get; set; }
        public string FechaInicioEquipo { get; set; }
        public string FechaFinEquipo { get; set; }
        public string Observacion { get; set; }

    }
}
