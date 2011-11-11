(function(){
    if(typeof OmicronLab !== 'undefined') {
        avro_js_loader();
        return;
    }
    
    var root = (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]);
    var ns = document.createElementNS && document.documentElement.namespaceURI;
    
    var loader = ns ? document.createElementNS(ns, 'div') : document.createElement('div');
    loader.setAttribute('style', 'position:fixed; z-index:1000; top:0; bottom:0; left:0; right:0; background:#000; text-align:center; color:#fff; opacity:0.5;');
    loader.innerHTML = '<h1 style="margin-top: 30px;">Loading</h1>';
    loader.setAttribute('id', 'avro_js_loader');
    (document.getElementsByTagName('body')[0]).appendChild(loader);
    
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
        script.src= 'https://raw.github.com/torifat/jsAvroPhonetic/master/dist/avro-latest.js';
        root.appendChild(script);
    }

    function avro_js_loader() {
        jQuery('textarea, input[type=text]').live('focus', function() {
            jQuery(this).avro('destroy').avro();
        }).avro('destroy').avro();
       jQuery('#avro_js_loader').remove();
    }
    
})();