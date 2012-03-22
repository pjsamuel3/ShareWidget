var shareWidget = shareWidget || {};
shareWidget.productsToShareUrl = "/Order/ShareProducts/";

shareWidget.getOrderedProducts = function (orderId) {
    $.getJSON(shareWidget.productsToShareUrl + orderId, function (data) {
        shareWidget.mapProductsToViewModel(data);
    });
};

shareWidget.mapProductsToViewModel = function (products) {
    var viewModel = (ko.toJS(products));

    console.log(viewModel);
    ko.applyBindings(viewModel);
};

$(document).ready(function () {
    $("#social_choices_tabs").tabs();
    shareWidget.getOrderedProducts("456789");
});