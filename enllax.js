/**
 *
 */

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
}('enllax', this, function (ele, opt) {
    'use strict';


    var win = window,
        doc = win.document,
        html = doc.documentElement,
        prefixes = ['webkit', 'Moz', 'ms', 'O', ''], /* Vendor prefixes */
        winHeight = win.innerHeight,
        docHeight = doc.innerHeight;


    var defaults = {
        ratio: 0,
        type: 'background', //foreground
        direction: 'vertical' //horizontal
    };

    /**
     * Tries various vendor prefixes and returns the first supported property.
     */
    function vendor (el, prop) {
        var s = el.style,
            pp, i;

        prop = prop.charAt(0).toUpperCase() + prop.slice(1);
        if (s[prop] !== undefined) {
            return prop;
        }
        for (i = 0; i < prefixes.length; i++) {
            pp = prefixes[i]+prop;
            if (s[pp] !== undefined) {
                return pp;
            }
        }
    }

    function extend (target, source) {
        var a = Object.create(target);
        Object.keys(source).map(function (prop) {
            prop in a && (a[prop] = source[prop]);
        });
        return a;
    }

    /**
     * Sets multiple style properties at once.
     */
    function css (el, prop) {
        el.style[vendor(el, prop)] = prop;
        return el;
    }

    var settings = extend(defaults, opt);

    function parall () {
        var ratio;
        var type;
        var dir;
        var $this = $(this);
        var offset = $this.offset().top;
        var height = $this.outerHeight();
        var dataRat = $this.data('enllax-ratio');
        var dataType = $this.data('enllax-type');
        var dataDir = $this.data('enllax-direction');

        if(dataRat) {
            ratio = dataRat;
        }
        else { ratio = options.ratio; }

        if(dataType) {
            type = dataType;
        }
        else { type = options.type; }

        if(dataDir) {
            dir = dataDir;
        }
        else { dir = options.direction; }

        var bgY = offset * ratio;
        var transform = (offset - (winHeight / 2) + height) * ratio;

        if(type === 'background') {
            if(dir === 'vertical') {
                $this.css({
                    'background-position': 'center ' + -bgY + 'px'
                });
            }
            else if(dir === 'horizontal') {
                $this.css({
                    'background-position': -bgY + 'px' + ' center'
                });
            }
        }
        else if(type === 'foreground') {
            if(dir === 'vertical') {
                $this.css({
                    '-webkit-transform': 'translateY(' + transform + 'px)',
                    '-moz-transform': 'translateY(' + transform + 'px)',
                    'transform': 'translateY(' + transform + 'px)'
                });
            }
            else if(dir === 'horizontal') {
                $this.css({
                    '-webkit-transform': 'translateX(' + transform + 'px)',
                    '-moz-transform': 'translateX(' + transform + 'px)',
                    'transform': 'translateX(' + transform + 'px)'
                });
            }
        }

        window.addEventListener('scroll', function()
        {
            var scrolling = $(this).scrollTop();

            bgY = (offset - scrolling) * ratio;
            transform = ((offset - (winHeight / 2) + height) - scrolling) * ratio;

            if (type === 'background') {
                if (dir === 'vertical') {
                    $this.css(
                        {
                            'background-position': 'center ' + -bgY + 'px'
                        }
                    );
                }
                else
                    if (dir === 'horizontal') {
                        $this.css(
                            {
                                'background-position': -bgY + 'px' + ' center'
                            }
                        );
                    }
            }
            else {
                if ((type === 'foreground') && (scrolling < docHeight)) {
                    if (dir === 'vertical') {
                        $this.css(
                            {
                                '-webkit-transform': 'translateY(' + transform + 'px)',
                                '-moz-transform':    'translateY(' + transform + 'px)',
                                'transform':         'translateY(' + transform + 'px)'
                            }
                        );
                    }
                    else
                        if (dir === 'horizontal') {
                            $this.css(
                                {
                                    '-webkit-transform': 'translateX(' + transform + 'px)',
                                    '-moz-transform':    'translateX(' + transform + 'px)',
                                    'transform':         'translateX(' + transform + 'px)'
                                }
                            );
                        }
                }
            }
        });
    }(element, options);

    // expose useful methods
    morpheus.tween = tween
    morpheus.getStyle = getStyle
    morpheus.bezier = bezier
    morpheus.transform = transform
    morpheus.parseTransform = parseTransform
    morpheus.formatTransform = formatTransform
    morpheus.animationFrame = frame
    morpheus.easings = {}

    return morpheus;

}));


https://github.com/ded/morpheus/blob/master/src/morpheus.js