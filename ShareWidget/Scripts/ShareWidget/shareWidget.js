var shareWidget = shareWidget || {};
shareWidget.productsToShareUrl = "/Order/ShareProducts/";

shareWidget.getOrderedProducts = function (orderId) {
    $.getJSON(shareWidget.productsToShareUrl + orderId, function (data) {
        shareWidget.mapProductsToViewModel(data);
    });
};

shareWidget.mapProductsToViewModel = function (order) {
    //var viewModel = (ko.toJS(products));
    console.log(order);
    //var parsed = JSON.parse(products);

    shareViewModel.Products(order.Products);
    shareViewModel.SelectedProduct(order.SelectedProduct);

    ko.applyBindings(shareViewModel);
};

$(document).ready(function () {
    $("#social_choices_tabs").tabs();
    shareWidget.getOrderedProducts("456789");


});

$(document).on("click", "a.product-selector", function (e) {
    e.preventDefault();
    var clickedProduct = $(this).attr("href").replace("#","");

    console.log(clickedProduct);

    shareViewModel.SelectedProduct(clickedProduct);
});