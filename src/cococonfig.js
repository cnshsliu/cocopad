'use strict';

const config = {
    tenant: {
        id: 'COMPANY A',
        name: 'Company A',
    },
    badge: {
        lastSeconds: 3000,
    },
    cocodoc: { doc_id: 'dummydocnotallowed', name: '', prjid: 'dummydocnotallowed', owner: 'dummydocnotallowed', readonly: false },
    oss: {
        cocopad_bucket_name: "cocopad",
    },
    vault: {
        bucket: 'vts',
    },
    product: {
        url: 'https://colobod.com',
        basedir: '',
    },
    ws_server: {
        // endpoint: 'wss://liuzijin.com/clbdapi/grume/wsquux',
        endpoint: 'ws://localhost:5008/grume/wsquux',
    },
    frontend:{
        url: 'https://mlib.liuzijin.com/frontend'
    },
    cos: {
        region: 'ap-nanjing',
        bucket: 'nanjing1-1255349658',
        domain: 'cos.ap-nanjing.myqcloud.com',
        reverseproxy: 'mlib.liuzijin.com',
    },
    ui: {
        boundingrect_padding: 10,
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
            edittable: true,
            resizable: false, droppable: false,
            style: {
                'width': '200', 'height': '30',
                'display': 'block',
                'color': 'black',
                'background-color': 'transparent',
                'padding': '0px', 'margin': '0px',
                'overflow': 'show',
                'position': 'absolute',
            },
            inner: {
                content: '一行文字',
                style: {
                    "display": 'block',
                    'padding': '0px', 'white-space': 'nowrap',
                    'font-size': '18px', 'color': 'black',
                    'width': 'fit-content', 'height': 'fit-content', 'z-index': 1,
                },
            }
        },
        yellowtip: {
            edittable: true,
            resizable: true, droppable: true, defaultTip: 'tip',
            minWidth: 20, minHeight: 20, //resize的最小高度和宽度
            style: {
                'width': '160', 'height': '160',
                'display': 'flex',
                'padding': "2px", 'margin': '0px',
                'overflow': 'show',
                'color': 'black',
                'background-color': 'transparent',
                'position': 'absolute',
            },
            inner: {
                content: '',
                style: {
                    'display': 'flex',
                    'padding': '0px',
                    'font-size': '18px', 'color': 'black',
                    'position': 'absolute', width: '100%', height: '100%', 'z-index': 1,
                    'justify-content': 'center',
                    'align-items': 'center',
                },
            }
        },
        textblock: {
            edittable: true,
            resizable: true, droppable: true, defaultTip: 'tip',
            minWidth: 20, minHeight: 20,
            customshape: true,
            style: {
                'width': '160', 'height': '160',
                'display': 'flex',
                'padding': "2px", 'margin': '0px',
                'overflow': 'show',
                'background-color': '#FFFFFF',
                'border-color': '#333333',
                'border-width': '1px',
                'border-style': 'solid',
                'border-radius': '5px',
                'position': 'absolute',
            },
            inner: {
                content: '',
                style: {
                    'display': 'flex',
                    'padding': '0px',
                    'font-size': '18px', 'color': 'black',
                    'width': '100%', height: '100%', 'z-index': 1,
                    'justify-content': 'center',
                    'align-items': 'center',
                },
            }
        },
        richtext: {
            edittable: false,
            resizable: true, droppable: true,
            minWidth: 200, minHeight: 50,
            customshape: true,
            style: {
                'width': '160', 'height': '160',
                'display': 'block',
                'padding': "0px", 'margin': '0px',
                'overflow': 'show',
                'color': 'black',
                'background-color': '#FFFFFF',
                'border-color': '#333333',
                'border-width': '1px',
                'border-style': 'solid',
                'border-radius': '0px',
                'position': 'absolute',
            },
            inner: {
                content: '',
                style: {
                    'display': 'block',
                    'position': 'absolute', 'width': '100%', 'height': '100%'
                },
            }
        },
    },
    defaultSize: {
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
        'textblock': {
            'default': { width: 160, height: 100 },
        },
        'text': {
            'default': { width: 30, height: 30 },
        },
        'richtext': {
            'default': { width: 400, height: 200 },
        }
    },
    layout: {
        spacing: {
            vert: 20,
            hori: 20,
        }
    },
    quickglance:{
        timer: 10,
    }
};

export default config;
