import * as React from "react";
// TODO: These Slate imports don't exist in Lexical - need to use Lexical APIs instead
// import { Transforms } from 'slate';
// import { ReactEditor, useSlateStatic } from 'slate-react';
// import { CodeEditor } from 'payload/dist/admin/components/elements/CodeEditor';
// import Button from 'payload/dist/admin/components/elements/Button'

import classes from "./index.module.scss";

const Viewer = React.lazy(() => import("./Viewer"));

type ElementProps = {
	attributes?: React.HTMLAttributes<HTMLDivElement>;
	children?: React.ReactNode;
	element?: {
		markdownValue?: string;
		type?: string;
		[key: string]: unknown;
	};
	fieldProps?: {
		path: string;
		admin?: {
			readOnly?: boolean;
		};
	};
};

// TODO: This implementation uses Slate APIs which are not available in Lexical
// This needs to be converted to use Lexical node component APIs or converted to a Block
export const Element: React.FC<ElementProps> = (props) => {
	const { attributes = {}, children, element, fieldProps } = props;

	const currentState = element?.markdownValue || "";
	const [markdownState, setMarkdownState] = React.useState<"editor" | "viewer">(
		"editor",
	);

	// TODO: Replace with Lexical node update logic
	const updateNode = React.useCallback(
		(newValue: string) => {
			if (currentState !== newValue) {
				console.warn(
					"Markdown update - needs Lexical implementation",
					newValue,
				);
				// Lexical node update logic needed here
			}
		},
		[currentState],
	);

	// TODO: Replace with Lexical node removal logic
	const removeNode = React.useCallback(() => {
		console.warn("Markdown remove - needs Lexical implementation");
		// Lexical node removal logic needed here
	}, []);

	return (
		<div
			{...attributes}
			contentEditable={false}
			className={classes.markdownElement}
		>
			<div className={classes.header}>
				<p className={classes.headerText}>Markdown</p>

				<div className={classes.rightSection}>
					<div className={classes.tabs}>
						<button
							className={markdownState === "editor" ? classes.active : ""}
							type="button"
							onClick={() => setMarkdownState("editor")}
						>
							Edit
						</button>
						<button
							className={markdownState === "viewer" ? classes.active : ""}
							type="button"
							onClick={() => setMarkdownState("viewer")}
						>
							Preview
						</button>
					</div>

					<button
						className={classes.removeButton}
						onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
							e.preventDefault();
							removeNode();
						}}
						title="Remove Markdown"
						disabled={fieldProps?.admin?.readOnly}
						type="button"
						style={{
							padding: "4px 8px",
							border: "none",
							background: "transparent",
							cursor: "pointer",
						}}
					>
						×
					</button>
				</div>
			</div>

			{markdownState === "editor" && (
				<textarea
					onChange={(e) => updateNode(e.target.value)}
					className={classes.customEditor}
					style={{
						height: "20vh",
						width: "100%",
						padding: "10px",
						fontFamily: "monospace",
						fontSize: "14px",
						border: "none",
						backgroundColor: "var(--theme-elevation-50)",
						resize: "vertical",
					}}
					value={currentState}
					placeholder="Enter markdown here..."
				/>
			)}

			{markdownState === "viewer" && (
				<React.Suspense>
					<div
						className={classes.viewerContainer}
						style={{
							height: "20vh",
						}}
					>
						<Viewer markdown={currentState} />
					</div>
				</React.Suspense>
			)}

			<div
				style={{
					height: 0,
				}}
			>
				{children}
			</div>
		</div>
	);
};
