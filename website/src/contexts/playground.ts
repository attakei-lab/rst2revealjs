import type { EditorView } from "@codemirror/view";
import type { AlpineComponent } from "alpinejs";
import DefaultSettings from "../default-settings.toml?raw";
import DefaultSourceMd from "../default-source.md?raw";
import DefaultSourceRst from "../default-source.rst?raw";
import { createEditorView } from "../editor";
import { publishRevealjs } from "../rst2revealjs";

type Data = {
  sourceEditor: EditorView | null;
  settingsEditor: EditorView | null;
  selected: string;
  published: string;
  _initalized: boolean;
  _sourceType: string;
  isEnabled: () => boolean;
  publish: () => Promise<void>;
};

export default (): AlpineComponent<Data> => ({
  sourceEditor: null,
  settingsEditor: null,
  selected: "source",
  published: "",
  _initalized: false,
  _sourceType: "reStructuredText",
  isEnabled() {
    return (
      this._initalized &&
      this.sourceEditor !== null &&
      this.settingsEditor !== null
    );
  },
  async publish() {
    const source = this.sourceEditor!.state.doc.toString();
    const settings = this.settingsEditor!.state.doc.toString();
    this.published = publishRevealjs(source, this._sourceType, settings);
  },
  async init() {
    const url = new URL(location.href);
    this._sourceType = url.searchParams.get("sourceType") || "reStructuredText";
    const defaultSource =
      this._sourceType === "Markdown" ? DefaultSourceMd : DefaultSourceRst;
    this.sourceEditor = createEditorView("rst", defaultSource, () =>
      this.publish(),
    );
    this.settingsEditor = createEditorView("toml", DefaultSettings, () =>
      this.publish(),
    );
    await this.publish();
    this._initalized = true;
  },
});
