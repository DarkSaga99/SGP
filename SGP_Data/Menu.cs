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
    public class Menu
    {

        private static Menu accion;
        private Menu() { }
        public static Menu Instance
        {
            get
            {
                if (accion == null)
                {
                    accion = new Menu();
                }
                return accion;
            }
        }

        public List<SGP_Entity.Menu> Sel_Menu(SGP_Entity.Menu C)
        {
            using (SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["cnx"].ConnectionString))
            {
                con.Open();
                using (SqlCommand com = new SqlCommand("Sp_Sel_MENU", con))
                {
                    com.CommandType = CommandType.StoredProcedure;
                    com.Parameters.Add("@de_menu", SqlDbType.Int).Value = C.de_menu;

                    List<SGP_Entity.Menu> list = new List<SGP_Entity.Menu>();
                    using (IDataReader dataReader = com.ExecuteReader())
                    {

                        while (dataReader.Read())
                        {

                            SGP_Entity.Menu obj = new SGP_Entity.Menu();

                            if (dataReader["co_menu"] != DBNull.Value) { obj.co_menu = (int)dataReader["co_menu"]; }
                            if (dataReader["de_menu"] != DBNull.Value) { obj.de_menu = (string)dataReader["de_menu"]; }
                            if (dataReader["nr_padre"] != DBNull.Value) { obj.nr_padre = (int)dataReader["nr_padre"]; }
                            if (dataReader["nr_hijo"] != DBNull.Value) { obj.nr_hijo = (int)dataReader["nr_hijo"]; }
                            if (dataReader["nr_posicion"] != DBNull.Value) { obj.nr_posicion = (int)dataReader["nr_posicion"]; }
                            if (dataReader["de_icono"] != DBNull.Value) { obj.de_icono = (string)dataReader["de_icono"]; }
                            if (dataReader["de_url"] != DBNull.Value) { obj.de_url = (string)dataReader["de_url"]; }

                            list.Add(obj);

                        }

                    }
                    return list;
                }

            }
        }
        public int Ins_Menu(SGP_Entity.Menu CP)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["cnx"].ConnectionString))
                {
                    con.Open();
                    using (SqlCommand com = new SqlCommand("Sp_Ins_Menu", con))
                    {
                        com.CommandType = CommandType.StoredProcedure;
                        com.Parameters.Add("@de_menu", SqlDbType.VarChar,100).Value = CP.de_menu;
                        com.Parameters.Add("@nr_padre", SqlDbType.Int).Value = CP.nr_padre;
                        com.Parameters.Add("@nr_hijo", SqlDbType.Int).Value = CP.nr_hijo;
                        com.Parameters.Add("@nr_posicion", SqlDbType.Int).Value = CP.nr_posicion;
                        com.Parameters.Add("@de_icono", SqlDbType.VarChar, 100).Value = CP.de_icono;
                        com.Parameters.Add("@de_url", SqlDbType.VarChar, 100).Value = CP.de_url;
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
        public int Upd_Menu(SGP_Entity.Menu CP)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["cnx"].ConnectionString))
                {
                    con.Open();
                    using (SqlCommand com = new SqlCommand("Sp_Upd_Menu", con))
                    {
                        com.CommandType = CommandType.StoredProcedure;
                        com.Parameters.Add("@co_menu", SqlDbType.Int).Value = CP.co_menu;
                        com.Parameters.Add("@de_menu", SqlDbType.VarChar, 100).Value = CP.de_menu;
                        com.Parameters.Add("@nr_padre", SqlDbType.Int).Value = CP.nr_padre;
                        com.Parameters.Add("@nr_hijo", SqlDbType.Int).Value = CP.nr_hijo;
                        com.Parameters.Add("@nr_posicion", SqlDbType.Int).Value = CP.nr_posicion;
                        com.Parameters.Add("@de_icono", SqlDbType.VarChar, 100).Value = CP.de_icono;
                        com.Parameters.Add("@de_url", SqlDbType.VarChar, 100).Value = CP.de_url;
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

        public int Del_Menu(SGP_Entity.Menu CP)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["cnx"].ConnectionString))
                {
                    con.Open();
                    using (SqlCommand com = new SqlCommand("Sp_Del_Menu", con))
                    {
                        com.CommandType = CommandType.StoredProcedure;
                        com.Parameters.Add("@co_menu", SqlDbType.Int).Value = CP.co_menu;
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
