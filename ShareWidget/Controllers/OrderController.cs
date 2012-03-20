using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ShareWidget.Models;

namespace ShareWidget.Controllers
{
    public class OrderController : Controller
    {
        //
        // GET: /Order/

        public ActionResult Index(string id)
        {
            var viewModel = new OrderViewModel {Id = id};
            return View(viewModel);
        }

        public ActionResult ShareProducts(string id)
        {
            var viewModel = new ShareProductsViewModel
                                {
                                    OrderId = id,
                                    Products = new List<Product>
                                                   {
                                                       new Product
                                                           {
                                                               Name = "Product 1",
                                                               Description = "Description one is a bit longer",
                                                               Image = "/Content/Images/Prod1.jpg"
                                                           },
                                                       new Product
                                                           {
                                                               Name = "Product 2",
                                                               Description = "Description two is even longer",
                                                               Image = "/Content/Images/Prod2.jpg"
                                                           }
                                                   }
                                };
            return Json(viewModel, JsonRequestBehavior.AllowGet);
        }
    }
}