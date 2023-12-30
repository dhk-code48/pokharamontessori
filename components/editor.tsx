"use client";

import { useTheme } from "next-themes";
import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import {
  BlockNoteView,
  useBlockNote,
  Theme,
  lightDefaultTheme,
  darkDefaultTheme,
} from "@blocknote/react";
import "@blocknote/core/style.css";
import { useEffect, useState } from "react";

interface EditorProps {
  onChange: (value: string) => void;
  initialContent: string | null;
  editable?: boolean;
}

const Editor = ({ onChange, initialContent, editable }: EditorProps) => {
  const [content, setContent] = useState<string | null>(initialContent);

  useEffect(() => {
    if (initialContent) {
      setContent(initialContent);
    }
  }, [initialContent]);

  const lightRedTheme = {
    ...lightDefaultTheme,
    fontFamily: "Helvetica Neue, sans-serif",
  } satisfies Theme;

  const darkRedTheme = {
    ...darkDefaultTheme,

    fontFamily: "Helvetica Neue, sans-serif",
  } satisfies Theme;

  const { resolvedTheme } = useTheme();
  console.log("LOL = ", content && JSON.parse(content));

  const editor: BlockNoteEditor = useBlockNote({
    editable: true,
    initialContent: content ? JSON.parse(content) : undefined,
    onEditorContentChange: (editor) => {
      onChange(JSON.stringify(editor.topLevelBlocks));
    },
  });

  return (
    <div>
      <BlockNoteView
        className="bg-slate-800"
        editor={editor}
        theme={resolvedTheme === "dark" ? darkRedTheme : lightRedTheme}
      />
    </div>
  );
};

export default Editor;
