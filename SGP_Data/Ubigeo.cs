using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using System.Data.SqlClient;
using System.Data;
using System.Configuration;

namespace SGP_Data
{
    public class Ubigeo
    {
        private readonly static Ubigeo _instance = new Ubigeo();

        private Ubigeo()
        {
        }

        public static Ubigeo Instance
        {
            get
            {
                return _instance;
            }
        }

        public List<SGP_Entity.Ubigeo> Sel_ComboUbigeo(SGP_Entity.Ubigeo ent)
        {
            List<SGP_Entity.Ubigeo> lista = new List<SGP_Entity.Ubigeo>();

            SqlConnection con = new SqlConnection();
            con.ConnectionString = ConfigurationManager.ConnectionStrings["cnx"].ConnectionString;

            try
            {
                SqlCommand cmd = new SqlCommand();
                if (con.State == ConnectionState.Closed) { con.Open(); }

                cmd.Connection = con;

                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "Sp_Sel_Ubigeo";
                cmd.Parameters.Add("@co_ubigeo", SqlDbType.Char, 8).Value = ent.co_ubigeo;
                cmd.Parameters.Add("@flag", SqlDbType.Char, 1).Value = ent.flag;

                //Inicio Parámetros

                //Fin Parámetros

                SqlDataReader dr;
                dr = cmd.ExecuteReader();

                while (dr.Read())
                {
                    SGP_Entity.Ubigeo obj = new SGP_Entity.Ubigeo();
                    obj.co_ubigeo = dr["co_ubigeo"].ToString();
                    obj.de_ubigeo = dr["de_ubigeo"].ToString();

                    lista.Add(obj);
                }

                return lista;

            }
            catch (Exception)
            {

                throw;
            }
        }

    }
}
