$(document).ready(function () {
    getImagesJSON();
}); 

function getImagesJSON () {

    var wrapperImages = $("#wrapperImages")
    var urlJSON = 'https://jsonplaceholder.typicode.com/photos';

    $.getJSON(urlJSON, function (result) {

        var albumsById = groupAlbumsById(result);

        addArticleHtml(wrapperImages, albumsById);

    });

}

function groupAlbumsById (result) {

    var albumIds = result.map(function (obj) {
        return obj.albumId;
    });
    
    albumIds = $.unique(albumIds).slice(0, 21);

    var albumList = result.filter( function (obj) {
        return obj.albumId in albumIds;
    });

    var groupedAlbumList = albumList.reduce( function (acc, curr) {
        (acc[curr.albumId] = acc[curr.albumId] || []).push(curr);
        return acc;
    }, {});

    return groupedAlbumList;
}

function addArticleHtml (container, albums) {

    $.each(albums, function (i, images) {
        var price = parseFloat(parseFloat(
                    Math.floor(Math.random() * (100 - 1 + 1) + 1)
                    ).toFixed(2));
        var tax = 18*100;
        var commission = parseFloat(parseFloat((price*100) / tax).toFixed(2));
        var shipping = parseFloat(parseFloat(5).toFixed(2));
        var totalPrice = price + commission + shipping;
        totalPrice = parseFloat(parseFloat(totalPrice).toFixed(2));

        var articleHtml = 
        '<article class="wrapper-article bg-gray">' + 
            '<div class="header-article">' + 
                'Albúm N° ' + i + '<br>' + 
                'Precio del Albúm: S/. '+ price +' <br>' +
                'Impuesto (18%): S/.' + commission + ' <br>' + 
                'Costo de envío: S/. '+ shipping +'<br>' + 
                '<strong>TOTAL A PAGAR: S/. '+ totalPrice +' </strong>' +
            '</div>' + 
            '<div class="body-article">';

        $.each(images, function (i, image) {
            articleHtml += 
            '<figure>' + 
                '<img src="'+ image.thumbnailUrl +'" alt="'+ image.title + '" title="'+image.title+'">' + 
            '</figure>';
        });

        articleHtml += '</div> </article>';

        container.append(articleHtml);
    });
}

