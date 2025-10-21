import type { JSX } from "react";
import {
  DecoratorNode,
  type LexicalNode,
  type NodeKey,
  type SerializedLexicalNode,
  type Spread,
  $insertNodes,
} from "lexical";
import { ImageComponent } from "./ImageComponent";

export type ImageAlign =
  | "left"
  | "center"
  | "right"
  | "text-left"
  | "text-right";

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

  // 노드 타입 이름
  static getType(): string {
    return "editor-image";
  }

  // 클론 메서드
  static clone(node: ImageNode): ImageNode {
    return new ImageNode(node.__src, node.__width, node.__align, node.__key);
  }

  // JSON → Node
  static importJSON(serializedNode: SerializedImageNode): ImageNode {
    const { src, width, align } = serializedNode;
    return $createImageNode(src, width, align);
  }

  // Node → JSON
  exportJSON(): SerializedImageNode {
    return {
      type: "editor-image",
      version: 1,
      src: this.__src,
      width: this.__width,
      align: this.__align,
    };
  }

  // Lexical Editor 내부 렌더링용
  createDOM(): HTMLElement {
    return document.createElement("span");
  }

  updateDOM(): false {
    return false;
  }

  // React 렌더링 시 실제 컴포넌트
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

  // HTML Export 시 호출되는 함수
  exportDOM(): { element: HTMLElement } {
    const element = document.createElement("img");

    // 환경 변수에서 베이스 URL 가져오기
    const baseUrl = process.env.NEXT_PUBLIC_IMAGE_URL || "";
    const imageSrc = this.__src.startsWith("http")
      ? this.__src // 이미 절대경로면 그대로 사용
      : `${baseUrl}${this.__src}`; // 상대경로면 base URL 붙이기

    element.src = imageSrc;
    element.alt = "";

    // width %
    element.style.width = `${this.__width}%`;
    element.style.display = "block";
    element.style.margin = "1rem auto";

    // align 스타일 처리
    switch (this.__align) {
      case "left":
      case "text-left":
        element.style.float = "left";
        element.style.marginRight = "1rem";
        break;
      case "right":
      case "text-right":
        element.style.float = "right";
        element.style.marginLeft = "1rem";
        break;
      default:
        element.style.margin = "1rem auto";
        break;
    }

    return { element };
  }

  // width / align 제어 메서드들
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

// 유효한 범위 내 width 보정
function clampWidth(width: number): number {
  if (Number.isNaN(width)) return DEFAULT_WIDTH;
  return Math.min(100, Math.max(10, width));
}

// Node 생성 함수
export function $createImageNode(
  src: string,
  width?: number,
  align?: ImageAlign
): ImageNode {
  return new ImageNode(src, width ?? DEFAULT_WIDTH, align ?? DEFAULT_ALIGN);
}

// 타입 가드
export function $isImageNode(
  node: LexicalNode | null | undefined
): node is ImageNode {
  return node instanceof ImageNode;
}

// Node 삽입 유틸
export function insertImageNode(
  src: string,
  width?: number,
  align?: ImageAlign
) {
  const node = $createImageNode(src, width, align);
  $insertNodes([node]);
  return node;
}
