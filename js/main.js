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
        var articleHtml = 
        '<article class="wrapper-article bg-gray">' + 
            '<div class="header-article">' + 
                'Albúm N° ' + i + '<br>' + 
                'Precio del Albúm: S/. 200 <br>' +
                'Impuesto: S/. 18 <br>' + 
                'Costo de envío: S/. 5.00 <br>' + 
                '<strong>TOTAL A PAGAR: S/. 300 </strong>' +
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

