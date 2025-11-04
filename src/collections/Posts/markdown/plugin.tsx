// Note: This plugin is for Slate editor, not Lexical
// Lexical uses a different plugin system
export const withMarkdown = (editor: any) => {
	const { isVoid } = editor;

	editor.isVoid = (element: any) =>
		element.type === "markdown" ? true : isVoid(element);

	return editor;
};
