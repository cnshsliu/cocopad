const MiniMap = {};
MiniMap.x = 0;
MiniMap.y = 0;
MiniMap.l = 0;
MiniMap.t = 0;
MiniMap.w = 0;
MiniMap.h = 0;
MiniMap.minimapWidth = 0;
MiniMap.minimapHeight = 0;
MiniMap.viewport = null;
MiniMap.theDIV = null;
MiniMap.scroller = null;
MiniMap.window = null;
MiniMap.KFK = null;

MiniMap.minimap = function(minimapDiv, KFK) {
  MiniMap.window = $(window);
  MiniMap.theDIV = minimapDiv;
  MiniMap.KFK = KFK;
  MiniMap.scroller = KFK.JS1;

  MiniMap.minimapWidth = MiniMap.theDIV.width();
  MiniMap.minimapHeight = MiniMap.theDIV.height();
  MiniMap.viewport = $("<div></div>").addClass("minimap-viewport");
  MiniMap.theDIV.append(MiniMap.viewport);
  MiniMap.synchronize();

  MiniMap.window.on("resize", MiniMap.synchronize);
  MiniMap.scroller.on("scroll", MiniMap.synchronize);
  MiniMap.theDIV.on("mousedown touchstart", MiniMap.down);
  MiniMap.KFK.JC3.on("refreshC3", MiniMap.init);
  MiniMap.KFK.JC3.on("zoomC3", MiniMap.synchronize);
};

MiniMap.down = function(e) {
  var moveEvent, upEvent;
  var pos = MiniMap.theDIV.position();
  MiniMap.KFK.minimapMouseDown = true;

  MiniMap.x = Math.round(pos.left + MiniMap.l + MiniMap.w / 2);
  MiniMap.y = Math.round(pos.top + MiniMap.t + MiniMap.h / 2);
  MiniMap.move(e);

  if (e.type === "touchstart") {
    moveEvent = "touchmove.minimapDown";
    upEvent = "touchend";
  } else {
    moveEvent = "mousemove.minimapDown";
    upEvent = "mouseup";
  }
  MiniMap.window.on(moveEvent, MiniMap.move);
  MiniMap.window.on(upEvent, MiniMap.up);
};

MiniMap.move = function(e) {
  e.preventDefault();

  if (e.type.match(/touch/)) {
    if (e.touches.length > 1) {
      return;
    }
    var event = e.touches[0];
  } else {
    var event = e;
  }

  var dx = event.clientX - MiniMap.x;
  var dy = event.clientY - MiniMap.y;
  if (MiniMap.l + dx < 0) {
    dx = -MiniMap.l;
  }
  if (MiniMap.t + dy < 0) {
    dy = -MiniMap.t;
  }
  if (MiniMap.l + MiniMap.w + dx > MiniMap.minimapWidth) {
    dx = MiniMap.minimapWidth - MiniMap.l - MiniMap.w;
  }
  if (MiniMap.t + MiniMap.h + dy > MiniMap.minimapHeight) {
    dy = MiniMap.minimapHeight - MiniMap.t - MiniMap.h;
  }

  MiniMap.x += dx;
  MiniMap.y += dy;

  MiniMap.l += dx;
  MiniMap.t += dy;

  var coefX =
    MiniMap.minimapWidth / (MiniMap.KFK.JC3.width() * MiniMap.KFK.scaleRatio);
  var coefY =
    MiniMap.minimapHeight / (MiniMap.KFK.JC3.height() * MiniMap.KFK.scaleRatio);
  var left = Math.round(MiniMap.l / coefX + MiniMap.KFK.PageWidth);
  var top = Math.round(MiniMap.t / coefY + MiniMap.KFK.PageHeight);

  MiniMap.scroller.scrollLeft(left);
  MiniMap.scroller.scrollTop(top);

  MiniMap.redraw();
};

MiniMap.up = function() {
  MiniMap.KFK.minimapMouseDown = false;
  MiniMap.window.off(".minimapDown");
};

