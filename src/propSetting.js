const PropSetting = {};
import KFK from "./console";
import SVGs from "./svgs";

PropSetting.initPropertyForm = function() {
  KFK.debug("...initPropertyForm");
  let spinnerFontSize = $("#spinner_font_size").spinner({
    min: 8,
    max: 100,
    step: 1,
    start: 18,
    spin: async function(evt, ui) {
      await KFK.updateSelectedDIVs("set font size", async function(jqNode) {
        await jqNode.find(".innerobj").css("font-size", KFK.px(ui.value));
      });
    },
  });
  spinnerFontSize.spinner("value", 18);
  $("#spinner_font_size").height("6px");
  let spinnerBorderWidth = $("#spinner_border_width").spinner({
    min: 0,
    max: 20,
    step: 1,
    start: 1,
    spin: async function(evt, ui) {
      await KFK.updateSelectedDIVs("set border width", async function(jqNode) {
        await jqNode.css("border-width", ui.value);
        await jqNode.css("border-style", "solid");
      });
    },
  });
  spinnerBorderWidth.spinner("value", 0);
  $("#spinner_border_width").height("6px");

  let spinnerBorderRadius = $("#spinner_border_radius").spinner({
    min: 0,
    max: 200,
    step: 1,
    start: 20,
    spin: async function(evt, ui) {
      await KFK.updateSelectedDIVs("set border width", async function(jqNode) {
        await jqNode.css("border-radius", ui.value);
      });
    },
  });
  spinnerBorderRadius.spinner("value", 20);
  $("#spinner_border_radius").height("6px");

  //set shape line width, set line width
  let spinnerLineWidth = $("#spinner_line_width").spinner({
    min: 1,
    max: 1000,
    step: 1,
    start: 1,
    spin: async function(evt, ui) {
      let foundFreehand = false;

      if (KFK.lastFocusOnJqNode) {
        try {
          if (KFK.lastFocusOnJqNode.attr("nodetype") === "freehand") {
            console.log("Found freehand div");
            let fromJQ = KFK.lastFocusOnJqNode.clone();
            let freehandSvg = KFK.findFreehandSvg(KFK.lastFocusOnJqNode);
            freehandSvg.attr({
              "stroke-width": ui.value,
              "origin-width": ui.value,
            });
            foundFreehand = true;
            await KFK.syncNodePut(
              "U",
              KFK.lastFocusOnJqNode.clone(),
              "change color",
              fromJQ,
              false,
              0,
              1
            );
          }
        } catch (error) {
          console.log(error);
        }
      }
      if (foundFreehand === false) {
        if (KFK.selectedShapes.length === 0) {
          let theShape = KFK.getPropertyApplyToShape();
          KFK.selectShape(theShape);
        }

        await KFK.updateMultiShapes(KFK.selectedShapes, async function(
          theShape
        ) {
          KFK.setShapeLineModel(theShape.attr("shapetype"), {
            width: ui.value,
          });
          theShape.attr({
            "stroke-width": ui.value,
            "origin-width": ui.value,
          });
          return theShape;
        });
      }
    },
  });
  spinnerLineWidth.spinner("value", 1);
  $("#spinner_line_width").height("2px");

  $("input.fonts-selector")
    .fontpicker({
      lang: "zh-CN",
      variants: true,
      lazyload: true,
      nrRecents: 3,
      googleFonts: "Alegreya,Boogaloo,Coiny,Dosis,Emilys Candy,Faster One,Galindo".split(
        ","
      ),
      localFonts: {
        // Default: web safe fonts
        Arial: {
          category: "sans-serif",
          variants: "400,400i,600,600i,900,900i",
        },
        "Courier New": {
          category: "monospace",
          variants: "400,400i,600,600i,900,900i",
        },
        Georgia: {
          category: "serif",
          variants: "400,400i,600,600i,900,900i",
        },
        Tahoma: {
          category: "sans-serif",
          variants: "400,400i,600,600i,900,900i",
        },
        "Times New Roman": {
          category: "serif",
          variants: "400,400i,600,600i,900,900i",
        },
        "Trebuchet MS": {
          category: "sans-serif",
          variants: "400,400i,600,600i,900,900i",
        },
        Verdana: {
          category: "sans-serif",
          variants: "400,400i,600,600i,900,900i",
        },
        SimSun: {
          label: "宋体简",
          category: "sans-serif",
          variants: "400,400i,600,600i,900,900i",
        },
        SimHei: {
          label: "黑体简",
          category: "sans-serif",
          variants: "400,400i,600,600i,900,900i",
        },
        "Microsoft Yahei": {
          label: "微软雅黑",
          category: "sans-serif",
          variants: "400,400i,600,600i,900,900i",
        },
        KaiTi: {
          label: "楷体",
          category: "sans-serif",
          variants: "400,400i,600,600i,900,900i",
        },
        FangSong: {
          label: "仿宋",
          category: "sans-serif",
          variants: "400,400i,600,600i,900,900i",
        },
        STHeiti: {
          label: "黑体繁",
          category: "sans-serif",
          variants: "400,400i,600,600i,900,900i",
        },
        "Hanzipen SC": {
          label: "钢笔手写体",
          category: "sans-serif",
          variants: "400,400i,600,600i,900,900i",
        },
        "Hannotate SC": {
          label: "手札体",
          category: "sans-serif",
          variants: "400,400i,600,600i,900,900i",
        },
        "Xingkai SC": {
          label: "行楷",
          category: "sans-serif",
          variants: "400,400i,600,600i,900,900i",
        },
        "Yuanti SC": {
          label: "圆体",
          category: "sans-serif",
          variants: "400,400i,600,600i,900,900i",
        },
      },
    })
    .on("change", async function() {
      // Split font into family and weight/style
      var fontInfo = $("input.fonts-selector")
          .val()
          .split(":"),
        family = fontInfo[0],
        variant = fontInfo[1] || "400",
        weight = parseInt(variant, 10),
        italic = /i$/.test(variant);

      // Set selected font on body
      var css = {
        fontFamily: "'" + family + "'",
        fontWeight: weight,
        fontStyle: italic ? "italic" : "normal",
      };

      //set font

      await KFK.updateSelectedDIVs("set font", async function(jqNode) {
        await jqNode.find(".innerobj").css(css);
      });
    });
  $("input.fonts-selector").height(12);

  KFK.debug("...initColorPicker");
  $("#cocoBkgColor").spectrum({
    color: "#f00",
    type: "color",
    hideAfterPaletteSelect: "true",
    chooseText: "选定",
    cancelText: "放弃",
    change: function(color) {
      //发起人可以设置所有人的bgcolor
      try {
        var hex = color.toHexString();
        if (KFK.APP.model.cocodoc.owner === KFK.APP.model.cocouser.userid)
          KFK.sendCmd("SETBGCOLOR", {
            doc_id: KFK.APP.model.cocodoc.doc_id,
            bgcolor: hex,
          });
        else {
          //非发起人只能设置当前自己的
          KFK.setBGColorTo(hex);
        }
      } catch (error) {
        console.error(error);
      }
    },
  });
  $("#shapeBkgColor").spectrum({
    color: "#f00",
    type: "color",
    hideAfterPaletteSelect: "true",
    chooseText: "选定",
    cancelText: "放弃",
    change: async function(color) {
      var hex = color.toHexString();
      KFK.APP.setData("model", "shapeBkgColor", hex);
      await KFK.updateSelectedDIVs("set border width", async function(jqNode) {
        await jqNode.css("background-color", hex);
      });
    },
  });
  $("#shapeBorderColor").spectrum({
    color: "#f00",
    type: "color",
    hideAfterPaletteSelect: "true",
    chooseText: "选定",
    cancelText: "放弃",
    change: async function(color) {
      var hex = color.toHexString();
      await KFK.updateSelectedDIVs("set border width", async function(jqNode) {
        await jqNode.css("border-color", hex);
      });
    },
  });

  $("#lineColor").spectrum({
    color: "#f00",
    type: "color",
    hideAfterPaletteSelect: "true",
    chooseText: "选定",
    cancelText: "放弃",
    change: async function(color) {
      var hex = color.toHexString();
      let foundFreehand = false;
      if (KFK.lastFocusOnJqNode) {
        try {
          if (KFK.lastFocusOnJqNode.attr("nodetype") === "freehand") {
            console.log("Found freehand div");
            let fromJQ = KFK.lastFocusOnJqNode.clone();
            let freehandSvg = KFK.findFreehandSvg(KFK.lastFocusOnJqNode);
            freehandSvg.attr({
              stroke: hex,
              "origin-color": hex,
            });
            foundFreehand = true;
            await KFK.syncNodePut(
              "U",
              KFK.lastFocusOnJqNode.clone(),
              "change color",
              fromJQ,
              false,
              0,
              1
            );
          }
        } catch (error) {
          console.log(error);
        }
      }
      if (foundFreehand === false) {
        if (KFK.selectedShapes.length === 0) {
          let theShape = KFK.getPropertyApplyToShape();
          KFK.selectShape(theShape);
        }
        KFK.dynamicLineStroke = hex;

        await KFK.updateMultiShapes(KFK.selectedShapes, async function(
          theShape
        ) {
          theShape.attr("stroke", hex);
          theShape.attr("origin-color", hex);
          KFK.setShapeLineModel(theShape.attr("shapetype"), {
            color: hex,
          });
          return theShape;
        });
      }
    },
  });

  $("#fontColor").spectrum({
    color: "#f00",
    type: "color",
    hideAfterPaletteSelect: "true",
    chooseText: "选定",
    cancelText: "放弃",
    change: async function(color) {
      var hex = color.toHexString();
      await KFK.updateSelectedDIVs("set border width", async function(jqNode) {
        await jqNode.find(".innerobj").css("color", hex);
      });
    },
  });
  $("#tipBkgColor").spectrum({
    color: "#f00",
    type: "color",
    hideAfterPaletteSelect: "true",
    chooseText: "选定",
    cancelText: "放弃",
    change: async function(color) {
      var hex = color.toHexString();
      KFK.APP.setData("model", "tipBkgColor", hex);
      await KFK.updateSelectedDIVs("set border width", async function(jqNode) {
        KFK.setTipBkgColor(jqNode, hex);
      });
    },
  });
  //set shape line width, set line width
  let spinnerConnectLineWidth = $("#spinner_connect_line_width").spinner({
    min: 1,
    max: 100,
    step: 1,
    start: 1,
    spin: async function(evt, ui) {
      if (KFK.selectedDIVs.length === 0) {
        let theDiv = KFK.getHoverFocusLastCreate();
        if (KFK.NotSet(theDiv)) return;
        KFK.selectNode(theDiv);
      }
      KFK.dynamic.connect.width = ui.value;

      await KFK.updateSelectedDIVs("set connect width", async function(theDiv) {
        theDiv.attr("cnwidth", ui.value);
        KFK.redrawLinkLines(theDiv, "property change", false);
        return theDiv;
      });
    },
  });
  spinnerConnectLineWidth.spinner("value", 1);
  $("#spinner_connect_line_width").height("2px");

  $("#spectrum_connect_line_color").spectrum({
    color: "#f00",
    type: "color",
    hideAfterPaletteSelect: "true",
    chooseText: "选定",
    cancelText: "放弃",
    change: async function(color) {
      var hex = color.toHexString();
      if (KFK.selectedDIVs.length === 0) {
        let theDiv = KFK.getHoverFocusLastCreate();
        if (KFK.NotSet(theDiv)) return;
        KFK.selectNode(theDiv);
      }
      KFK.dynamic.connect.color = hex;

      await KFK.updateSelectedDIVs("set connect color", async function(theDiv) {
        theDiv.attr("cncolor", hex);
        KFK.redrawLinkLines(theDiv, "codrag", false);
        return theDiv;
      });
    },
  });
};

