/* eslint-disable */
let ImgLoader = function (imgList, callback, timeout) {
    timeout = timeout || 5000;
    imgList = Array.isArray(imgList) && imgList || [];
    callback = typeof(callback) === 'function' && callback;

    var total = imgList.length,
        loaded = 0,
        imgs = [],
        _on = function () {
            loaded < total && (++loaded, callback && callback(loaded / total));
        };

    if (!total) {
        return callback && callback(1);
    }

    for (var i = 0; i < total; i++) {
        imgs[i] = new Image();
        // imgs[i].crossOrigin = '';
        // imgs[i].onload = imgs[i].onerror = _on;
        // imgs[i].src = imgList[i];
    }

    callback()

    setTimeout(function () {
        loaded < total && (loaded = total, callback && callback(loaded / total));
    }, timeout * total);

}

export default ImgLoader