using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SGP_Entity
{
    public class Menu : TGeneral
    {
        public int co_menu { get; set; }
        public string de_menu { get; set; }
        public int nr_padre { get; set; }
        public int nr_hijo { get; set; }
        public int nr_posicion { get; set; }
        public string de_icono { get; set; }
        public string de_url { get; set; }

    }
}
