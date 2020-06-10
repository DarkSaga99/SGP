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
    public class Moneda
    {
        private readonly static Moneda _instance = new Moneda();

        private Moneda()
        {
        }

        public static Moneda Instance
        {
            get
            {
                return _instance;
            }
        }
        public List<SGP_Entity.Moneda> Sel_ComboMoneda(SGP_Entity.Moneda ent)
        {
            List<SGP_Entity.Moneda> lista = new List<SGP_Entity.Moneda>();

            SqlConnection con = new SqlConnection();
            con.ConnectionString = ConfigurationManager.ConnectionStrings["cnx"].ConnectionString;

            try
            {
                SqlCommand cmd = new SqlCommand();
                if (con.State == ConnectionState.Closed) { con.Open(); }

                cmd.Connection = con;

                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "Sp_Sel_ComboMoneda";

                //Inicio Parámetros

                //Fin Parámetros

                SqlDataReader dr;
                dr = cmd.ExecuteReader();

                while (dr.Read())
                {
                    SGP_Entity.Moneda obj = new SGP_Entity.Moneda();
                    obj.codigo = Convert.ToInt32(dr["codigo"].ToString());
                    obj.descripcion = dr["descripcion"].ToString();

                    lista.Add(obj);
                }

                return lista;

            }
            catch (Exception)
            {

                throw;
            }
        }

        public int Ins_Moneda(SGP_Entity.Moneda ent)
        {
            int retorno = 0;

            SqlConnection con = new SqlConnection();
            con.ConnectionString = ConfigurationManager.ConnectionStrings["cnx"].ConnectionString;

            try
            {
                SqlCommand cmd = new SqlCommand();
                cmd.Connection = con;

                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "Sp_Ins_Moneda";

                //Inicio Parámetros
                cmd.Parameters.Add("@de_moneda", SqlDbType.VarChar, 100).Value = ent.de_moneda;
                cmd.Parameters.Add("@sm_moneda", SqlDbType.VarChar, 30).Value = ent.sm_moneda;
                cmd.Parameters.Add("@ti_moneda", SqlDbType.Char, 4).Value = ent.ti_moneda;
                cmd.Parameters.Add("@fg_moneda", SqlDbType.VarChar, 11).Value = ent.fg_moneda;
                cmd.Parameters.Add("@st_moneda", SqlDbType.Char, 1).Value = ent.st_moneda;
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

        public int Upd_Moneda(SGP_Entity.Moneda ent)
        {
            int retorno = 0;

            SqlConnection con = new SqlConnection();
            con.ConnectionString = ConfigurationManager.ConnectionStrings["cnx"].ConnectionString;

            try
            {
                SqlCommand cmd = new SqlCommand();
                cmd.Connection = con;

                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "Sp_Upd_Moneda";

                //Inicio Parámetros
                cmd.Parameters.Add("@co_moneda", SqlDbType.Int).Value = ent.co_moneda;
                cmd.Parameters.Add("@de_moneda", SqlDbType.VarChar, 30).Value = ent.de_moneda;
                cmd.Parameters.Add("@sm_moneda", SqlDbType.VarChar, 5).Value = ent.sm_moneda;
                cmd.Parameters.Add("@ti_moneda", SqlDbType.Char, 1).Value = ent.ti_moneda;
                cmd.Parameters.Add("@fg_moneda", SqlDbType.VarChar, 1).Value = ent.fg_moneda;
                cmd.Parameters.Add("@st_moneda", SqlDbType.Char, 1).Value = ent.st_moneda;
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

        public int Del_Moneda(SGP_Entity.Moneda ent)
        {
            int retorno = 0;

            SqlConnection con = new SqlConnection();
            con.ConnectionString = ConfigurationManager.ConnectionStrings["cnx"].ConnectionString;

            try
            {
                SqlCommand cmd = new SqlCommand();
                cmd.Connection = con;

                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "Sp_Del_Moneda";

                //Inicio Parámetros
                cmd.Parameters.Add("@co_moneda", SqlDbType.Int).Value = ent.co_moneda;
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

        public List<SGP_Entity.Moneda> Sel_Moneda(SGP_Entity.Moneda ent)
        {
            List<SGP_Entity.Moneda> lista = new List<SGP_Entity.Moneda>();

            SqlConnection con = new SqlConnection();
            con.ConnectionString = ConfigurationManager.ConnectionStrings["cnx"].ConnectionString;

            try
            {
                SqlCommand cmd = new SqlCommand();
                if (con.State == ConnectionState.Closed) { con.Open(); }

                cmd.Connection = con;

                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "Sp_Sel_Moneda";

                //Inicio Parámetros
                cmd.Parameters.Add("@de_moneda", SqlDbType.VarChar, 30).Value = ent.de_moneda;
                cmd.Parameters.Add("@co_moneda", SqlDbType.Int).Value = ent.co_moneda;
                cmd.Parameters.Add("@st_moneda", SqlDbType.Char, 1).Value = ent.st_moneda;
                //Fin Parámetros

                SqlDataReader dr;
                dr = cmd.ExecuteReader();

                while (dr.Read())
                {
                    SGP_Entity.Moneda ar = new SGP_Entity.Moneda();
                    ar.co_moneda = Convert.ToInt32(dr["co_moneda"].ToString());
                    ar.de_moneda = dr["de_moneda"].ToString();
                    ar.sm_moneda = dr["sm_moneda"].ToString();
                    ar.st_moneda = dr["st_moneda"].ToString();
                    ar.tx_valor1 = (ar.st_moneda == "1" ? "SI" : "NO");

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
