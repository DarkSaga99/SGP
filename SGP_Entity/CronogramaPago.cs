using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SGP_Entity
{
    public class CronogramaPago : TGeneral
    {
        public int id_cronograma { get; set; }
        public int co_proyecto { get; set; }
        public string fe_programada { get; set; }
        public decimal mo_importe { get; set; }
        public int nu_hito { get; set; }
        public string de_hito { get; set; }
        public string ob_cronograma { get; set; }
        public string fe_creacion { get; set; }
        public string co_usuario { get; set; }
        public string ti_cronograma { get; set; }
        public string fg_cronograma { get; set; }
        public string st_cronograma { get; set; }
        public string fe_pago { get; set; }
        public string nu_oc { get; set; }
        public string nu_recepcion { get; set; }
        public string so_interna { get; set; }
        public int st_registro { get; set; }
        public string de_proyecto { get; set; }
    }
}
