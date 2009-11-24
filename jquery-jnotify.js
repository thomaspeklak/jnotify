(function($){
  //easy data accessor
  var $$ = function(param) {
      var node = $(param)[0];
      var id = $.data(node);
      $.cache[id] = $.cache[id] || {};
      $.cache[id].node = node;
      return $.cache[id];
    };
    
    $.fn.setupExtras = function(setup, options) {
      for(extra in setup) {
        var self = this;
        if(setup[extra] instanceof Array) {
          for(var i=0; i<setup[extra].length; i++)
            setup[extra][i].call(self, options);
        } else {
          setup[extra].call(self, options);
        }
      }
    };
  
  $.fn.jnotify = function(options){
    options = options || {
      duration:5000,
      easing:'linear'
    };
    this.setupExtras(options.setup || $.fn.jnotify.base, options)
    
    return this.each(function(){
      $$(this).options = options;
      $(this).trigger('initialize');
      log('main');        
    });
  };
  
  $.fn.jnotify.base = {
    setup : function(){
      this.addClass('jnotify');
    },
    initialize : function(){
      this.notice = $.fn.jnotify.notice;
      log('initialize');
    }
  };

  $.fn.jnotify.notice = function(message, options){
    options = merge_options(this, options);
    log('notice: '+ message + ' | duration: ' + options.duration);
  }

  function merge_options(presets, options){
    presets = $$(presets).options;
    if(typeof(options) === 'object'){
      return merge_hash(presets, options);
    } else if(typeof(options) === 'number') {
      return merge_hash(presets, {duration:options});
    }
    return presets;
  }

  merge_hash = function(first, second){
    for(i in second){
      first[i] = second[i];
    }
    return first;
  }

  function log(message){
    console && console.log && console.log(message)  
  }
})(jQuery);