import React from "react";
import DOMPurify from "dompurify";

const RichTextContent = ({ content }) => {
  // Configure DOMPurify to allow 'img' tags and their 'src' and 'alt' attributes
  const cleanContent = DOMPurify.sanitize(content, {
    ALLOWED_TAGS: ["p", "img"],
    ALLOWED_ATTR: ["src", "alt"],
  });

  return <div dangerouslySetInnerHTML={{ __html: cleanContent }} />;
};

export default RichTextContent;
