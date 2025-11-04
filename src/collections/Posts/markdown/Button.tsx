import type * as React from "react";

// TODO: This implementation uses Slate APIs which are not available in Lexical
// This needs to be converted to use Lexical APIs or converted to a Block
// For now, this is a stub to fix TypeScript errors

const Icon = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			height="100%"
			viewBox="0 0 208 128"
			style={{
				width: "auto",
			}}
			stroke="currentColor"
		>
			<rect
				width="198"
				height="118"
				x="5"
				y="5"
				ry="10"
				strokeWidth="10"
				fill="none"
			/>
			<path
				d="M30 98V30h20l20 25 20-25h20v68H90V59L70 84 50 59v39zm125 0l-30-33h20V30h20v35h20z"
				fill="currentColor"
			/>
		</svg>
	);
};

export const Button: React.FC = () => {
	// TODO: Implement Lexical insertion logic
	const onClick = () => {
		console.warn("Markdown button clicked - needs Lexical implementation");
	};

	return (
		<button
			onClick={onClick}
			type="button"
			style={{
				padding: "4px",
				border: "none",
				background: "transparent",
				cursor: "pointer",
			}}
		>
			<Icon />
		</button>
	);
};
