"use client";
import React, { useEffect } from "react";
import FroalaEditorView from "react-froala-wysiwyg/FroalaEditorView";

const BlogContent = ({ content }: { content: string }) => {
  useEffect(() => {
    console.log(content);
  }, [content]);

  return (
    <div className="pb-5 text-white">
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

export default BlogContent;
