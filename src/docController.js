'use strict'

const DocController = {};

DocController.getDummyDoc = ()=>{
 return { doc_id: 'dummydocnotallowed', name: '', prjid: 'dummydocnotallowed', owner: 'dummydocnotallowed', readonly:false};
};


export default DocController;