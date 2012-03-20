var shareViewModel = {
    OrderId: ko.observable("1234"),
    lastName: ko.observable("Smith"),
    products: ko.observableArray(["Cat", "Dog", "Fish"]),
    type: "Share"
};

shareViewModel.hasALotOfProducts = ko.computed(function () {
    return this.products().length > 2;  
}, shareViewModel)