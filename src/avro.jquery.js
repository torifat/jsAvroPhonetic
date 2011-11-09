/*
	=============================================================================
	*****************************************************************************
	The contents of this file are subject to the Mozilla Public License
	Version 1.1 (the "License"); you may not use this file except in
	compliance with the License. You may obtain a copy of the License at
	http://www.mozilla.org/MPL/

	Software distributed under the License is distributed on an "AS IS"
	basis, WITHOUT WARRANTY OF ANY KIND, either express or implied. See the
	License for the specific language governing rights and limitations
	under the License.

	The Original Code is jsAvroPhonetic

	The Initial Developer of the Original Code is
	Rifat Nabi <to.rifat@gmail.com>

	Copyright (C) OmicronLab (http://www.omicronlab.com). All Rights Reserved.


	Contributor(s): ______________________________________.

	*****************************************************************************
	=============================================================================
*/

(function($){

    var methods = {
        opt : {'bn' : true},
        callback : null,
        init : function(options, callback) {

            if(options) {
                $.extend(methods.opt, options);
            }
            
            if(callback && typeof callback === 'function') {
            	methods.callback = callback;
            	callback(methods.opt.bn);
            }
            
            return this.each(function() {
                $(this).bind('keyup.avro', methods.keyup);
                $(this).bind('keypress.avro', methods.keypress);
            });

        },
        destroy : function() {

            return this.each(function() {
                $(this).unbind('.avro');
            })

        },
        keypress : function(e) {
            
            var keycode = e.keyCode || e.which || e.charCode;
            var target = e.currentTarget || e.target || e.srcElement;
            
            if(!methods.opt.bn) {
                return;
            }
            
            // 32 - Space, 13 - Enter, 9 - Tab
            if(keycode === 32 || keycode === 13 || keycode ===9) {
                methods.replace(target);
            }
            
        },
        keyup : function(e) {
            
            var keycode = e.keyCode || e.which || e.charCode;
            if(keycode === 77 && e.ctrlKey === true && altKey === false && shiftKey === false) {
                methods.opt.bn = !methods.opt.bn;
                if(typeof methods.callback === 'function') {
                	methods.callback(methods.opt.bn);
                }
                e.preventDefault();
            }
            
        },
        replace : function(el) {
            
            var cur = methods.getCaret(el);
            var last = methods.findLast(el, cur);
            var bangla  = OmicronLab.Avro.Phonetic.parse(el.value.substring(last, cur));
            
            if(document.selection) {
                var range = document.selection.createRange();
                range.moveStart('character', -1 * (Math.abs(cur - last)));
                range.text = bangla;
                range.collapse(true);
            }
            else {
            	el.value = el.value.substring(0, last) + bangla + el.value.substring(cur);
                el.selectionStart = el.selectionEnd = (cur - (Math.abs(cur - last) - bangla.length));
            }
            
        },
        findLast : function(el, cur) {
        
        	var last = cur - 1;
        	while(el.value.charAt(last) !== ' ' && last > 0) {
        		last--;
        	}
        	return last;
        	
        },
        // http://stackoverflow.com/questions/263743/how-to-get-cursor-position-in-textarea
        getCaret : function(el) {
            
            if (el.selectionStart) {
                return el.selectionStart;
            } else if (document.selection) {
                el.focus();

                var r = document.selection.createRange();
                if (r == null) {
                    return 0;
                }

                var re = el.createTextRange(),
                rc = re.duplicate();
                re.moveToBookmark(r.getBookmark());
                rc.setEndPoint('EndToStart', re);

                return rc.text.length;
            }
            return 0;
            
        }
    };

    $.fn.avro = function(method) {

        if (methods[method]) {
            return methods[method].apply( this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || ! method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' +  method + ' does not exist on jQuery.avro');
        }
        
    };

})(jQuery);