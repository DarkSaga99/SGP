using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SGP_Entity
{
    public class Partida: TGeneral
    {
        public int co_partida { get; set; }
        public string de_partida { get; set; }
        public string ti_partida { get; set; }
        public string fg_partida { get; set; }
        public string st_partida { get; set; }
        public int co_GrupoPartida { get; set; }
        public string de_GrupoPartida { get; set; }
        public int TipoTiempo { get; set; }
        public int ValorTiempo { get; set; }
        public int co_moneda { get; set; }
        public decimal MontoPartida { get; set; }
        public string sm_moneda { get; set; }
    }
}
