var shareWidget = shareWidget || { };
shareWidget.productsToShareUrl = "/Order/ShareProducts/";
shareWidget.productFlip = null;

shareWidget.getOrderedProducts = function(orderId) {
    $.getJSON(shareWidget.productsToShareUrl + orderId, function(data) {
        shareWidget.mapProductsToViewModel(data);
    });
};

shareWidget.mapProductsToViewModel = function (order) {
    //var viewModel = (ko.toJS(products));
    //console.log(order);
    //var parsed = JSON.parse(products);

    shareViewModel.Products(order.Products);
    shareViewModel.SelectedProduct(order.SelectedProduct);

    ko.applyBindings(shareViewModel);
    shareWidget.setupImageFlip();
};

$(document).on("click", "a.product-selector", function(e) {
    e.preventDefault();
    var clickedProduct = $(this).attr("href").replace("#", "");
    shareViewModel.SelectedProduct(clickedProduct);
});

$(document).ready(function() {
    $("#social_choices_tabs").tabs();
    shareWidget.getOrderedProducts("456789");
});

shareWidget.setupImageFlip = function () {

    shareWidget.productFlip = jQuery('#share_products').jcoverflip({
        current: 1,
        beforeCss: function (el, container, offset) {
            return [
                $.jcoverflip.animationElement(el, { left: (container.width() / 2 - 220 - 110 * offset + 20 * offset) + 'px', bottom: '20px' }, {}),
                $.jcoverflip.animationElement(el.find('img'), { width: Math.max(10, 100 - 20 * offset * offset) + 'px', opacity: 0.5 }, {})
            ];
        },
        afterCss: function (el, container, offset) {
            return [
                $.jcoverflip.animationElement(el, { left: (container.width() / 2 + 10 + 110 * offset) + 'px', bottom: '20px' }, {}),
                $.jcoverflip.animationElement(el.find('img'), { width: Math.max(10, 100 - 20 * offset * offset) + 'px', opacity: 0.5 }, {})
            ];
        },
        currentCss: function (el, container) {
            return [
                $.jcoverflip.animationElement(el, { left: (container.width() / 2 - 100) + 'px', bottom: 0 }, {}),
                $.jcoverflip.animationElement(el.find('img'), { width: '110px', opacity: 1 }, {})
            ];
        },
        change: function (event, ui) {
            jQuery('#scrollbar').slider('value', ui.to * 25);
            var currentItem = $('#share_products').jcoverflip('current');
            console.log(currentItem);
            var clickedProduct = $($('#share_products > li')[currentItem]).find("a").attr("href").replace("#", "");
            shareViewModel.SelectedProduct(clickedProduct);
        }
    });

    jQuery('#scrollbar').slider({
        value: 50,
        stop: function (event, ui) {
            if (event.originalEvent) {
                var newVal = Math.round(ui.value / 25);
                jQuery('#share_products').jcoverflip('current', newVal);
                jQuery('#scrollbar').slider('value', newVal * 25);
            }
        }
    });
};

shareWidget.next = function () {
    shareWidget.productFlip.jcoverflip('next');
};