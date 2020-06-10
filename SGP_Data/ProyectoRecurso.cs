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
    public class ProyectoRecurso
    {
        private static ProyectoRecurso accion;
        private ProyectoRecurso() { }
        public static ProyectoRecurso Instance
        {
            get
            {
                if (accion == null)
                {
                    accion = new ProyectoRecurso();
                }
                return accion;
            }
        }

        public List<SGP_Entity.ProyectoRecurso> Sel_ProyectoRecurso(SGP_Entity.ProyectoRecurso C)
        {
            using (SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["cnx"].ConnectionString))
            {
                con.Open();
                using (SqlCommand com = new SqlCommand("Sp_Sel_Proyecto_Recurso", con))
                {
                    com.CommandType = CommandType.StoredProcedure;
                    com.Parameters.Add("@co_proyecto", SqlDbType.VarChar, 100).Value = C.co_proyecto;

                    List<SGP_Entity.ProyectoRecurso> list = new List<SGP_Entity.ProyectoRecurso>();
                    using (IDataReader dataReader = com.ExecuteReader())
                    {

                        while (dataReader.Read())
                        {

                            SGP_Entity.ProyectoRecurso obj = new SGP_Entity.ProyectoRecurso();
                            if (dataReader["co_proyecto_recurso"] != DBNull.Value) { obj.co_proyecto_recurso = (int)dataReader["co_proyecto_recurso"]; }
                            if (dataReader["co_proyecto"] != DBNull.Value) { obj.co_proyecto = (int)dataReader["co_proyecto"]; }
                            if (dataReader["co_recurso"] != DBNull.Value) { obj.co_recurso = (int)dataReader["co_recurso"]; }
                            if (dataReader["st_estado"] != DBNull.Value) { obj.st_estado = (int)dataReader["st_estado"]; }
                            if (dataReader["nu_porcentaje"] != DBNull.Value) { obj.nu_porcentaje = (int)dataReader["nu_porcentaje"]; }
                            if (dataReader["co_rol"] != DBNull.Value) { obj.co_rol = (int)dataReader["co_rol"]; }
                            if (dataReader["de_recurso"] != DBNull.Value) { obj.de_recurso = (string)dataReader["de_recurso"]; }
                            if (dataReader["de_rol"] != DBNull.Value) { obj.de_rol = (string)dataReader["de_rol"]; }
                            list.Add(obj);
                        }

                    }
                    return list;
                }

            }
        }
        public int Ins_ProyectoRecurso(SGP_Entity.ProyectoRecurso CP)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["cnx"].ConnectionString))
                {
                    con.Open();
                    using (SqlCommand com = new SqlCommand("Sp_Ins_Proyecto_Recurso", con))
                    {
                        com.CommandType = CommandType.StoredProcedure;
                        com.Parameters.Add("@co_proyecto", SqlDbType.Int).Value = CP.co_proyecto;
                        com.Parameters.Add("@co_recurso", SqlDbType.Int).Value = CP.co_recurso;
                        com.Parameters.Add("@st_estado", SqlDbType.Int).Value = CP.st_estado;
                        com.Parameters.Add("@nu_porcentaje", SqlDbType.Int).Value = CP.nu_porcentaje;
                        com.Parameters.Add("@co_rol", SqlDbType.Int).Value = CP.co_rol;
                        com.Parameters.Add("@co_usuario_registro", SqlDbType.Char,20).Value = CP.co_usuario_registro;
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
        public int Upd_ProyectoRecurso(SGP_Entity.ProyectoRecurso CP)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["cnx"].ConnectionString))
                {
                    con.Open();
                    using (SqlCommand com = new SqlCommand("Sp_Upd_Proyecto_Recurso", con))
                    {
                        com.CommandType = CommandType.StoredProcedure;
                        com.Parameters.Add("@co_proyecto_recurso", SqlDbType.Int).Value = CP.co_proyecto_recurso;
                        com.Parameters.Add("@co_proyecto", SqlDbType.Int).Value = CP.co_proyecto;
                        com.Parameters.Add("@co_recurso", SqlDbType.Int).Value = CP.co_recurso;
                        com.Parameters.Add("@st_estado", SqlDbType.Int).Value = CP.st_estado;
                        com.Parameters.Add("@nu_porcentaje", SqlDbType.Int).Value = CP.nu_porcentaje;
                        com.Parameters.Add("@co_rol", SqlDbType.Int).Value = CP.co_rol;
                        com.Parameters.Add("@co_usuario_modificacion", SqlDbType.Char, 20).Value = CP.co_usuario_eliminacion;
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

        public int Del_ProyectoRecurso(SGP_Entity.ProyectoRecurso CP)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["cnx"].ConnectionString))
                {
                    con.Open();
                    using (SqlCommand com = new SqlCommand("Sp_Del_PROYECTO_RECURSO", con))
                    {
                        com.CommandType = CommandType.StoredProcedure;
                        com.Parameters.Add("@co_proyecto", SqlDbType.Int).Value = CP.co_proyecto;
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
