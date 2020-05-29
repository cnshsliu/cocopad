const Todo = {};
import KFK from "./console";

Todo.copyToTodo = async function() {
  let txt = "";
  let jqDiv = KFK.getHoverFocusLastCreate();
  try {
    jqDiv = jqDiv.find(".innerobj");
    txt = jqDiv.text();
  } catch (error) {}
  if (txt.length > 0) {
    await Todo.placeNewTodoItem(txt);
    KFK.scrLog(txt + " 已经添加为待办事项，99g查看");
  }
};
Todo.placeNewTodoItem = async function(todoText) {
  let jqCocoTodo = $("#coco_todo");
  if (jqCocoTodo.length < 1) {
    jqCocoTodo = await KFK.placeNode(
      false,
      "coco_todo",
      "textblock",
      "default",
      150,
      -480,
      400,
      400,

      "<div id='coco_todo_title' class='coco_title'>待办事项</div>" +
        "<div id='coco_todo_list' class='coco_list original'>" +
        "<div class='todo_item' prg='0' id='" +
        KFK.myuid() +
        "'><div class='todolabel'>" +
        todoText +
        "</div><div class='prg'></div></div>" +
        "</div>",

      ""
    );
    jqCocoTodo.addClass("todolist noedit");
    jqCocoTodo.find(".innerobj").css({
      "justify-content": "flex-start",
      "align-items": "flex-start",
    });
    await KFK.syncNodePut("C", jqCocoTodo, "todo", null, false, 0, 1);
    Todo.setTodoItemEventHandler(jqCocoTodo);
    KFK.scrollToNodeById("coco_todo");
  } else {
    if (todoText.length > 0) {
      await KFK.addTodoItem(todoText);
    }
  }
};

Todo.setTodoItemEventHandler = function(jqDIV = undefined) {
  let theItem = null;
  if (jqDIV) theItem = jqDIV.find(".todo_item");
  else theItem = $(".todo_item");
  theItem.on("click", function(evt) {
    evt.stopPropagation();
    KFK.hoveredTodo = $(this);
    let x = KFK.scrXToJc1X(evt.clientX) + 30;
    let y = KFK.scrYToJc1Y(evt.clientY) + 5;
    $("#todo_option").css("left", KFK.px(x));
    $("#todo_option").css("top", KFK.px(y));
    KFK.show($("#todo_option"));
    $(".todo_item.current").removeClass("current");
    KFK.selectedTodo = $(this);
    $(this).addClass("current");
  });
  theItem.on("mouseover", function() {
    KFK.hoveredTodo = $(this);
    KFK.AI("hover_todoitem");
  });
};

module.exports.Todo = Todo;
