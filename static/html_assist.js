/* Следующая абстракция: наш виртуальный дом это обыкновенный массив js dom элементов, 
которые создаются при помощи самописной функции-конструктора, методы, которой описаны в отдельном классе 

Исходя из этого, метод создания элемента добавляет (пушит) этот элемент в наш "виртуальный дом" 

Есть проблема вложенности элементов, обратить внимание на поле children html элемента 

Рендер метод ссылается на html элемент id которого равняется root
Этот метод вызывает append для каждого элемента массива

*/

export class virtualDom {
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

  createElem(tag, innerHTML, className) {
    const elem = document.createElement(tag);

    if (innerHTML) {
      elem.innerHTML = innerHTML;
    }
    if (className) {
      elem.classList.add(className);
    }

    return elem;
  }
}
