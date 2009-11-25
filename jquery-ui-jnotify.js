(function($){

  $.widget("ui.notify", {
    _init: function() {
      this.notification_prototype = this.options.notification.prototype;
      this.notification_prototype
        .bind('click', function(){$(this).trigger('close')})
        .bind('close', this.options.notification.close)
        .bind('autohide', this.options.notification.autohide)
        .bind('mouseover', function(){$(this).stop().trigger('autohide')})
        .data('options', this.options)
        ;
      this.element
        .bind('before-create', this.options.notification['before-create'])
        .bind('after-delete', this.options.notification['after-delete'])
        .addClass( "ui-notify" 
          + " ui-widget"
          + " ui-widget-content");
      
    },
    
    destroy: function(){
      this.element
        .removeClass( "ui-notify" 
          + " ui-widget"
          + " ui-widget-content" )
        .unbind('before-create')
        .unbind('after-delete')
        .unbind('notify');
        
      $.widget.prototype.destroy.apply(this, arguments);
      
      return this;
    },
    
    _send: function(type, message, options) {
      log('type: ' + type + ' message ' + message + ' options ' + options );
      this.element
        .trigger('before-create')
        .append(
            this.notification_prototype
            .clone(true)
            .data('options',this.notification_prototype.data('options'))
            .addClass(type)
            .html(message)
            .trigger('autohide')
          )
        .trigger('after-create');
    },
    notice: function(message, options){
      this._send('notice', message, options);
    }
  });
  $.extend($.ui.notify, {
    defaults: {
      duration: 5000,
      easing : 'linear',
      notification : {
        prototype : $('<div></div>').addClass( "ui-notification" 
          + " ui-widget"
          + " ui-widget-content"),
        _close : function(){
          $(this).data('options').notification.close();
          $(this.parentNode).trigger('after-delete');

        },
        close: function(){$(this).animate({height:0,opacity:0},1000, function(){$(this).remove()})},
        'before-create' : function(){},
        'after-delete' : function(){},
        autohide : function(){
          setTimeout(
            (function($this){ 
              return function(){ $this.trigger('close') }
            })($(this)),
            $(this).data('options').duration)
        }
      }
    }
  });

  function log(message){
    console && console.log && console.log(message)  
  }
  
})(jQuery);

