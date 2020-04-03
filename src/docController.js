'use strict'

const DocController = {

    getDummyDoc: () => {
        return { doc_id: 'dummydocnotallowed', name: '', prjid: 'dummydocnotallowed', owner: 'dummydocnotallowed', doclocked: false };
    },


};


export {DocController};