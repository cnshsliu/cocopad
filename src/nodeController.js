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
    console.log("Before", jqNode.prop('outerHTML'));
    jqNode.addClass('lock');
    let lockLabel = jqNode.find('.locklabel');
    if (lockLabel.length === 0) {
      console.log('add locklabel for', jqNode.attr('id'));
      jqNode.append('<div class="locklabel"/>');
    }else{
      console.log('locklabel exist..', lockLabel);
    }
    console.log("After", jqNode.prop('outerHTML'));
    jqNode.draggable('disable');
    jqNode.resizable('disable');
    jqNode.droppable('disable');
  },
  unlock: (jqNode) => {
    if (!jqNode) {
      console.warn('unlock a no existing node');
      return;
    }
    console.log("!!!!!!!!!UNLCOK IT!!!!!!!!!!!!!!");
    jqNode.removeClass('lock');
    let lockLabel = jqNode.find('.locklabel');
    if (lockLabel.length > 0) {
      lockLabel.first().remove();
    }
    jqNode.draggable('enable');
    jqNode.resizable('enable');
    jqNode.droppable('enable');
  },

  removeEventListenerOnly: (jqNode) => {
    if (!jqNode) {
      return;
    }
    console.log(new Error().stack);
    jqNode.draggable('disable');
    jqNode.resizable('disable');
    jqNode.droppable('disable');
  },
};

export {NodeController};