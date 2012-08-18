using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
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

        [OutputCache(NoStore = true, Duration = 0)]
        public ActionResult ShareProducts(string id)
        {
            var url =
                "http://www.biggreensmile.no/products/badger-winter-wonder-aromatic-chest-balm/badgchest21.aspx?productid=badgchest21";

            //Thread.Sleep(1500);
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
                                                               Image = "Content/BGS/Images/Prod1.jpg",
                                                               Url = url,
                                                               EncodedUrl = Server.UrlEncode(url),
                                                               ShortUrl = url
                                                           },
                                                       new Product
                                                           {
                                                               Id = "prod2",
                                                               Name = "Product 2",
                                                               Description = "Description two is even longer",
                                                               Image = "Content/BGS/Images/Prod2.jpg",
                                                               Url = url,
                                                               EncodedUrl = Server.UrlEncode(url),
                                                               ShortUrl = url
                                                           },
                                                       new Product
                                                           {
                                                               Id = "prod3",
                                                               Name = "Product 3",
                                                               Description = "Description three is short",
                                                               Image = "Content/BGS/Images/Prod3.jpg",
                                                               Url = url,
                                                               EncodedUrl = Server.UrlEncode(url),
                                                               ShortUrl = url
                                                           },
                                                       new Product
                                                           {
                                                               Id = "prod4",
                                                               Name = "Product 4",
                                                               Description = "Description four is short",
                                                               Image = "Content/BGS/Images/Prod4.jpg",
                                                               Url = url,
                                                               EncodedUrl = Server.UrlEncode(url),
                                                               ShortUrl = url
                                                           }
                                                   },
                                    SelectedProduct =
                                        "prod4"
                                };
            return Json(viewModel, JsonRequestBehavior.AllowGet);
        }
    }
}