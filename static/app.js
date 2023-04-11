import { VirtualDom } from "./html_assist.js";

const dom = new VirtualDom();

dom.elementTree = [
  {
    id: "landing-header",
    element: dom.createElem("div"),
    children: [
      {
        element: dom.createElem("div"),
        children: [
          { element: dom.createElem("div", {innerHTML: "hello"}), children: {} },
          { element: dom.createElem("div"), children: {} },
        ],
      },
    ],
  },
];

dom.render();