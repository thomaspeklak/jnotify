(function($){

  $.widget("ui.notify", {
    _init: function() {
      this.notification_prototype = this.options.notification.prototype;
      this.notification_prototype
        .bind('click', function(){$(this).trigger('close')})
        .bind('close', this.options.notification._close)
        .bind('_close', this.options.notification.close)
        .bind('before-close', this.options.notification['before-close'])
        .bind('after-close', this.options.notification['after-close'])
        .bind('autohide', this.options.notification.autohide)
        .data('options', this.options)
        ;
      this.element
        .bind('before-create', this.options.notification['before-create'])
        .bind('after-create', this.options.notification['after-create'])
      
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
        prototype : $('<div class="ui-notification"></div>'),
        _close : function(){
          $(this)
            .trigger('before-close')
            .trigger('_close')
            .trigger('after-close');
        },
        close : function(){$(this).hide()},
        'before-create' : function(){},
        'after-create' : function(){},
        'before-close' : function(){},
        'after-close' : function(){},
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

