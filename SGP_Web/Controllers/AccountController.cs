using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using SGP_Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace SGP_Web.Controllers
{
    public class AccountController : Controller
    {

        private ApplicationSignInManager _signInManager;
        private ApplicationUserManager _userManager;
        ApplicationDbContext context;

        public AccountController()
        {
            context = new ApplicationDbContext();
        }

        public AccountController(ApplicationUserManager userManager, ApplicationSignInManager signInManager)
        {
            UserManager = userManager;
            SignInManager = signInManager;
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


        public ActionResult Users()
        {
            ViewBag.Usuarios = context.Users.ToList();
            ViewBag.Name = new SelectList(context.Roles.Where(u => !u.Name.Contains("Admin"))
                                            .ToList(), "Id", "Name");
            return View();
        }


        //public ActionResult Register()
        //{
        //    ViewBag.Name = new SelectList(context.Roles.Where(u => !u.Name.Contains("Admin"))
        //                                    .ToList(), "Name", "Name");            
        //    return View();
        //}

        //
        // POST: /Account/Register
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Register(RegisterViewModel model)
        {
            if (ModelState.IsValid)
            {
                var user = new ApplicationUser { UserName = model.UserName, Email = model.Email };
                var result = await UserManager.CreateAsync(user, model.Password);
                if (result.Succeeded)
                {
                    await SignInManager.SignInAsync(user, isPersistent: false, rememberBrowser: false);

                    // For more information on how to enable account confirmation and password reset please visit http://go.microsoft.com/fwlink/?LinkID=320771
                    // Send an email with this link
                    // string code = await UserManager.GenerateEmailConfirmationTokenAsync(user.Id);
                    // var callbackUrl = Url.Action("ConfirmEmail", "Account", new { userId = user.Id, code = code }, protocol: Request.Url.Scheme);
                    // await UserManager.SendEmailAsync(user.Id, "Confirm your account", "Please confirm your account by clicking <a href=\"" + callbackUrl + "\">here</a>");
                    //Assign Role to user Here   

                    var da = context.Roles.Find(model.UserRoles);
                    await UserManager.AddToRoleAsync(user.Id, da.Name);
                    //Ends Here 
                    return RedirectToAction("Users", "Account");
                }
                ViewBag.Name = new SelectList(context.Roles.Where(u => !u.Name.Contains("Admin"))
                                          .ToList(), "Name", "Name");
                AddErrors(result);
            }

            // If we got this far, something failed, redisplay form
            return RedirectToAction("Users", "Account");
        }


        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Edit(FormCollection User)
        {
            if (User["NewPassword"] != "")
            {
                string code = await UserManager.GeneratePasswordResetTokenAsync(User["Id"]);
                var result = await UserManager.ResetPasswordAsync(User["Id"], code, User["NewPassword"]);
                if (result.Succeeded)
                {
                    var users = context.Users.Find(User["Id"]);
                    users.UserName = User["UserName"];
                    users.Email = User["Email"];
                    context.SaveChanges();

                    return RedirectToAction("Users", "Account");
                }
                AddErrors(result);
                return RedirectToAction("Users", "Account");
            }
            else
            {
                var users = context.Users.Find(User["Id"]);
                users.UserName = User["UserName"];
                users.Email = User["Email"];
                context.SaveChanges();

                var roles = await UserManager.GetRolesAsync(User["id"]);
                var da = context.Roles.Find(User["UserRoles"]);
                await UserManager.RemoveFromRolesAsync(User["id"], roles.ToArray());
                await UserManager.AddToRoleAsync(User["id"], da.Name);

                return RedirectToAction("Users", "Account");
            }
        }

        [HttpPost]
        public ActionResult Delete(string id)
        {
            //var roles = await UserManager.GetRolesAsync(User["id"]);
            //var da = context.Roles.Find(User["UserRoles"]);
            //await UserManager.RemoveFromRolesAsync(User["id"], roles.ToArray());

            context.Users.Remove(context.Users.Find(id));
            context.SaveChanges();
            return RedirectToAction("Users", "Account");
        }


        private void AddErrors(IdentityResult result)
        {
            foreach (var error in result.Errors)
            {
                ModelState.AddModelError("", error);
            }
        }

    }
}