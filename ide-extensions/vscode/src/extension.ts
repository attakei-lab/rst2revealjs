import * as cp from "node:child_process";
import * as path from "node:path";
import * as vscode from "vscode";

type EditorContent = {
  filename: string;
  language: string;
  body: string;
};

const panels: Map<string, vscode.WebviewPanel> = new Map();

function getEditorContent(): EditorContent | null {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    return null;
  }
  return {
    filename: editor.document.fileName,
    language: editor.document.languageId,
    body: editor.document.getText(),
  };
}

function updateContent(content: EditorContent) {
  const panel = panels.get(content.filename);
  if (panel) {
    const proc = cp.spawnSync("uvx", ["rst2revealjs"], { input: content.body });
    panel.webview.html = proc.stdout.toString();
  }
}

export function activate(context: vscode.ExtensionContext) {
  console.log(
    'Congratulations, your extension "live-preview-for-rst2revealjs" is now active!',
  );
  const disposable = vscode.commands.registerCommand(
    "live-preview-for-rst2revealjs.startPreview",
    () => {
      const content = getEditorContent();
      if (!content) {
        vscode.window.showErrorMessage("No active editor found.");
        return;
      }
      if (content.language !== "restructuredtext") {
        vscode.window.showErrorMessage(
          "The active file is not a reStructuredText file.",
        );
        return;
      }
      if (!panels.has(content.filename)) {
        const webviewPanel = vscode.window.createWebviewPanel(
          "livePreview",
          `Live Preview: ${path.basename(content.filename)}`,
          vscode.ViewColumn.Beside,
          {
            enableScripts: true,
            retainContextWhenHidden: true,
          },
        );
        panels.set(content.filename, webviewPanel);
        updateContent(content);
      }
    },
  );

  context.subscriptions.push(disposable);
  {
    const proc = cp.spawnSync("uv", ["--version"]);
    if (proc.status !== 0) {
      vscode.window.showWarningMessage(
        "Currently, this extension requires uv.",
      );
    }
  }
}

export function deactivate() {}
