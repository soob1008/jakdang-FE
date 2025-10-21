import { ImageNode } from "@/shared/components/editor/node/ImageNode";
import { $generateHtmlFromNodes } from "@lexical/html";
import { createEditor, EditorState } from "lexical";

export function lexicalJsonToHtml(jsonString: string): string {
  try {
    const editor = createEditor({
      nodes: [ImageNode],
    });
    const editorState: EditorState = editor.parseEditorState(jsonString);

    let html = "";
    editor.setEditorState(editorState);
    editor.update(() => {
      html = $generateHtmlFromNodes(editor);
    });
    return html;
  } catch (e) {
    console.error("Lexical JSON → HTML 변환 실패:", e);
    return "";
  }
}
