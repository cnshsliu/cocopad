const MyMDE = {};
import KFK from "./console";
import EasyMDE from "easymde";

MyMDE.addEasyMDE = function(textAreaId) {
  console.log("create new EasyMDE");
  KFK.MDEs[textAreaId] = new EasyMDE({
    element: $("#" + textAreaId)[0],
    forceSync: true,
    status: false,
    toolbar: [
      "bold",
      "italic",
      "heading",
      "code",
      "quote",
      "unordered-list",
      "ordered-list",
      "link",
      "image",
      "table",
      "preview",
      "side-by-side",
      "fullscreen",
    ],
    shortcuts: {
      togglePreview: null,
      toggleSideBySide: null,
      toggleFullScreen: null,
    },
  });
};
MyMDE.finishMdEditting = function(cancelAll, divId) {
  let textAreaId = "ta_" + divId;
  if (KFK.MDEIntervals[divId]) {
    clearInterval(KFK.MDEIntervals[divId]);
    delete KFK.MDEIntervals[divId];
  }
  if (KFK.MDEs[textAreaId].isPreviewActive() === false) {
    KFK.MDEs[textAreaId].togglePreview();
  }
  KFK.mdEdittingNode.draggable("enable");
  KFK.isEditting = false;
  let nodeToSync = MyMDE.getCleanMdDiv(KFK.mdEdittingNode);
  KFK.syncNodePut("U", nodeToSync, "md changed", nodeToSync, false, 0, 1);
  KFK.mdEdittingNode = undefined;
};

MyMDE.saveMdEditting = function(divId) {
  let textAreaId = "ta_" + divId;
  let nodeToSync = MyMDE.getCleanMdDiv(KFK.mdEdittingNode);
  let newText = nodeToSync.find("#" + textAreaId).val();
  if (!KFK.lastSavedMdText || newText !== KFK.lastSavedMdText) {
    KFK.syncNodePut("U", nodeToSync, "md changed", nodeToSync, false, 0, 1);
    KFK.lastSavedMdText = newText;
    console.log("saving...", newText);
  }
};

MyMDE.cancelMdEditting = function(cancelAll, divId) {
  let textAreaId = "ta_" + divId;
  if (KFK.MDEIntervals[divId]) {
    clearInterval(KFK.MDEIntervals[divId]);
    delete KFK.MDEIntervals[divId];
  }
  KFK.MDEs[textAreaId].togglePreview();
  KFK.mdEdittingNode.draggable("enable");
  KFK.isEditting = false;
  //let nodeToSync = MyMDE.getCleanMdDiv(KFK.mdEdittingNode);
  //KFK.syncNodePut("U", nodeToSync, "md changed", nodeToSync, false, 0, 1);
  KFK.mdEdittingNode = undefined;
};
MyMDE.getCleanMdDiv = function(jMD) {
  let textareaId = "ta_" + jMD.attr("id");
  let theMdText = $("#" + textareaId).val();
  let nodeToSync = jMD.clone();
  let jInner = nodeToSync.find(".innerobj");
  jInner.empty();
  let textAreaStyle = "width:100%; height:100%; resize:none;";
  let rebuildTextArea = $(
    "<textarea id='" +
      textareaId +
      "' style='" +
      textAreaStyle +
      "'>" +
      theMdText +
      "</textarea>"
  );
  rebuildTextArea.appendTo(jInner);
  return nodeToSync;
};

module.exports.MyMDE = MyMDE;
