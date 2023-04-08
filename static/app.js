import { virtualDom } from "./html_assist.js";

const dom = new virtualDom();

dom.elementTree = [
  {
    id: "landing-header",
    element: dom.createElem("div"),
    children: [
      {
        element: dom.createElem("div"),
        children: [
          { element: dom.createElem(["div", "hello", "child"]), children: {} },
          { element: dom.createElem("div"), children: {} },
        ],
      },
    ],
  },
];

dom.render();

console.log(dom.elementTree);
console.log("its app.js");
