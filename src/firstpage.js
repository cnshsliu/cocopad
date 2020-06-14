const FP = {};

FP.typewriting = false;
FP.startTypeWriter = function() {
  if (FP.typewriting) return;
  FP.typewriting = true;
  FP.dataText = [
    ["云白板", "远程会议·异地协作再无障碍"],
    ["云白板会议", "随时跟团队一起写写画画"],
    ["异地办公团队", "也能像面对面一样高效协作"],
    ["在家办公", "与现场办公再无差别"],
    ["网络教学云白板", "真正把教室搬到互联网上"],
    ["即时·协作·云同步", "云白板革命性的交互协作方式"],
    ["文本·框图·图片·手绘", "多方实时同步、即时协作"],
    ["富文本·MarkDown", "满足不同内容形式需求"],
    ["内置文字·音视频聊天", "一块云白板满足全部会议所需"],
    ["企业·团队·个人", "节省运营成本，提高产出效率"],
  ];

  // type one text in the typwriter
  // keeps calling itself until the text is finished
  function typeWriter(jText, jAux, text, i, fnCallback) {
    if (i === 0) jAux.prop("innerHTML", "&nbsp;");
    // chekc if text isn't finished yet
    if (i < text[0].length) {
      // add next character to h1
      if (i < text[0].length - 1) {
        jText.prop(
          "innerHTML",
          text[0].substring(0, i + 1) +
            '<span class="blink" aria-hidden="true"></span>'
        );
      } else {
        jText.prop(
          "innerHTML",
          text[0].substring(0, i + 1) + '<span aria-hidden="true"></span>'
        );
      }

      // wait for a while and call this function again for next character
      setTimeout(function() {
        typeWriter(jText, jAux, text, i + 1, fnCallback);
      }, 200);
    }
    // text finished, call callback if there is a callback function
    else {
      // call callback after timeout
      setTimeout(function() {
        auxWriter(jAux, text, 0, fnCallback);
      }, 200);
    }
  }
  function auxWriter(jAux, text, i, fnCallback) {
    // chekc if text isn't finished yet
    if (i < text[1].length) {
      // add next character to h1
      jAux.prop(
        "innerHTML",
        text[1].substring(0, i + 1) +
          '<span class="blink" aria-hidden="true"></span>'
      );

      // wait for a while and call this function again for next character
      setTimeout(function() {
        auxWriter(jAux, text, i + 1, fnCallback);
      }, 100);
    }
    // text finished, call callback if there is a callback function
    else if (typeof fnCallback == "function") {
      // call callback after timeout
      setTimeout(fnCallback, 5000);
    }
  }
  // start a typewriter animation for a text in the dataText array
  function StartTextAnimation(jText, jAux, i) {
    if (i >= FP.dataText.length) {
      setTimeout(function() {
        StartTextAnimation(jText, jAux, 0);
      }, 1000);
    } else {
      // text exists! start typewriter animation
      typeWriter(jText, jAux, FP.dataText[i], 0, function() {
        // after callback (and whole text has been animated), start next text
        StartTextAnimation(jText, jAux, i + 1);
      });
    }
  }
  // start the text animation
  StartTextAnimation($(".typewriter"), $(".typewriter-follower"), 0);
};

export default FP;
