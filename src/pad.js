//import events from "events";
import "../scss/custom.scss";
import KFK from "./console";
import ACM from "./accountmanage";
import EXP from "./explorermanage";
import SHARE from "./sharemanage";
import Validator from "./validator";
import { NodeController } from "./nodeController";
import { DocController } from "./docController";
import homePage from "./components/home.vue";

const Foo = {
  template: "<div>foo</div>",
};
const Bar = {
  template: "<div>bar</div>",
};
const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/signin",
      component: homePage,
    },
    {
      path: "/foo",
      component: Foo,
    },
    {
      path: "/bar",
      component: Bar,
    },
  ],
});
const app = new Vue({
  router: router,
  data: {
    goodsSearchQ: "",
    goodsToBuy: {
      name: "",
      price1: 0,
      price2: 0,
    },
    inputMsgIcon: "arrow-return-left",
    selected: "A",
    inputMsg: "",
    state: {
      profile: {
        name: null,
        oldpwd: null,
        newpwd: null,
        newpwd2: null,
      },
      reg: {
        userid: null,
        name: null,
        pwd: null,
        pwd2: null,
      },
      newdoc: {
        name: null,
        pwd: null,
      },
      newprj: {
        name: null,
      },
      copydoc: {
        name: null,
      },
    },
    RegUserIdState: null,
    RegUserNameState: null,
    KFK: KFK,
    ACM: ACM,
    EXP: EXP,
    SHARE: SHARE,
    seen: true,
    modalShow: false,
    modal_title: "",
    modal_text: "",
    showSIGNINFORM: false,
    showCONSOLE: false,
    showCREATEROOM: false,
    showINVITATION: false,
    lockMode: KFK.lockMode,
    images: KFK.images,
    tip_groups: [
      {
        title: "abcd",
        div: "#toolbox2",
        svgs: [
          "tip",
          "tip_cubic",
          "tip_clinder",
          "tip_diamond",
          "tip_cone",
          "tip_pyramid",
          "tip_hexogon",
          "tip_parr",
          "tip_heart",
          "tip_smile",
          "tip_thunder",
          "tip_cloud",
          "tip_check",
          "tip_cross",
          "tip_p5star",
          "tip_p8star",
          "tip_circle1",
          "tip_circle2",
          "tip_circle3",
          "tip_circle4",
          "tip_callout1",
          "tip_callout2",
          "tip_callout3",
          "tip_callout4",
          "tip_arrow1",
          "tip_arrow2",
          "tip_arrow3",
          "tip_arrow4",
          "tip_arrow5",
          "tip_arrow6",
          "tip_arrow7",
          "tip_sig0",
          "tip_sig1",
          "comment",
        ],
      },
      {
        title: "OPQR",
        div: "#toolbox3",
        svgs: [
          "biz001",
          "biz002",
          "biz003",
          "biz004",
          "biz005",
          "biz006",
          "biz007",
          "biz008",
          "biz009",
          "biz010",
          "biz011",
          "biz012",
          "biz013",
          "biz014",
          "biz015",
          "biz016",
          "biz017",
          "biz018",
          "biz019",
          "biz020",
          "biz021",
          "biz022",
          "biz023",
          "biz024",
          "biz025",
          "biz026",
          "biz027",
          "biz028",
          "biz029",
          "biz030",
          "biz031",
          "biz032",
          "biz033",
          "biz034",
          "biz035",
          "biz036",
          "biz037",
          "biz038",
          "biz039",
          "biz040",
          "biz041",
          "biz042",
          "biz043",
          "biz044",
          "biz045",
          "biz046",
          "biz047",
          "biz048",
          "biz049",
          "biz050",
          "biz051",
          "biz052",
          "biz053",
          "biz054",
          "biz055",
          "biz056",
          "biz057",
          "biz058",
          "biz059",
          "biz060",
          "biz061",
          "biz062",
          "biz063",
          "biz064",
          "biz065",
          "biz066",
          "biz067",
          "biz068",
          "biz069",
          "biz070",
          "biz071",
          "biz072",
          "biz073",
          "biz074",
          "biz075",
          "biz076",
          "biz077",
          "biz078",
        ],
      },
    ],
    toolActiveState: {
      pointer: true,
      tip: false,
      blanket: false,
      p8star: false,
      pin: false,
      text: false,
      yellowtip: false,
      line: false,
      textblock: false,
      richtext: false,
      md: false,
      lock: false,
      minimap: false,
      connect: false,
      material: false,
      clean: false,
      brain: false,
      todo: false,
      chat: false,
      draw: false,
      interlink: false,
      comment: false,
      freehand: false,
      clearfreehand: false,
      jump: false,
    },
    docNavTabIndex: 0,
    show: {
      loading: false,
      waiting: true,
      wsready: false,
      arrange_multi_nodes: false,
      shape_property: false,
      customfont: false,
      customline: true,
      signinform: false,
      explorer: true,
      actionlog: false,
      form: {
        newdoc: false,
        newprj: false,
        prjlist: true,
        doclist: false,
        share: false,
        bottomlinks: false,
        explorerTabIndex: 0,
      },
      section: {
        signin: false,
        register: false,
        explorer: false,
        designer: false,
        minimap: true,
      },
      dialog: {
        inputDocPasswordDialog: false,
        resetDocPasswordDialog: false,
        userPasswordDialog: false,
        copyDocDialog: false,
        setAclDialog: false,
        publishDialog: false,
        pasteContentDialog: false,
        MsgBox: false,
        shareItDialog: false,
        materialDialog: false,
        rechargeDialog: false,
        priceListDialog: false,
        importbr: false,
        buy1Dialog: false,
        buy2Dialog: false,
        prjToColumnDialog: false,
      },
    },
    model: {
      column: "no",
      toColumn: {
        id: "",
        name: "",
      },
      columndoclist: {
        cname: "",
        owner: {
          name: "",
          avatar: "",
        },
      },
      osName: "",
      endpoint: "",
      publish: {
        name: "",
        tags: "",
        allowCopy: false,
        priceForRead: 5,
        priceForCopy: 100,
      },
      importbrtext: "",
      firstTime: true,
      isValidBrowser: true,
      isNotValidBrowser: false,
      readonlyDesc: "只读",
      currentDoc: {
        acl: "O",
      },
      invitor: {
        usrid: "",
        name: "",
      },
      showInModalMiniHelp: false,
      accordion: {
        myorg: true,
      },
      org: {
        neworg: {
          name: "",
        },
        newuserid: "",
        changeorgname: "",
      },
      share: {
        code: "",
        email: "",
        lifeshare: false,
        msg: "临时分享, 48小时后过期",
        url: "",
        acl: "P",
        warning: "",
        doc_id: "",
        okToShare: false,
        okToSetACL: false,
      },
      signInButWaitVerify: false,
      isMobile: false,
      regForShared: false, //是否是接受到分享链接的用户来注册？
      loading_value: 0,
      msgbox: {
        title: "",
        content: "",
      },
      svg: {
        connect: {
          color: "red",
          width: 2,
          triangle: {
            width: 1,
            color: "blue",
            fill: "blue",
          },
        },
        line: {
          color: "#306EF6",
          width: 2,
          linecap: true,
          style: "solid",
          styles: [
            {
              value: "solid",
              text: "实线",
            },
            {
              value: "dash",
              text: "虚线",
            },
          ],
          arrow: "arrow0",
          arrows: [
            {
              value: "arrow0",
              text: "无箭头",
            },
            {
              value: "arrow1",
              text: "形状一",
            },
            {
              value: "arrow2",
              text: "形状二",
            },
          ],
        },
        rectangle: {
          color: "#303030",
          width: 2,
          fill: "#000000",
        },
        ellipse: {
          color: "#303030",
          width: 2,
          fill: "#000000",
        },
        freehand: {
          color: "#CC3030",
          width: 2,
          fill: "#000000",
          linecap: "round",
        },
        polyline: {
          color: "#306EF6",
          width: 2,
          linecap: true,
          style: "solid",
        },
        polygon: {
          color: "#306EF6",
          width: 2,
          linecap: true,
          style: "solid",
        },
      },
      paste: {
        content: "",
        display: "",
        box: "none",
        ctype: "text",
        showcontent: false,
        showdisplay: false,
        showbox: false,
        options: [
          {
            item: "none",
            name: "无",
          },
          {
            item: "border",
            name: "仅边框",
          },
          {
            item: "all",
            name: "边框和底色",
          },
        ],
      },
      actionlog: [],
      profileToSet: {
        name: "",
        avatar: "avatar-0",
        oldpwd: "",
        newpwd: "",
      },
      copydoc: {
        copyOrMove: "copy",
        op: "rename",
        copyToDocName: "",
        copyToPrjId: null,
        showCopyOrMove: false,
      },
      hidepassword: true,
      inputUserPwd: "",
      docOldPwd: "",
      docNewPwd: "",
      newprjname: "",
      newdocname: "",
      newdocpwd: "",
      opendocpwd: "",
      docLoaded: false,
      cocoprj: {
        prjid: "all",
        name: "我最近使用过的白板",
      },
      lastrealproject: {
        prjid: "",
        name: "",
      },
      cocodoc: {
        doc_id: "dummydocnotallowed",
        name: "",
        prjid: "dummydocnotallowed",
        owner: "dummydocnotallowed",
        readonly: false,
        ownerAvatar_src: undefined,
        pms: 0,
      },
      cocouser: {
        userid: "",
        name: "",
        avatar: "avatar-0",
        avatar_src: null,
      },
      cocoorg: {
        orgid: "ORGID",
        name: "ORGNAME",
        logo: "corp-0",
        logo_src: "",
        owner: "",
        ownername: "张三",
      },
      orgusers: {},
      vorgs: [],
      myorgs: [],
      listdocoption: {},
      listprjoption: {},
      register: {
        userid: "",
        pwd: "",
        pwd2: "",
        name: "",
        step: "reg",
        code: "",
      },
      signin: {
        userid: "",
        pwd: "",
      },
      docfields: [
        {
          key: "name",
          label: "文档名称",
        },
        {
          key: "owner",
          label: "发起人",
        },
        {
          key: "readonly_icon",
          label: "只读",
        },
        {
          key: "protect_icon",
          label: "密保",
        },
        {
          key: "acl",
          label: "权限范围",
        },
        {
          key: "operations",
          label: "其它",
          variant: "danger",
        },
      ],
      pubfields: [
        {
          key: "name",
          label: "文档名称",
        },
        {
          key: "tags_display",
          label: "标签",
        },
        {
          key: "price1",
          label: "阅读价格",
        },
        {
          key: "price2",
          label: "拷贝价格",
        },
        {
          key: "stop_pub",
          label: "下架",
        },
      ],
      goodsfields: [
        {
          key: "name",
          label: "文档名称",
        },
        {
          key: "price1",
          label: "阅读价格",
        },
        {
          key: "price2",
          label: "拷贝价格",
        },
        {
          key: "preview",
          label: "预览",
        },
        {
          key: "buy1",
          label: "购买阅读版",
        },
        {
          key: "buy2",
          label: "购买拷贝版",
        },
      ],
      interlinkdocfields: [
        {
          key: "name",
          label: "文档名称",
        },
        {
          key: "ownerName",
          label: "发起人",
        },
      ],
      subsfields: [
        {
          key: "name",
          label: "文档名称",
        },
        {
          key: "show_details",
          label: "详情",
        },
      ],
      vorgfields: [
        {
          key: "name",
          label: "名称",
        },
        {
          key: "owner",
          label: "发起人",
        },
        {
          key: "operations",
          label: "相关操作",
        },
      ],
      myorgfields: [
        {
          key: "name",
          label: "名称",
        },
        {
          key: "grade",
          label: "等级",
        },
        {
          key: "operations",
          label: "相关操作",
        },
      ],
      useridfields: [
        {
          key: "userid",
          label: "用户ID",
        },
        {
          key: "operations",
          label: "操作",
          variant: "danger",
        },
      ],
      prjfields: [
        {
          key: "name",
          label: "项目名称",
        },
        {
          key: "column",
          label: "专栏",
        },
        {
          key: "operations",
          label: "相关操作",
        },
      ],
      matfields: [
        {
          key: "thumbnail",
          label: "缩略图",
        },
        {
          key: "operations",
          label: "相关操作",
        },
      ],
      prjwarning: "",
      docs: [],
      chdocs: [],
      pubs: [],
      goods: [],
      subs: [],
      prjs: [],
      mats: [],
      perPage: 15,
      currentPrjPage: 1,
      rightTabIndex: 2,
      currentPubPage: 1,
      currentGoodsPage: 1,
      currentSubsPage: 1,
      defaultGridWidth: 20,
      gridWidth: 20,
      oldSnap: true,
      viewConfig: {
        bgcolor: "#ABABAB",
        snap: true,
        showgrid: true,
        showlock: true,
        showbounding: true,
        enterWithChat: false,
        enterToConfirmInput: false,
        useAI: true,
        showEditor: "last",
        nodemessage: true,
        autoFollow: true,
        autoRight: false,
        hideRight: true,
        docAcl: 0,
        drawOnTop: true,
      },
      dragToCreate: true,
      lineToggleMode: false,
      msg: "",
      tipBkgColor: "#f7f7c6",
      shapeBkgColor: "#ffffff",
      lineColor: "#000000",
      lineWidth: 1,
      property: {
        connect: {
          line: {
            width: 2,
            color: "#000000",
            style: "solid",
            styles: [
              {
                value: "solid",
                text: "实线",
              },
              {
                value: "dash",
                text: "虚线",
              },
            ],
          },
        },
      },
      padbkgcolor: [
        "#C2FFFB",
        "#D0C8E8",
        "#FEE8E7",
        "#E8DFC8",
        "#B9FFA6",
        "#C2D3FF",
        "#C8D1E8",
        "#E8EFFE",
        "#E8EFFE",
        "#E8EFFE",
      ],
      textAlign: "center",
      textAlignOptions: [
        {
          value: "flex-start",
          text: "靠左",
        },
        {
          value: "center",
          text: "居中",
        },
        {
          value: "flex-end",
          text: "靠右",
        },
      ],
      vertAlign: "center",
      vertAlignOptions: [
        {
          value: "flex-start",
          text: "顶部",
        },
        {
          value: "center",
          text: "中部",
        },
        {
          value: "flex-end",
          text: "底部",
        },
      ],
      showEditor: "last",
      showEditors: [
        {
          value: "none",
          text: "不显示",
        },
        {
          value: "last",
          text: "最后一个",
        },
        {
          value: "all",
          text: "列出全部",
        },
      ],
      isDemoEnv: true,
      svgs: {},
      svgsData: {},
      search: {
        docName: "",
      },
    },
  },
  computed: {
    prjListOptions() {
      let ret = [];
      this.model.prjs.forEach((prj, index) => {
        if (["all", "others", "mine"].indexOf(prj.prjid) < 0) {
          ret.push({
            value: prj.prjid,
            text: prj.name,
          });
        }
      });
      return ret;
    },
    avatarListOptions() {
      let ret = [];
      this.model.avatars.forEach((prj, index) => {
        ret.push({
          value: prj.prjid,
          text: prj.name,
        });
      });
      return ret;
    },

    doccount() {
      return this.model.docs.length;
    },
    pubcount() {
      return this.model.pubs.length;
    },
    goodscount() {
      return this.model.goods.length;
    },
    subscount() {
      return this.model.subs.length;
    },
    prjcount() {
      return this.model.prjs.length;
    },
    matcount() {
      return this.model.mats.length;
    },
    copyToDocNameState() {
      return Validator.validateDocName(this.model.copydoc.copyToDocName);
    },
  },
  methods: {
    getImageSrc(img) {
      if (this.images && this.images[img]) {
        return this.images[img].src;
      } else {
        return undefined;
      }
    },
    getAvatarSrc(name) {
      // console.log(">>GOt avatar: ", name);
      if (this.model.avatars && this.model.avatars[name])
        return this.model.avatars[name].src;
      else return $("#defaultavatar").attr("src");
    },
    toggleHidePassword() {
      this.setData("model", "hidepassword", !this.model.hidepassword);
    },
    focusOnPwdInput() {
      this.setData("model", "passwordinputok", "show");
      this.$refs.focusThis.focus();
      KFK.modalShown();
    },
    focusOnOldPwdInput() {
      this.$refs.focusOldPwd.focus();
    },
    focusOnUserPwdInput() {
      this.$refs.focusUserPwd.focus();
      KFK.modalShown();
    },
    async setData(data, key, value) {
      await this.$set(this[data], key, value);
    },

    setMode(mode, event) {
      KFK.setMode(mode, event);
    },
    KfkAlign(direction) {
      KFK.alignNodes(direction);
    },

    dragToCreateChanged(checked) {
      console.log(`dragToCreate ${checked}`);
    },
    save() {
      KFK.save();
    },
    textAlignChanged() {
      KFK.textAlignChanged();
    },
    vertAlignChanged() {
      KFK.vertAlignChanged();
    },
    setTipVariant(tip) {
      KFK.setTipVariant(tip);
    },
    showEditorChanged(show_editor) {
      KFK.onShowEditorChanged(show_editor);
    },
    changeSVGFill() {
      KFK.changeSVGFill();
    },
    handleTipHover(tip) {
      console.log("Hover on " + tip);
      // $('#tipvariant_'+tip).style.visibility= "hidden";
    },
  },
}).$mount("#app");
//router.push("/bar");

