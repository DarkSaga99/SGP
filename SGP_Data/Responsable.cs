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
    public class Responsable
    {
        private static Responsable accion;
        private Responsable() { }
        public static Responsable Instance
        {
            get
            {
                if (accion == null)
                {
                    accion = new Responsable();
                }
                return accion;
            }
        }

        public List<SGP_Entity.Responsable> Sel_Responsable(SGP_Entity.Responsable C)
        {
            using (SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["cnx"].ConnectionString))
            {
                con.Open();
                using (SqlCommand com = new SqlCommand("Sp_Sel_RESPONSABLE", con))
                {
                    com.CommandType = CommandType.StoredProcedure;
                    com.Parameters.Add("@no_responsable", SqlDbType.VarChar, 100).Value = C.no_responsable;
                    com.Parameters.Add("@ti_documento", SqlDbType.Char, 4).Value = C.ti_documento;
                    com.Parameters.Add("@nu_documento", SqlDbType.VarChar, 20).Value = C.nu_documento;
                    com.Parameters.Add("@st_responsable", SqlDbType.Char, 1).Value = C.st_responsable;

                    List<SGP_Entity.Responsable> list = new List<SGP_Entity.Responsable>();
                    using (IDataReader dataReader = com.ExecuteReader())
                    {

                        while (dataReader.Read())
                        {

                            SGP_Entity.Responsable obj = new SGP_Entity.Responsable();

                            if (dataReader["co_responsable"] != DBNull.Value) { obj.co_responsable = (int)dataReader["co_responsable"]; }
                            if (dataReader["no_responsable"] != DBNull.Value) { obj.no_responsable = (string)dataReader["no_responsable"]; }
                            if (dataReader["ap_responsable"] != DBNull.Value) { obj.ap_responsable = (string)dataReader["ap_responsable"]; }
                            if (dataReader["am_responsable"] != DBNull.Value) { obj.am_responsable = (string)dataReader["am_responsable"]; }
                            if (dataReader["ti_responsable"] != DBNull.Value) { obj.ti_responsable = (string)dataReader["ti_responsable"]; }
                            if (dataReader["fg_responsable"] != DBNull.Value) { obj.fg_responsable = (string)dataReader["fg_responsable"]; }
                            if (dataReader["st_responsable"] != DBNull.Value) { obj.st_responsable = (string)dataReader["st_responsable"]; }
                            if (dataReader["ti_documento"] != DBNull.Value) { obj.ti_documento = (string)dataReader["ti_documento"]; }
                            if (dataReader["de_documeno"] != DBNull.Value) { obj.tx_valor1 = (string)dataReader["de_documeno"]; }
                            if (dataReader["nu_documento"] != DBNull.Value) { obj.nu_documento = (string)dataReader["nu_documento"]; }
                            if (dataReader["nu_telefono"] != DBNull.Value) { obj.nu_telefono = (string)dataReader["nu_telefono"]; }
                            if (dataReader["de_correo"] != DBNull.Value) { obj.de_correo = (string)dataReader["de_correo"]; }
                            if (dataReader["ti_cargo"] != DBNull.Value) { obj.ti_cargo = (string)dataReader["ti_cargo"]; }
                            if (dataReader["co_cliente"] != DBNull.Value) { obj.co_cliente = (int)dataReader["co_cliente"]; }
                            if (dataReader["NombreCompleto"] != DBNull.Value) { obj.NombreCompleto = (string)dataReader["NombreCompleto"]; }
                            obj.tx_valor2 = (obj.st_responsable == "1" ? "SI" : "NO");
                            if (dataReader["de_cliente"] != DBNull.Value) { obj.tx_valor3 = (string)dataReader["de_cliente"]; }
                            if (dataReader["de_cargo"] != DBNull.Value) { obj.de_padre = (string)dataReader["de_cargo"]; }
                            list.Add(obj);

                        }

                    }
                    return list;
                }

            }
        }
        public int Ins_Responsable(SGP_Entity.Responsable CP)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["cnx"].ConnectionString))
                {
                    con.Open();
                    using (SqlCommand com = new SqlCommand("Sp_Ins_RESPONSABLE", con))
                    {
                        com.CommandType = CommandType.StoredProcedure;
                        com.Parameters.Add("@no_responsable", SqlDbType.VarChar, 100).Value = CP.no_responsable;
                        com.Parameters.Add("@ap_responsable", SqlDbType.VarChar, 100).Value = CP.ap_responsable;
                        com.Parameters.Add("@am_responsable", SqlDbType.VarChar, 100).Value = CP.am_responsable;
                        com.Parameters.Add("@st_responsable", SqlDbType.Char, 1).Value = CP.st_responsable;
                        com.Parameters.Add("@ti_documento", SqlDbType.Char, 4).Value = CP.ti_documento;
                        com.Parameters.Add("@nu_documento", SqlDbType.VarChar, 20).Value = CP.nu_documento;
                        com.Parameters.Add("@nu_telefono", SqlDbType.VarChar, 20).Value = CP.nu_telefono;
                        com.Parameters.Add("@de_correo", SqlDbType.VarChar, 50).Value = CP.de_correo;
                        com.Parameters.Add("@ti_cargo", SqlDbType.Char, 4).Value = CP.ti_cargo;
                        com.Parameters.Add("@co_cliente", SqlDbType.Int).Value = CP.co_cliente;
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
        public int Upd_Responsable(SGP_Entity.Responsable CP)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["cnx"].ConnectionString))
                {
                    con.Open();
                    using (SqlCommand com = new SqlCommand("Sp_Upd_RESPONSABLE", con))
                    {
                        com.CommandType = CommandType.StoredProcedure;
                        com.Parameters.Add("@co_responsable", SqlDbType.Int).Value = CP.co_responsable;
                        com.Parameters.Add("@no_responsable", SqlDbType.VarChar, 100).Value = CP.no_responsable;
                        com.Parameters.Add("@ap_responsable", SqlDbType.VarChar, 100).Value = CP.ap_responsable;
                        com.Parameters.Add("@am_responsable", SqlDbType.VarChar, 100).Value = CP.am_responsable;
                        com.Parameters.Add("@st_responsable", SqlDbType.Char, 1).Value = CP.st_responsable;
                        com.Parameters.Add("@ti_documento", SqlDbType.Char, 4).Value = CP.ti_documento;
                        com.Parameters.Add("@nu_documento", SqlDbType.VarChar, 20).Value = CP.nu_documento;
                        com.Parameters.Add("@nu_telefono", SqlDbType.VarChar, 20).Value = CP.nu_telefono;
                        com.Parameters.Add("@de_correo", SqlDbType.VarChar, 50).Value = CP.de_correo;
                        com.Parameters.Add("@ti_cargo", SqlDbType.Char, 4).Value = CP.ti_cargo;
                        com.Parameters.Add("@co_cliente", SqlDbType.Int).Value = CP.co_cliente;
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

        public int Del_Responsable(SGP_Entity.Responsable CP)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["cnx"].ConnectionString))
                {
                    con.Open();
                    using (SqlCommand com = new SqlCommand("Sp_Del_RESPONSABLE", con))
                    {
                        com.CommandType = CommandType.StoredProcedure;
                        com.Parameters.Add("@co_responsable", SqlDbType.Int).Value = CP.co_responsable;
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
