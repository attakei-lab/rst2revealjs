import Alpine from "alpinejs";
import { createEditorView } from "./editor";
import { publishRevealjs } from "./rst2revealjs";
import "./style.css";

Alpine.data("playground", () => ({
  editor: null,
  published: "",
  init() {
    this.editor = createEditorView(this.$refs.editor, async (code) => {
      const html = publishRevealjs(code);
      this.published = html;
    });
  },
}));

Alpine.start();
