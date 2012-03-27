var shareViewModel = {
    OrderId: ko.observable("000000"),
    ShareUrl: ko.observable("http://www.biggreensmile.com"),
    Products: ko.observableArray(["Ham","Eggs"]),
    type: "Share",
    
    SelectedProduct: ko.observable("000000")
};

shareViewModel.totalProductsInOrder = ko.computed(function() {
    return this.Products().length;
}, shareViewModel);

//shareViewModel.selectedProduct = ko.computed(function () {
//    return this.Products().length;
//}, shareViewModel);




