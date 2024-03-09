import React, { FC } from "react";

const BlogLayout: FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div>{children}</div>;
};

export default BlogLayout;
