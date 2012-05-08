(function() {
  var App,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  window.placeArrows = function() {
    var min_max;
    min_max = $.unique($("#timeline li").map(function(e) {
      return parseInt($(this).css("left"));
    })).sort();
    return $("#timeline li").each(function() {
      var $e;
      $e = $(this);
      if (parseInt($e.css("left")) === min_max[0]) {
        return $e.attr("data-align", "l");
      } else {
        return $e.attr("data-align", "r");
      }
    });
  };

  window.refreshTimeline = function() {
    $('#timeline').masonry("reload");
    return placeArrows();
  };

  $(function() {
    $('#timeline').masonry();
    placeArrows();
    return new App({
      el: $(".container")
    });
  });

  Spine.Controller.include({
    view: function(name, context) {
      return Mustache.render(views[name], context);
    }
  });

  App = (function(_super) {

    __extends(App, _super);

    App.name = 'App';

    App.extend(Spine.Events);

    App.prototype.elements = {
      ".messages": "messages"
    };

    App.prototype.events = {
      "submit form": "search"
    };

    function App() {
      this.search = __bind(this.search, this);

      this.navigateTo = __bind(this.navigateTo, this);
      App.__super__.constructor.apply(this, arguments);
      this.routes({
        "/": function() {
          return this.html(this.view("index"));
        }
      });
      Spine.Route.setup({
        history: true
      });
      Spine.Route.bind("navigate", function() {
        return App.trigger("unbind:all");
      });
    }

    App.prototype.navigateTo = function(e) {
      e.preventDefault();
      return this.navigate($(e.target).attr("href"));
    };

    App.prototype.search = function(e) {
      var $form, username;
      e.preventDefault();
      $form = $(e.target);
      username = $form.find("input").val();
      if ($.isEmptyObject(username)) {
        return this.messages.html(this.view("error", {
          message: "Username is required"
        }));
      } else if ($form.get(0).checkValidity()) {
        return console.log("success");
      } else {
        return this.messages.html(this.view("error", {
          message: "Couldn't find user"
        }));
      }
    };

    return App;

  })(Spine.Controller);

  window.App = App;

}).call(this);
