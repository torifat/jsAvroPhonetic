(function(){
    if(document.getElementById('avro_js_phonetic')) {
        avro_js_loader();
        return;
    }

    var root = (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]);
    var ns = document.createElementNS && document.documentElement.namespaceURI;

    if(typeof jQuery === 'undefined') {
        var script = ns ? document.createElementNS(ns, 'script') : document.createElement('script');
        script.type = 'text/javascript';
        script.onreadystatechange = function () {
            if (this.readyState == 'complete') enable_avro();
        }
        script.onload= enable_avro;
        script.src= 'https://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.7.min.js';
        root.appendChild(script);
    } else {
        enable_avro();
    }

    function enable_avro() {
        $.noConflict();
        var script = ns ? document.createElementNS(ns, 'script') : document.createElement('script');
        script.type = 'text/javascript';
        script.onreadystatechange = function () {
            if (this.readyState == 'complete') avro_js_loader();
        }
        script.onload= avro_js_loader;
        script.setAttribute('id', 'avro_js_phonetic');
        script.src= 'https://raw.github.com/torifat/jsAvroPhonetic/master/src/avro-latest.js';
        root.appendChild(script);
    }

    function avro_js_loader() {
        jQuery('textarea, input[type=text]').live('focus', function() {
            jQuery(this).avro('destroy').avro();
        }).avro('destroy').avro();
    }
    
})();