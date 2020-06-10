using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SGP_Entity
{
    public class Tareo
    {
        public DateTime fecha { get; set; }
        public string co_proyecto { get; set; }
        public int id_tareo { get; set; }
        public string ti_tareo { get; set; }
        public string fg_tareo { get; set; }
        public string st_tareo { get; set; }
        public decimal mo_cantidad { get; set; }
        public decimal mo_tarifa { get; set; }
        public decimal mo_valor { get; set; }
        public decimal mo_tareo { get; set; }
        public string co_partida { get; set; }
        public string co_ano { get; set; }
        public int co_semana { get; set; }
        public string co_recurso { get; set; }
        public int co_moneda { get; set; }
        public int co_unidad { get; set; }
    }
}
