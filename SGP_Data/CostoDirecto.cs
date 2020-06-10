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
    public class CostoDirecto
    {
        private readonly static CostoDirecto _instance = new CostoDirecto();
        private CostoDirecto() { }
        public static CostoDirecto Instance
        {
            get
            {
                return _instance;
            }
        }

        public List<SGP_Entity.CostoDirecto> Sel_CostoDirecto(SGP_Entity.CostoDirecto C)
        {
            using (SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["cnx"].ConnectionString))
            {
                con.Open();
                using (SqlCommand com = new SqlCommand("Sp_Sel_CostoDirecto", con))
                {
                    com.CommandType = CommandType.StoredProcedure;
                    com.Parameters.Add("@CodigoCostoDirecto", SqlDbType.Int).Value = C.CodigoCostoDirecto;
                    com.Parameters.Add("@TipoCosto", SqlDbType.Int).Value = C.TipoCosto;
                    com.Parameters.Add("@Fecha", SqlDbType.DateTime).Value = C.Fecha;
                    com.Parameters.Add("@CodigoMoneda", SqlDbType.Int).Value = C.CodigoMoneda;
                    com.Parameters.Add("@Descripcion", SqlDbType.Int).Value = C.de_tabla;

                    List<SGP_Entity.CostoDirecto> list = new List<SGP_Entity.CostoDirecto>();
                    using (IDataReader dataReader = com.ExecuteReader())
                    {

                        while (dataReader.Read())
                        {

                            SGP_Entity.CostoDirecto obj = new SGP_Entity.CostoDirecto();

                            if (dataReader["CodigoCostoDirecto"] != DBNull.Value) { obj.CodigoCostoDirecto = (int)dataReader["CodigoCostoDirecto"]; }
                            if (dataReader["Fecha"] != DBNull.Value) { obj.Fecha = (dataReader["Fecha"].ToString() != "" ? dataReader["Fecha"].ToString().Substring(0, 10) : ""); }
                            if (dataReader["CodigoRecurso"] != DBNull.Value) { obj.CodigoRecurso = (int)dataReader["CodigoRecurso"]; }
                            if (dataReader["de_recurso"] != DBNull.Value) { obj.de_recurso = (string)dataReader["de_recurso"]; }
                            if (dataReader["CodigoEquipo"] != DBNull.Value) { obj.CodigoEquipo = (int)dataReader["CodigoEquipo"]; }
                            if (dataReader["DescripcionEquipo"] != DBNull.Value) { obj.DescripcionEquipo = (string)dataReader["DescripcionEquipo"]; }
                            if (dataReader["TipoCosto"] != DBNull.Value) { obj.TipoCosto = (int)dataReader["TipoCosto"]; }
                            if (dataReader["CodigoMoneda"] != DBNull.Value) { obj.CodigoMoneda = (int)dataReader["CodigoMoneda"]; }
                            if (dataReader["sm_moneda"] != DBNull.Value) { obj.sm_moneda = (string)dataReader["sm_moneda"]; }
                            if (dataReader["Importe"] != DBNull.Value) { obj.Importe = (decimal)dataReader["Importe"]; }
                            if (dataReader["CostoLocal"] != DBNull.Value) { obj.CostoLocal = (decimal)dataReader["CostoLocal"]; }
                            if (dataReader["TipoCambio"] != DBNull.Value) { obj.TipoCambio = (decimal)dataReader["TipoCambio"]; }
                            if (dataReader["CodigoEquipoRecurso"] != DBNull.Value) { obj.CodigoEquipoRecurso = (int)dataReader["CodigoEquipoRecurso"]; }
                            if (dataReader["CodigoCentroCosto"] != DBNull.Value) { obj.CodigoCentroCosto = (int)dataReader["CodigoCentroCosto"]; }
                            if (dataReader["Observacion"] != DBNull.Value) { obj.Observacion = (string)dataReader["Observacion"]; }                            
                            list.Add(obj);

                        }

                    }
                    return list;
                }

            }
        }
        public int Ins_CostoDirecto(SGP_Entity.CostoDirecto CP)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["cnx"].ConnectionString))
                {
                    con.Open();
                    using (SqlCommand com = new SqlCommand("Sp_Ins_CostoDirecto", con))
                    {
                        com.CommandType = CommandType.StoredProcedure;
                        com.Parameters.Add("@Fecha", SqlDbType.DateTime).Value = CP.Fecha;
                        com.Parameters.Add("@CodigoRecurso", SqlDbType.Int).Value = CP.CodigoRecurso;
                        com.Parameters.Add("@CodigoEquipo", SqlDbType.Int).Value = CP.CodigoEquipo;
                        com.Parameters.Add("@TipoCosto", SqlDbType.Int).Value = CP.TipoCosto;
                        com.Parameters.Add("@CodigoMoneda", SqlDbType.Int).Value = CP.CodigoMoneda;
                        com.Parameters.Add("@Importe", SqlDbType.Decimal).Value = CP.Importe;
                        com.Parameters.Add("@CostoLocal", SqlDbType.Decimal).Value = CP.CostoLocal;
                        com.Parameters.Add("@TipoCambio", SqlDbType.Decimal).Value = CP.TipoCambio;
                        com.Parameters.Add("@CodigoEquipoRecurso", SqlDbType.Int).Value = CP.CodigoEquipoRecurso;
                        com.Parameters.Add("@CodigoCentroCosto", SqlDbType.Int).Value = CP.CodigoCentroCosto;
                        com.Parameters.Add("@Observacion", SqlDbType.VarChar).Value = CP.Observacion;
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
        public int Upd_CostoDirecto(SGP_Entity.CostoDirecto CP)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["cnx"].ConnectionString))
                {
                    con.Open();
                    using (SqlCommand com = new SqlCommand("Sp_Upd_CostoDirecto", con))
                    {
                        com.CommandType = CommandType.StoredProcedure;
                        com.Parameters.Add("@CodigoCostoDirecto", SqlDbType.Int).Value = CP.CodigoCostoDirecto;
                        com.Parameters.Add("@Fecha", SqlDbType.DateTime).Value = CP.Fecha;
                        com.Parameters.Add("@CodigoRecurso", SqlDbType.Int).Value = CP.CodigoRecurso;
                        com.Parameters.Add("@CodigoEquipo", SqlDbType.Int).Value = CP.CodigoEquipo;
                        com.Parameters.Add("@TipoCosto", SqlDbType.Int).Value = CP.TipoCosto;
                        com.Parameters.Add("@CodigoMoneda", SqlDbType.Int).Value = CP.CodigoMoneda;
                        com.Parameters.Add("@Importe", SqlDbType.Decimal).Value = CP.Importe;
                        com.Parameters.Add("@CostoLocal", SqlDbType.Decimal).Value = CP.CostoLocal;
                        com.Parameters.Add("@TipoCambio", SqlDbType.Decimal).Value = CP.TipoCambio;
                        com.Parameters.Add("@CodigoEquipoRecurso", SqlDbType.Int).Value = CP.CodigoEquipoRecurso;
                        com.Parameters.Add("@CodigoCentroCosto", SqlDbType.Int).Value = CP.CodigoCentroCosto;
                        com.Parameters.Add("@Observacion", SqlDbType.VarChar).Value = CP.Observacion;
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

        public int Del_CostoDirecto(SGP_Entity.CostoDirecto CP)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["cnx"].ConnectionString))
                {
                    con.Open();
                    using (SqlCommand com = new SqlCommand("Sp_Del_CostoDirecto", con))
                    {
                        com.CommandType = CommandType.StoredProcedure;
                        com.Parameters.Add("@CodigoCostoDirecto", SqlDbType.Int).Value = CP.CodigoCostoDirecto;
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
