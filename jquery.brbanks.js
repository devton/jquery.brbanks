(function($){
  $.fn.extend({
    brbanks: function(options) {
      var root = this;

      local = {
        selector: this,
        bankDivSelector: '.brbanks-banks',
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
        },

        buildBankDiv: function() {
          var div = $("<div class='brbanks-banks' style='display: none;'></div>")
          var ul = $("<ul></ul>")

          $.each(this.selector.data('banks'), function(i, item){
            ul.append($('<li>'+item+'</li>'));
          });

          div.prepend(ul);
          return div;
        }
      }

      local.loadBanksOnSelector(function(that) {
        that.selector.focusin(function(){
          if($(that.bankDivSelector).length <= 0) {
            var div = that.buildBankDiv();
            that.selector.parent().append(div);
            div.show();
          } else {
            $(that.bankDivSelector).show();
          };

          $('ul li', that.bankDivSelector).click(function(element){
            root.val($(element.currentTarget).text());
          })
        });
      });
    }
  });
})(jQuery);
