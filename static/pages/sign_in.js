import { VirtualDom } from "../html_assist.js";

const SignInPage = new VirtualDom();

const { createElem } = SignInPage;

SignInPage.elementTree = [
  {
    element: createElem("section", {
      className: "sign-in-container default-glowing",
    }),
    children: [
      {
        element: createElem("div", { className: "form-container" }),
        children: [
          {
            element: createElem("div", { className: "text-container" }),
            children: [
              { element: createElem("h3", { innerText: "Welcome back!" }) },
              {
                element: createElem("span", {
                  innerText: "You can sign in to save and track your history",
                }),
              },
            ],
          },
          {
            element: createElem("form", {
              className: "input-container",
              id: "sign-in-input",
            }),
            children: [
              {
                element: createElem("input", {
                  className: "input-item",
                  id: "login",
                }),
              },
              {
                element: createElem("input", {
                  className: "input-item",
                  id: "password",
                  type: "password",
                }),
              },
              { element: createElem("input", { type: "submit", value: "Sign In", className: "button" }) },
            ],
          },
        ],
      },
      {
        element: createElem("div", { className: "decoration-container" }),
        children: [
          { element: createElem("div", { className: "decoration-wave wave-1" }) },
          { element: createElem("div", { className: "decoration-wave wave-2" }) },
          { element: createElem("div", { className: "decoration-wave wave-3" }) },
          { element: createElem("div", { className: "decoration-wave wave-4" }) },
          { element: createElem("div", { className: "decoration-wave wave-5" }) },
        ],
      },
    ],
  },

  {element: createElem("script", {type: "module", src: "static/src/scripts/login.js"})}
];

export { SignInPage };
