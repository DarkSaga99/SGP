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
    public class Usuario
    {
        public List<SGP_Entity.Usuario> Valida_Usuario(SGP_Entity.Usuario ent)
        {
            List<SGP_Entity.Usuario> lista = new List<SGP_Entity.Usuario>();

            SqlConnection con = new SqlConnection();
            con.ConnectionString = ConfigurationManager.ConnectionStrings["cnx"].ConnectionString;

            try
            {
                SqlCommand cmd = new SqlCommand();
                if (con.State == ConnectionState.Closed) { con.Open(); }

                cmd.Connection = con;

                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "Sp_Valida_Usuario";

                //Inicio Parámetros
                cmd.Parameters.Add("@no_usuario", SqlDbType.VarChar, 40).Value = ent.no_usuario;
                cmd.Parameters.Add("@ps_usuario", SqlDbType.Char, 20).Value = ent.ps_usuario;                

                //Fin Parámetros

                SqlDataReader dr;
                dr = cmd.ExecuteReader();

                while (dr.Read())
                {
                    SGP_Entity.Usuario cli = new SGP_Entity.Usuario();
                    cli.no_usuario = dr["no_usuario"].ToString();

                    lista.Add(cli);
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
