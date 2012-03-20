var shareWidget = shareWidget || {};
shareWidget.productsToShareUrl = "/Order/ShareProducts/";

shareWidget.getOrderItems = function (orderId) {
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
    shareWidget.getOrderItems("1234");
});