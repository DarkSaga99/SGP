using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SGP_Entity
{
    public class Cliente:TGeneral
    {
        public int co_cliente { get; set; }
        public string de_cliente { get; set; }
        public string ti_documento { get; set; }
        public string nu_documento { get; set; }
        public string ti_cliente { get; set; }
        public string fg_cliente { get; set; }
        public string st_cliente { get; set; }
        public string di_cliente { get; set; }
        public string co_ubigeo { get; set; }
    }
}