PropSetting.initPropertySvgGroup = function() {
  //在pad.js中的tip_groups中定义了要用到的svgs。
  //如果这些svgts在svgs.js中被定义的话，则表示这是一个内建svg，支持对其属性进行操作
  //如果在svgs。js中没有定义，则表示是一个需要从云端加载的image，且不支持属性修改
  $.each(KFK.APP.tip_groups, async (index, group) => {
    let title = group.title;
    let svgHolder = $(group.div);
    let svgs = group.svgs;
    for (let i = 0; i < svgs.length; i++) {
      let span = document.createElement("span");
      let jspan = $(span);
      let name = svgs[i];
      let svgImg = undefined;
      //在SVGS中定义的svg, 是内建svg对象，可以修改它的属性
      //从云端加载的img不支持修改svg属性
      if (KFK.NotSet(SVGs[name])) {
        svgImg = $(`<img src='${KFK.config.frontend.url}/svgs/${name}.svg'/>"`);
      } else {
        svgImg = $(SVGs[name]);
      }
      svgImg.css("width", "36px");
      svgImg.css("height", "36px");
      svgImg.css("padding", "2px");
      jspan.css("width", "36px");
      jspan.css("height", "36px");
      jspan.css("padding", "2px");
      jspan.on("mouseover", (evt) => {
        let target = svgImg;
        let svgMainPath = target.find(".svg_main_path");
        if (svgMainPath.length > 0) svgMainPath.attr("fill", "#E5DBFF");
        else jspan.css("background-color", "#E5DBFF");
      });
      jspan.on("mouseout", (evt) => {
        let target = svgImg;
        let svgMainPath = target.find(".svg_main_path");
        if (svgMainPath.length > 0) svgMainPath.attr("fill", "#F7F7C6");
        else jspan.css("background-color", "#FFFFFF");
      });
      svgImg.on("click", async (evt) => {
        KFK.justCreatedJqNode = null;
        //KFK.setMode("yellowtip");
        await this.setTipVariant(name, evt.shiftKey);
      });
      svgImg.appendTo(jspan);
      jspan.appendTo(svgHolder);
    }
  });
};
module.exports.PropSetting = PropSetting;
