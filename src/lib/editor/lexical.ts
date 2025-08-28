import { $generateHtmlFromNodes } from "@lexical/html";
import { createEditor, EditorState } from "lexical";

export function lexicalJsonToHtml(jsonString: string): string {
  if (typeof window === "undefined") {
    return ""; // SSR 단계에선 무조건 빈 문자열 반환
  }

  try {
    const editor = createEditor();
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
