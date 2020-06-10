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
    public class Cliente
    {
        private readonly static Cliente _instance = new Cliente();
        private Cliente()
        {
        }

        public static Cliente Instance
        {
            get
            {
                return _instance;
            }
        }
        public int Ins_Cliente(SGP_Entity.Cliente ent)
        {
            int retorno = 0;

            SqlConnection con = new SqlConnection();
            con.ConnectionString = ConfigurationManager.ConnectionStrings["cnx"].ConnectionString;

            try
            {
                SqlCommand cmd = new SqlCommand();
                cmd.Connection = con;

                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "Sp_Ins_Cliente";

                //Inicio Parámetros
                cmd.Parameters.Add("@de_cliente", SqlDbType.VarChar, 100).Value = ent.de_cliente;
                cmd.Parameters.Add("@ti_documento", SqlDbType.Char, 4).Value = ent.ti_documento;
                cmd.Parameters.Add("@nu_documento", SqlDbType.VarChar, 15).Value = ent.nu_documento;
                cmd.Parameters.Add("@di_cliente", SqlDbType.VarChar, 100).Value = ent.di_cliente;
                cmd.Parameters.Add("@st_cliente", SqlDbType.Char, 1).Value = ent.st_cliente;
                cmd.Parameters.Add("@co_usuario_registro", SqlDbType.Char, 20).Value = ent.co_usuario_registro;                                
                cmd.Parameters.Add("@co_ubigeo", SqlDbType.Char, 6).Value = ent.co_ubigeo;
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

        public List<SGP_Entity.Cliente> Sel_Cliente(SGP_Entity.Cliente ent)
        {
            List<SGP_Entity.Cliente> lista = new List<SGP_Entity.Cliente>();

            SqlConnection con = new SqlConnection();
            con.ConnectionString = ConfigurationManager.ConnectionStrings["cnx"].ConnectionString;

            try
            {
                SqlCommand cmd = new SqlCommand();
                if(con.State == ConnectionState.Closed) { con.Open(); }
                
                cmd.Connection = con;

                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "Sp_Sel_Cliente";

                //Inicio Parámetros
                cmd.Parameters.Add("@de_cliente", SqlDbType.VarChar, 100).Value = ent.de_cliente;
                cmd.Parameters.Add("@ti_documento", SqlDbType.Char, 4).Value = ent.ti_documento;
                cmd.Parameters.Add("@nu_documento", SqlDbType.VarChar, 15).Value = ent.nu_documento;
                cmd.Parameters.Add("@st_cliente", SqlDbType.Char, 1).Value = ent.st_cliente;

                //Fin Parámetros

                SqlDataReader dr;
                dr = cmd.ExecuteReader();

                while (dr.Read())
                {
                    SGP_Entity.Cliente cli = new SGP_Entity.Cliente();
                    cli.co_cliente = Convert.ToInt32(dr["co_cliente"].ToString());
                    cli.de_cliente = dr["de_cliente"].ToString();
                    cli.ti_documento = dr["ti_documento"].ToString();
                    cli.de_tabla = dr["de_tabla"].ToString();
                    cli.nu_documento = dr["nu_documento"].ToString();
                    cli.di_cliente = dr["di_cliente"].ToString();
                    cli.st_cliente = dr["st_cliente"].ToString();
                    cli.tx_valor1 = (cli.st_cliente == "1" ? "SI" : "NO");
                    cli.co_ubigeo = dr["co_ubigeo"].ToString();                   

                    lista.Add(cli);
                }


                return lista;

            }
            catch (Exception)
            {

                throw;
            }            
        }

        public int Upd_Cliente(SGP_Entity.Cliente ent)
        {
            int retorno = 0;

            SqlConnection con = new SqlConnection();
            con.ConnectionString = ConfigurationManager.ConnectionStrings["cnx"].ConnectionString;

            try
            {
                SqlCommand cmd = new SqlCommand();
                cmd.Connection = con;

                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "Sp_Upd_Cliente";

                //Inicio Parámetros
                cmd.Parameters.Add("@co_cliente", SqlDbType.Int).Value = ent.co_cliente;
                cmd.Parameters.Add("@de_cliente", SqlDbType.VarChar, 100).Value = ent.de_cliente;
                cmd.Parameters.Add("@ti_documento", SqlDbType.Char, 4).Value = ent.ti_documento;
                cmd.Parameters.Add("@nu_documento", SqlDbType.VarChar, 15).Value = ent.nu_documento;
                cmd.Parameters.Add("@di_cliente", SqlDbType.VarChar, 100).Value = ent.di_cliente;
                cmd.Parameters.Add("@st_cliente", SqlDbType.Char, 1).Value = ent.st_cliente;
                cmd.Parameters.Add("@co_usuario_modificacion", SqlDbType.Char, 20).Value = ent.co_usuario_modificacion;
                cmd.Parameters.Add("@co_ubigeo", SqlDbType.Char, 6).Value = ent.co_ubigeo;
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

        public int Del_Cliente(SGP_Entity.Cliente ent)
        {
            int retorno = 0;

            SqlConnection con = new SqlConnection();
            con.ConnectionString = ConfigurationManager.ConnectionStrings["cnx"].ConnectionString;

            try
            {
                SqlCommand cmd = new SqlCommand();
                cmd.Connection = con;

                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "Sp_Del_Cliente";

                //Inicio Parámetros
                cmd.Parameters.Add("@co_cliente", SqlDbType.Int).Value = ent.co_cliente;
                cmd.Parameters.Add("@co_usuario_eliminacion", SqlDbType.Char,20).Value = ent.co_usuario_eliminacion;
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

    }
}
