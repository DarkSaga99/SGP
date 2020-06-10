using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using System.Data.SqlClient;
using System.Data;
using System.Configuration;

namespace SGP_Data
{
    public class Area
    {
        private readonly static Area _instance = new Area();

        private Area()
        {
        }

        public static Area Instance
        {
            get
            {
                return _instance;
            }
        }

        public List<SGP_Entity.Area> Sel_ComboArea(SGP_Entity.Area ent)
        {
            List<SGP_Entity.Area> lista = new List<SGP_Entity.Area>();

            SqlConnection con = new SqlConnection();
            con.ConnectionString = ConfigurationManager.ConnectionStrings["cnx"].ConnectionString;

            try
            {
                SqlCommand cmd = new SqlCommand();
                if (con.State == ConnectionState.Closed) { con.Open(); }

                cmd.Connection = con;

                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "Sp_Sel_ComboArea";

                //Inicio Parámetros
                
                //Fin Parámetros

                SqlDataReader dr;
                dr = cmd.ExecuteReader();

                while (dr.Read())
                {
                    SGP_Entity.Area obj = new SGP_Entity.Area();
                    obj.codigo = Convert.ToInt32(dr["codigo"].ToString());
                    obj.descripcion = dr["descripcion"].ToString();                    

                    lista.Add(obj);
                }

                return lista;

            }
            catch (Exception)
            {

                throw;
            }
        }

        public int Ins_Area(SGP_Entity.Area ent)
        {
            int retorno = 0;

            SqlConnection con = new SqlConnection();
            con.ConnectionString = ConfigurationManager.ConnectionStrings["cnx"].ConnectionString;

            try
            {
                SqlCommand cmd = new SqlCommand();
                cmd.Connection = con;

                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "Sp_Ins_Area";

                //Inicio Parámetros
                cmd.Parameters.Add("@de_area", SqlDbType.VarChar, 100).Value = ent.de_area;
                cmd.Parameters.Add("@ti_area", SqlDbType.Char, 4).Value = ent.ti_area;
                cmd.Parameters.Add("@fg_area", SqlDbType.VarChar, 11).Value = ent.fg_area;
                cmd.Parameters.Add("@st_area", SqlDbType.Char, 1).Value = ent.st_area;
                cmd.Parameters.Add("@co_usuario_registro", SqlDbType.Char, 20).Value = ent.co_usuario_registro;
                //Fin Parámetros

                if (con.State == ConnectionState.Closed)
                {
                    con.Open();
                }

                cmd.ExecuteNonQuery();

                if (con.State == ConnectionState.Open)
                {
                    con.Close();
                }

                return retorno;

            }
            catch (Exception)
            {

                throw;
            }
        }

        public int Upd_Area(SGP_Entity.Area ent)
        {
            int retorno = 0;

            SqlConnection con = new SqlConnection();
            con.ConnectionString = ConfigurationManager.ConnectionStrings["cnx"].ConnectionString;

            try
            {
                SqlCommand cmd = new SqlCommand();
                cmd.Connection = con;

                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "Sp_Upd_Area";

                //Inicio Parámetros
                cmd.Parameters.Add("@co_area", SqlDbType.Int).Value = ent.co_area;
                cmd.Parameters.Add("@de_area", SqlDbType.VarChar, 30).Value = ent.de_area;
                cmd.Parameters.Add("@ti_area", SqlDbType.Char, 1).Value = ent.ti_area;
                cmd.Parameters.Add("@fg_area", SqlDbType.VarChar, 1).Value = ent.fg_area;
                cmd.Parameters.Add("@st_area", SqlDbType.Char, 1).Value = ent.st_area;
                cmd.Parameters.Add("@co_usuario_modificacion", SqlDbType.Char, 20).Value = ent.co_usuario_modificacion; 
                //Fin Parámetros

                if (con.State == ConnectionState.Closed)
                {
                    con.Open();
                }

                cmd.ExecuteNonQuery();

                if (con.State == ConnectionState.Open)
                {
                    con.Close();
                }

                return retorno;

            }
            catch (Exception)
            {

                throw;
            }
        }

        public int Del_Area(SGP_Entity.Area ent)
        {
            int retorno = 0;

            SqlConnection con = new SqlConnection();
            con.ConnectionString = ConfigurationManager.ConnectionStrings["cnx"].ConnectionString;

            try
            {
                SqlCommand cmd = new SqlCommand();
                cmd.Connection = con;

                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "Sp_Del_Area";

                //Inicio Parámetros
                cmd.Parameters.Add("@co_area", SqlDbType.Int).Value = ent.co_area;
                cmd.Parameters.Add("@co_usuario_eliminacion", SqlDbType.Char, 20).Value = ent.co_usuario_eliminacion;
                //Fin Parámetros

                if (con.State == ConnectionState.Closed)
                {
                    con.Open();
                }

                cmd.ExecuteNonQuery();

                if (con.State == ConnectionState.Open)
                {
                    con.Close();
                }

                return retorno;

            }
            catch (Exception)
            {

                throw;
            }
        }

        public List<SGP_Entity.Area> Sel_Area(SGP_Entity.Area ent)
        {
            List<SGP_Entity.Area> lista = new List<SGP_Entity.Area>();

            SqlConnection con = new SqlConnection();
            con.ConnectionString = ConfigurationManager.ConnectionStrings["cnx"].ConnectionString;

            try
            {
                SqlCommand cmd = new SqlCommand();
                if (con.State == ConnectionState.Closed) { con.Open(); }

                cmd.Connection = con;

                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "Sp_Sel_Area";

                //Inicio Parámetros
                cmd.Parameters.Add("@de_area", SqlDbType.Char,1).Value = ent.de_area;
                cmd.Parameters.Add("@co_area", SqlDbType.Int).Value = ent.co_area;
                cmd.Parameters.Add("@st_area", SqlDbType.Char,1).Value = ent.st_area;

                //Fin Parámetros

                SqlDataReader dr;
                dr = cmd.ExecuteReader();

                while (dr.Read())
                {
                    SGP_Entity.Area ar = new SGP_Entity.Area();
                    ar.co_area = Convert.ToInt32(dr["co_area"].ToString());
                    ar.de_area = dr["de_area"].ToString();
                    ar.st_area = dr["st_area"].ToString();
                    ar.tx_valor1 = (ar.st_area == "1" ? "SI" : "NO");                 

                    lista.Add(ar);
                }


                return lista;

            }
            catch (Exception)
            {

                throw;
            }
        }

    }
}
