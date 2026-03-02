import * as cp from "node:child_process";
import * as path from "node:path";
import * as vscode from "vscode";

function makeContent(source: string): string {
  const proc = cp.spawnSync("uvx", ["rst2revealjs"], { input: source });
  return proc.stdout.toString();
}

export function activate(context: vscode.ExtensionContext) {
  console.log(
    'Congratulations, your extension "live-preview-for-rst2revealjs" is now active!',
  );
  const disposable = vscode.commands.registerCommand(
    "live-preview-for-rst2revealjs.startPreview",
    () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        vscode.window.showErrorMessage("No active editor found.");
        return;
      }
      if (editor.document.languageId !== "restructuredtext") {
        vscode.window.showErrorMessage(
          "Target is not a reStructuredText file.",
        );
        return;
      }
      const filename = editor.document.fileName;
      const webviewPanel = vscode.window.createWebviewPanel(
        "livePreview",
        `Live Preview: ${path.basename(filename)}`,
        vscode.ViewColumn.Beside,
        {
          enableScripts: true,
          retainContextWhenHidden: true,
        },
      );
      const handleSave = vscode.workspace.onDidSaveTextDocument((document) => {
        if (document === editor.document) {
          webviewPanel.webview.html = makeContent(document.getText());
        }
      });
      webviewPanel.onDidDispose(() => handleSave.dispose());
      webviewPanel.webview.html = makeContent(editor.document.getText());
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
