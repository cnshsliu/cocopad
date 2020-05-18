'use strict';
const AIXJ = {};
AIXJ.lastIdx = '';
AIXJ.lastTS = new Date().getTime();
AIXJ.log = {};
const knowledge = {
    'tb_text': '放置简单文字，双击可编辑',
    'tb_textblock': '放置图文对象，双击它可以编辑文字',
    'tb_yellowtip': '贴小黄贴, 后双击可编辑文字',
    'tb_richtext': '放置一个富文本输入框后，双击可编辑',
    'tb_material': ['点这里查看你的素材库',
        '点选一个素材，到白板上点鼠标就可以放置这个素材'],
    'tb_line': '在白板上画线， 连续点开始和结束位置就可以了',
    'tb_connect': ['先后点两个对象，把他们关联起来',
        '按着Shift点对象，可连续级联',
        '按着Shift点链接工具，可连续使用工具'],
    'tb_lock': ['在一个对象上点一下加锁/解锁', '锁定后节点不能改动'],
    'tb_brain': ['点一个对象就可以把它变为脑图中心',
        '脑图功能太多了，右上方的使用说明中去看一看'],
    'tb_todo': '点击这里后，在下方即可输入待办事项',
    'tb_chat': '可以跟协作者直接聊天哦',
    'tb_eraser': '点这里可把白板内容全部擦出',
    'multi_select': [
        '拖动其中一个，其它都会跟着一起移动',
        '如果只想移动其中一个，拖动时按住Shift',
        '右侧排列窗口可对多个对象进行排列'
    ],
    'hover_c3': [
        '可以将白板发表到白板市场，并予以定价',
        '丰富的商用模版，让你的白板协作更加高效',
        '鼠标移动到对象上，可以对它进行拷贝/粘贴操作',
        '在白板上按下并移动鼠标，可以框选多个对象',
        '你可以把PNG， JPEG文件直接拖动到白板上',
        '在浏览器中拷贝图片/地址/文字后，可以直接粘贴到白板上',
        '屏幕截图后，可以直接按Ctrl-V粘贴在白板上',
        '请务必查看窗口右上角的使用说明',
        '空白处双击鼠标，进入全局预览模式，再次双击返回',
        '输入pr, 进入PPT演示模式',
        '输入数字+g, 在36个子页面之间跳转',
        'Ctrl+减号缩小，Ctrl+等号放大, Ctrl+0恢复缩放',
        '右下角的迷你地图，用于全局导航',
        '屏幕上方中间的分享功能，用于邀请他人参与白板讨论',
        '输入pr进入演示模式后，上下左右键盘翻页',
        '输入pr进入演示模式后，HOME/END到第一页/最后页',
        '输入pr进入演示模式后，b键全屏黑，w键全屏白',
        '输入fs进入全屏模式，再次输入fs退出全屏',
        '全屏模式下浏览器提示ESC退出，不要理会，用fs',
        '多人进入同一个白板，互相的鼠标移动都可以看到',
        '锁定的对象不可移动，不可编辑',
        '多人同时编辑富文本时，会显示提示',
        '“显示编辑者”，可看对象是谁修改的',
        '白板背景色可在右侧属性窗进行更换',
        '网格线可以在右侧属性窗选择是否显示',
        '白板一共36个区域, 数字+g可跳转',
        '每个用户都有一个缺省团队，可自建团队，可把他人拉入团队',
        '按住Shift，连续点击的对象成为多选对象',
        '白板可设置自己用，团队用，或者全部可用',
        '对白板设置访问密码后，只有知道正确的密码才能使用',
        '链接对象后，箭头指向的对象为当前对象的子对象',
        '鼠标悬浮一个对象时，输入ctl，所有子节点在左侧排列',
        '鼠标悬浮一个对象时，输入ctr，所有子节点在右侧排列',
        '鼠标悬浮一个对象时，输入ctt，所有子节点在顶部排列',
        '鼠标悬浮一个对象时，输入ctb，所有子节点在底部排列',
        '鼠标悬浮一个对象时，输入空格+frewsxcv中一个，360度放置子对象',
        '鼠标悬浮一个对象时，输入br，对象成为脑图中心',
        '如设置了脑图中心，新建对象自动成为其子节点',
        '脑图子节点上按Shift-Enter，自动添加同级节点',
        '鼠标悬浮一个对象时，回车进入文字编辑',
        '文字编辑时，根据配置，输入Enter或Shift-Enter结束编辑',
        '即时消息传递的文字，即时协同传递的是Idea',
        '即时协作在团队中传递的是用图示表达的Idea',
        '即时协作比即时消息在工作场合更能提高工作效率和质量',
        '群消息窗口，可随时关闭打开',
        '待办事项显示在白板主区域外侧，第一区域顶部',
        '设置待办事项的完成度后，自动归类',
        '白板擦，不可撤回，请谨慎使用',
        '聊天和添加待办事项，都是在屏幕下方输入框输入',
        '小黄贴不止小黄贴，可选择多种贴纸',
        '基础贴纸支持改色，商务贴纸不支持改色',
        '桌面上的对话框，可通过“显示设置”进行调整',
        '输入nn只保留顶部控制窗',
        '输入mm切换迷你地图显示',
        '输入tl切换属性窗和迷你地图显示',
        '只要有权限，用户无需注册即可以临时用户身份查看你分享的白板',
        '白板可设置为只读模式',
        '参与者在白板上的写写画画，其它参与者都可以实时看到',
        '即时协作平台，让远程办公的沟通效率更高',
        '在线讨论问题，远程团队头脑风暴',
        '在线团队多人Design Thinking工作坊',
        '传统即时通讯工具不支持交互式实时图文影响沟通效率',
        '即时协作，使多人的远程工作像聚在一起一样',
        '用于个人知识管理，也同样非常适合',
        '推荐他人使用，可获得积分奖励',
        '试用期间，白板容量不受限',
        '容量不足时，可随时充值，扩充容量',
        '白板上按住空格键，只显示白板内容',
        'tr/1tr/2tr/3tr 切换右侧属性窗',
    ],
    'hover_div': [
        '鼠标按住对象，可拖动对象',
        '按住对象右下角然后拖动鼠标可改变大小',
        '点击选中对象，右侧样式窗口中，可改变样式',
        '按gt到最顶层/gb到最下层/gh上移一层/gl下移一层',
    ],
    'hover_todoitem': '按下鼠标会显示待办事项菜单',
    'hover_line': ['按下DEL可删除这条线段',
    '按住鼠标可拖动它',
    '鼠标移动到线段两端后再按住，可改变线段长度',
    '在右侧属性窗可改变线段样式',
    'Ctrl-C/Ctrl-V可对线段做拷贝粘贴操作'],
};
let _getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

