'use strict';

const NodeController = {
  locked: (jqNode) => {
    return jqNode.hasClass('lock');
  },
  lock: (jqNode) => {
    if (!jqNode) {
      console.warn('lock a no existing node');
      return;
    }
    // console.log("Before", jqNode.prop('outerHTML'));
    jqNode.addClass('lock');
    let lockLabel = jqNode.find('.locklabel');
    if (lockLabel.length === 0) {
      // console.log('add locklabel for', jqNode.attr('id'));
      jqNode.append('<div class="locklabel"/>');
    // }else{
    //   console.log('locklabel exist..', lockLabel);
    }
    console.log("After", jqNode.prop('outerHTML'));
    
    NodeController.safeNodeEventModify(jqNode, "draggable", 'disable');
    NodeController.safeNodeEventModify(jqNode, "resizable", 'disable');
    NodeController.safeNodeEventModify(jqNode, "droppable", 'disable');
  },
  safeNodeEventModify: (jqNode, action, flag)=>{
    if(jqNode === undefined){
      console.log(new Error().stack);
    }
    if(action === 'draggable'){
      if(jqNode.hasClass('ui-draggable'))
        jqNode.draggable(flag);
      else{
        console.warn(jqNode.attr('nodetype'), jqNode.attr("id"), 'draggable has not been set');
      }
    }else if(action === 'resizable'){
      if(jqNode.hasClass('ui-resizable'))
        jqNode.resizable(flag);
      else{
        console.warn(jqNode.attr('nodetype'), jqNode.attr("id"), 'resizable has not been set');
      }
    }else if(action === 'droppable'){
      if(jqNode.hasClass('ui-droppable'))
        jqNode.droppable(flag);
      else{
        console.warn(jqNode.attr('nodetype'), jqNode.attr("id"), 'droppable has not been set');
      }
    }
  },
  unlock: (jqNode) => {
    if (!jqNode) {
      console.warn('unlock a no existing node');
      return;
    }
    jqNode.removeClass('lock');
    let lockLabel = jqNode.find('.locklabel');
    if (lockLabel.length > 0) {
      lockLabel.first().remove();
    }
    NodeController.safeNodeEventModify(jqNode, "draggable", 'enable');
    NodeController.safeNodeEventModify(jqNode, "resizable", 'enable');
    NodeController.safeNodeEventModify(jqNode, "droppable", 'enable');
  },
};

export {NodeController};