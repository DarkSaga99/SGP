using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SGP_Entity
{
    public class Responsable:TGeneral
    {
        public int co_responsable { get; set; }
        public string no_responsable { get; set; }
        public string ap_responsable { get; set; }
        public string am_responsable { get; set; }
        public string ti_responsable { get; set; }
        public string fg_responsable { get; set; }
        public string st_responsable { get; set; }
        public string ti_documento { get; set; }
        public string nu_documento { get; set; }
        public string nu_telefono { get; set; }
        public string de_correo { get; set; }
        public string ti_cargo { get; set; }
        public int co_cliente { get; set; }
        public string NombreCompleto { get; set; }
    }
}
