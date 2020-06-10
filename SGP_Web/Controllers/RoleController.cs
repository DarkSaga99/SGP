using Microsoft.AspNet.Identity.EntityFramework;
using SGP_Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SGP_Web.Controllers
{
    public class RoleController : Controller
    {
        ApplicationDbContext context;

        public RoleController()
        {
            context = new ApplicationDbContext();
        }


        // GET: Role
        public ActionResult Index()
        {
            var Roles = context.Roles.ToList();
            return View(Roles);
        }


        public ActionResult Create()
        {

            var Role = new IdentityRole();
            return View(Role);
        }

        [HttpPost]
        public ActionResult Create(IdentityRole Role)
        {
            context.Roles.Add(Role);
            context.SaveChanges();

            return RedirectToAction("Index");
        }


        public ActionResult Edit(string id)
        {

            var Role = new IdentityRole();
            var RolEdit = context.Roles.Where(u => u.Id == id).ToList();
            if (RolEdit.Count > 0)
            {
                ViewBag.Name = RolEdit[0].Name;
                ViewBag.Id = RolEdit[0].Id;
                return View(Role);
            }
            else
            {
                return RedirectToAction("Index");
            }

        }

        [HttpPost]
        public ActionResult Edit(IdentityRole Role)
        {

            var rol = context.Roles.Find(Role.Id);
            rol.Name = Role.Name;
            context.SaveChanges();

            return RedirectToAction("Index");
        }

        [HttpPost]
        public ActionResult Delete(string id)
        {

            context.Roles.Remove(context.Roles.Find(id));
            context.SaveChanges();
            return RedirectToAction("Index");
        }

    }
}