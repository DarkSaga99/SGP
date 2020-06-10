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
    public class Proveedor
    {
        private readonly static Proveedor _instance = new Proveedor();

        private Proveedor()
        {
        }

        public static Proveedor Instance
        {
            get
            {
                return _instance;
            }
        }
        public int Ins_Proveedor(SGP_Entity.Proveedor ent)
        {
            int retorno = 0;

            SqlConnection con = new SqlConnection();
            con.ConnectionString = ConfigurationManager.ConnectionStrings["cnx"].ConnectionString;

            try
            {
                SqlCommand cmd = new SqlCommand();
                cmd.Connection = con;

                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "Sp_Ins_Proveedor";

                //Inicio Parámetros
                cmd.Parameters.Add("@de_proveedor", SqlDbType.VarChar, 100).Value = ent.de_proveedor;
                cmd.Parameters.Add("@co_usuario_registro", SqlDbType.Char, 20).Value = ent.co_usuario_registro;
                cmd.Parameters.Add("@ti_documento", SqlDbType.Char, 4).Value = ent.ti_documento;
                cmd.Parameters.Add("@nu_documento", SqlDbType.VarChar, 15).Value = ent.nu_documento;
                cmd.Parameters.Add("@ti_proveedor", SqlDbType.Char, 1).Value = ent.ti_proveedor;
                cmd.Parameters.Add("@fg_proveedor", SqlDbType.Char, 1).Value = ent.fg_proveedor;
                cmd.Parameters.Add("@st_proveedor", SqlDbType.Char, 1).Value = ent.st_proveedor;
                cmd.Parameters.Add("@di_proveedor", SqlDbType.VarChar, 100).Value = ent.di_proveedor;
                cmd.Parameters.Add("@co_ubigeo", SqlDbType.Char, 6).Value = ent.co_ubigeo;
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
                return 0;
                //throw;
            }
        }

        public List<SGP_Entity.Proveedor> Sel_Proveedor(SGP_Entity.Proveedor ent)
        {
            List<SGP_Entity.Proveedor> lista = new List<SGP_Entity.Proveedor>();

            SqlConnection con = new SqlConnection();
            con.ConnectionString = ConfigurationManager.ConnectionStrings["cnx"].ConnectionString;

            try
            {
                SqlCommand cmd = new SqlCommand();
                if (con.State == ConnectionState.Closed) { con.Open(); }

                cmd.Connection = con;

                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "Sp_Sel_Proveedor";

                //Inicio Parámetros
                cmd.Parameters.Add("@de_proveedor", SqlDbType.VarChar, 100).Value = ent.de_proveedor;
                cmd.Parameters.Add("@ti_documento", SqlDbType.Char, 4).Value = ent.ti_documento;
                cmd.Parameters.Add("@nu_documento", SqlDbType.VarChar, 15).Value = ent.nu_documento;

                //Fin Parámetros

                SqlDataReader dr;
                dr = cmd.ExecuteReader();

                while (dr.Read())
                {
                    SGP_Entity.Proveedor Pro = new SGP_Entity.Proveedor();
                    Pro.co_proveedor = Convert.ToInt32(dr["co_proveedor"].ToString());
                    Pro.de_proveedor = dr["de_proveedor"].ToString();
                    Pro.ti_documento = dr["ti_documento"].ToString();
                    Pro.nu_documento = dr["nu_documento"].ToString();
                    Pro.co_ubigeo = dr["co_ubigeo"].ToString();
                    Pro.de_tabla = dr["de_tabla"].ToString();
                    Pro.di_proveedor = dr["di_proveedor"].ToString();
                    Pro.st_proveedor = dr["st_proveedor"].ToString();
                    Pro.tx_valor1 = (Pro.st_proveedor == "1" ? "SI" : "NO");
                    lista.Add(Pro);
                }

                return lista;

            }
            catch (Exception)
            {

                throw;
            }
        }

        public int Upd_Proveedor(SGP_Entity.Proveedor ent)
        {
            int retorno = 0;

            SqlConnection con = new SqlConnection();
            con.ConnectionString = ConfigurationManager.ConnectionStrings["cnx"].ConnectionString;
        
            try
            {
                SqlCommand cmd = new SqlCommand();
                cmd.Connection = con;

                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "Sp_Upd_Proveedor";

                //Inicio Parámetros
                cmd.Parameters.Add("@co_proveedor", SqlDbType.Int).Value = ent.co_proveedor;
                cmd.Parameters.Add("@de_proveedor", SqlDbType.VarChar, 100).Value = ent.de_proveedor;
                cmd.Parameters.Add("@ti_documento", SqlDbType.Char, 4).Value = ent.ti_documento;
                cmd.Parameters.Add("@nu_documento", SqlDbType.VarChar, 15).Value = ent.nu_documento;
                cmd.Parameters.Add("@ti_proveedor", SqlDbType.Char, 1).Value = ent.ti_proveedor;
                cmd.Parameters.Add("@fg_proveedor", SqlDbType.Char, 1).Value = ent.fg_proveedor;
                cmd.Parameters.Add("@st_proveedor", SqlDbType.Char, 1).Value = ent.st_proveedor;
                cmd.Parameters.Add("@di_proveedor", SqlDbType.VarChar, 100).Value = ent.di_proveedor;
                cmd.Parameters.Add("@co_usuario_modificacion", SqlDbType.Char, 20).Value = ent.co_usuario_modificacion;
                cmd.Parameters.Add("@co_ubigeo", SqlDbType.Char, 6).Value = ent.co_ubigeo;
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

        public int Del_Proveedor(SGP_Entity.Proveedor ent)
        {
            int retorno = 0;

            SqlConnection con = new SqlConnection();
            con.ConnectionString = ConfigurationManager.ConnectionStrings["cnx"].ConnectionString;

            try
            {
                SqlCommand cmd = new SqlCommand();
                cmd.Connection = con;

                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "Sp_Del_Proveedor";

                //Inicio Parámetros
                cmd.Parameters.Add("@co_Proveedor", SqlDbType.Int).Value = ent.co_proveedor;
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
    }
}
