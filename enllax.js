/**
 * enllax.js v2.0
 *
 * Parallax Library in VanillaJS, with foreground and background images in Scroll.
 *
 * @author: Diego Sevillano
 * @url: https://github.com/numanWD/enllax.js
 *
 * This content is released under the MIT license
 **/

;(function (name, root, definition) {
    'use strict';

    /* CommonJS */
    if (typeof define === 'function') {
        define(definition);
    }
    /* AMD module */
    else if (typeof module !== 'undefined') {
        module.exports = definition();
    }
    /* Browser global */
    else {
        root[name] = definition();
    }
}('enllax', this, function () {
    'use strict';


    var win = window,
        doc = win.document,
        html = doc.documentElement,
        winHeight = win.innerHeight;


    /**
     * Default values of the library
     * @type {{ratio: number, type: string, direction: string}}
     */
    var defaults = {
        ratio: 0.5,
        type: 'background', //foreground
        direction: 'vertical' //horizontal
    };


    /**
     * Setting vendor-prefixed CSS using javascript
     */
    var transformProp = function(){
        var testEl = document.createElement('div');
        if(testEl.style.transform === null) {
            var vendors = ['Webkit', 'Moz', 'ms'];
            for(var vendor in vendors) {
                if(testEl.style[ vendors[vendor] + 'Transform' ] !== undefined) {
                    return vendors[vendor] + 'Transform';
                }
            }
        }
        return 'transform';
    }();


    /**
     * Merge the contents of two or more objects together into the first object.
     *
     * @param defaults
     * @param options
     * @returns {{}}
     * @private
     */
    function _extend( defaults, options ) {
        var extended = {};
        var prop;
        for (prop in defaults) {
            if (Object.prototype.hasOwnProperty.call(defaults, prop)) {
                extended[prop] = defaults[prop];
            }
        }
        for (prop in options) {
            if (Object.prototype.hasOwnProperty.call(options, prop)) {
                extended[prop] = options[prop];
            }
        }
        return extended;
    }

    /**
     * Get the current coordinates of the first element in the set of matched elements, relative to the document.
     *
     * @param elt
     * @returns {{top: number, left: number}}
     * @private
     */
    function _offset(elt) {
        var rect = elt.getBoundingClientRect(), bodyElt = document.body;

        return {
            top: rect.top + bodyElt.scrollTop,
            left: rect.left + bodyElt.scrollLeft
        };
    }

    /**
     *
     * @param target
     * @returns {Array}
     * @private
     */
    function _selector(target) {
        var collection = [],
            selectedElements,
            i;
        if (typeof target === "string") {
            selectedElements = document.querySelectorAll(target);
            for (i = 0; i < selectedElements.length; ++i) {
                collection.push(selectedElements[i]);
            }
        }
        return collection;
    }

    /**
     *
     * @param target
     * @param options
     */
    function init (target, options) {

        var collection = _selector(target),
            opts = _extend(defaults, options);


        collection.forEach(function(ele) {
            var offset = _offset(ele).top,
                height = ele.offsetHeight;

            win.addEventListener('scroll', function() {
                _transformation(ele, offset, height);
            });
            win.addEventListener('resize', function() {
                offset = _offset(ele).top;
                height = ele.offsetHeight;
                _transformation(ele, offset, height);
            });
        });


        /**
         * Transformation function depends of the type
         */
        var _transformation = function() {

            var aux1 = '', aux2 = '';
            if(opts.type === 'background') {
                aux1 = 'center ';
                if (opts.direction === 'horizontal') {
                    aux1 = ''; aux2 = ' center';
                }
                return function (element, offset, height) {
                    var bgPosition = (offset - win.scrollY) * opts.ratio;
                    element.style['background-position'] = aux1 + -bgPosition+ "px" + aux2;
                };
            }
            else if(opts.type === 'foreground') {
                if (opts.direction === 'horizontal') {
                    aux2 = ',0';
                } else {
                    aux1 = '0,';
                }
                return function (element, offset, height) {
                    var transform = ((offset - (winHeight / 2) + height) - win.scrollY) * opts.ratio;
                    element.style[transformProp] = "translate3d("+aux1+transform+"px"+aux2+",0)";
                };
            }
        }();
    }
    return init;

}));