const PMS = {};
import KFK from "./console";

PMS.onDocPmsChanged = function(pms) {
  KFK.APP.model.cocodoc.pms = pms;
  KFK.sendCmd("SETPMS", { doc_id: KFK.APP.model.cocodoc.doc_id, pms: pms });
};

module.exports.PMS = PMS;
