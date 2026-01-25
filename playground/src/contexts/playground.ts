import type { EditorView } from "@codemirror/view";
import type { AlpineComponent } from "alpinejs";
import { createEditorView } from "../editor";
import { publishRevealjs } from "../rst2revealjs";

type Data = {
  editor: EditorView | null;
  published: string;
};

export default (): AlpineComponent<Data> => ({
  editor: null,
  published: "",
  init() {
    const editor = createEditorView(async (code) => {
      const html = publishRevealjs(code);
      this.published = html;
    });
    this.published = publishRevealjs(editor.state.doc.toString());
    this.editor = editor;
    // this.$refs.editor.appendChild(editor.dom);
  },
});
