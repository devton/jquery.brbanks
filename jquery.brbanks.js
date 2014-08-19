(function($){
  $.fn.extend({
    brbanks: function(options) {

      local = {
        selector: this,
        banks: [],

        parseToList: function(banks_data) {
          that = this;
          $.each(banks_data, function(i,item){
            that.banks.push(item.id + ' - ' + item.name)
          });

          that.inserListOnData();
        },

        inserListOnData: function() {
          this.selector.data('banks', this.banks);
        },

        loadBanksOnSelector: function(callback) {
          var that = this;
          $.getJSON("http://brbanks.herokuapp.com", function(data){
            that.parseToList(data);
            callback(that);
          });
        }
      }

      local.loadBanksOnSelector(function(that) {
        console.log(that.selector.data('banks'));
      });
    }
  });
})(jQuery);
