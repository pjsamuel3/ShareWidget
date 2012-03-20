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
    }
}