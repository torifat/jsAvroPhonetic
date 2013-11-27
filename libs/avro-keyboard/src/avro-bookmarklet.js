(function(){
    if(typeof OmicronLab !== 'undefined') {
        avro_js_loader();
        return;
    }
    
    var root = (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]);
    var ns = document.createElementNS && document.documentElement.namespaceURI;
    
    var loader = ns ? document.createElementNS(ns, 'div') : document.createElement('div');
    loader.setAttribute('style', 'position:fixed; z-index:1000; top:0; left:0; right:0; -webkit-box-shadow: 0 0 2px rgba(0, 0, 0, .52); border-bottom: 1px solid #000');
    loader.innerHTML = '<div style="font:normal 15px sans-serif; padding:10px; background:#000; opacity:0.8; color: #fff; text-align:center;">অভ্র ফনেটিক লোড হচ্ছে...</div>';
    loader.setAttribute('id', 'avro_js_loader');
    (document.getElementsByTagName('body')[0]).appendChild(loader);
    
    var noConflictMode = false;
    if(typeof $ !== 'undefined') {
        noConflictMode = true;
    }
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
        if(noConflictMode) {
            jQuery.noConflict();
        }
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
        jQuery('textarea, input[type=text]').avro({bangla: false}, fb);
        jQuery('body').bind('DOMNodeInserted', function(e) {
            jQuery(e.target).find('textarea, input[type=text]').avro({bangla: false}, fb);
        });
        
        jQuery('#avro_js_loader').slideUp('slow', function() {
            jQuery(this).find('div').html('কীবোর্ড পরিবর্তন করতে <strong>Ctrl+M</strong> চাপুন').parent().slideDown()
        });
        setTimeout(function() {
            jQuery('#avro_js_loader').slideUp('slow');
        }, 5000);
    }
    
    function fb(e){
        if('Dialog' in window) {
            Dialog._tearDown();
        }
    }
    
})();