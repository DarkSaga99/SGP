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
    public class Ccosto
    {
        private readonly static Ccosto _instance = new Ccosto();

        private Ccosto()
        {
        }

        public static Ccosto Instance
        {
            get
            {
                return _instance;
            }
        }
        public int Ins_Ccosto(SGP_Entity.Ccosto ent)
        {
            int retorno = 0;

            SqlConnection con = new SqlConnection();
            con.ConnectionString = ConfigurationManager.ConnectionStrings["cnx"].ConnectionString;

            try
            {
                SqlCommand cmd = new SqlCommand();
                cmd.Connection = con;

                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "Sp_Ins_Ccosto";

                //Inicio Parámetros
                cmd.Parameters.Add("@de_ccosto", SqlDbType.VarChar, 100).Value = ent.de_ccosto;
                cmd.Parameters.Add("@ti_ccosto", SqlDbType.Char, 4).Value = ent.ti_ccosto;
                cmd.Parameters.Add("@fg_ccosto", SqlDbType.VarChar, 11).Value = ent.fg_ccosto;
                cmd.Parameters.Add("@st_ccosto", SqlDbType.Char, 1).Value = ent.st_ccosto;
                cmd.Parameters.Add("@co_usuario_registro", SqlDbType.Char, 20).Value = ent.co_usuario_registro;
                //Fin Parámetros

                if (con.State == ConnectionState.Closed)
                {
                    con.Open();
                }

                cmd.ExecuteNonQuery();

                if (con.State == ConnectionState.Open)
                {
                    con.Close();
                }

                return retorno;

            }
            catch (Exception)
            {

                throw;
            }
        }

        public int Upd_Ccosto(SGP_Entity.Ccosto ent)
        {
            int retorno = 0;

            SqlConnection con = new SqlConnection();
            con.ConnectionString = ConfigurationManager.ConnectionStrings["cnx"].ConnectionString;

            try
            {
                SqlCommand cmd = new SqlCommand();
                cmd.Connection = con;

                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "Sp_Upd_Ccosto";

                //Inicio Parámetros
                cmd.Parameters.Add("@co_ccosto", SqlDbType.Int).Value = ent.co_ccosto;
                cmd.Parameters.Add("@de_ccosto", SqlDbType.VarChar, 30).Value = ent.de_ccosto;
                cmd.Parameters.Add("@ti_ccosto", SqlDbType.Char, 1).Value = ent.ti_ccosto;
                cmd.Parameters.Add("@fg_ccosto", SqlDbType.VarChar, 1).Value = ent.fg_ccosto;
                cmd.Parameters.Add("@st_ccosto", SqlDbType.Char, 1).Value = ent.st_ccosto;
                cmd.Parameters.Add("@co_usuario_modificacion", SqlDbType.Char, 20).Value = ent.co_usuario_modificacion;
                //Fin Parámetros

                if (con.State == ConnectionState.Closed)
                {
                    con.Open();
                }

                 cmd.ExecuteNonQuery();

                if (con.State == ConnectionState.Open)
                {
                    con.Close();
                }

                return retorno;

            }
            catch (Exception)
            {

                throw;
            }
        }

        public int Del_Ccosto(SGP_Entity.Ccosto ent)
        {
            int retorno = 0;

            SqlConnection con = new SqlConnection();
            con.ConnectionString = ConfigurationManager.ConnectionStrings["cnx"].ConnectionString;

            try
            {
                SqlCommand cmd = new SqlCommand();
                cmd.Connection = con;

                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "Sp_Del_Ccosto";

                //Inicio Parámetros
                cmd.Parameters.Add("@co_ccosto", SqlDbType.Int).Value = ent.co_ccosto;
                cmd.Parameters.Add("@co_usuario_eliminacion", SqlDbType.Char, 20).Value = ent.co_usuario_eliminacion;
                //Fin Parámetros

                if (con.State == ConnectionState.Closed)
                {
                    con.Open();
                }

                 cmd.ExecuteNonQuery();

                if (con.State == ConnectionState.Open)
                {
                    con.Close();
                }

                return retorno;

            }
            catch (Exception)
            {

                throw;
            }
        }

        public List<SGP_Entity.Ccosto> Sel_Ccosto(SGP_Entity.Ccosto ent)
        {
            List<SGP_Entity.Ccosto> lista = new List<SGP_Entity.Ccosto>();

            SqlConnection con = new SqlConnection();
            con.ConnectionString = ConfigurationManager.ConnectionStrings["cnx"].ConnectionString;

            try
            {
                SqlCommand cmd = new SqlCommand();
                if (con.State == ConnectionState.Closed) { con.Open(); }

                cmd.Connection = con;

                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "Sp_Sel_Ccosto";

                //Inicio Parámetros
                cmd.Parameters.Add("@de_ccosto", SqlDbType.Char, 1).Value = ent.de_ccosto;
                cmd.Parameters.Add("@co_ccosto", SqlDbType.Int).Value = ent.co_ccosto;
                cmd.Parameters.Add("@st_ccosto", SqlDbType.Char, 1).Value = ent.st_ccosto;
                //Fin Parámetros

                SqlDataReader dr;
                dr = cmd.ExecuteReader();

                while (dr.Read())
                {
                    SGP_Entity.Ccosto ar = new SGP_Entity.Ccosto();
                    ar.co_ccosto = Convert.ToInt32(dr["co_ccosto"].ToString());
                    ar.de_ccosto = dr["de_ccosto"].ToString();
                    ar.st_ccosto = dr["st_ccosto"].ToString();
                    ar.tx_valor1 = (ar.st_ccosto == "1" ? "SI" : "NO");


                    lista.Add(ar);
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
