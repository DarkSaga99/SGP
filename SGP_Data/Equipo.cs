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
    public class Equipo
    {
        private readonly static Equipo _instance = new Equipo();
        private Equipo() { }
        public static Equipo Instance
        {
            get
            {
                return _instance;
            }
        }
        public List<SGP_Entity.Equipo> Sel_Equipo(SGP_Entity.Equipo C)
        {
            using (SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["cnx"].ConnectionString))
            {
                con.Open();
                using (SqlCommand com = new SqlCommand("Sp_Sel_Equipo", con))
                {
                    com.CommandType = CommandType.StoredProcedure;
                    com.Parameters.Add("@CodigoEquipo", SqlDbType.Int).Value = C.CodigoEquipo;
                    com.Parameters.Add("@DescripcionEquipo", SqlDbType.VarChar).Value = C.DescripcionEquipo;
                    com.Parameters.Add("@FechaInicioEquipo", SqlDbType.DateTime).Value = C.FechaInicioEquipo;
                    com.Parameters.Add("@TipoEquipo", SqlDbType.Int).Value = C.TipoEquipo;
                    com.Parameters.Add("@CodigoRecursoAsociado", SqlDbType.Int).Value = C.CodigoRecursoAsociado;

                    List<SGP_Entity.Equipo> list = new List<SGP_Entity.Equipo>();
                    using (IDataReader dataReader = com.ExecuteReader())
                    {

                        while (dataReader.Read())
                        {

                            SGP_Entity.Equipo obj = new SGP_Entity.Equipo();

                            if (dataReader["CodigoEquipo"] != DBNull.Value) { obj.CodigoEquipo = (int)dataReader["CodigoEquipo"]; }
                            if (dataReader["DescripcionEquipo"] != DBNull.Value) { obj.DescripcionEquipo = (string)dataReader["DescripcionEquipo"]; }
                            if (dataReader["TipoEquipo"] != DBNull.Value) { obj.TipoEquipo = (int)dataReader["TipoEquipo"]; }
                            if (dataReader["de_TipoEquipo"] != DBNull.Value) { obj.de_TipoEquipo = (string)dataReader["de_TipoEquipo"]; }
                            if (dataReader["CodigoMoneda"] != DBNull.Value) { obj.CodigoMoneda = (int)dataReader["CodigoMoneda"]; }
                            if (dataReader["sm_moneda"] != DBNull.Value) { obj.sm_moneda = (string)dataReader["sm_moneda"]; }
                            if (dataReader["de_moneda"] != DBNull.Value) { obj.de_moneda = (string)dataReader["de_moneda"]; }
                            if (dataReader["TarifaEquipo"] != DBNull.Value) { obj.TarifaEquipo = (decimal)dataReader["TarifaEquipo"]; }
                            if (dataReader["CodigoRecursoAsociado"] != DBNull.Value) { obj.CodigoRecursoAsociado = (int)dataReader["CodigoRecursoAsociado"]; }
                            if (dataReader["de_recurso"] != DBNull.Value) { obj.de_recurso = (string)dataReader["de_recurso"]; }
                            if (dataReader["EstadoEquipo"] != DBNull.Value) { obj.EstadoEquipo = (int)dataReader["EstadoEquipo"]; }
                            if (dataReader["de_EstadoEquipo"] != DBNull.Value) { obj.de_EstadoEquipo = (string)dataReader["de_EstadoEquipo"]; }
                            if (dataReader["FechaInicioEquipo"] != DBNull.Value) { obj.FechaInicioEquipo = (dataReader["FechaInicioEquipo"].ToString() != "" ? dataReader["FechaInicioEquipo"].ToString().Substring(0, 10) : "");  }
                            if (dataReader["FechaFinEquipo"] != DBNull.Value) { obj.FechaFinEquipo = (dataReader["FechaFinEquipo"].ToString() != "" ? dataReader["FechaFinEquipo"].ToString().Substring(0, 10) : ""); }
                            if (dataReader["Observacion"] != DBNull.Value) { obj.Observacion = (string)dataReader["Observacion"]; }
                            list.Add(obj);

                        }

                    }
                    return list;
                }

            }
        }
        public int Ins_Equipo(SGP_Entity.Equipo CP)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["cnx"].ConnectionString))
                {
                    con.Open();
                    using (SqlCommand com = new SqlCommand("Sp_Ins_Equipo", con))
                    {
                        com.CommandType = CommandType.StoredProcedure;
                        com.Parameters.Add("@DescripcionEquipo", SqlDbType.VarChar).Value = CP.DescripcionEquipo;
                        com.Parameters.Add("@TipoEquipo", SqlDbType.Int).Value = CP.TipoEquipo;
                        com.Parameters.Add("@CodigoMoneda", SqlDbType.Int).Value = CP.CodigoMoneda;
                        com.Parameters.Add("@TarifaEquipo", SqlDbType.Decimal).Value = CP.TarifaEquipo;
                        com.Parameters.Add("@CodigoRecursoAsociado", SqlDbType.Int).Value = CP.CodigoRecursoAsociado;
                        com.Parameters.Add("@EstadoEquipo", SqlDbType.Int).Value = CP.EstadoEquipo;
                        com.Parameters.Add("@FechaInicioEquipo", SqlDbType.DateTime).Value = CP.FechaInicioEquipo;
                        com.Parameters.Add("@FechaFinEquipo", SqlDbType.DateTime).Value = CP.FechaFinEquipo;
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
        public int Upd_Equipo(SGP_Entity.Equipo CP)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["cnx"].ConnectionString))
                {
                    con.Open();
                    using (SqlCommand com = new SqlCommand("Sp_Upd_Equipo", con))
                    {
                        com.CommandType = CommandType.StoredProcedure;
                        com.Parameters.Add("@CodigoEquipo", SqlDbType.Int).Value = CP.CodigoEquipo;
                        com.Parameters.Add("@DescripcionEquipo", SqlDbType.VarChar).Value = CP.DescripcionEquipo;
                        com.Parameters.Add("@TipoEquipo", SqlDbType.Int).Value = CP.TipoEquipo;
                        com.Parameters.Add("@CodigoMoneda", SqlDbType.Int).Value = CP.CodigoMoneda;
                        com.Parameters.Add("@TarifaEquipo", SqlDbType.Decimal).Value = CP.TarifaEquipo;
                        com.Parameters.Add("@CodigoRecursoAsociado", SqlDbType.Int).Value = CP.CodigoRecursoAsociado;
                        com.Parameters.Add("@EstadoEquipo", SqlDbType.Int).Value = CP.EstadoEquipo;
                        com.Parameters.Add("@FechaInicioEquipo", SqlDbType.DateTime).Value = CP.FechaInicioEquipo;
                        com.Parameters.Add("@FechaFinEquipo", SqlDbType.DateTime).Value = CP.FechaFinEquipo;
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

        public int Del_Equipo(SGP_Entity.Equipo CP)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["cnx"].ConnectionString))
                {
                    con.Open();
                    using (SqlCommand com = new SqlCommand("Sp_Del_Equipo", con))
                    {
                        com.CommandType = CommandType.StoredProcedure;
                        com.Parameters.Add("@CodigoEquipo", SqlDbType.Int).Value = CP.CodigoEquipo;
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
