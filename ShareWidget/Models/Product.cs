using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ShareWidget.Models
{
    public class Product
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Image { get; set; }
        public string Url { get; set; }
        public string EncodedUrl { get; set;     }
        public string ShortUrl { get; set; }
    }
}