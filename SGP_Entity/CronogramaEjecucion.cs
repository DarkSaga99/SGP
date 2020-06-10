using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SGP_Entity
{
    public class CronogramaEjecucion: TGeneral
    {
        public int co_cronogramaejecucion { get; set; }
        public int co_proyecto { get; set; }
        public string de_proyecto { get; set; }
        public string nu_ordencompra { get; set; }
        public string so_interna { get; set; }
        public string nu_recepcion { get; set; }
        public int co_moneda { get; set; }
        public string fe_Ordenfacturacion { get; set; }
        public string fe_facturacion { get; set; }
        public string nu_facturacion { get; set; }
        public decimal mo_importefacturacion { get; set; }
        public string ti_cronogramaejecucion { get; set; }
        public string fg_cronogramaejecucion { get; set; }
        public string st_cronogramaejecucion { get; set; }
        public string HitoCronogramaEjecucion { get; set; }
        public string ObservacionCronogramaEjecucion { get; set; }
        public int co_cronogramapago { get; set; }

    }
}
