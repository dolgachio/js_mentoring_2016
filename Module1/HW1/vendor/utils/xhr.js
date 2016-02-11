module.exports = (function(){
    return {
        get: get
    };

    function get(url, callback) {
        var xhr = new XMLHttpRequest();

        xhr.open('GET', url, true);
        xhr.send();

        xhr.onreadystatechange = function() {
            if (xhr.readyState !== 4) {
                return;
            }

            if (xhr.status !== 200) {
                alert(xhr.status + ': ' + xhr.statusText);
            } else {
                callback(xhr.responseText);
            }
        };
    }

})();