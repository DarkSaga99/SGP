using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SGP_Data
{
    public class TGeneral
    {
        private readonly static TGeneral _instance = new TGeneral();

        private TGeneral()
        {
        }

        public static TGeneral Instance
        {
            get
            {
                return _instance;
            }
        }

        public int Ins_TGeneral(SGP_Entity.TGeneral ent)
        {
            int retorno = 0;

            SqlConnection con = new SqlConnection();
            con.ConnectionString = ConfigurationManager.ConnectionStrings["cnx"].ConnectionString;

            try
            {
                SqlCommand cmd = new SqlCommand();
                cmd.Connection = con;

                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "Sp_Ins_TGeneral";

                //Inicio Parámetros
                cmd.Parameters.Add("@co_tabla", SqlDbType.Int).Value = ent.co_tabla;
                cmd.Parameters.Add("@co_codigo", SqlDbType.Int).Value = ent.co_codigo;
                cmd.Parameters.Add("@de_tabla", SqlDbType.VarChar, 30).Value = ent.de_tabla;
                //cmd.Parameters.Add("@ti_tabla", SqlDbType.Char, 1).Value = ent.ti_tabla;
                //cmd.Parameters.Add("@fg_tabla", SqlDbType.Char, 1).Value = ent.fg_tabla;
                cmd.Parameters.Add("@st_tabla", SqlDbType.Char, 1).Value = ent.st_tabla;
                cmd.Parameters.Add("@mo_valor1", SqlDbType.Decimal).Value = ent.mo_valor1;
                cmd.Parameters.Add("@mo_valor2", SqlDbType.Decimal).Value = ent.mo_valor2;
                cmd.Parameters.Add("@mo_valor3", SqlDbType.Decimal).Value = ent.mo_valor3;
                cmd.Parameters.Add("@tx_valor1", SqlDbType.Char, 30).Value = ent.tx_valor1;
                cmd.Parameters.Add("@tx_valor2", SqlDbType.Char, 30).Value = ent.tx_valor2;
                cmd.Parameters.Add("@tx_valor3", SqlDbType.Char, 30).Value = ent.tx_valor3;
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

        public List<SGP_Entity.TGeneral> Sel_TGeneral(SGP_Entity.TGeneral ent)
        {
            List<SGP_Entity.TGeneral> lista = new List<SGP_Entity.TGeneral>();

            SqlConnection con = new SqlConnection();
            con.ConnectionString = ConfigurationManager.ConnectionStrings["cnx"].ConnectionString;

            try
            {
                SqlCommand cmd = new SqlCommand();
                if (con.State == ConnectionState.Closed) { con.Open(); }

                cmd.Connection = con;

                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "Sp_Sel_TGeneral";

                //Inicio Parámetros
                cmd.Parameters.Add("@co_tabla", SqlDbType.Int).Value = ent.co_tabla;
                cmd.Parameters.Add("@co_codigo", SqlDbType.Int).Value = ent.co_codigo;

                //Fin Parámetros

                SqlDataReader dr;
                dr = cmd.ExecuteReader();

                while (dr.Read())
                {
                    SGP_Entity.TGeneral tg = new SGP_Entity.TGeneral();
                 
                    tg.co_codigo = Convert.ToInt32(dr["co_codigo"].ToString());
                    tg.de_tabla = dr["de_tabla"].ToString();
                    tg.co_tabla = Convert.ToInt32(dr["co_tabla"].ToString());
                    tg.de_padre = dr["de_padre"].ToString();
                    //tg.ti_tabla = dr["ti_tabla"].ToString();
                    //tg.fg_tabla = dr["fg_tabla"].ToString();
                    tg.mo_valor1 = string.IsNullOrEmpty(dr["mo_valor1"].ToString()) ? 0 : Convert.ToDecimal(dr["mo_valor1"].ToString());
                    tg.mo_valor2 = string.IsNullOrEmpty(dr["mo_valor2"].ToString()) ? 0 : Convert.ToDecimal(dr["mo_valor2"].ToString());
                    tg.mo_valor3 = string.IsNullOrEmpty(dr["mo_valor3"].ToString()) ? 0 : Convert.ToDecimal(dr["mo_valor3"].ToString()); 
                    tg.tx_valor1 = dr["tx_valor1"].ToString();
                    tg.tx_valor2 = dr["tx_valor2"].ToString();
                    tg.tx_valor3 = dr["tx_valor3"].ToString();
                    tg.st_tabla = dr["st_tabla"].ToString();
                    if (dr["st_tabla"].ToString() == "1")
                    {
                        tg.st_tabla = "SI";
                    }
                    else
                    {
                        tg.st_tabla = "NO";
                    }


                    lista.Add(tg);
                }


                return lista;

            }
            catch (Exception)
            {

                throw;
            }
        }

        public int Upd_TGeneral(SGP_Entity.TGeneral ent)
        {
            int retorno = 0;

            SqlConnection con = new SqlConnection();
            con.ConnectionString = ConfigurationManager.ConnectionStrings["cnx"].ConnectionString;

            try
            {
                SqlCommand cmd = new SqlCommand();
                cmd.Connection = con;

                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "Sp_Upd_TGeneral";

                //Inicio Parámetros

                cmd.Parameters.Add("@co_tabla", SqlDbType.Int).Value = ent.co_tabla;
                cmd.Parameters.Add("@co_codigo", SqlDbType.Int).Value = ent.co_codigo;
                cmd.Parameters.Add("@de_tabla", SqlDbType.VarChar, 30).Value = ent.de_tabla;
                //cmd.Parameters.Add("@ti_tabla", SqlDbType.Char, 1).Value = ent.ti_tabla;
                //cmd.Parameters.Add("@fg_tabla", SqlDbType.Char, 1).Value = ent.fg_tabla;
                cmd.Parameters.Add("@st_tabla", SqlDbType.Char, 1).Value = ent.st_tabla;
                cmd.Parameters.Add("@mo_valor1", SqlDbType.Decimal).Value = ent.mo_valor1;
                cmd.Parameters.Add("@mo_valor2", SqlDbType.Decimal).Value = ent.mo_valor2;
                cmd.Parameters.Add("@mo_valor3", SqlDbType.Decimal).Value = ent.mo_valor3;
                cmd.Parameters.Add("@tx_valor1", SqlDbType.Char, 30).Value = ent.tx_valor1;
                cmd.Parameters.Add("@tx_valor2", SqlDbType.Char, 30).Value = ent.tx_valor2;
                cmd.Parameters.Add("@tx_valor3", SqlDbType.Char, 30).Value = ent.tx_valor3;
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

        public int Del_TGeneral(SGP_Entity.TGeneral ent)
        {
            int retorno = 0;

            SqlConnection con = new SqlConnection();
            con.ConnectionString = ConfigurationManager.ConnectionStrings["cnx"].ConnectionString;

            try
            {
                SqlCommand cmd = new SqlCommand();
                cmd.Connection = con;

                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "Sp_Del_TGeneral";

                //Inicio Parámetros
                cmd.Parameters.Add("@co_tabla", SqlDbType.Int).Value = ent.co_tabla;
                cmd.Parameters.Add("@co_codigo", SqlDbType.Int).Value = ent.co_codigo;
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

        public List<SGP_Entity.TGeneral> Sel_ComboTGeneral(SGP_Entity.TGeneral ent)
        {
            List<SGP_Entity.TGeneral> lista = new List<SGP_Entity.TGeneral>();

            SqlConnection con = new SqlConnection();
            con.ConnectionString = ConfigurationManager.ConnectionStrings["cnx"].ConnectionString;

            try
            {
                SqlCommand cmd = new SqlCommand();
                if (con.State == ConnectionState.Closed) { con.Open(); }

                cmd.Connection = con;

                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "Sp_Sel_ComboTGeneral";

                //Inicio Parámetros

                //Fin Parámetros

                SqlDataReader dr;
                dr = cmd.ExecuteReader();

                while (dr.Read())
                {
                    SGP_Entity.TGeneral ar = new SGP_Entity.TGeneral();
                    ar.co_codigo = Convert.ToInt32(dr["co_codigo"].ToString());
                    ar.de_tabla = dr["de_tabla"].ToString();
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
