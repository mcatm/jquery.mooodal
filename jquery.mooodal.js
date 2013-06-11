(function($, document, window) {
   
   var defaults = {
      prefix: 'cbox_',
      is_overlay_close: true
   },
   
   prefix,
   overlay,
   content
   ;
   
   $.fn.mooodal = function(options)
   {
      
      var trigger = $(this);
      
      opt = $.extend(defaults, options);
      
      prefix = opt.prefix;
      
      trigger.on('click', function() {
         
         content.html(getContent(trigger, opt));
         
         open();
         
         if (opt.is_overlay_close) overlay.on('click', function() {
            trigger.close();
         });
         
         return false;
      });
      
      trigger.close = function() {
         close();
      };
      
      $(window).on('resize', function() {
         position();
      }).on('scroll', function() {
         position();
      });
      
      init(opt);
      
   };
   
   function getContent(trigger, opt)
   {
      
      var html = "";
      
      html = '<img src="' + trigger.attr('href') + '">';
      
      return html;
      
   }
   
   function position()
   {
      
      var win =$(window);
      
      var pos = $('body').scrollTop();
      
      var winW = win.width();
      
      if (winW < 320) content.width(320);
      
      var contW = content.outerWidth();
      var winH = win.height();
      var contH = content.outerHeight();
      
      content.css({
         left:(winW - contW) / 2,
         top:pos + ((winH - contH) / 2)
      });
      
      //console.log(pos + (winH - contH) / 2);
      
      //alert($(window).width());
   }
   
   function open()
   {
      
      
      content.show();
      $(window).trigger('resize');
      overlay.show();
      
      
   }
   
   function close()
   {
      content.hide();
      overlay.hide();
   }
   
   function wrapTag(tag, id, css)
   {
      
      var el = document.createElement(tag);

		if (id) el.id = prefix + id;
		if (css) el.style.cssText = css;

		return $(el);
      
   }
   
   function getId(id)
   {
      return '#' + prefix + id;
   }
   
   function init(opt)
   {
      
      $('body').append(wrapTag('div', 'overlay'));
      $('body').append(wrapTag('div', 'content'));
      
      overlay = $(getId('overlay'));
      content = $(getId('content'));
      
      overlay.css({cursor:'pointer'}).hide();
      content.hide();
      
      $(window).trigger('resize');
      
   }
   
})(jQuery, document, window);