var shareViewModel = {
    OrderId: ko.observable("000000"),
    ShareUrl: ko.observable("http://www.biggreensmile.com"),
    Products: ko.observableArray([{ Name: "", Id: ""}]),
    type: "Share",

    SelectedProduct: ko.observable()
};

shareViewModel.totalProductsInOrder = ko.computed(function () {
    return this.Products().length;
}, shareViewModel);

shareViewModel.showNavigation = ko.computed(function () {
    return this.Products().length > 1;
}, shareViewModel);

shareViewModel.currentItem = ko.computed(function () {
    var all = this.Products();
    var selected = this.SelectedProduct();

    for (var i = 0; i < all.length; i++)
        if (all[i].Id === selected) {
            return all[i];
        }

    return null;
}, shareViewModel);