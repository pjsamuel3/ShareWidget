var shareViewModel = {
    OrderId: ko.observable("000000"),
    ShareUrl: ko.observable("http://www.biggreensmile.com"),
    Products: ko.observableArray([{ Name: "Ham", Id: "1"}]),
    type: "Share",

    SelectedProduct: ko.observable()
};

shareViewModel.totalProductsInOrder = ko.computed(function() {
    return this.Products().length;
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


//shareViewModel.nextItem = ko.computed(function () {
//    var all = this.Products();
//    var selected = this.SelectedProduct();

//    for (var i = 0; i < all.length; i++)
//        if (all[i].Id === selected) {
//            return all[i];
//        }

//    return null;
//}, shareViewModel);



