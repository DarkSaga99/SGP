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
    public class RecursoContrato
    {
        private readonly static RecursoContrato _instance = new RecursoContrato();
        private RecursoContrato(){}
        public static RecursoContrato Instance
        {
            get
            {
                return _instance;
            }
        }

        public List<SGP_Entity.RecursoContrato> Sel_RecursoContrato(SGP_Entity.RecursoContrato C)
        {
            using (SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["cnx"].ConnectionString))
            {
                con.Open();
                using (SqlCommand com = new SqlCommand("Sp_Sel_RecursoContrato", con))
                {
                    com.CommandType = CommandType.StoredProcedure;
                    com.Parameters.Add("@CodigoRecursoContrato", SqlDbType.Int).Value = C.CodigoRecursoContrato;
                    com.Parameters.Add("@CodigoRecurso", SqlDbType.VarChar, 100).Value = C.CodigoRecurso;
                    com.Parameters.Add("@FechaInicioContrato", SqlDbType.DateTime).Value = C.FechaInicioContrato;
                    com.Parameters.Add("@FechaFinContrato", SqlDbType.DateTime).Value = C.FechaFinContrato;

                    List<SGP_Entity.RecursoContrato> list = new List<SGP_Entity.RecursoContrato>();
                    using (IDataReader dataReader = com.ExecuteReader())
                    {

                        while (dataReader.Read())
                        {

                            SGP_Entity.RecursoContrato obj = new SGP_Entity.RecursoContrato();

                            if (dataReader["CodigoRecursoContrato"] != DBNull.Value) { obj.CodigoRecursoContrato = (int)dataReader["CodigoRecursoContrato"]; }
                            if (dataReader["CodigoRecurso"] != DBNull.Value) { obj.CodigoRecurso = (int)dataReader["CodigoRecurso"]; }
                            if (dataReader["FechaInicioContrato"] != DBNull.Value) { obj.FechaInicioContrato = (dataReader["FechaInicioContrato"].ToString() != "" ? dataReader["FechaInicioContrato"].ToString().Substring(0, 10) : ""); }
                            if (dataReader["FechaFinContrato"] != DBNull.Value) { obj.FechaFinContrato = (dataReader["FechaFinContrato"].ToString() != "" ? dataReader["FechaFinContrato"].ToString().Substring(0, 10) : ""); }
                            if (dataReader["CodigoMoneda"] != DBNull.Value) { obj.CodigoMoneda = (int)dataReader["CodigoMoneda"]; }
                            if (dataReader["sm_moneda"] != DBNull.Value) { obj.sm_moneda = (string)dataReader["sm_moneda"]; }
                            if (dataReader["ImporteContrato"] != DBNull.Value) { obj.ImporteContrato = (decimal)dataReader["ImporteContrato"]; }
                            if (dataReader["TipoContrato"] != DBNull.Value) { obj.TipoContrato = (int)dataReader["TipoContrato"]; }
                            if (dataReader["de_TipoContrato"] != DBNull.Value) { obj.de_TipoContrato = (string)dataReader["de_TipoContrato"]; }
                            if (dataReader["EstadoContrato"] != DBNull.Value) { obj.EstadoContrato = (int)dataReader["TipoContrato"];}
                            if (dataReader["de_EstadoContrato"] != DBNull.Value) { obj.de_EstadoContrato = (string)dataReader["de_EstadoContrato"]; }
                            if (dataReader["Sustento"] != DBNull.Value) { obj.Sustento = (string)dataReader["Sustento"]; }
                            if (dataReader["st_registro"] != DBNull.Value) { obj.st_registro = (string)dataReader["st_registro"]; }
                            if (dataReader["de_recurso"] != DBNull.Value) { obj.de_recurso = (string)dataReader["de_recurso"]; }

                            list.Add(obj);

                        }

                    }
                    return list;
                }

            }
        }
        public int Ins_RecursoContrato(SGP_Entity.RecursoContrato CP)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["cnx"].ConnectionString))
                {
                    con.Open();
                    using (SqlCommand com = new SqlCommand("Sp_Ins_RecursoContrato", con))
                    {
                        com.CommandType = CommandType.StoredProcedure;
                        com.Parameters.Add("@CodigoRecurso", SqlDbType.Int).Value = CP.CodigoRecurso;
                        com.Parameters.Add("@FechaInicioContrato", SqlDbType.DateTime).Value = CP.FechaInicioContrato;
                        com.Parameters.Add("@FechaFinContrato", SqlDbType.DateTime).Value = CP.FechaFinContrato;
                        com.Parameters.Add("@CodigoMoneda", SqlDbType.Int).Value = CP.CodigoMoneda;
                        com.Parameters.Add("@ImporteContrato", SqlDbType.Decimal).Value = CP.ImporteContrato;
                        com.Parameters.Add("@TipoContrato", SqlDbType.Int).Value = CP.TipoContrato;
                        com.Parameters.Add("@EstadoContrato", SqlDbType.Int).Value = CP.EstadoContrato;
                        com.Parameters.Add("@Sustento", SqlDbType.VarChar).Value = CP.Sustento;
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
        public int Upd_RecursoContrato(SGP_Entity.RecursoContrato CP)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["cnx"].ConnectionString))
                {
                    con.Open();
                    using (SqlCommand com = new SqlCommand("Sp_Upd_RecursoContrato", con))
                    {
                        com.CommandType = CommandType.StoredProcedure;
                        com.Parameters.Add("@CodigoRecursoContrato", SqlDbType.Int).Value = CP.CodigoRecursoContrato;
                        com.Parameters.Add("@CodigoRecurso", SqlDbType.Int).Value = CP.CodigoRecurso;
                        com.Parameters.Add("@FechaInicioContrato", SqlDbType.DateTime).Value = CP.FechaInicioContrato;
                        com.Parameters.Add("@FechaFinContrato", SqlDbType.DateTime).Value = CP.FechaFinContrato;
                        com.Parameters.Add("@CodigoMoneda", SqlDbType.Int).Value = CP.CodigoMoneda;
                        com.Parameters.Add("@ImporteContrato", SqlDbType.Decimal).Value = CP.ImporteContrato;
                        com.Parameters.Add("@TipoContrato", SqlDbType.Int).Value = CP.TipoContrato;
                        com.Parameters.Add("@EstadoContrato", SqlDbType.Int).Value = CP.EstadoContrato;
                        com.Parameters.Add("@Sustento", SqlDbType.VarChar).Value = CP.Sustento;
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

        public int Del_RecursoContrato(SGP_Entity.RecursoContrato CP)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["cnx"].ConnectionString))
                {
                    con.Open();
                    using (SqlCommand com = new SqlCommand("Sp_Del_RecursoContrato", con))
                    {
                        com.CommandType = CommandType.StoredProcedure;
                        com.Parameters.Add("@CodigoRecursoContrato", SqlDbType.Int).Value = CP.CodigoRecursoContrato;
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
