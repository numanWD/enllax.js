/**
  * enllax.js v1.2
  * https://github.com/numanWD/enllax.js
  *
  * This content is released under the MIT license
 **/

var enllax = {};


enllax = (function(opt) {
    'use strict';

        
        var winHeight = $(window).height();
        var docHeight = $(document).height();
        
        var options = $.extend({
            ratio: 0,
            type: 'background', //foreground
            direction: 'vertical' //horizontal
        }, opt);
        
        var elem = $('[data-enllax-ratio]');
        
        elem.each(function(){
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
        });
    
})();
