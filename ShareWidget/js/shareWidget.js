﻿var shareWidget = shareWidget || {};
shareWidget.productsToShareUrl = "Order/ShareProducts/";
//  Order/ShareProducts//apps/ajax/orderjson.ashx?o=
shareWidget.productFlip = null;

shareWidget.getOrderedProducts = function (orderId) {
    $.getJSON(shareWidget.productsToShareUrl + orderId, function (data) {
        shareWidget.mapProductsToViewModel(data);
    });
};

shareWidget.runTwitterCode = function () {
    var x = !function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (!d.getElementById(id)) {
            js = d.createElement(s);
            js.id = id;
            js.src = "//platform.twitter.com/widgets.js";
            fjs.parentNode.insertBefore(js, fjs);
        }
    } (document, "script", "twitter-wjs");

};

shareWidget.runFacebookCode = function () {
    //    $.getScript("//static.ak.fbcdn.net/connect.php/js/FB.Share", function(data, textStatus, jqxhr) {
    //    });


    (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s);
        js.id = id;
        js.src = "//connect.facebook.net/en_GB/all.js#xfbml=1&appId=409345852455857";
        fjs.parentNode.insertBefore(js, fjs);
    } (document, 'script', 'facebook-jssdk'));
};

shareWidget.mapProductsToViewModel = function (order) {

    shareViewModel.Products(order.Products);
    shareViewModel.SelectedProduct(order.SelectedProduct);

    ko.applyBindings(shareViewModel);
    shareWidget.setupImageFlip();
    shareWidget.runTwitterCode();
    shareWidget.runFacebookCode();
};

shareWidget.setupImageFlip = function () {

    function customTitleCreate(itemElem) {

        var title = $('<div class="title"></div>')
        //.append(itemElem.find('img').attr('alt'))
        //.append('<a name="fb_share" type="button" share_url="' + itemElem.find('span.product-url').hide().text() + '">Share on facebook</a>')
        //.append('<div class="fb-like" data-href="' + itemElem.find('span.product-url').hide().text() + '" data-send="true" data-width="450" data-show-faces="true" data-action="recommend"></div>')
            .append('<div class="fb-like" data-href="' + itemElem.find('span.product-url').hide().text() + '" data-send="false" data-layout="button_count" data-width="450" data-show-faces="true"></div>')
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
                $.jcoverflip.animationElement(el.find('span.title'), { display: 'block', color: 'white', 'z-index': '-100' }, {})
            ];
        },
        afterCss: function (el, container, offset) {
            return [
                $.jcoverflip.animationElement(el, { left: (container.width() / 2 + 75 + 105 * offset) + 'px', top: '0' }, {}),
                $.jcoverflip.animationElement(el.find('img'), { width: '80px', height: '80px', opacity: 0.4 }, {}),
                $.jcoverflip.animationElement(el.find('span.title'), { display: 'block', color: 'white', 'z-index': '-100' }, {})
            ];
        },
        currentCss: function (el, container) {
            return [
                $.jcoverflip.animationElement(el, { left: (container.width() / 2 - 73) + 'px', top: '0' }, {}),
                $.jcoverflip.animationElement(el.find('img'), { opacity: 1, width: '140px', height: '140px' }, {}),
                $.jcoverflip.animationElement(el.find('span.title'), { display: 'block', color: '#000', 'z-index': '100' }, {})
            ];
        }
    });

    //move share buttons out of ul and into separate div
    $("div.ui-jcoverflip--title").appendTo("#share-buttons");

};

shareWidget.next = function () {
    shareWidget.productFlip.jcoverflip('next');
};

shareWidget.previous = function () {
    shareWidget.productFlip.jcoverflip('previous');
};

$(document).on("click", "a.product-selector", function (e) {
    e.preventDefault();
    var clickedProduct = $(this).attr("href").replace("#", "");
    shareViewModel.SelectedProduct(clickedProduct);
});

$(document).on("click", ".next", function (e) {
    shareWidget.next();
});

$(document).on("click", ".previous", function (e) {
    shareWidget.previous();
});