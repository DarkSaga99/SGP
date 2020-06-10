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
   public class GrupoPartida
    {
        private readonly static GrupoPartida _instance = new GrupoPartida();

        private GrupoPartida()
        {
        }

        public static GrupoPartida Instance
        {
            get
            {
                return _instance;
            }
        }
        public int Ins_GrupoPartida(SGP_Entity.GrupoPartida ent)
        {
            int retorno = 0;

            SqlConnection con = new SqlConnection();
            con.ConnectionString = ConfigurationManager.ConnectionStrings["cnx"].ConnectionString;

            try
            {
                SqlCommand cmd = new SqlCommand();
                cmd.Connection = con;

                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "Sp_Ins_GrupoPartida";

                //Inicio Parámetros
                cmd.Parameters.Add("@de_GrupoPartida", SqlDbType.VarChar, 100).Value = ent.de_GrupoPartida;
                cmd.Parameters.Add("@ti_GrupoPartida", SqlDbType.Char, 4).Value = ent.ti_GrupoPartida;
                cmd.Parameters.Add("@fg_GrupoPartida", SqlDbType.VarChar, 11).Value = ent.fg_GrupoPartida;
                cmd.Parameters.Add("@st_GrupoPartida", SqlDbType.Char, 1).Value = ent.st_GrupoPartida;
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

        public int Upd_GrupoPartida(SGP_Entity.GrupoPartida ent)
        {
            int retorno = 0;

            SqlConnection con = new SqlConnection();
            con.ConnectionString = ConfigurationManager.ConnectionStrings["cnx"].ConnectionString;

            try
            {
                SqlCommand cmd = new SqlCommand();
                cmd.Connection = con;

                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "Sp_Upd_GrupoPartida";

                //Inicio Parámetros
                cmd.Parameters.Add("@co_GrupoPartida", SqlDbType.Int).Value = ent.co_GrupoPartida;
                cmd.Parameters.Add("@de_GrupoPartida", SqlDbType.VarChar, 30).Value = ent.de_GrupoPartida;
                cmd.Parameters.Add("@ti_GrupoPartida", SqlDbType.Char, 1).Value = ent.ti_GrupoPartida;
                cmd.Parameters.Add("@fg_GrupoPartida", SqlDbType.VarChar, 1).Value = ent.fg_GrupoPartida;
                cmd.Parameters.Add("@st_GrupoPartida", SqlDbType.Char, 1).Value = ent.st_GrupoPartida;
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

        public int Del_GrupoPartida(SGP_Entity.GrupoPartida ent)
        {
            int retorno = 0;

            SqlConnection con = new SqlConnection();
            con.ConnectionString = ConfigurationManager.ConnectionStrings["cnx"].ConnectionString;

            try
            {
                SqlCommand cmd = new SqlCommand();
                cmd.Connection = con;

                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "Sp_Del_GrupoPartida";

                //Inicio Parámetros
                cmd.Parameters.Add("@co_GrupoPartida", SqlDbType.Int).Value = ent.co_GrupoPartida;
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

        public List<SGP_Entity.GrupoPartida> Sel_GrupoPartida(SGP_Entity.GrupoPartida ent)
        {
            List<SGP_Entity.GrupoPartida> lista = new List<SGP_Entity.GrupoPartida>();

            SqlConnection con = new SqlConnection();
            con.ConnectionString = ConfigurationManager.ConnectionStrings["cnx"].ConnectionString;

            try
            {
                SqlCommand cmd = new SqlCommand();
                if (con.State == ConnectionState.Closed) { con.Open(); }

                cmd.Connection = con;

                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "Sp_Sel_GrupoPartida";

                //Inicio Parámetros
                cmd.Parameters.Add("@de_GrupoPartida", SqlDbType.Char, 1).Value = ent.de_GrupoPartida;
                cmd.Parameters.Add("@co_GrupoPartida", SqlDbType.Int).Value = ent.co_GrupoPartida;
                cmd.Parameters.Add("@st_GrupoPartida", SqlDbType.Char, 1).Value = ent.st_GrupoPartida;

                //Fin Parámetros

                SqlDataReader dr;
                dr = cmd.ExecuteReader();

                while (dr.Read())
                {
                    SGP_Entity.GrupoPartida ar = new SGP_Entity.GrupoPartida();
                    ar.co_GrupoPartida = Convert.ToInt32(dr["co_GrupoPartida"].ToString());
                    ar.de_GrupoPartida = dr["de_GrupoPartida"].ToString();
                    ar.st_GrupoPartida = dr["st_GrupoPartida"].ToString();
                    ar.tx_valor1 = (ar.st_GrupoPartida == "1" ? "SI" : "NO");


                    lista.Add(ar);
                }


                return lista;

            }
            catch (Exception)
            {

                throw;
            }
        }

        public List<SGP_Entity.GrupoPartida> Sel_ComboGrupoPartida(SGP_Entity.GrupoPartida ent)
        {
            List<SGP_Entity.GrupoPartida> lista = new List<SGP_Entity.GrupoPartida>();

            SqlConnection con = new SqlConnection();
            con.ConnectionString = ConfigurationManager.ConnectionStrings["cnx"].ConnectionString;

            try
            {
                SqlCommand cmd = new SqlCommand();
                if (con.State == ConnectionState.Closed) { con.Open(); }

                cmd.Connection = con;

                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "Sp_Sel_ComboGrupoPartida";

                //Inicio Parámetros
                
                //Fin Parámetros

                SqlDataReader dr;
                dr = cmd.ExecuteReader();

                while (dr.Read())
                {
                    SGP_Entity.GrupoPartida ar = new SGP_Entity.GrupoPartida();
                    ar.co_GrupoPartida = Convert.ToInt32(dr["co_GrupoPartida"].ToString());
                    ar.de_GrupoPartida = dr["de_GrupoPartida"].ToString();
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
