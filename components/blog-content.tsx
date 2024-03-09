"use client";
import React from "react";
import FroalaEditorView from "react-froala-wysiwyg/FroalaEditorView";

const BlogContent = ({ content }: { content: string }) => {
  if (window !== undefined)
    return (
      <div className="pb-5 text-white">
        <FroalaEditorView model={content} />
      </div>
    );
};

export default BlogContent;
