(function($){
  $.fn.extend({
    brbanks: function(options) {

      localMethods = {
        selector: this,
        loadBanks: function() {
          $.getJSON("http://brbanks.herokuapp.com", function(data){
          })
        }
      }

      localMethods.loadBanks();

    }
  });
})(jQuery);
