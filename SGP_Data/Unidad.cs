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
    public class Unidad
    {
        private readonly static Unidad _instance = new Unidad();

        private Unidad()
        {
        }

        public static Unidad Instance
        {
            get
            {
                return _instance;
            }
        }

        public int Ins_Unidad(SGP_Entity.Unidad ent)
        {
            int retorno = 0;

            SqlConnection con = new SqlConnection();
            con.ConnectionString = ConfigurationManager.ConnectionStrings["cnx"].ConnectionString;

            try
            {
                SqlCommand cmd = new SqlCommand();
                cmd.Connection = con;

                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "Sp_Ins_Unidad";

                //Inicio Parámetros
                cmd.Parameters.Add("@de_unidad", SqlDbType.VarChar, 100).Value = ent.de_unidad;
                cmd.Parameters.Add("@sm_unidad", SqlDbType.VarChar, 3).Value = ent.sm_unidad;
                cmd.Parameters.Add("@ti_unidad", SqlDbType.Char, 4).Value = ent.ti_unidad;
                cmd.Parameters.Add("@fg_unidad", SqlDbType.VarChar, 11).Value = ent.fg_unidad;
                cmd.Parameters.Add("@st_unidad", SqlDbType.Char, 1).Value = ent.st_unidad;
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

        public int Upd_Unidad(SGP_Entity.Unidad ent)
        {
            int retorno = 0;

            SqlConnection con = new SqlConnection();
            con.ConnectionString = ConfigurationManager.ConnectionStrings["cnx"].ConnectionString;

            try
            {
                SqlCommand cmd = new SqlCommand();
                cmd.Connection = con;

                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "Sp_Upd_Unidad";

                //Inicio Parámetros
                cmd.Parameters.Add("@co_unidad", SqlDbType.Int).Value = ent.co_unidad;
                cmd.Parameters.Add("@de_unidad", SqlDbType.VarChar, 30).Value = ent.de_unidad;
                cmd.Parameters.Add("@sm_unidad", SqlDbType.VarChar, 5).Value = ent.sm_unidad;
                cmd.Parameters.Add("@ti_unidad", SqlDbType.Char, 1).Value = ent.ti_unidad;
                cmd.Parameters.Add("@fg_unidad", SqlDbType.VarChar, 1).Value = ent.fg_unidad;
                cmd.Parameters.Add("@st_unidad", SqlDbType.Char, 1).Value = ent.st_unidad;
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

        public int Del_Unidad(SGP_Entity.Unidad ent)
        {
            int retorno = 0;

            SqlConnection con = new SqlConnection();
            con.ConnectionString = ConfigurationManager.ConnectionStrings["cnx"].ConnectionString;

            try
            {
                SqlCommand cmd = new SqlCommand();
                cmd.Connection = con;

                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "Sp_Del_Unidad";

                //Inicio Parámetros
                cmd.Parameters.Add("@co_unidad", SqlDbType.Int).Value = ent.co_unidad;
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

        public List<SGP_Entity.Unidad> Sel_Unidad(SGP_Entity.Unidad ent)
        {
            List<SGP_Entity.Unidad> lista = new List<SGP_Entity.Unidad>();

            SqlConnection con = new SqlConnection();
            con.ConnectionString = ConfigurationManager.ConnectionStrings["cnx"].ConnectionString;

            try
            {
                SqlCommand cmd = new SqlCommand();
                if (con.State == ConnectionState.Closed) { con.Open(); }

                cmd.Connection = con;

                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "Sp_Sel_Unidad";

                //Inicio Parámetros
                cmd.Parameters.Add("@de_unidad", SqlDbType.Char, 1).Value = ent.de_unidad;
                cmd.Parameters.Add("@co_unidad", SqlDbType.Int).Value = ent.co_unidad;
                cmd.Parameters.Add("@st_unidad", SqlDbType.Char, 1).Value = ent.st_unidad;
                //Fin Parámetros

                SqlDataReader dr;
                dr = cmd.ExecuteReader();

                while (dr.Read())
                {
                    SGP_Entity.Unidad ar = new SGP_Entity.Unidad();
                    ar.co_unidad = Convert.ToInt32(dr["co_unidad"].ToString());
                    ar.de_unidad = dr["de_unidad"].ToString();
                    ar.sm_unidad = dr["sm_unidad"].ToString();
                    ar.st_unidad = dr["st_unidad"].ToString();
                    ar.tx_valor1 = (ar.st_unidad == "1" ? "SI" : "NO");

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
