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
    public class Reportes
    {
        private readonly static Reportes _instance = new Reportes();

        private Reportes(){}

        public static Reportes Instance
        {
            get
            {
                return _instance;
            }
        }

        public List<SGP_Entity.Reportes.ProgramacionFacturacion> Sp_Sel_ProgramacionFacturacion(SGP_Entity.Reportes C)
        {
            using (SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["cnx"].ConnectionString))
            {
                con.Open();
                using (SqlCommand com = new SqlCommand("Sp_Sel_ProgramacionFacturacion", con))
                {
                    com.CommandType = CommandType.StoredProcedure;
                    com.Parameters.Add("@argAnio", SqlDbType.Int).Value = C.anio;

                    List<SGP_Entity.Reportes.ProgramacionFacturacion> list = new List<SGP_Entity.Reportes.ProgramacionFacturacion>();
                    using (IDataReader dataReader = com.ExecuteReader())
                    {

                        while (dataReader.Read())
                        {

                            SGP_Entity.Reportes.ProgramacionFacturacion obj = new SGP_Entity.Reportes.ProgramacionFacturacion();

                            if (dataReader["Proyecto"] != DBNull.Value) { obj.Proyecto = (string)dataReader["Proyecto"]; }
                            if (dataReader["Enero"] != DBNull.Value) { obj.Enero = dataReader["Enero"].ToString(); }
                            if (dataReader["Febrero"] != DBNull.Value) { obj.Febrero = dataReader["Febrero"].ToString(); }
                            if (dataReader["Marzo"] != DBNull.Value) { obj.Marzo = dataReader["Marzo"].ToString(); }
                            if (dataReader["Abril"] != DBNull.Value) { obj.Abril = dataReader["Abril"].ToString(); }
                            if (dataReader["Mayo"] != DBNull.Value) { obj.Mayo = dataReader["Mayo"].ToString(); }
                            if (dataReader["Junio"] != DBNull.Value) { obj.Junio = dataReader["Junio"].ToString(); }
                            if (dataReader["Julio"] != DBNull.Value) { obj.Julio = dataReader["Julio"].ToString(); }
                            if (dataReader["Agosto"] != DBNull.Value) { obj.Agosto = dataReader["Agosto"].ToString(); }
                            if (dataReader["Septiembre"] != DBNull.Value) { obj.Setiembre = dataReader["Septiembre"].ToString(); }
                            if (dataReader["Octubre"] != DBNull.Value) { obj.Octubre = dataReader["Octubre"].ToString(); }
                            if (dataReader["Noviembre"] != DBNull.Value) { obj.Noviembre = dataReader["Noviembre"].ToString(); }
                            if (dataReader["Diciembre"] != DBNull.Value) { obj.Diciembre = dataReader["Diciembre"].ToString(); }
                            if (dataReader["total"] != DBNull.Value) { obj.total = dataReader["Total"].ToString(); }

                            list.Add(obj);

                        }
                    }
                    return list;
                }

            }
        }

        public List<SGP_Entity.Reportes.FacturacionMes> Sp_Sel_FacturacionMes(SGP_Entity.Reportes C)
        {
            using (SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["cnx"].ConnectionString))
            {
                con.Open();
                using (SqlCommand com = new SqlCommand("Sp_Sel_FacturacionMes", con))
                {
                    com.CommandType = CommandType.StoredProcedure;
                    com.Parameters.Add("@argAnio", SqlDbType.Int).Value = C.anio;

                    List<SGP_Entity.Reportes.FacturacionMes> list = new List<SGP_Entity.Reportes.FacturacionMes>();
                    using (IDataReader dataReader = com.ExecuteReader())
                    {

                        while (dataReader.Read())
                        {

                            SGP_Entity.Reportes.FacturacionMes obj = new SGP_Entity.Reportes.FacturacionMes();

                            if (dataReader["NombreMes"] != DBNull.Value) { obj.NombreMes = (string)dataReader["NombreMes"]; }
                            if (dataReader["Importe"] != DBNull.Value) { obj.Importe = (decimal)dataReader["Importe"]; }
                            if (dataReader["SimboloMoneda"] != DBNull.Value) { obj.SimboloMoneda = (string)dataReader["SimboloMoneda"]; }
                            list.Add(obj);

                        }
                    }
                    return list;
                }

            }
        }

        public List<SGP_Entity.Reportes.ProgramacionFacturacion> Sp_Sel_ComparativoAnio(SGP_Entity.Reportes C)
        {
            using (SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["cnx"].ConnectionString))
            {
                con.Open();
                using (SqlCommand com = new SqlCommand("Sp_Sel_ComparativoAnual", con))
                {
                    com.CommandType = CommandType.StoredProcedure;
                    com.Parameters.Add("@argAnio", SqlDbType.Int).Value = C.anio;
                    com.Parameters.Add("@argAnioAnterior", SqlDbType.Int).Value = C.anioAnterior;

                    List<SGP_Entity.Reportes.ProgramacionFacturacion> list = new List<SGP_Entity.Reportes.ProgramacionFacturacion>();
                    using (IDataReader dataReader = com.ExecuteReader())
                    {

                        while (dataReader.Read())
                        {

                            SGP_Entity.Reportes.ProgramacionFacturacion obj = new SGP_Entity.Reportes.ProgramacionFacturacion();

                            if (dataReader["Anio"] != DBNull.Value) { obj.Proyecto = dataReader["Anio"].ToString(); }
                            if (dataReader["1"] != DBNull.Value) { obj.Enero = dataReader["1"].ToString(); }
                            if (dataReader["2"] != DBNull.Value) { obj.Febrero = dataReader["2"].ToString(); }
                            if (dataReader["3"] != DBNull.Value) { obj.Marzo = dataReader["3"].ToString(); }
                            if (dataReader["4"] != DBNull.Value) { obj.Abril = dataReader["4"].ToString(); }
                            if (dataReader["5"] != DBNull.Value) { obj.Mayo = dataReader["5"].ToString(); }
                            if (dataReader["6"] != DBNull.Value) { obj.Junio = dataReader["6"].ToString(); }
                            if (dataReader["7"] != DBNull.Value) { obj.Julio = dataReader["7"].ToString(); }
                            if (dataReader["8"] != DBNull.Value) { obj.Agosto = dataReader["8"].ToString(); }
                            if (dataReader["9"] != DBNull.Value) { obj.Setiembre = dataReader["9"].ToString(); }
                            if (dataReader["10"] != DBNull.Value) { obj.Octubre = dataReader["10"].ToString(); }
                            if (dataReader["11"] != DBNull.Value) { obj.Noviembre = dataReader["11"].ToString(); }
                            if (dataReader["12"] != DBNull.Value) { obj.Diciembre = dataReader["12"].ToString(); }
                            list.Add(obj);

                        }
                    }
                    return list;
                }

            }
        }

        public List<SGP_Entity.Reportes.ConsultaEjecucionPago> Sp_Sel_ConsultaEjecucionPago(SGP_Entity.Reportes.ConsultaEjecucionPago C)
        {
            using (SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["cnx"].ConnectionString))
            {
                con.Open();
                using (SqlCommand com = new SqlCommand("Sp_Sel_ConsultaEjecucionPago", con))
                {
                    com.CommandType = CommandType.StoredProcedure;
                    com.Parameters.Add("@so_interna", SqlDbType.VarChar,30).Value = C.so_interna;
                    com.Parameters.Add("@nu_ordencompra", SqlDbType.VarChar, 20).Value = C.nu_ordencompra;
                    com.Parameters.Add("@nu_recepcion", SqlDbType.VarChar, 20).Value = C.nu_recepcion;
                    com.Parameters.Add("@nu_facturacion", SqlDbType.VarChar,50).Value = C.nu_facturacion;

                    List<SGP_Entity.Reportes.ConsultaEjecucionPago> list = new List<SGP_Entity.Reportes.ConsultaEjecucionPago>();
                    using (IDataReader dataReader = com.ExecuteReader())
                    {
                        while (dataReader.Read())
                        {
                            SGP_Entity.Reportes.ConsultaEjecucionPago obj = new SGP_Entity.Reportes.ConsultaEjecucionPago();

                            if (dataReader["so_interna"] != DBNull.Value) { obj.so_interna = dataReader["so_interna"].ToString(); }
                            if (dataReader["nu_ordencompra"] != DBNull.Value) { obj.nu_ordencompra = dataReader["nu_ordencompra"].ToString(); }
                            if (dataReader["nu_recepcion"] != DBNull.Value) { obj.nu_recepcion = dataReader["nu_recepcion"].ToString(); }
                            if (dataReader["nu_facturacion"] != DBNull.Value) { obj.nu_facturacion = dataReader["nu_facturacion"].ToString(); }
                            if (dataReader["mo_importefacturacion"] != DBNull.Value) { obj.mo_importefacturacion = (decimal)dataReader["mo_importefacturacion"]; }
                            if (dataReader["co_SRT"] != DBNull.Value) { obj.co_SRT = dataReader["co_SRT"].ToString(); }
                            if (dataReader["de_proyecto"] != DBNull.Value) { obj.de_proyecto = dataReader["de_proyecto"].ToString(); }
                            //if (dataReader["fe_pago"] != DBNull.Value) { obj.fe_pago = dataReader["fe_pago"].ToString(); }
                            list.Add(obj);
                        }
                    }
                    return list;
                }

            }
        }


        public List<SGP_Entity.Reportes.ConsultaProgramacionPago> Sp_Sel_ConsultaProgramacionPago(SGP_Entity.Reportes.ConsultaProgramacionPago C)
        {
            using (SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["cnx"].ConnectionString))
            {
                con.Open();
                using (SqlCommand com = new SqlCommand("Sp_Sel_ConsultaProgramacionPago", con))
                {
                    com.CommandType = CommandType.StoredProcedure;
                    com.Parameters.Add("@st_cronograma", SqlDbType.VarChar, 30).Value = C.st_cronograma;
                    com.Parameters.Add("@fe_pago", SqlDbType.DateTime).Value = C.fe_pago;
                    com.Parameters.Add("@co_responsable", SqlDbType.VarChar, 30).Value = C.co_responsable;

                    List<SGP_Entity.Reportes.ConsultaProgramacionPago> list = new List<SGP_Entity.Reportes.ConsultaProgramacionPago>();
                    using (IDataReader dataReader = com.ExecuteReader())
                    {
                        while (dataReader.Read())
                        {
                            SGP_Entity.Reportes.ConsultaProgramacionPago obj = new SGP_Entity.Reportes.ConsultaProgramacionPago();

                            if (dataReader["id_cronograma"] != DBNull.Value) { obj.id_cronograma = dataReader["id_cronograma"].ToString(); }
                            if (dataReader["de_proyecto"] != DBNull.Value) { obj.de_proyecto = dataReader["de_proyecto"].ToString(); }
                            if (dataReader["co_SRT"] != DBNull.Value) { obj.co_SRT = dataReader["co_SRT"].ToString(); }
                            if (dataReader["SimboloMoneda"] != DBNull.Value) { obj.SimboloMoneda = dataReader["SimboloMoneda"].ToString(); }
                            if (dataReader["mo_importe"] != DBNull.Value) { obj.mo_importe = (decimal)dataReader["mo_importe"]; }
                            if (dataReader["nu_hito"] != DBNull.Value) { obj.nu_hito = dataReader["nu_hito"].ToString(); }
                            if (dataReader["de_hito"] != DBNull.Value) { obj.de_hito = dataReader["de_hito"].ToString(); }
                            if (dataReader["Responsable"] != DBNull.Value) { obj.Responsable = dataReader["Responsable"].ToString(); }
                            if (dataReader["fe_pago"] != DBNull.Value) { obj.fe_pago = (dataReader["fe_pago"].ToString() != "" ? dataReader["fe_pago"].ToString().Substring(0, 10) : ""); }
                            if (dataReader["fe_programada"] != DBNull.Value) { obj.fe_programada = (dataReader["fe_programada"].ToString() != "" ? dataReader["fe_programada"].ToString().Substring(0, 10) : ""); }
                            list.Add(obj);
                        }
                    }
                    return list;
                }

            }
        }




    }
}
