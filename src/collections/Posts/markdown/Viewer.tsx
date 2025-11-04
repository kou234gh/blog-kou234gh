import type * as React from "react";
import ReactMarkdown from "react-markdown";
import remarkGFM from "remark-gfm";

const remarkPlugins = [remarkGFM];

type ViewerProps = {
	markdown: string;
};

const Viewer: React.FC<ViewerProps> = ({ markdown }) => {
	return (
		<ReactMarkdown remarkPlugins={remarkPlugins}>{markdown}</ReactMarkdown>
	);
};

export default Viewer;
