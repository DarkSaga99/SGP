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
    public class Recurso
    {

        private readonly static Recurso _instance = new Recurso();

        private Recurso()
        {
        }

        public static Recurso Instance
        {
            get
            {
                return _instance;
            }
        }
        public int Ins_Recurso(SGP_Entity.Recurso ent)
        {
            int retorno = 0;

            SqlConnection con = new SqlConnection();
            con.ConnectionString = ConfigurationManager.ConnectionStrings["cnx"].ConnectionString;

            try
            {
                SqlCommand cmd = new SqlCommand();
                cmd.Connection = con;

                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "Sp_Ins_Recurso";

                //Inicio Parámetros
                cmd.Parameters.Add("@de_recurso", SqlDbType.VarChar, 80).Value = ent.de_recurso;
                cmd.Parameters.Add("@no_recurso", SqlDbType.VarChar, 100).Value = ent.no_recurso;
                cmd.Parameters.Add("@ap_recurso", SqlDbType.VarChar, 100).Value = ent.ap_recurso;
                cmd.Parameters.Add("@am_recurso", SqlDbType.VarChar, 100).Value = ent.am_recurso;
                cmd.Parameters.Add("@nu_documento", SqlDbType.VarChar, 15).Value = ent.nu_documento;
                cmd.Parameters.Add("@fe_ingreso", SqlDbType.DateTime).Value = ent.fe_ingreso;
                cmd.Parameters.Add("@ti_documento", SqlDbType.Char, 4).Value = ent.ti_documento;
                cmd.Parameters.Add("@st_recurso", SqlDbType.Char, 1).Value = ent.st_recurso;
                cmd.Parameters.Add("@co_area", SqlDbType.Int).Value = ent.co_area;
                cmd.Parameters.Add("@co_moneda", SqlDbType.Int).Value = ent.co_moneda;
                cmd.Parameters.Add("@mo_tarifa", SqlDbType.Decimal).Value = ent.mo_tarifa;
                cmd.Parameters.Add("@di_recurso", SqlDbType.VarChar, 100).Value = ent.di_recurso;
                cmd.Parameters.Add("@tf_recurso", SqlDbType.VarChar, 30).Value = ent.tf_recurso;                                
                cmd.Parameters.Add("@co_ubigeo", SqlDbType.Char, 6).Value = ent.co_ubigeo;
                cmd.Parameters.Add("@fe_cese", SqlDbType.DateTime).Value = ent.fe_cese;
                cmd.Parameters.Add("@co_usuario_registro", SqlDbType.VarChar, 20).Value = ent.co_usuario_registro;
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

        public List<SGP_Entity.Recurso> Sel_Recurso(SGP_Entity.Recurso ent)
        {
            List<SGP_Entity.Recurso> lista = new List<SGP_Entity.Recurso>();

            SqlConnection con = new SqlConnection();
            con.ConnectionString = ConfigurationManager.ConnectionStrings["cnx"].ConnectionString;

            try
            {
                SqlCommand cmd = new SqlCommand();
                if (con.State == ConnectionState.Closed) { con.Open(); }

                cmd.Connection = con;

                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "Sp_Sel_Recurso";

                //Inicio Parámetros
                cmd.Parameters.Add("@ti_documento", SqlDbType.Char, 4).Value = ent.ti_documento;
                cmd.Parameters.Add("@nu_documento", SqlDbType.VarChar, 15).Value = ent.nu_documento;
                cmd.Parameters.Add("@de_recurso", SqlDbType.VarChar, 80).Value = ent.de_recurso;
                //Fin Parámetros

                SqlDataReader dr;
                dr = cmd.ExecuteReader();

                while (dr.Read())
                {
                    SGP_Entity.Recurso obj = new SGP_Entity.Recurso();
                    obj.co_recurso = dr["co_recurso"].ToString();
                    obj.de_recurso = dr["de_recurso"].ToString();
                    obj.no_recurso = dr["no_recurso"].ToString();
                    obj.ap_recurso = dr["ap_recurso"].ToString();
                    obj.am_recurso = dr["am_recurso"].ToString();
                    obj.ti_documento = dr["ti_documento"].ToString();
                    obj.de_tabla = dr["de_tabla"].ToString();
                    obj.nu_documento = dr["nu_documento"].ToString();
                    obj.st_recurso = dr["st_recurso"].ToString();
                    obj.fe_ingreso = (dr["fe_ingreso"].ToString() != "" ? dr["fe_ingreso"].ToString().Substring(0, 10) : "");
                    obj.tx_valor1 = (obj.st_recurso == "1" ? "SI" : "NO");
                    obj.co_area = Convert.ToInt32(dr["co_area"].ToString());
                    obj.de_area = dr["de_area"].ToString();
                    obj.co_moneda = Convert.ToInt32(dr["co_moneda"].ToString());
                    obj.de_moneda = dr["de_moneda"].ToString();
                    obj.mo_tarifa = Convert.ToDecimal(dr["mo_tarifa"].ToString());
                    obj.di_recurso = dr["di_recurso"].ToString();
                    obj.tf_recurso = dr["tf_recurso"].ToString();
                    obj.fe_cese = (dr["fe_cese"].ToString() != "" ? dr["fe_cese"].ToString().Substring(0, 10) : "");
                    obj.co_ubigeo = dr["co_ubigeo"].ToString();

                    lista.Add(obj);
                }

                return lista;

            }
            catch (Exception)
            {

                throw;
            }
        }
        public int Upd_Recurso(SGP_Entity.Recurso ent)
        {
            int retorno = 0;

            SqlConnection con = new SqlConnection();
            con.ConnectionString = ConfigurationManager.ConnectionStrings["cnx"].ConnectionString;

            try
            {
                SqlCommand cmd = new SqlCommand();
                cmd.Connection = con;

                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "Sp_Upd_Recurso";

                //Inicio Parámetros
                cmd.Parameters.Add("@co_recurso", SqlDbType.VarChar, 11).Value = ent.co_recurso;
                cmd.Parameters.Add("@de_recurso", SqlDbType.VarChar, 80).Value = ent.de_recurso;
                cmd.Parameters.Add("@no_recurso", SqlDbType.VarChar, 100).Value = ent.no_recurso;
                cmd.Parameters.Add("@ap_recurso", SqlDbType.VarChar, 100).Value = ent.ap_recurso;
                cmd.Parameters.Add("@am_recurso", SqlDbType.VarChar, 100).Value = ent.am_recurso;
                cmd.Parameters.Add("@nu_documento", SqlDbType.VarChar, 15).Value = ent.nu_documento;
                cmd.Parameters.Add("@fe_ingreso", SqlDbType.DateTime).Value = ent.fe_ingreso;
                cmd.Parameters.Add("@ti_documento", SqlDbType.Char, 4).Value = ent.ti_documento;
                cmd.Parameters.Add("@st_recurso", SqlDbType.Char, 1).Value = ent.st_recurso;
                cmd.Parameters.Add("@co_area", SqlDbType.Int).Value = ent.co_area;
                cmd.Parameters.Add("@co_moneda", SqlDbType.Int).Value = ent.co_moneda;
                cmd.Parameters.Add("@mo_tarifa", SqlDbType.Decimal).Value = ent.mo_tarifa;
                cmd.Parameters.Add("@di_recurso", SqlDbType.VarChar, 100).Value = ent.di_recurso;
                cmd.Parameters.Add("@tf_recurso", SqlDbType.VarChar, 30).Value = ent.tf_recurso;
                cmd.Parameters.Add("@co_ubigeo", SqlDbType.Char, 6).Value = ent.co_ubigeo;
                cmd.Parameters.Add("@fe_cese", SqlDbType.DateTime).Value = ent.fe_cese;
                cmd.Parameters.Add("@co_usuario_modificacion", SqlDbType.VarChar, 20).Value = ent.co_usuario_modificacion;
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

        public int Del_Recurso(SGP_Entity.Recurso ent)
        {
            int retorno = 0;

            SqlConnection con = new SqlConnection();
            con.ConnectionString = ConfigurationManager.ConnectionStrings["cnx"].ConnectionString;

            try
            {
                SqlCommand cmd = new SqlCommand();
                cmd.Connection = con;

                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "Sp_Del_Recurso";

                //Inicio Parámetros
                cmd.Parameters.Add("@co_recurso", SqlDbType.VarChar).Value = ent.co_recurso;
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
