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
    public class TipoCambio
    {
        private readonly static TipoCambio _instance = new TipoCambio();
        private TipoCambio() { }
        public static TipoCambio Instance
        {
            get
            {
                return _instance;
            }
        }

        public List<SGP_Entity.TipoCambio> Sel_TipoCambio(SGP_Entity.TipoCambio C)
        {
            using (SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["cnx"].ConnectionString))
            {
                con.Open();
                using (SqlCommand com = new SqlCommand("Sp_Sel_TipoCambio", con))
                {
                    com.CommandType = CommandType.StoredProcedure;
                    com.Parameters.Add("@CodigoTipoCambio", SqlDbType.Int).Value = C.CodigoTipoCambio;
                    com.Parameters.Add("@Fecha", SqlDbType.DateTime).Value = C.Fecha;
                    com.Parameters.Add("@CodigoMoneda", SqlDbType.Int).Value = C.CodigoMoneda;

                    List<SGP_Entity.TipoCambio> list = new List<SGP_Entity.TipoCambio>();
                    using (IDataReader dataReader = com.ExecuteReader())
                    {

                        while (dataReader.Read())
                        {

                            SGP_Entity.TipoCambio obj = new SGP_Entity.TipoCambio();

                            if (dataReader["CodigoTipoCambio"] != DBNull.Value) { obj.CodigoTipoCambio = (int)dataReader["CodigoTipoCambio"]; }
                            if (dataReader["CodigoMoneda"] != DBNull.Value) { obj.CodigoMoneda = (int)dataReader["CodigoMoneda"]; }
                            if (dataReader["Fecha"] != DBNull.Value) { obj.Fecha = (dataReader["Fecha"].ToString() != "" ? dataReader["Fecha"].ToString().Substring(0, 10) : ""); }
                            if (dataReader["PrecioCompra"] != DBNull.Value) { obj.PrecioCompra = (decimal)dataReader["PrecioCompra"]; }
                            if (dataReader["PrecioVenta"] != DBNull.Value) { obj.PrecioVenta = (decimal)dataReader["PrecioVenta"]; }
                            if (dataReader["st_registro"] != DBNull.Value) { obj.st_registro = (string)dataReader["st_registro"]; }
                            if (dataReader["sm_moneda"] != DBNull.Value) { obj.sm_moneda = (string)dataReader["sm_moneda"]; }
                            if (dataReader["de_moneda"] != DBNull.Value) { obj.de_moneda = (string)dataReader["de_moneda"]; }

                            list.Add(obj);

                        }

                    }
                    return list;
                }

            }
        }
        public int Ins_TipoCambio(SGP_Entity.TipoCambio CP)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["cnx"].ConnectionString))
                {
                    con.Open();
                    using (SqlCommand com = new SqlCommand("Sp_Ins_TipoCambio", con))
                    {
                        com.CommandType = CommandType.StoredProcedure;
                        com.Parameters.Add("@CodigoMoneda", SqlDbType.Int).Value = CP.CodigoMoneda;
                        com.Parameters.Add("@Fecha", SqlDbType.DateTime).Value = CP.Fecha;
                        com.Parameters.Add("@PrecioCompra", SqlDbType.Decimal).Value = CP.PrecioCompra;
                        com.Parameters.Add("@PrecioVenta", SqlDbType.Decimal).Value = CP.PrecioVenta;
                        com.Parameters.Add("@co_usuario_registro", SqlDbType.VarChar).Value = CP.co_usuario_registro;
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
        public int Upd_TipoCambio(SGP_Entity.TipoCambio CP)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["cnx"].ConnectionString))
                {
                    con.Open();
                    using (SqlCommand com = new SqlCommand("Sp_Upd_TipoCambio", con))
                    {
                        com.CommandType = CommandType.StoredProcedure;
                        com.Parameters.Add("@CodigoTipoCambio", SqlDbType.Int).Value = CP.CodigoTipoCambio;
                        com.Parameters.Add("@CodigoMoneda", SqlDbType.Int).Value = CP.CodigoMoneda;
                        com.Parameters.Add("@Fecha", SqlDbType.DateTime).Value = CP.Fecha;
                        com.Parameters.Add("@PrecioCompra", SqlDbType.Decimal).Value = CP.PrecioCompra;
                        com.Parameters.Add("@PrecioVenta", SqlDbType.Decimal).Value = CP.PrecioVenta;
                        com.Parameters.Add("@co_usuario_modificacion", SqlDbType.VarChar).Value = CP.co_usuario_modificacion;
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

        public int Del_TipoCambio(SGP_Entity.TipoCambio CP)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["cnx"].ConnectionString))
                {
                    con.Open();
                    using (SqlCommand com = new SqlCommand("Sp_Del_TipoCambio", con))
                    {
                        com.CommandType = CommandType.StoredProcedure;
                        com.Parameters.Add("@CodigoTipoCambio", SqlDbType.Int).Value = CP.CodigoTipoCambio;
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
