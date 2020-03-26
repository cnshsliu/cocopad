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
    jqNode.addClass('lock');
    let lockLabel = jqNode.find('.locklabel');
    if (lockLabel.length === 0) {
      console.log('add locklabel');
      jqNode.append('<div class="locklabel"/>');
    }else{
      console.log('locklabel exist..', lockLabel);
    }
    jqNode.draggable('disable');
    jqNode.resizable('disable');
    jqNode.droppable('disable');
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
    jqNode.draggable('enable');
    jqNode.resizable('enable');
    jqNode.droppable('enable');
  },
};

export {NodeController};