DocController.KFK = KFK;
NodeController.KFK = KFK;
KFK.DocController = DocController;
KFK.NodeController = NodeController;
window.Buffer = window.Buffer || require("buffer").Buffer;
KFK.APP = app;
app.model.endpoint = KFK.config.ws_server.endpoint.label;
app.model.column = KFK.column;

console.log("app.model.column=", app.model.column);

window.addEventListener(
  "dragenter",
  function(e) {
    let jtarget = $(e.target);
    if (jtarget.hasClass("svgcanvas") || jtarget.hasClass("pageBoundingLine")) {
      e.preventDefault();
      e.dataTransfer.effectAllowed = "copy";
      e.dataTransfer.dropEffect = "copy";
    } else {
      e.preventDefault();
      e.dataTransfer.effectAllowed = "none";
      e.dataTransfer.dropEffect = "none";
    }
  },
  false
);

window.addEventListener("dragover", function(e) {
  let jtarget = $(e.target);
  if (jtarget.hasClass("svgcanvas") || jtarget.hasClass("pageBoundingLine")) {
    e.preventDefault();
    e.dataTransfer.effectAllowed = "copy";
    e.dataTransfer.dropEffect = "copy";
  } else {
    e.preventDefault();
    e.dataTransfer.effectAllowed = "none";
    e.dataTransfer.dropEffect = "none";
  }
});

window.addEventListener("drop", async function(e) {
  let jtarget = $(e.target);
  if (KFK.toolboxMouseDown === true) {
    KFK.placeNodeOnClick(e);
    KFK.toolboxMouseDown = false;
    return;
  }
  if (jtarget.hasClass("svgcanvas") || jtarget.hasClass("pageBoundingLine")) {
    KFK.dropAtPos = {
      x: KFK.scrXToJc3X(e.clientX),
      y: KFK.scrYToJc3Y(e.clientY),
    };
    e.preventDefault();
    e.dataTransfer.effectAllowed = "copy";
    e.dataTransfer.dropEffect = "copy";
    await KFK.onDropFiles(e.dataTransfer.files);
  } else {
    e.preventDefault();
    e.dataTransfer.effectAllowed = "none";
    e.dataTransfer.dropEffect = "none";
  }
});

KFK.init();