MiniMap.synchronize = function() {
  var dims = [MiniMap.scroller.width(), MiniMap.scroller.height()];
  var scroll = [MiniMap.scroller.scrollLeft(), MiniMap.scroller.scrollTop()];
  var scaleX =
    MiniMap.minimapWidth / (MiniMap.KFK.JC3.width() * MiniMap.KFK.scaleRatio);
  var scaleY =
    MiniMap.minimapHeight / (MiniMap.KFK.JC3.height() * MiniMap.KFK.scaleRatio);
  var scaleX1 = MiniMap.minimapWidth / MiniMap.KFK.JC3.width();
  var scaleY1 = MiniMap.minimapHeight / MiniMap.KFK.JC3.height();

  var lW = dims[0] * scaleX;
  var lH = dims[1] * scaleY;
  var lX = (scroll[0] - MiniMap.KFK.PageWidth) * scaleX;
  var lY = (scroll[1] - MiniMap.KFK.PageHeight) * scaleY;

  MiniMap.w = Math.round(lW);
  MiniMap.h = Math.round(lH);
  MiniMap.l = Math.round(lX);
  MiniMap.t = Math.round(lY);
  // if(MiniMap.l<0) MiniMap.l=0;
  // if(MiniMap.t<0) MiniMap.t=0;
  // if(MiniMap.l+MiniMap.w>MiniMap.minimapWidth)   MiniMap.l = MiniMap.minimapWidth - MiniMap.w;
  // if(MiniMap.t+MiniMap.h>MiniMap.minimapHeight)   MiniMap.t = MiniMap.minimapHeight - MiniMap.h;
  //set the mini viewport dimesions
  MiniMap.redraw();
};

MiniMap.redraw = function() {
  MiniMap.viewport.css({
    width: MiniMap.w,
    height: MiniMap.h,
    left: MiniMap.l,
    top: MiniMap.t,
  });
};

MiniMap.init = function() {
  MiniMap.theDIV.find(".minimap-node").remove();
  //creating mini version of the supplied children
  var ratioX =
    MiniMap.minimapWidth / (MiniMap.KFK.JC3.width() * MiniMap.KFK.scaleRatio);
  var ratioY =
    MiniMap.minimapHeight / (MiniMap.KFK.JC3.height() * MiniMap.KFK.scaleRatio);
  var ratioX1 =
    MiniMap.minimapWidth / (MiniMap.KFK.JC3.width() / MiniMap.KFK.scaleRatio);
  var ratioY1 =
    MiniMap.minimapHeight / (MiniMap.KFK.JC3.height() / MiniMap.KFK.scaleRatio);
  MiniMap.KFK.JC3.children().each(function(index, anode) {
    var $child = $(this);
    if ($child.hasClass("kfknode")) {
      var mini = $("<div></div>").addClass("minimap-node");
      MiniMap.theDIV.append(mini);

      var wM = Math.max($child.width() * ratioX1, 2);
      var hM = (wM * $child.height()) / $child.width();
      // var xM = ($child.position().left + MiniMap.scroller.scrollLeft()) * ratioX;
      // var yM = ($child.position().top + MiniMap.scroller.scrollTop()) * ratioY;
      var xM = $child.position().left * ratioX;
      var yM = $child.position().top * ratioY;

      mini.css({
        width: Math.round(wM),
        height: Math.round(hM),
        left: Math.round(xM),
        top: Math.round(yM),
      });
    }
  });
  MiniMap.KFK.JC3.find(".kfkshape").each((index, shape) => {
    var mini = $("<div></div>").addClass("minimap-node");
    MiniMap.theDIV.append(mini);
    var ratiox = MiniMap.minimapWidth / MiniMap.KFK.JC3.width();
    var ratioy = MiniMap.minimapHeight / MiniMap.KFK.JC3.height();
    let shapeRect = MiniMap.KFK.getShapeRectFromJqObj(shape);

    var wM = Math.max(shapeRect.width * ratioX1, 2);
    var hM = (wM * shapeRect.height) / shapeRect.width;
    var xM = shapeRect.left * ratiox;
    var yM = shapeRect.top * ratioy;

    mini.css({
      width: Math.round(wM),
      height: Math.round(hM),
      left: Math.round(xM),
      top: Math.round(yM),
    });
  });
};

module.exports.MiniMap = MiniMap;
