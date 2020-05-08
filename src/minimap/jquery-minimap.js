(function ($) {
  $.fn.minimap = function (KFK, scroller, JC3, JCMain) {
    var x, y, l, t, w, h;
    var $window = $(window);
    var $minimap = this;
    var minimapWidth = $minimap.width();
    var minimapHeight = $minimap.height();
    var $viewport = $("<div></div>").addClass("minimap-viewport");
    $minimap.append($viewport);
    synchronize();

    $window.on("resize", synchronize);
    scroller.on("scroll", synchronize);
    $minimap.on("mousedown touchstart", down);
    JC3.on("refreshC3", init);
    JC3.on("zoomC3", synchronize);

    function down(e) {
      var moveEvent, upEvent;
      var pos = $minimap.position();
      KFK.minimapMouseDown = true;

      x = Math.round(pos.left + l + w / 2);
      y = Math.round(pos.top + t + h / 2);
      move(e);

      if (e.type === "touchstart") {
        moveEvent = "touchmove.minimapDown";
        upEvent = "touchend";
      } else {
        moveEvent = "mousemove.minimapDown";
        upEvent = "mouseup";
      }
      $window.on(moveEvent, move);
      $window.one(upEvent, up);
    }

    function move(e) {
      e.preventDefault();

      if (e.type.match(/touch/)) {
        if (e.touches.length > 1) {
          return;
        }
        var event = e.touches[0];
      } else {
        var event = e;
      }

      var dx = event.clientX - x;
      var dy = event.clientY - y;
      if (l + dx < 0) {
        dx = -l;
      }
      if (t + dy < 0) {
        dy = -t;
      }
      if (l + w + dx > minimapWidth) {
        dx = minimapWidth - l - w;
      }
      if (t + h + dy > minimapHeight) {
        dy = minimapHeight - t - h;
      }

      x += dx;
      y += dy;

      l += dx;
      t += dy;

      var coefX = minimapWidth / (JC3.width() * KFK.scaleRatio);
      var coefY = minimapHeight / (JC3.height() * KFK.scaleRatio);
      var left = Math.round(l / coefX + KFK.PageWidth);
      var top = Math.round(t / coefY + KFK.PageHeight);

      scroller.scrollLeft(left);
      scroller.scrollTop(top);

      redraw();
    }

    function up() {
      KFK.minimapMouseDown = false;
      $window.off(".minimapDown");
    }

    function synchronize() {
      var dims = [scroller.width(), scroller.height()];
      var scroll = [scroller.scrollLeft(), scroller.scrollTop()];
      var scaleX = minimapWidth / (JC3.width() * KFK.scaleRatio);
      var scaleY = minimapHeight / (JC3.height() * KFK.scaleRatio);

      var lW = dims[0] * scaleX;
      var lH = dims[1] * scaleY;
      var lX = (scroll[0]-KFK.PageWidth) * scaleX;
      var lY = (scroll[1]-KFK.PageHeight) * scaleY;

      w = Math.round(lW);
      h = Math.round(lH);
      l = Math.round(lX);
      t = Math.round(lY);
      // if(l<0) l=0;
      // if(t<0) t=0;
      // if(l+w>minimapWidth)   l = minimapWidth - w;
      // if(t+h>minimapHeight)   t = minimapHeight - h;
      //set the mini viewport dimesions
      redraw();
    }

    function redraw() {
      $viewport.css({
        width: w,
        height: h,
        left: l,
        top: t
      });
    }

    function init() {
      $minimap.find(".minimap-node").remove();
      //creating mini version of the supplied children
      JC3.children().each(function (index, anode) {
		var $child = $(this);
        if ($child.hasClass("kfknode")) {
          var mini = $("<div></div>").addClass("minimap-node");
          $minimap.append(mini);
          var ratioX = minimapWidth / JC3.width();
          var ratioY = minimapHeight / JC3.height();
          // var ratioX = minimapWidth / (JC3.width() * KFK.scaleRatio);
          // var ratioY = minimapHeight / (JC3.height() * KFK.scaleRatio);

          var wM = $child.width() * ratioX;
          var hM = $child.height() * ratioY;
          // var xM = ($child.position().left + scroller.scrollLeft()) * ratioX;
          // var yM = ($child.position().top + scroller.scrollTop()) * ratioY;
          var xM = ($child.position().left) * ratioX;
          var yM = ($child.position().top) * ratioY;

          mini.css({
            width: Math.round(wM),
            height: Math.round(hM),
            left: Math.round(xM),
            top: Math.round(yM)
          });
        }
      });
    }

    init();

    return this;
  };
})(jQuery);
