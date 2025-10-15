import type { JSX } from "react";
import {
  DecoratorNode,
  type EditorConfig,
  type LexicalNode,
  type NodeKey,
  type SerializedLexicalNode,
  type Spread,
  $insertNodes,
} from "lexical";
import { ImageComponent } from "./ImageComponent";

export type ImageAlign = "left" | "center" | "right" | "text-left" | "text-right";

const DEFAULT_WIDTH = 100;
const DEFAULT_ALIGN: ImageAlign = "center";

export type SerializedImageNode = Spread<
  {
    src: string;
    width: number;
    align: ImageAlign;
  },
  SerializedLexicalNode & { type: "editor-image"; version: 1 }
>;

export class ImageNode extends DecoratorNode<JSX.Element> {
  __src: string;
  __width: number;
  __align: ImageAlign;

  constructor(
    src: string,
    width: number = DEFAULT_WIDTH,
    align: ImageAlign = DEFAULT_ALIGN,
    key?: NodeKey
  ) {
    super(key);
    this.__src = src;
    this.__width = width;
    this.__align = align;
  }

  static getType(): string {
    return "editor-image";
  }

  static clone(node: ImageNode): ImageNode {
    return new ImageNode(node.__src, node.__width, node.__align, node.__key);
  }

  static importJSON(serializedNode: SerializedImageNode): ImageNode {
    const { src, width, align } = serializedNode;
    return $createImageNode(src, width, align);
  }

  exportJSON(): SerializedImageNode {
    return {
      type: "editor-image",
      version: 1,
      src: this.__src,
      width: this.__width,
      align: this.__align,
    };
  }

  createDOM(_config: EditorConfig): HTMLElement {
    return document.createElement("span");
  }

  updateDOM(): false {
    return false;
  }

  decorate(): JSX.Element {
    return (
      <ImageComponent
        nodeKey={this.getKey()}
        src={this.__src}
        width={this.__width}
        align={this.__align}
      />
    );
  }

  setWidth(width: number) {
    const writable = this.getWritable();
    writable.__width = clampWidth(width);
  }

  setAlign(align: ImageAlign) {
    const writable = this.getWritable();
    writable.__align = align;
  }

  getWidth(): number {
    return this.__width;
  }

  getSrc(): string {
    return this.__src;
  }
}

function clampWidth(width: number): number {
  if (Number.isNaN(width)) return DEFAULT_WIDTH;
  return Math.min(100, Math.max(10, width));
}

export function $createImageNode(
  src: string,
  width?: number,
  align?: ImageAlign
): ImageNode {
  return new ImageNode(src, width ?? DEFAULT_WIDTH, align ?? DEFAULT_ALIGN);
}

export function $isImageNode(
  node: LexicalNode | null | undefined
): node is ImageNode {
  return node instanceof ImageNode;
}

export function insertImageNode(
  src: string,
  width?: number,
  align?: ImageAlign
) {
  const node = $createImageNode(src, width, align);
  $insertNodes([node]);
  return node;
}
