using Microsoft.AspNet.Identity.Owin;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Runtime.Serialization.Json;
using System.Text;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using System.Threading.Tasks;
using SGP_Web.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;

namespace SGP_Web.Controllers
{
    public class LoginController : Controller
    {
        private ApplicationSignInManager _signInManager;
        private ApplicationUserManager _userManager;
        ApplicationDbContext context;

        public LoginController()
        {
            context = new ApplicationDbContext();
        }

        public LoginController(ApplicationUserManager userManager, ApplicationSignInManager signInManager)
        {
            UserManager = userManager;
            SignInManager = signInManager;
        }

        public ActionResult Index()
        {
            return View();
        }

        public ApplicationSignInManager SignInManager
        {
            get
            {
                return _signInManager ?? HttpContext.GetOwinContext().Get<ApplicationSignInManager>();
            }
            private set
            {
                _signInManager = value;
            }
        }

        public ApplicationUserManager UserManager
        {
            get
            {
                return _userManager ?? HttpContext.GetOwinContext().GetUserManager<ApplicationUserManager>();
            }
            private set
            {
                _userManager = value;
            }
        }

        [HttpPost]
        public JsonResult ValidaUsuario(SGP_Entity.Usuario Datos)
        {
            try
            {
                int retorno = 0;
                SGP_Data.Usuario da = new SGP_Data.Usuario();
                var data = da.Valida_Usuario(Datos);
                if (data.Count > 0)
                {
                    HttpContext.Application["gUsuario"] = data[0].no_usuario;
                    FormsAuthentication.SetAuthCookie(data[0].no_usuario, false);
                    retorno = 1;
                }
                else
                {
                    retorno = -1;
                }
                return Json(retorno, JsonRequestBehavior.AllowGet);
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpPost]
        public async Task<ActionResult> FormSubmit(SGP_Entity.Usuario model)
        {
            try
            {
                Catpcha bsObj;
                if (!ModelState.IsValid)
                {
                    return View(model);
                }
                if (model.no_usuario == null || model.ps_usuario == null)
                {
                    ModelState.AddModelError("", "Ususario o contraseña incorrecta.");
                    return View("Index");
                }

                var response = Request["g-recaptcha-response"];
                if (response == null)
                {
                    SGP_Entity.Usuario Datos = new SGP_Entity.Usuario();
                    Datos.no_usuario = model.no_usuario;
                    Datos.ps_usuario = model.ps_usuario;

                    SGP_Data.Usuario da = new SGP_Data.Usuario();
                    var data = da.Valida_Usuario(Datos);

                    if (data.Count > 0)
                    {
                        HttpContext.Application["gUsuario"] = data[0].no_usuario;
                        FormsAuthentication.SetAuthCookie(data[0].no_usuario, false);
                        return RedirectToAction("Index", "Inicio");
                    }
                    else
                    {
                        ModelState.AddModelError("", "Ususario o contraseña incorrecta.");
                        return View("Index");
                    }
                }
                if (response.Length > 0)
                {
                    string secretKey = "6LcWIrgUAAAAAH0lW5KxRx8WyMerYmiDw-dEPg52";
                    var client = new WebClient();
                    var result = client.DownloadString(string.Format("https://www.google.com/recaptcha/api/siteverify?secret={0}&response={1}", secretKey, response));
                    using (var ms = new MemoryStream(Encoding.Unicode.GetBytes(result)))
                    {
                        // Deserialization from JSON  
                        DataContractJsonSerializer deserializer = new DataContractJsonSerializer(typeof(Catpcha));
                        bsObj = (Catpcha)deserializer.ReadObject(ms);
                    }
                    if (bsObj.success)
                    {
                        var result2 = await SignInManager.PasswordSignInAsync(model.no_usuario, model.ps_usuario, false, shouldLockout: false);

                        switch (result2)
                        {
                            case SignInStatus.Success:
                                var user = User.Identity;
                                ApplicationDbContext context = new ApplicationDbContext();
                                var UserManager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(context));
                                var s = UserManager.GetRoles(user.GetUserId());
                                HttpContext.Application["gUsuario"] = s[0].ToString();
                                return RedirectToAction("Index", "Inicio");
                            case SignInStatus.LockedOut:
                                return View("Lockout");
                            case SignInStatus.Failure:
                            default:
                                ModelState.AddModelError("", "Invalid login attempt.");
                                return View(model);
                        }

                        //SGP_Entity.Usuario Datos = new SGP_Entity.Usuario();
                        //Datos.no_usuario = model.no_usuario;
                        //Datos.ps_usuario = model.ps_usuario;

                        //SGP_Data.Usuario da = new SGP_Data.Usuario();
                        //var data = da.Valida_Usuario(Datos);

                        //if (data.Count > 0)
                        //{
                        //    HttpContext.Application["gUsuario"] = data[0].no_usuario;
                        //    FormsAuthentication.SetAuthCookie(data[0].no_usuario, false);
                        //    return RedirectToAction("Index", "Inicio");
                        //}
                        //else
                        //{
                        //    ModelState.AddModelError("", "Ususario o contraseña incorrecta.");
                        //    return View("Index");
                        //}
                    }
                    else
                    {
                        return View("Index");
                    }
                }
                else
                {
                    ModelState.AddModelError("", "Validación del captcha incorrecta.");
                    return View("Index");
                }
            }
            catch (Exception e)
            {
                ModelState.AddModelError("", e.Message.ToString());
                return View("Index");
            }
            

        }


    }
    public class Catpcha
    {
        public bool success { get; set; }
        public string challenge_ts { get; set; }
        public string hostname { get; set; }
        //public string error-codes { get; set; }
        //public int missing-input-response { get; set; }
    }
}