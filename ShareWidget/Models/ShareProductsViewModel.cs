using System.Collections.Generic;

namespace ShareWidget.Models
{
    public class ShareProductsViewModel
    {
        public string OrderId { get; set; }
        public IEnumerable<Product> Products { get; set; }
        public string SelectedProduct { get; set; }
    }
}