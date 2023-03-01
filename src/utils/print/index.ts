let conf: any = {}

const Print = function (dom: any, options?: any) {
  options = options || {};
  // @ts-expect-error
  const _this = this;
  if (!(_this instanceof Print)) return new (Print as any)(dom, options);
  conf = {
    styleStr: '',
    setDomHeightArr: [],
    printBeforeFn: null,
    printDoneCallBack: null
  };
  for (const key in conf) {
    if (key && options.hasOwnProperty(key)) {
      conf[key] = options[key];
    }
  }
  if (typeof dom === "string") {
    (_this as any).dom = document.querySelector(dom);
  } else {
    (_this as any).dom = (_this as any).isDOM(dom) ? dom : dom.$el;
  }
  if (conf.setDomHeightArr && conf.setDomHeightArr.length) {
    (_this as any).setDomHeight(conf.setDomHeightArr);
  }
  (_this as any).init();
};

Print.prototype = {
  /**
   * init
   */
  init: function (): void {
    const content = this.getStyle() + this.getHtml();
    this.writeIframe(content);
  },
  /**
   * @param {Object} obj
   * @param {Object} obj2
   */
  extendOptions: function <T>(obj: any, obj2: T): T {
    for (const k in obj2) {
      obj[k] = obj2[k];
    }
    return obj;
  },
  getStyle: function (): string {
    let str = '';
    const styles: NodeListOf<Element> = document.querySelectorAll('style,link');
    for (let i = 0; i < styles.length; i++) {
      str += styles[i].outerHTML;
    }
    str += `<style>.no-print{display:none;}${conf.styleStr}</style>`;
    return str;
  },
  getHtml: function (): Element {
    const inputs = document.querySelectorAll("input");
    const selects = document.querySelectorAll("select");
    const textareas = document.querySelectorAll("textarea");
    const canvass = document.querySelectorAll("canvas");

    for (let k = 0; k < inputs.length; k++) {
      if (inputs[k].type == "checkbox" || inputs[k].type == "radio") {
        if (inputs[k].checked == true) {
          inputs[k].setAttribute("checked", "checked");
        } else {
          inputs[k].removeAttribute("checked");
        }
      } else if (inputs[k].type == "text") {
        inputs[k].setAttribute("value", inputs[k].value);
      } else {
        inputs[k].setAttribute("value", inputs[k].value);
      }
    }

    for (let k2 = 0; k2 < textareas.length; k2++) {
      if (textareas[k2].type == "textarea") {
        textareas[k2].innerHTML = textareas[k2].value;
      }
    }

    for (let k3 = 0; k3 < selects.length; k3++) {
      if (selects[k3].type == "select-one") {
        const child = selects[k3].children;
        for (const i in child) {
          if (child[i].tagName == "OPTION") {
            if ((child[i] as any).selected == true) {
              child[i].setAttribute("selected", "selected");
            } else {
              child[i].removeAttribute("selected");
            }
          }
        }
      }
    }

    for (let k4 = 0; k4 < canvass.length; k4++) {
      const imageURL = canvass[k4].toDataURL("image/png");
      const img = document.createElement("img");
      img.src = imageURL;
      img.setAttribute("style", "max-width: 100%;");
      img.className = "isNeedRemove";
      (canvass[k4] as any).parentNode.insertBefore(img, canvass[k4].nextElementSibling);
    }

    return this.dom.outerHTML;
  },
  writeIframe: function (content: any) {
    let w: Document | Window | null;
    let doc: Document;
    const iframe: HTMLIFrameElement = document.createElement("iframe");
    const f: HTMLIFrameElement = document.body.appendChild(iframe);
    iframe.id = "myIframe";
    iframe.setAttribute(
      "style",
      "position:absolute;width:0;height:0;top:-10px;left:-10px;"
    );
    // eslint-disable-next-line prefer-const
    w = f.contentWindow || f.contentDocument;
    // eslint-disable-next-line prefer-const
    doc = f.contentDocument || (f.contentWindow as any).document;
    doc.open();
    doc.write(content);
    doc.close();

    const removes = document.querySelectorAll(".isNeedRemove");
    for (let k = 0; k < removes.length; k++) {
      (removes[k] as any).parentNode.removeChild(removes[k]);
    }

    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const _this = this;
    iframe.onload = function (): void {
      if (conf.printBeforeFn) {
        conf.printBeforeFn({ doc });
      }
      _this.toPrint(w);
      setTimeout(function () {
        document.body.removeChild(iframe);
        if (conf.printDoneCallBack) {
          conf.printDoneCallBack();
        }
      }, 100);
    };
  },
  toPrint: function (frameWindow: any): void {
    try {
      setTimeout(function () {
        frameWindow.focus();
        try {
          if (!frameWindow.document.execCommand('print', false, null)) {
            frameWindow.print();
          }
        } catch (e) {
          frameWindow.print();
        }
        frameWindow.close();
      }, 10);
    } catch (err) {
      console.error(err);
    }
  },
  isDOM:
    typeof HTMLElement === "object"
      ? function (obj: any) {
        return obj instanceof HTMLElement;
      }
      : function (obj: any) {
        return (
          obj &&
          typeof obj === "object" &&
          obj.nodeType === 1 &&
          typeof obj.nodeName === "string"
        );
      },
  /**
   * @param {Array} arr
   */
  setDomHeight(arr: any) {
    if (arr && arr.length) {
      arr.forEach((name: any) => {
        const domArr = document.querySelectorAll(name);
        domArr.forEach(dom => {
          dom.style.height = dom.offsetHeight + 'px';
        });
      });
    }
  }
};

export default Print;
