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
  public  class Partida
    {
        private readonly static Partida _instance = new Partida();

        private Partida()
        {
        }

        public static Partida Instance
        {
            get
            {
                return _instance;
            }
        }
        public int Ins_Partida(SGP_Entity.Partida ent)
        {
            int retorno = 0;

            SqlConnection con = new SqlConnection();
            con.ConnectionString = ConfigurationManager.ConnectionStrings["cnx"].ConnectionString;

            try
            {
                SqlCommand cmd = new SqlCommand();
                cmd.Connection = con;

                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "Sp_Ins_Partida";

                //Inicio Parámetros
                cmd.Parameters.Add("@co_GrupoPartida", SqlDbType.Int).Value = ent.co_GrupoPartida;
                cmd.Parameters.Add("@de_partida", SqlDbType.VarChar, 100).Value = ent.de_partida;
                cmd.Parameters.Add("@ti_partida", SqlDbType.Char, 4).Value = ent.ti_partida;
                cmd.Parameters.Add("@fg_partida", SqlDbType.VarChar, 11).Value = ent.fg_partida;
                cmd.Parameters.Add("@st_partida", SqlDbType.Char, 1).Value = ent.st_partida;
                cmd.Parameters.Add("@TipoTiempo", SqlDbType.Int).Value = ent.TipoTiempo;
                cmd.Parameters.Add("@ValorTiempo", SqlDbType.Int).Value = ent.ValorTiempo;
                cmd.Parameters.Add("@co_moneda", SqlDbType.Int).Value = ent.co_moneda;
                cmd.Parameters.Add("@MontoPartida", SqlDbType.Decimal).Value = ent.MontoPartida;
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

        public int Upd_Partida(SGP_Entity.Partida ent)
        {
            int retorno = 0;

            SqlConnection con = new SqlConnection();
            con.ConnectionString = ConfigurationManager.ConnectionStrings["cnx"].ConnectionString;

            try
            {
                SqlCommand cmd = new SqlCommand();
                cmd.Connection = con;

                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "Sp_Upd_Partida";

                //Inicio Parámetros
                cmd.Parameters.Add("@co_partida", SqlDbType.Int).Value = ent.co_partida;
                cmd.Parameters.Add("@co_GrupoPartida", SqlDbType.Int).Value = ent.co_GrupoPartida;
                cmd.Parameters.Add("@de_partida", SqlDbType.VarChar, 30).Value = ent.de_partida;
                cmd.Parameters.Add("@ti_partida", SqlDbType.Char, 1).Value = ent.ti_partida;
                cmd.Parameters.Add("@fg_partida", SqlDbType.VarChar, 1).Value = ent.fg_partida;
                cmd.Parameters.Add("@st_partida", SqlDbType.Char, 1).Value = ent.st_partida;
                cmd.Parameters.Add("@TipoTiempo", SqlDbType.Int).Value = ent.TipoTiempo;
                cmd.Parameters.Add("@ValorTiempo", SqlDbType.Int).Value = ent.ValorTiempo;
                cmd.Parameters.Add("@co_moneda", SqlDbType.Int).Value = ent.co_moneda;
                cmd.Parameters.Add("@MontoPartida", SqlDbType.Decimal).Value = ent.MontoPartida;
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

        public int Del_Partida(SGP_Entity.Partida ent)
        {
            int retorno = 0;

            SqlConnection con = new SqlConnection();
            con.ConnectionString = ConfigurationManager.ConnectionStrings["cnx"].ConnectionString;

            try
            {
                SqlCommand cmd = new SqlCommand();
                cmd.Connection = con;

                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "Sp_Del_Partida";

                //Inicio Parámetros
                cmd.Parameters.Add("@co_partida", SqlDbType.Int).Value = ent.co_partida;
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

        public List<SGP_Entity.Partida> Sel_Partida(SGP_Entity.Partida ent)
        {
            List<SGP_Entity.Partida> lista = new List<SGP_Entity.Partida>();

            SqlConnection con = new SqlConnection();
            con.ConnectionString = ConfigurationManager.ConnectionStrings["cnx"].ConnectionString;

            try
            {
                SqlCommand cmd = new SqlCommand();
                if (con.State == ConnectionState.Closed) { con.Open(); }

                cmd.Connection = con;

                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "Sp_Sel_Partida";

                //Inicio Parámetros
                cmd.Parameters.Add("@de_partida", SqlDbType.VarChar, 100).Value = ent.de_partida;
                cmd.Parameters.Add("@co_GrupoPartida", SqlDbType.Int).Value = ent.co_GrupoPartida;
                cmd.Parameters.Add("@st_partida", SqlDbType.Char, 1).Value = ent.st_partida;

                //Fin Parámetros

                SqlDataReader dr;
                dr = cmd.ExecuteReader();

                while (dr.Read())
                {
                    SGP_Entity.Partida ar = new SGP_Entity.Partida();
                 
                    ar.co_partida = Convert.ToInt32(dr["co_partida"].ToString());
                    ar.de_partida = dr["de_partida"].ToString();
                    ar.co_GrupoPartida = Convert.ToInt32(dr["co_GrupoPartida"].ToString());
                    ar.de_GrupoPartida = dr["de_GrupoPartida"].ToString();
                    ar.st_partida = dr["st_partida"].ToString();
                    ar.tx_valor1 = (ar.st_partida == "1" ? "SI" : "NO");

                    if (dr["TipoTiempo"] != DBNull.Value) { ar.TipoTiempo = (int)dr["TipoTiempo"]; }
                    if (dr["de_tabla"] != DBNull.Value) { ar.de_tabla = (string)dr["de_tabla"]; }
                    if (dr["ValorTiempo"] != DBNull.Value) { ar.ValorTiempo = (int)dr["ValorTiempo"]; }
                    if (dr["co_moneda"] != DBNull.Value) { ar.co_moneda = (int)dr["co_moneda"]; }
                    if (dr["sm_moneda"] != DBNull.Value) { ar.sm_moneda = (string)dr["sm_moneda"]; }
                    if (dr["MontoPartida"] != DBNull.Value) { ar.MontoPartida = (decimal)dr["MontoPartida"]; }


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
