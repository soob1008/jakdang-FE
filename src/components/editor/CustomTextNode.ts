import { TextNode, EditorConfig } from "lexical";

export class CustomTextNode extends TextNode {
  static getType(): string {
    return "custom-text";
  }

  static clone(node: TextNode): TextNode {
    return new CustomTextNode((node as CustomTextNode).__text, node.__key);
  }

  createDOM(config: EditorConfig): HTMLElement {
    const dom = super.createDOM(config);
    const style = this.getStyle();
    if (style) {
      dom.setAttribute("style", style);
    }
    return dom;
  }

  updateDOM(
    prevNode: CustomTextNode,
    dom: HTMLElement,
    config: EditorConfig
  ): boolean {
    const prevStyle = prevNode.getStyle();
    const nextStyle = this.getStyle();

    if (prevStyle !== nextStyle) {
      if (nextStyle) {
        dom.setAttribute("style", nextStyle);
      } else {
        dom.removeAttribute("style");
      }
    }

    return super.updateDOM(prevNode as this, dom, config);
  }
}
