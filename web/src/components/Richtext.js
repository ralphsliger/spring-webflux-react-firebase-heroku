import React, { useRef } from 'react';
import JoditEditor from "jodit-react";

export const Richtext = ({setContent}) => {
	const editor = useRef(null)

	const config = {
		readonly: false
	}

	return (
        <JoditEditor
            ref={editor}
            config={config}
            tabIndex={1} // tabIndex of textarea
            onBlur={newContent => setContent(newContent)}
            onChange={newContent => {}}
        />
    );
} 