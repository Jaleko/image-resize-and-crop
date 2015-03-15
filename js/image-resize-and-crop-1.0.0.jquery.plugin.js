(function( $ ) {
    $.fn.imageResizeAndCrop = function(customOptions) {
        var options = jQuery.extend({
            preview: { selector: '#preview', width: 500, height: 500 },
            selection: {
                selector: '#selection',
                width: 100,
                height: 200,
                showMessage: function (obj, width, height) {
                    alert("Image not valid. Min width: "+width+"px - Min height: "+height+"px");
                }
            },
            outputImage: { selector: '#output' }
        }, customOptions);
        var resizeImage;
        var outputImage;

        var init = function (fileInput) {
            $(options.preview.selector).css('width', options.preview.width+'px').css('height', options.preview.height+'px');
            $(options.selection.selector)
                .css('width', options.selection.width+'px')
                .css('height', options.selection.height+'px')
                .draggable({
                    containment: options.preview.selector,
                    stop: function(event, ui) {
                        var width = $(this).width();
                        var height = $(this).height();
                        refreshOutputImage(width, height, ui.position.top, ui.position.left);
                    }
                }).resizable({
                    containment: options.preview.selector,
                    aspectRatio: options.selection.width / options.selection.height,
                    minWidth: options.selection.width,
                    minHeight: options.selection.height,
                    stop: function (event, ui) {
                        var width = $(this).width();
                        var height = $(this).height();
                        refreshOutputImage(width, height, ui.position.top, ui.position.left);
                    }
                });

            fileInput.change(function(event) {
                $.each(event.target.files, function(index, file) {
                    var reader = new FileReader();
                    reader.onload = function(event) {
                        var image = new Image();
                        image.onload = function() {
                            resizeImage = resize(image, options.preview.width, options.preview.height);
                            if (!isValid())
                            {
                                options.selection.showMessage(fileInput, options.selection.width, options.selection.height);
                                $(options.preview.selector+', '+options.outputImage.selector).hide();
                            }
                            else
                            {
                                $(options.preview.selector)
                                    .css('width', resizeImage.width+'px')
                                    .css('height', resizeImage.height+'px');
                                $(options.preview.selector).css('background-image', 'url('+resizeImage.data+')');

                                var selection = $(options.selection.selector);
                                var top = parseInt(selection.css('top'));
                                var left = parseInt(selection.css('left'));
                                refreshOutputImage(selection.width(), selection.height(), top, left);
                                $(options.preview.selector+', '+options.outputImage.selector).show();
                            }
                        };
                        image.src = event.target.result;
                    };
                    reader.readAsDataURL(file);
                });
            });
        };

        var refreshOutputImage = function (swidth, sheight, sy, sx)
        {

            if (sy < 0 || isNaN(sy)) sy = 0;
            if (sx < 0 || isNaN(sx)) sx = 0;
            var image = new Image();
            image.onload = function() {
                outputImage = clip(image, sx, sy, swidth, sheight, 0, 0, options.selection.width, options.selection.height);
                $(options.outputImage.selector).attr('src', outputImage.data);
            };
            image.src = resizeImage.data;
        }

        var clip = function (image, sx, sy, swidth, sheight, x, y, width, height)
        {
            var mainCanvas = document.createElement("canvas");
            mainCanvas.width = width;
            mainCanvas.height = height;
            var ctx = mainCanvas.getContext("2d");
            ctx.drawImage(image, sx, sy, swidth, sheight, x, y, width, height);

            var image = {
                data: mainCanvas.toDataURL("image/jpeg"),
                width: mainCanvas.width,
                height: mainCanvas.height
            };
            return image;
        };

        var resize = function (image, width, height)
        {
            var mainCanvas = document.createElement("canvas");

            var widthRatio = width / image.width;
            var heightRatio = height / image.height;
            var ratio = Math.min(widthRatio, heightRatio);

            mainCanvas.width = image.width * ratio;
            mainCanvas.height = image.height * ratio;

            if (ratio > 1)
            {
                mainCanvas.width = image.width;
                mainCanvas.height = image.height;
            }

            var ctx = mainCanvas.getContext("2d");
            ctx.drawImage(image, 0, 0, mainCanvas.width, mainCanvas.height);
            var image = {
                data: mainCanvas.toDataURL("image/jpeg"),
                width: mainCanvas.width,
                height: mainCanvas.height,
                ratio: ratio
            };
            return image;
        };

        var isValid = function ()
        {
            return resizeImage.width >= options.selection.width && resizeImage.height >= options.selection.height;
        }

        this.getImageObject = function ()
        {
            return outputImage;
        };

        return this.each(function() {
            init($(this));
        });
    };
}( jQuery ));