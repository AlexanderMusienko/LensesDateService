export class VirtualDom {
  elementTree = [];

  render() {
    const root = document.getElementById("root");

    function subRender(elemObj) {
      if (elemObj.children.length) {
        elemObj.children.forEach((innerElemObj) => {
          elemObj.element.append(innerElemObj.element);
          subRender(innerElemObj);
        });
      }
    }

    this.elementTree.forEach((elemObj) => {
      root.append(elemObj.element);
      subRender(elemObj);
    });
  }

  /**
 * @param {string} tag HTML tag that will be created with document.createElement(tag)
 * @param {Object} props Object assigning to htmlElement fields (such as innerHTML)
 */

  createElem(tag, props) {
    const elem = document.createElement(tag);

    if (props) {
      Object.entries(props).forEach(([key, value]) => {
        elem[key] = value;
        console.log(`props: ${key}:${value}`);
      })
    }

    return elem;
  }
}
