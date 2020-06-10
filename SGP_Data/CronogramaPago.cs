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
    public class CronogramaPago
    {
        private static CronogramaPago accion;
        private CronogramaPago() { }
        public static CronogramaPago Instance
        {
            get
            {
                if (accion == null)
                {
                    accion = new CronogramaPago();
                }
                return accion;
            }
        }

        public List<SGP_Entity.CronogramaPago> Sel_CronogramaPago(SGP_Entity.CronogramaPago C)
        {
            using (SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["cnx"].ConnectionString))
            {
                con.Open();
                using (SqlCommand com = new SqlCommand("Sp_Sel_CronogramaPago", con))
                {
                    com.CommandType = CommandType.StoredProcedure;
                    com.Parameters.Add("@id_cronograma", SqlDbType.Int).Value = C.id_cronograma;
                    com.Parameters.Add("@co_proyecto", SqlDbType.Int).Value = C.co_proyecto;
                    com.Parameters.Add("@de_proyecto", SqlDbType.VarChar, 100).Value = C.de_proyecto;
                    com.Parameters.Add("@st_cronograma", SqlDbType.Char, 1).Value = C.st_cronograma;

                    List<SGP_Entity.CronogramaPago> list = new List<SGP_Entity.CronogramaPago>();
                    using (IDataReader dataReader = com.ExecuteReader())
                    {

                        while (dataReader.Read())
                        {

                            SGP_Entity.CronogramaPago obj = new SGP_Entity.CronogramaPago();

                            if (dataReader["id_cronograma"] != DBNull.Value) { obj.id_cronograma = (int)dataReader["id_cronograma"]; }
                            if (dataReader["co_proyecto"] != DBNull.Value) { obj.co_proyecto = (int)dataReader["co_proyecto"]; }
                            if (dataReader["de_proyecto"] != DBNull.Value) { obj.de_proyecto = (string)dataReader["de_proyecto"]; }
                            if (dataReader["fe_programada"] != DBNull.Value) { obj.fe_programada = (dataReader["fe_programada"].ToString() != "" ? dataReader["fe_programada"].ToString().Substring(0, 10) : ""); } 
                            if (dataReader["mo_importe"] != DBNull.Value) { obj.mo_importe = (decimal)dataReader["mo_importe"]; }
                            if (dataReader["nu_hito"] != DBNull.Value) { obj.nu_hito = (int)dataReader["nu_hito"]; }
                            if (dataReader["de_hito"] != DBNull.Value) { obj.de_hito = (string)dataReader["de_hito"]; }
                            if (dataReader["ob_cronograma"] != DBNull.Value) { obj.ob_cronograma = (string)dataReader["ob_cronograma"]; }
                            if (dataReader["ti_cronograma"] != DBNull.Value) { obj.ti_cronograma = (string)dataReader["ti_cronograma"]; }
                            if (dataReader["fg_cronograma"] != DBNull.Value) { obj.fg_cronograma = (string)dataReader["fg_cronograma"]; }
                            if (dataReader["st_cronograma"] != DBNull.Value) { obj.st_cronograma = (string)dataReader["st_cronograma"]; }
                            if (dataReader["fe_pago"] != DBNull.Value) { obj.fe_pago = (dataReader["fe_pago"].ToString() != "" ? dataReader["fe_pago"].ToString().Substring(0, 10) : ""); }
                            if (dataReader["nu_oc"] != DBNull.Value) { obj.nu_oc = (string)dataReader["nu_oc"]; }
                            if (dataReader["nu_recepcion"] != DBNull.Value) { obj.nu_recepcion = (string)dataReader["nu_recepcion"]; }
                            if (dataReader["so_interna"] != DBNull.Value) { obj.so_interna = (string)dataReader["so_interna"]; }
                            if (dataReader["de_tabla"] != DBNull.Value) { obj.tx_valor3 = (string)dataReader["de_tabla"]; }
                            if (dataReader["de_moneda"] != DBNull.Value) { obj.tx_valor1 = (string)dataReader["de_moneda"]; }

                            list.Add(obj);

                        }

                    }
                    return list;
                }

            }
        }
        public int Ins_CronogramaPago(SGP_Entity.CronogramaPago CP)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["cnx"].ConnectionString))
                {
                    con.Open();
                    using (SqlCommand com = new SqlCommand("Sp_Ins_CronogramaPago", con))
                    {
                        com.CommandType = CommandType.StoredProcedure;
                        com.Parameters.Add("@co_proyecto", SqlDbType.Int).Value = CP.co_proyecto;
                        com.Parameters.Add("@fe_programada", SqlDbType.DateTime).Value = CP.fe_programada;
                        com.Parameters.Add("@mo_importe", SqlDbType.Decimal).Value = CP.mo_importe;
                        com.Parameters.Add("@nu_hito", SqlDbType.Int).Value = CP.nu_hito;
                        com.Parameters.Add("@de_hito", SqlDbType.VarChar,50).Value = CP.de_hito;
                        com.Parameters.Add("@ob_cronograma", SqlDbType.VarChar, 50).Value = CP.ob_cronograma;
                        com.Parameters.Add("@ti_cronograma", SqlDbType.Char, 1).Value = CP.ti_cronograma;
                        com.Parameters.Add("@fg_cronograma", SqlDbType.Char, 1).Value = CP.fg_cronograma;
                        com.Parameters.Add("@st_cronograma", SqlDbType.Char, 1).Value = CP.st_cronograma;
                        com.Parameters.Add("@fe_pago", SqlDbType.DateTime).Value = CP.fe_pago;
                        com.Parameters.Add("@nu_oc", SqlDbType.VarChar,20).Value = CP.nu_oc;
                        com.Parameters.Add("@nu_recepcion", SqlDbType.VarChar,30).Value = CP.nu_recepcion;
                        com.Parameters.Add("@so_interna", SqlDbType.Int).Value = CP.so_interna;
                        com.Parameters.Add("@co_usuario_registro", SqlDbType.Char, 20).Value = CP.co_usuario_registro;
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
        public int Upd_CronogramaPago(SGP_Entity.CronogramaPago CP)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["cnx"].ConnectionString))
                {
                    con.Open();
                    using (SqlCommand com = new SqlCommand("Sp_Upd_CronogramaPago", con))
                    {
                        com.CommandType = CommandType.StoredProcedure;
                        com.Parameters.Add("@id_cronograma", SqlDbType.Int).Value = CP.id_cronograma;
                        com.Parameters.Add("@co_proyecto", SqlDbType.Int).Value = CP.co_proyecto;
                        com.Parameters.Add("@fe_programada", SqlDbType.DateTime).Value = CP.fe_programada;
                        com.Parameters.Add("@mo_importe", SqlDbType.Decimal).Value = CP.mo_importe;
                        com.Parameters.Add("@nu_hito", SqlDbType.Int).Value = CP.nu_hito;
                        com.Parameters.Add("@de_hito", SqlDbType.VarChar, 50).Value = CP.de_hito;
                        com.Parameters.Add("@ob_cronograma", SqlDbType.VarChar, 50).Value = CP.ob_cronograma;
                        com.Parameters.Add("@ti_cronograma", SqlDbType.Char, 1).Value = CP.ti_cronograma;
                        com.Parameters.Add("@fg_cronograma", SqlDbType.Char, 1).Value = CP.fg_cronograma;
                        com.Parameters.Add("@st_cronograma", SqlDbType.Char, 1).Value = CP.st_cronograma;
                        com.Parameters.Add("@fe_pago", SqlDbType.DateTime).Value = CP.fe_pago;
                        com.Parameters.Add("@nu_oc", SqlDbType.VarChar, 20).Value = CP.nu_oc;
                        com.Parameters.Add("@nu_recepcion", SqlDbType.VarChar, 30).Value = CP.nu_recepcion;
                        com.Parameters.Add("@so_interna", SqlDbType.Int).Value = CP.so_interna;
                        com.Parameters.Add("@co_usuario_modificacion", SqlDbType.Char, 20).Value = CP.co_usuario_registro;
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

        public int Del_CronogramaPago(SGP_Entity.CronogramaPago CP)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["cnx"].ConnectionString))
                {
                    con.Open();
                    using (SqlCommand com = new SqlCommand("Sp_Del_CronogramaPago", con))
                    {
                        com.CommandType = CommandType.StoredProcedure;
                        com.Parameters.Add("@id_cronograma", SqlDbType.Int).Value = CP.id_cronograma;
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
