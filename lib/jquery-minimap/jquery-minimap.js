(function ($) {
  $.fn.minimap = function (KFK, $main, $mapSource, $bigBoss) {
    var x, y, l, t, w, h;
    var $window = $(window);
    var $minimap = this;
    var minimapWidth = $minimap.width();
    var minimapHeight = $minimap.height();
    var $viewport = $("<div></div>").addClass("minimap-viewport");
    $minimap.append($viewport);
    synchronize();

    $window.on("resize", synchronize);
    $main.on("scroll", synchronize);
    $minimap.on("mousedown touchstart", down);
    $mapSource.on("refreshC3", init);
    $mapSource.on("zoomC3", synchronize);

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

      var coefX = minimapWidth / ($mapSource.width() * KFK.zoomLevel);
      var coefY = minimapHeight / ($mapSource.height() * KFK.zoomLevel);
      var left = l / coefX;
      var top = t / coefY;

      $main.scrollLeft(Math.round(left));
      $main.scrollTop(Math.round(top));

      redraw();
    }

    function up() {
      KFK.minimapMouseDown = false;
      $window.off(".minimapDown");
    }

    function synchronize() {
      var dims = [$main.width(), $main.height()];
      var scroll = [$main.scrollLeft(), $main.scrollTop()];
      var scaleX = minimapWidth / ($mapSource.width() * KFK.zoomLevel);
      var scaleY = minimapHeight / ($mapSource.height() * KFK.zoomLevel);

      var lW = dims[0] * scaleX;
      var lH = dims[1] * scaleY;
      var lX = scroll[0] * scaleX;
      var lY = scroll[1] * scaleY;

      w = Math.round(lW);
      h = Math.round(lH);
      l = Math.round(lX);
      t = Math.round(lY);
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
      $mapSource.children().each(function (index, anode) {
		var $child = $(this);
        if ($child.hasClass("kfknode")) {
          var mini = $("<div></div>").addClass("minimap-node");
          $minimap.append(mini);
          var ratioX = minimapWidth / ($mapSource.width() * KFK.zoomLevel);
          var ratioY = minimapHeight / ($mapSource.height() * KFK.zoomLevel);

          var wM = $child.width() * ratioX;
          var hM = $child.height() * ratioY;
          // var xM = ($child.position().left + $main.scrollLeft()) * ratioX;
          // var yM = ($child.position().top + $main.scrollTop()) * ratioY;
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
