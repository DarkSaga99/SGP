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
    public class Proyecto
    {
        private static Proyecto accion;
        private Proyecto() { }
        public static Proyecto Instance
        {
            get
            {
                if (accion == null)
                {
                    accion = new Proyecto();
                }
                return accion;
            }
        }

        public List<SGP_Entity.Proyecto> Sel_Proyecto(SGP_Entity.Proyecto C)
        {
            using (SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["cnx"].ConnectionString))
            {
                con.Open();
                using (SqlCommand com = new SqlCommand("Sp_Sel_PROYECTO", con))
                {
                    com.CommandType = CommandType.StoredProcedure;
                    com.Parameters.Add("@de_proyecto", SqlDbType.VarChar, 100).Value = C.de_proyecto;
                    com.Parameters.Add("@co_SRT", SqlDbType.Char, 30).Value = C.co_SRT;
                    com.Parameters.Add("@fe_inicio", SqlDbType.DateTime).Value = C.fe_inicio;
                    com.Parameters.Add("@st_proyecto", SqlDbType.Char,1).Value = C.st_proyecto;
                    com.Parameters.Add("@de_responsable", SqlDbType.VarChar, 150).Value = C.ti_proyecto;

                    List<SGP_Entity.Proyecto> list = new List<SGP_Entity.Proyecto>();
                    using (IDataReader dataReader = com.ExecuteReader())
                    {

                        while (dataReader.Read())
                        {

                            SGP_Entity.Proyecto obj = new SGP_Entity.Proyecto();

                            if (dataReader["co_proyecto"] != DBNull.Value) { obj.co_proyecto = (int)dataReader["co_proyecto"]; }
                            if (dataReader["de_proyecto"] != DBNull.Value) { obj.de_proyecto = (string)dataReader["de_proyecto"]; }
                            if (dataReader["co_SRT"] != DBNull.Value) { obj.co_SRT = (string)dataReader["co_SRT"]; }
                            if (dataReader["ti_proyecto"] != DBNull.Value) { obj.ti_proyecto = (string)dataReader["ti_proyecto"]; }
                            if (dataReader["fg_proyecto"] != DBNull.Value) { obj.fg_proyecto = (string)dataReader["fg_proyecto"]; }
                            if (dataReader["st_proyecto"] != DBNull.Value) { obj.st_proyecto = (string)dataReader["st_proyecto"]; }
                            if (dataReader["fe_inicio"] != DBNull.Value) { obj.fe_inicio = (dataReader["fe_inicio"].ToString() != "" ? dataReader["fe_inicio"].ToString().Substring(0, 10) : ""); }
                            if (dataReader["fe_fin"] != DBNull.Value) { obj.fe_fin = (dataReader["fe_fin"].ToString() != "" ? dataReader["fe_fin"].ToString().Substring(0, 10) : ""); }
                            if (dataReader["mo_total"] != DBNull.Value) { obj.mo_total = (decimal)dataReader["mo_total"]; }
                            if (dataReader["mo_avance"] != DBNull.Value) { obj.mo_avance = (decimal)dataReader["mo_avance"]; }
                            if (dataReader["mo_pendiente"] != DBNull.Value) { obj.mo_pendiente = (decimal)dataReader["mo_pendiente"]; }
                            if (dataReader["mo_adicional"] != DBNull.Value) { obj.mo_adicional = (decimal)dataReader["mo_adicional"]; }
                            if (dataReader["co_moneda"] != DBNull.Value) { obj.co_moneda = (int)dataReader["co_moneda"]; }
                            if (dataReader["sm_moneda"] != DBNull.Value) { obj.sm_moneda = (string)dataReader["sm_moneda"]; }
                            if (dataReader["co_cliente"] != DBNull.Value) { obj.co_cliente = (int)dataReader["co_cliente"]; }
                            if (dataReader["co_responsable"] != DBNull.Value) { obj.co_responsable = (int)dataReader["co_responsable"]; }
                            if (dataReader["mo_presupuestado"] != DBNull.Value) { obj.mo_presupuestado = (decimal)dataReader["mo_presupuestado"]; }
                            if (dataReader["de_cliente"] != DBNull.Value) { obj.tx_valor1 = (string)dataReader["de_cliente"]; }
                            if (dataReader["de_responsable"] != DBNull.Value) { obj.tx_valor2 = (string)dataReader["de_responsable"]; }
                            if (dataReader["stde_proyecto"] != DBNull.Value) { obj.tx_valor3 = (string)dataReader["stde_proyecto"]; }
                            if (dataReader["cn_recursos"] != DBNull.Value) { obj.cn_recursos = (int)dataReader["cn_recursos"]; }

                            list.Add(obj);

                        }

                    }
                    return list;
                }

            }
        }
        public int Ins_Proyecto(SGP_Entity.Proyecto CP)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["cnx"].ConnectionString))
                {
                    con.Open();
                    using (SqlCommand com = new SqlCommand("Sp_Ins_PROYECTO", con))
                    {
                        com.CommandType = CommandType.StoredProcedure;
                        com.Parameters.Add("@de_proyecto", SqlDbType.VarChar, 100).Value = CP.de_proyecto;
                        com.Parameters.Add("@co_SRT", SqlDbType.VarChar, 30).Value = CP.co_SRT;
                        com.Parameters.Add("@st_proyecto", SqlDbType.Char, 1).Value = CP.st_proyecto;
                        com.Parameters.Add("@ti_proyecto", SqlDbType.Char, 1).Value = CP.ti_proyecto;
                        com.Parameters.Add("@fg_proyecto", SqlDbType.Char, 1).Value = CP.fg_proyecto;
                        com.Parameters.Add("@fe_inicio", SqlDbType.DateTime).Value = CP.fe_inicio;
                        com.Parameters.Add("@fe_fin", SqlDbType.DateTime).Value = CP.fe_fin;
                        com.Parameters.Add("@mo_total", SqlDbType.Decimal).Value = CP.mo_total;
                        com.Parameters.Add("@mo_avance", SqlDbType.Decimal).Value = CP.mo_avance;
                        com.Parameters.Add("@mo_pendiente", SqlDbType.Decimal).Value = CP.mo_pendiente;
                        com.Parameters.Add("@mo_adicional", SqlDbType.Decimal).Value = CP.mo_adicional;
                        com.Parameters.Add("@co_moneda", SqlDbType.Int).Value = CP.co_moneda;
                        com.Parameters.Add("@co_cliente", SqlDbType.Int).Value = CP.co_cliente;
                        com.Parameters.Add("@co_responsable", SqlDbType.Int).Value = CP.co_responsable;
                        com.Parameters.Add("@mo_presupuestado", SqlDbType.Int).Value = CP.mo_presupuestado;
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
        public int Upd_Proyecto(SGP_Entity.Proyecto CP)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["cnx"].ConnectionString))
                {
                    con.Open();
                    using (SqlCommand com = new SqlCommand("Sp_Upd_Proyecto", con))
                    {
                        com.CommandType = CommandType.StoredProcedure;
                        com.Parameters.Add("@co_proyecto", SqlDbType.Int).Value = CP.co_proyecto;
                        com.Parameters.Add("@de_proyecto", SqlDbType.VarChar, 100).Value = CP.de_proyecto;
                        com.Parameters.Add("@co_SRT", SqlDbType.VarChar, 30).Value = CP.co_SRT;
                        com.Parameters.Add("@st_proyecto", SqlDbType.Char, 1).Value = CP.st_proyecto;
                        com.Parameters.Add("@ti_proyecto", SqlDbType.Char, 1).Value = CP.ti_proyecto;
                        com.Parameters.Add("@fg_proyecto", SqlDbType.Char, 1).Value = CP.fg_proyecto;
                        com.Parameters.Add("@fe_inicio", SqlDbType.DateTime).Value = CP.fe_inicio;
                        com.Parameters.Add("@fe_fin", SqlDbType.DateTime).Value = CP.fe_fin;
                        com.Parameters.Add("@mo_total", SqlDbType.Decimal).Value = CP.mo_total;
                        com.Parameters.Add("@mo_avance", SqlDbType.Decimal).Value = CP.mo_avance;
                        com.Parameters.Add("@mo_pendiente", SqlDbType.Decimal).Value = CP.mo_pendiente;
                        com.Parameters.Add("@mo_adicional", SqlDbType.Decimal).Value = CP.mo_adicional;
                        com.Parameters.Add("@co_moneda", SqlDbType.Int).Value = CP.co_moneda; 
                        com.Parameters.Add("@co_cliente", SqlDbType.Int).Value = CP.co_cliente;
                        com.Parameters.Add("@co_responsable", SqlDbType.Int).Value = CP.co_responsable;
                        com.Parameters.Add("@mo_presupuestado", SqlDbType.Int).Value = CP.mo_presupuestado;
                        com.Parameters.Add("@co_usuario_modificacion", SqlDbType.Char, 20).Value = CP.co_usuario_modificacion;
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

        public int Del_Proyecto(SGP_Entity.Proyecto CP)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["cnx"].ConnectionString))
                {
                    con.Open();
                    using (SqlCommand com = new SqlCommand("Sp_Del_PROYECTO", con))
                    {
                        com.CommandType = CommandType.StoredProcedure;
                        com.Parameters.Add("@co_proyecto", SqlDbType.Int).Value = CP.co_proyecto;
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