AIXJ.getMsg = (idx, osname) => {
    if (idx === AIXJ.lastIdx) return undefined;
    if (idx === 'hover_c3' && (AIXJ.lastIdx.indexOf('hover_div')===0 || AIXJ.lastIdx.indexOf('hover_line')===0)) {
        let nowTS = new Date().getTime();
        if (nowTS - AIXJ.lastTS < 1000) return undefined;
    }
    let cell = knowledge[idx];
    if (cell === undefined || cell === null) return undefined;

    if (typeof cell === 'string') {
        if (AIXJ.lastIdx === idx) return undefined;
        AIXJ.lastIdx = idx;
        AIXJ.lastTS = new Date().getTime();
        return cell;
    }
    let tmp = "";
    if (Array.isArray(cell)) {
        let subIdx = 0;
        if (cell.length === 1) tmp = cell[0];
        else if (cell.length > 1) {
            subIdx = _getRandomInt(0, cell.length - 1);
            tmp = cell[subIdx];
        } else {
            return undefined;
        }
        if (typeof tmp === 'string') {
            let tmpIdx = idx + "_" + subIdx;
            if (AIXJ.lastIdx === tmpIdx) return undefined;
            AIXJ.lastIdx = tmpIdx;
            AIXJ.lastTS = new Date().getTime();
            return tmp;
        }
        if (tmp[osname]) {
            let tmpIdx = idx + "_" + subIdx;
            if (AIXJ.lastIdx === tmpIdx) return undefined;
            AIXJ.lastIdx = tmpIdx;
            AIXJ.lastTS = new Date().getTime();
            return tmp[osname];
        } else {
            return undefined;
        }
    } else {
        if (cell[osname]) {
            if (AIXJ.lastIdx === idx) return undefined;
            AIXJ.lastIdx = idx;
            AIXJ.lastTS = new Date().getTime();
            return cell[osname];
        } else {
            return undefined;
        }
    }
};
export default AIXJ;