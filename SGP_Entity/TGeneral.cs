using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SGP_Entity
{
    public class TGeneral
    {
     
        public int co_codigo { get; set; }
        public string de_tabla { get; set; }
        public int co_tabla { get; set; }
        public string de_padre { get; set; }
        public decimal mo_valor1 { get; set; }
        public decimal mo_valor2 { get; set; }
        public decimal mo_valor3 { get; set; }
        public string tx_valor1 { get; set; }
        public string tx_valor2 { get; set; }
        public string tx_valor3 { get; set; }
        public string st_tabla { get; set; }
        public string co_usuario_registro { get; set; }
        public string co_usuario_modificacion { get; set; }
        public string co_usuario_eliminacion { get; set; }

    }
}
