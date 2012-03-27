﻿using System;
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
                                                               Id = "prod1",
                                                               Name = "Product 1",
                                                               Description = "Description one is a bit longer",
                                                               Image = "/Content/Images/Prod1.jpg"
                                                           },
                                                       new Product
                                                           {
                                                                Id = "prod2",
                                                               Name = "Product 2",
                                                               Description = "Description two is even longer",
                                                               Image = "/Content/Images/Prod2.jpg"
                                                           },
                                                       new Product
                                                           {
                                                                Id = "prod3",
                                                               Name = "Product 3",
                                                               Description = "Description three is short",
                                                               Image = "/Content/Images/Prod3.jpg"
                                                           }
                                                   },
                                    SelectedProduct =
                                        "prod1"
                                };
            return Json(viewModel, JsonRequestBehavior.AllowGet);
        }
    }
}