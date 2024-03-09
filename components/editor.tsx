"use client";

// import { useTheme } from "next-themes";
// import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
// import {
//   BlockNoteView,
//   useBlockNote,
//   Theme,
//   lightDefaultTheme,
//   darkDefaultTheme,
// } from "@blocknote/react";
// import "@blocknote/core/style.css";
// import { useEffect, useState } from "react";

// interface EditorProps {
//   onChange: (value: string) => void;
//   initialContent: string | null;
//   editable?: boolean;
// }

// const Editor = ({ onChange, initialContent, editable }: EditorProps) => {
//   const [content, setContent] = useState<string | null>(initialContent);

//   useEffect(() => {
//     if (initialContent) {
//       setContent(initialContent);
//     }
//   }, [initialContent]);

//   const lightRedTheme = {
//     ...lightDefaultTheme,
//     fontFamily: "Helvetica Neue, sans-serif",
//   } satisfies Theme;

//   const darkRedTheme = {
//     ...darkDefaultTheme,

//     fontFamily: "Helvetica Neue, sans-serif",
//   } satisfies Theme;

//   const { resolvedTheme } = useTheme();
//   console.log("LOL = ", content && JSON.parse(content));

//   const editor: BlockNoteEditor = useBlockNote({
//     editable: true,
//     initialContent: content ? JSON.parse(content) : undefined,
//     onEditorContentChange: (editor) => {
//       onChange(JSON.stringify(editor.topLevelBlocks));
//     },
//   });

//   return (
//     <div>
//       <BlockNoteView
//         className="bg-slate-800"
//         editor={editor}
//         theme={resolvedTheme === "dark" ? darkRedTheme : lightRedTheme}
//       />
//     </div>
//   );
// };

// export default Editor;
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import FroalaEditorComponent from "react-froala-wysiwyg";
import "froala-editor/js/plugins/image.min.js";
import "froala-editor/js/plugins/char_counter.min.js";
import "froala-editor/js/plugins/align.min.js";
import "froala-editor/js/plugins/colors.min.js";
import "froala-editor/js/plugins/emoticons.min.js";
import "froala-editor/js/plugins/font_family.min.js";
import "froala-editor/js/plugins/font_size.min.js";
import "froala-editor/js/plugins/link.min.js";
import "froala-editor/js/plugins/lists.min.js";
import "froala-editor/js/plugins/line_height.min.js";
import "froala-editor/js/plugins/inline_style.min.js";
import "froala-editor/js/plugins/inline_class.min.js";
import "froala-editor/js/plugins/image_manager.min.js";
import "froala-editor/js/plugins/paragraph_format.min.js";
import "froala-editor/js/plugins/paragraph_style.min.js";
import "froala-editor/js/plugins/video.min.js";
import "froala-editor/js/plugins/url.min.js";
import "froala-editor/js/plugins/table.min.js";
import "froala-editor/js/plugins/trim_video.min.js";
// import "froala-editor/js/plugins/embedly.min.js";

interface EditorProps {
  onChange: (value: string) => void;
  initialContent: string | null;
  editable?: boolean;
}

import React from "react";
import { createReactEditorJS } from "react-editor-js";
import { toolbarButtons } from "./editor-buttons";

const ReactEditorJS = createReactEditorJS();
const Editor = ({ onChange, initialContent, editable }: EditorProps) => {
  return (
    <div id="editor eg-dark-theme">
      <FroalaEditorComponent
        tag="textarea"
        model={initialContent && initialContent}
        config={{
          toolbarButtons: toolbarButtons,
        }}
        onModelChange={onChange}
      />
    </div>
  );
};

export default Editor;
