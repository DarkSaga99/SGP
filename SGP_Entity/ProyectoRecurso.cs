using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SGP_Entity
{
    public class ProyectoRecurso : TGeneral
    {
        public int co_proyecto_recurso { get; set; }
        public int co_proyecto { get; set; }
        public int co_recurso { get; set; }
        public int st_estado { get; set; }
        public int nu_porcentaje { get; set; }
        public int co_rol { get; set; }
        public string de_recurso { get; set; }
        public string de_rol { get; set; }


    }
}
