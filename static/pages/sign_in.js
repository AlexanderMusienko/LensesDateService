import { VirtualDom } from "../html_assist.js";

const SignInPage = new VirtualDom();

const { createElem } = SignInPage;

SignInPage.elementTree = [
  {
    element: createElem("div", { className: "sign-in-page-container" }),
    children: [
      {
        element: createElem("div", {
          className: "sign-in-container default-glowing",
        }),
        children: [
          {
            element: createElem("div", { className: "form-container" }),
            children: [
              {
                element: createElem("div", { className: "text-container" }),
                children: [
                  { element: createElem("h3", { innerText: "Log In" }) },
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
                    element: createElem("div", {
                      className: "form-input-container",
                    }),
                    children: [
                      {
                        element: createElem("label", {
                          htmlFor: "login",
                          innerText: "Email",
                          className: "form-label",
                        }),
                      },
                      {
                        element: createElem("input", {
                          placeholder: "example@email.com",
                          className: "input-item",
                          id: "login",
                        }),
                      },
                      {
                        element: createElem("label", {
                          htmlFor: "password",
                          innerText: "Password",
                          className: "form-label",
                        }),
                      },
                      {
                        element: createElem("input", {
                          placeholder: "●●●●●●●●●●",
                          className: "input-item",
                          id: "password",
                          type: "password",
                        }),
                      },
                    ],
                  },
                  {
                    element: createElem("a", {
                      className: "forgot-password",
                      innerText: "Forgot password?",
                      src: ""
                    })
                  },
                  {
                    element: createElem("input", {
                      type: "submit",
                      value: "Sign In",
                      className: "button",
                    }),
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    element: createElem("script", {
      type: "module",
      src: "static/src/scripts/login.js",
    }),
  },
];

export { SignInPage };
