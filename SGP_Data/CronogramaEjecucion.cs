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
    public class CronogramaEjecucion
    {

        private static CronogramaEjecucion accion;
        private CronogramaEjecucion() { }
        public static CronogramaEjecucion Instance
        {
            get
            {
                if (accion == null)
                {
                    accion = new CronogramaEjecucion();
                }
                return accion;
            }
        }

        public List<SGP_Entity.CronogramaEjecucion> Sel_CronogramaEjecucion(SGP_Entity.CronogramaEjecucion C)
        {
            using (SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["cnx"].ConnectionString))
            {
                con.Open();
                using (SqlCommand com = new SqlCommand("Sp_Sel_CronogramaEjecucion", con))
                {
                    com.CommandType = CommandType.StoredProcedure;
                    com.Parameters.Add("@co_cronogramaejecucion", SqlDbType.Int).Value = C.co_cronogramaejecucion;
                    com.Parameters.Add("@co_proyecto", SqlDbType.VarChar, 100).Value = C.co_proyecto;

                    List<SGP_Entity.CronogramaEjecucion> list = new List<SGP_Entity.CronogramaEjecucion>();
                    using (IDataReader dataReader = com.ExecuteReader())
                    {

                        while (dataReader.Read())
                        {

                            SGP_Entity.CronogramaEjecucion obj = new SGP_Entity.CronogramaEjecucion();

                            if (dataReader["co_cronogramaejecucion"] != DBNull.Value) { obj.co_cronogramaejecucion = (int)dataReader["co_cronogramaejecucion"]; }
                            if (dataReader["co_proyecto"] != DBNull.Value) { obj.co_proyecto = (int)dataReader["co_proyecto"]; }
                            if (dataReader["nu_ordencompra"] != DBNull.Value) { obj.nu_ordencompra = (string)dataReader["nu_ordencompra"]; }
                            if (dataReader["so_interna"] != DBNull.Value) { obj.so_interna = (string)dataReader["so_interna"]; }
                            if (dataReader["nu_recepcion"] != DBNull.Value) { obj.nu_recepcion = (string)dataReader["nu_recepcion"]; }
                            if (dataReader["nu_facturacion"] != DBNull.Value) { obj.nu_facturacion = (string)dataReader["nu_facturacion"]; }
                            if (dataReader["co_moneda"] != DBNull.Value) { obj.co_moneda = (int)dataReader["co_moneda"]; }
                            if (dataReader["fe_Ordenfacturacion"] != DBNull.Value) { obj.fe_Ordenfacturacion = (dataReader["fe_Ordenfacturacion"].ToString() != "" ? dataReader["fe_Ordenfacturacion"].ToString().Substring(0, 10) : ""); } 
                            if (dataReader["fe_facturacion"] != DBNull.Value) { obj.fe_facturacion = (dataReader["fe_facturacion"].ToString() != "" ? dataReader["fe_facturacion"].ToString().Substring(0, 10) : ""); }
                            if (dataReader["mo_importefacturacion"] != DBNull.Value) { obj.mo_importefacturacion = (decimal)dataReader["mo_importefacturacion"]; }
                            if (dataReader["ti_cronogramaejecucion"] != DBNull.Value) { obj.ti_cronogramaejecucion = (string)dataReader["ti_cronogramaejecucion"]; }
                            if (dataReader["fg_cronogramaejecucion"] != DBNull.Value) { obj.fg_cronogramaejecucion = (string)dataReader["fg_cronogramaejecucion"]; }
                            if (dataReader["st_cronogramaejecucion"] != DBNull.Value) { obj.st_cronogramaejecucion = (string)dataReader["st_cronogramaejecucion"]; }
                            if (dataReader["de_tabla"] != DBNull.Value) { obj.tx_valor1 = (string)dataReader["de_tabla"]; }
                            if (dataReader["sm_moneda"] != DBNull.Value) { obj.tx_valor2 = (string)dataReader["sm_moneda"]; }
                            if (dataReader["HitoCronogramaEjecucion"] != DBNull.Value) { obj.HitoCronogramaEjecucion = (string)dataReader["HitoCronogramaEjecucion"]; }
                            if (dataReader["ObservacionCronogramaEjecucion"] != DBNull.Value) { obj.ObservacionCronogramaEjecucion = (string)dataReader["ObservacionCronogramaEjecucion"]; }

                            list.Add(obj);

                        }

                    }
                    return list;
                }

            }
        }
        public int Ins_CronogramaEjecucion(SGP_Entity.CronogramaEjecucion CP)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["cnx"].ConnectionString))
                {
                    con.Open();
                    using (SqlCommand com = new SqlCommand("Sp_Ins_CronogramaEjecucion", con))
                    {
                        com.CommandType = CommandType.StoredProcedure;
                        com.Parameters.Add("@co_proyecto", SqlDbType.Int).Value = CP.co_proyecto;
                        com.Parameters.Add("@nu_ordencompra", SqlDbType.VarChar,20).Value = CP.nu_ordencompra;
                        com.Parameters.Add("@so_interna", SqlDbType.VarChar,30).Value = CP.so_interna;
                        com.Parameters.Add("@nu_recepcion", SqlDbType.VarChar,20).Value = CP.nu_recepcion;
                        com.Parameters.Add("@nu_facturacion", SqlDbType.VarChar,50).Value = CP.nu_facturacion;
                        com.Parameters.Add("@co_moneda", SqlDbType.Int).Value = CP.co_moneda;
                        com.Parameters.Add("@fe_Ordenfacturacion", SqlDbType.DateTime).Value = CP.fe_Ordenfacturacion;
                        com.Parameters.Add("@fe_facturacion", SqlDbType.DateTime).Value = CP.fe_facturacion;
                        com.Parameters.Add("@mo_importefacturacion", SqlDbType.Decimal).Value = CP.mo_importefacturacion;
                        com.Parameters.Add("@ti_cronogramaejecucion", SqlDbType.Char,1).Value = CP.ti_cronogramaejecucion;
                        com.Parameters.Add("@fg_cronogramaejecucion", SqlDbType.Char, 1).Value = CP.fg_cronogramaejecucion;
                        com.Parameters.Add("@st_cronogramaejecucion", SqlDbType.Char, 1).Value = CP.st_cronogramaejecucion;
                        com.Parameters.Add("@co_usuario_registro", SqlDbType.Char, 20).Value = CP.co_usuario_eliminacion;
                        com.Parameters.Add("@HitoCronogramaEjecucion", SqlDbType.Char, 250).Value = CP.HitoCronogramaEjecucion;
                        com.Parameters.Add("@ObservacionCronogramaEjecucion", SqlDbType.VarChar).Value = CP.ObservacionCronogramaEjecucion;
                        com.Parameters.Add("@co_cronogramapago", SqlDbType.Int).Value = CP.co_cronogramapago;
                        com.ExecuteNonQuery();
                        return 0;
                    }
                }
            }
            catch (Exception)
            {

                throw;
            }


        }
        public int Upd_CronogramaEjecucion(SGP_Entity.CronogramaEjecucion CP)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["cnx"].ConnectionString))
                {
                    con.Open();
                    using (SqlCommand com = new SqlCommand("Sp_Upd_CronogramaEjecucion", con))
                    {
                        com.CommandType = CommandType.StoredProcedure;
                        com.Parameters.Add("@co_cronogramaejecucion", SqlDbType.Int).Value = CP.co_cronogramaejecucion;
                        com.Parameters.Add("@co_proyecto", SqlDbType.Int).Value = CP.co_proyecto;
                        com.Parameters.Add("@nu_ordencompra", SqlDbType.VarChar, 20).Value = CP.nu_ordencompra;
                        com.Parameters.Add("@so_interna", SqlDbType.VarChar, 30).Value = CP.so_interna;
                        com.Parameters.Add("@nu_recepcion", SqlDbType.VarChar, 20).Value = CP.nu_recepcion;
                        com.Parameters.Add("@nu_facturacion", SqlDbType.VarChar,50).Value = CP.nu_facturacion;
                        com.Parameters.Add("@co_moneda", SqlDbType.Int).Value = CP.co_moneda;
                        com.Parameters.Add("@fe_Ordenfacturacion", SqlDbType.DateTime).Value = CP.fe_Ordenfacturacion;
                        com.Parameters.Add("@fe_facturacion", SqlDbType.DateTime).Value = CP.fe_facturacion;
                        com.Parameters.Add("@mo_importefacturacion", SqlDbType.Decimal).Value = CP.mo_importefacturacion;
                        com.Parameters.Add("@ti_cronogramaejecucion", SqlDbType.Char, 1).Value = CP.ti_cronogramaejecucion;
                        com.Parameters.Add("@fg_cronogramaejecucion", SqlDbType.Char, 1).Value = CP.fg_cronogramaejecucion;
                        com.Parameters.Add("@st_cronogramaejecucion", SqlDbType.Char, 1).Value = CP.st_cronogramaejecucion;
                        com.Parameters.Add("@co_usuario_modificacion", SqlDbType.Char, 20).Value = CP.co_usuario_eliminacion;
                        com.Parameters.Add("@HitoCronogramaEjecucion", SqlDbType.Char, 250).Value = CP.HitoCronogramaEjecucion;
                        com.Parameters.Add("@ObservacionCronogramaEjecucion", SqlDbType.VarChar).Value = CP.ObservacionCronogramaEjecucion;                        
                        com.ExecuteNonQuery();
                        return 0;
                    }
                }
            }
            catch (Exception)
            {

                throw;
            }
        }

        public int Del_CronogramaEjecucion(SGP_Entity.CronogramaEjecucion CP)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["cnx"].ConnectionString))
                {
                    con.Open();
                    using (SqlCommand com = new SqlCommand("Sp_Del_CronogramaEjecucion", con))
                    {
                        com.CommandType = CommandType.StoredProcedure;
                        com.Parameters.Add("@co_cronogramaejecucion", SqlDbType.Int).Value = CP.co_cronogramaejecucion;
                        com.Parameters.Add("@co_usuario_eliminacion", SqlDbType.Char, 20).Value = CP.co_usuario_eliminacion;
                        com.ExecuteNonQuery();
                        return 0;
                    }
                }
            }
            catch (Exception)
            {

                throw;
            }
        }

    }
}
