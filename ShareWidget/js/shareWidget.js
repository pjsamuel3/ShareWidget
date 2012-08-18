var shareWidget = shareWidget || { };
shareWidget.productsToShareUrl = "/Order/ShareProducts/";
shareWidget.productFlip = null;

shareWidget.getOrderedProducts = function(orderId) {
    $.getJSON(shareWidget.productsToShareUrl + orderId, function(data) {
        shareWidget.mapProductsToViewModel(data);
    });
};

shareWidget.runTwitterCode = function() {
    var x = !function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (!d.getElementById(id)) {
            js = d.createElement(s);
            js.id = id;
            js.src = "//platform.twitter.com/widgets.js";
            fjs.parentNode.insertBefore(js, fjs);
        }
    }(document, "script", "twitter-wjs");

};

shareWidget.mapProductsToViewModel = function (order) {

    shareViewModel.Products(order.Products);
    shareViewModel.SelectedProduct(order.SelectedProduct);

    ko.applyBindings(shareViewModel);
    shareWidget.setupImageFlip();
    shareWidget.runTwitterCode();
};

$(document).on("click", "a.product-selector", function(e) {
    e.preventDefault();
    var clickedProduct = $(this).attr("href").replace("#", "");
    shareViewModel.SelectedProduct(clickedProduct);
});

$(document).on("click", ".next", function(e) {
    shareWidget.next();
});

$(document).on("click", ".previous", function(e) {
    shareWidget.previous();
});

$(document).ready(function() {
    $("#social_choices_tabs").tabs();
    shareWidget.getOrderedProducts("456789");
});

shareWidget.setupImageFlip = function () {

    function customTitleCreate(itemElem) {
        
        var title = $('<div class="title"></div>')
            //.append(itemElem.find('img').attr('alt'))
            //.append('<a name="fb_share" type="button" share_url="' + itemElem.find('span.product-url').hide().text() + '">Share on facebook</a>')
            .append('<div class="fb-like" data-href="' + itemElem.find('span.product-url').hide().text() + '" data-send="true" data-width="450" data-show-faces="true" data-action="recommend"></div>')
            .append('<a href="https://twitter.com/share" class="twitter-share-button" data-count="none" data-lang="en" data-url="' + itemElem.find('span.encoded-url').hide().text() + '" data-text="' + itemElem.find('span.tweet-content').hide().text() + '">Tweet</a>');
        return title;
    }

    function customTitleDestroy(titleElem) {
        titleElem.remove(); // delete the title element
    }

    shareWidget.productFlip = $('#share_products').jcoverflip({
        current: 0,
        change: function (event, ui) {
            var currentItem = $('#share_products').jcoverflip('current');
            var clickedProduct = $($('#share_products > li')[currentItem]).find("a").attr("href").replace("#", "");
            shareViewModel.SelectedProduct(clickedProduct);
        },
        titles: { create: customTitleCreate, destroy: customTitleDestroy },
        beforeCss: function (el, container, offset) {
                return [
                    $.jcoverflip.animationElement(el, { left: (container.width() / 2 - 160 - 110 * offset) + 'px', top: '0' }, {}),
                    $.jcoverflip.animationElement(el.find('img'), { width: '80px', height: '80px', opacity: 0.4 }, {}),
                    $.jcoverflip.animationElement(el.find('span.title'), { display: 'none' }, {})
                ];
            },
        afterCss: function (el, container, offset) {
                return [
                    $.jcoverflip.animationElement(el, { left: (container.width() / 2 + 75 + 105 * offset) + 'px', top: '0' }, {}),
                    $.jcoverflip.animationElement(el.find('img'), { width: '80px', height: '80px', opacity: 0.4 }, {}),
                    $.jcoverflip.animationElement(el.find('span.title'), { display: 'none' }, {})
                ];
            },
        currentCss: function (el, container) {
                return [
				$.jcoverflip.animationElement(el, { left: (container.width() / 2 - 73) + 'px', top: '0' }, {}),
				$.jcoverflip.animationElement(el.find('img'), { opacity: 1, width: '140px', height: '140px' }, {}),
                $.jcoverflip.animationElement(el.find('span.title'), { display: 'block' }, {})
			];
        }
    });

        //move share buttons out of ul and into separate div
        $("div.ui-jcoverflip--title").appendTo("#share-buttons");




    //    shareWidget.productFlip = jQuery('#share_products').jcoverflip({
    //        current: 1,
    //        beforeCss: function (el, container, offset) {
    //            return [
    //                $.jcoverflip.animationElement(el, { left: (container.width() / 2 - 220 - 110 * offset + 20 * offset) + 'px', bottom: '20px' }, {}),
    //                $.jcoverflip.animationElement(el.find('img'), { width: Math.max(10, 100 - 20 * offset * offset) + 'px', opacity: 0.5 }, {})
    //            ];
    //        },
    //        afterCss: function (el, container, offset) {
    //            return [
    //                $.jcoverflip.animationElement(el, { left: (container.width() / 2 + 10 + 110 * offset) + 'px', bottom: '20px' }, {}),
    //                $.jcoverflip.animationElement(el.find('img'), { width: Math.max(10, 100 - 20 * offset * offset) + 'px', opacity: 0.5 }, {})
    //            ];
    //        },
    //        currentCss: function (el, container) {
    //            return [
    //                $.jcoverflip.animationElement(el, { left: (container.width() / 2 - 100) + 'px', bottom: 0 }, {}),
    //                $.jcoverflip.animationElement(el.find('img'), { width: '110px', opacity: 1 }, {})
    //            ];
    //        },
    //        change: function (event, ui) {
    //            jQuery('#scrollbar').slider('value', ui.to * 25);
    //            var currentItem = $('#share_products').jcoverflip('current');
    //            console.log(currentItem);
    //            var clickedProduct = $($('#share_products > li')[currentItem]).find("a").attr("href").replace("#", "");
    //            shareViewModel.SelectedProduct(clickedProduct);
    //        }
    //    });

    //    jQuery('#scrollbar').slider({
    //        value: 50,
    //        stop: function (event, ui) {
    //            if (event.originalEvent) {
    //                var newVal = Math.round(ui.value / 25);
    //                jQuery('#share_products').jcoverflip('current', newVal);
    //                jQuery('#scrollbar').slider('value', newVal * 25);
    //            }
    //        }
    //    });
};

shareWidget.next = function() {
    shareWidget.productFlip.jcoverflip('next');
};

shareWidget.previous = function() {
    shareWidget.productFlip.jcoverflip('previous');
};