'use strict';

const config = {
    tenant: {
        id: 'COMPANY A',
        name: 'Company A',
    },
    badge: {
        lastSeconds: 3000,
    },
    cocodoc: { doc_id: 'dummydocnotallowed', name: '', prjid: 'dummydocnotallowed', owner: 'dummydocnotallowed', readonly:false },
    vault: {
        bucket: 'vts',
    },
    ui: {
        boundingrect_padding: 10,
    },
    line: {
        strokeColor: 'blue',
        selectedColor: 'red',
    },
    node: {
        image: {
            resizable: true,
        },
        start: {
            width: 40,
            height: 40,
        },
        end: {
            width: 40,
            height: 40,
        },
        text: {
            width: 120,
            height: 20,
            edittable: true,
            content: '一行文字',
            fontSize: 18,
        },
        yellowtip: {
            width: 160,
            height: 160,
            resizable: true,
            droppable: true,
            edittable: true,
            textAlign: 'center', color: 'black', vertAlign: 'center',
            defaultTip: 'tip',
            defaultColor: '#FFF0C8FF',
            fontSize: 18,
            content: '',
        },
        textblock: {
            width: 160, height: 80, resizable: true,
            background: '#FFFFFF', minWidth: 1, minHeight: 1,
            borderColor: '#333333', borderWidth: '1px',
            borderStyle: 'solid', borderRadius: '0px',
            textAlign: 'center', color: 'black', vertAlign: 'center',
            fontSize: 18,
            droppable: true,
            edittable: true,
            customshape: true,
            content: '',
            useQuill:true,
        },
        pin: {
            width: 40,
            height: 40,
        },
    },
    size: {
        'yellowtip': {
            'tip_arrow': { width: 60, height: 30 },
            'tip_arrow2': { width: 60, height: 30 },
            'tip_arrow3': { width: 30, height: 60 },
            'tip_arrow4': { width: 30, height: 60 },
            'tip_heart': { width: 50, height: 50 },
            'tip_sig': { width: 60, height: 20 },
            'tip_circle': { width: 50, height: 50 },
            'tip_p5star': { width: 50, height: 50 },
            'tip_p8star': { width: 50, height: 50 },
            'tip_cubic': { width: 50, height: 50 },
            'tip_clinder': { width: 50, height: 50 },
            'tip_circle2': { width: 50, height: 50 },
            'tip_check': { width: 50, height: 50 },
            'tip_cross': { width: 50, height: 50 },
            'tip_thunder': { width: 40, height: 50 },
            'tip_smile': { width: 50, height: 50 },
            'tip_circle3': { width: 50, height: 50 },
        },
    },
    defaultDocBgcolor: '#FFFFFF',
};

export default config;