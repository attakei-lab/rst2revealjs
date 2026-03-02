import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  console.log(
    'Congratulations, your extension "live-preview-for-rst2revealjs" is now active!',
  );
  const disposable = vscode.commands.registerCommand(
    "live-preview-for-rst2revealjs.startPreview",
    () => {
      vscode.window.showInformationMessage(
        "Display webview for live preview for rst2revealjs.",
      );
    },
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
