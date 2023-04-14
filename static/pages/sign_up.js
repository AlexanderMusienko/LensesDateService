import { VirtualDom } from "../html_assist.js";

const SignUpPage = new VirtualDom();

const { createElem } = SignUpPage;

SignUpPage.elementTree = [
  {
    element: createElem("div", {
      className: "sign-up-container",
    }),
    children: [
      {
        element: createElem("div", { className: "form-container default-glowing" }),
        children: [
          {
            element: createElem("div", { className: "text-container" }),
            children: [
              {
                element: createElem("h3", { innerText: "New user? Welcome!" }),
              },
              {
                element: createElem("span", {
                  innerText: "Create an account to track your history",
                }),
              },
            ],
          },
          {
            element: createElem("form", {
              className: "input-container",
              id: "sign-up-input",
            }),
            children: [
              {
                element: createElem("input", {
                  className: "input-item",
                  id: "email",
                  type: "email",
                  placeholder: "Your Email",
                }),
              },
              {
                element: createElem("input", {
                  className: "input-item",
                  id: "login",
                  type: "text",
                  placeholder: "Your Login",
                }),
              },
              {
                element: createElem("input", {
                  className: "input-item",
                  id: "password",
                  type: "password",
                  placeholder: "Password",
                }),
              },
              {
                element: createElem("input", {
                  className: "button",
                  type: "submit",
                  value: "Register",
                }),
              },
            ],
          },
        ],
      },
    ],
  },
  {
    element: createElem("script", {
      src: "./static/src/scripts/registration.js",
      type: "module",
    }),
  },
];

export { SignUpPage };
