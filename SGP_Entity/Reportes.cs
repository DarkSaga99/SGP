using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SGP_Entity
{
    public class Reportes
    {
        public int anio { get; set; }
        public int anioAnterior { get; set; }
        public class ProgramacionFacturacion
        {
            public string Proyecto { get; set; }
            public string Enero { get; set; }
            public string Febrero { get; set; }
            public string Marzo { get; set; }
            public string Abril { get; set; }
            public string Mayo { get; set; }
            public string Junio { get; set; }
            public string Julio { get; set; }
            public string Agosto { get; set; }
            public string Setiembre { get; set; }
            public string Octubre { get; set; }
            public string Noviembre { get; set; }
            public string Diciembre { get; set; }
            public string total { get; set; }
        }

        public class FacturacionMes {
            public string NombreMes { get; set; }
            public decimal Importe { get; set; }
            public string SimboloMoneda { get; set; }
        }


        public class ConsultaEjecucionPago
        {
            public string so_interna { get; set; }
            public string nu_ordencompra { get; set; }
            public string nu_recepcion { get; set; }
            public string nu_facturacion { get; set; }
            public decimal mo_importefacturacion { get; set; }
            public string co_SRT { get; set; }
            public string de_proyecto { get; set; }
            public string fe_pago { get; set; }

        }


        public class ConsultaProgramacionPago
        {
            public string id_cronograma { get; set; }
            public string de_proyecto { get; set; }
            public string co_SRT { get; set; }
            public string SimboloMoneda { get; set; }
            public decimal mo_importe { get; set; }
            public string nu_hito { get; set; }
            public string de_hito { get; set; }
            public string co_responsable { get; set; }
            public string Responsable { get; set; }
            public string EstadoProgramacionPago { get; set; }
            public string st_cronograma { get; set; }
            public string fe_pago { get; set; }
            public string fe_programada { get; set; }

        }



    }
}
