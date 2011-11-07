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
        last : null,
        init : function(options) {
            
            return this.each(function(){
                $(this).bind('keypress.avro', methods.keypress);
            });

        },
        destroy: function() {

            return this.each(function(){
                $(this).unbind('.avro');
            })

        },
        keypress: function(e) {
            // console.log(e);
            var keycode = e.keyCode || e.which || e.charCode;
            var target = e.currentTarget || e.target || e.srcElement;
            if(methods.last === null) {
                methods.last = methods.getCaret(target);
            }
            if(keycode === 32 || keycode === 13) {
                methods.replace(target);
                methods.last = null;
            }
        },
        replace: function(el) {
            var cur = methods.getCaret(el);
            var bangla  = OmicronLab.Avro.Phonetic.parse(el.value.substring(methods.last, cur));
            if(document.selection) {
                var range = document.selection.createRange();
                range.moveStart('character', -1 * (Math.abs(cur - methods.last)));
                range.text = bangla;
                range.collapse(true);
            }
            else {
                el.value = el.value.substring(0, methods.last) + bangla + el.value.substring(cur);
                el.selectionStart = el.selectionEnd = (cur - (Math.abs(cur - methods.last) - bangla.length));
            }
        },
        // http://stackoverflow.com/questions/263743/how-to-get-cursor-position-in-textarea
        getCaret: function(el) {
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