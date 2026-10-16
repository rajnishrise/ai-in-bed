import { Fragment, type ReactNode } from "react";

/**
 * Renders **bold**, *italic* and `code` inside lesson text. `renderPlain`
 * lets the lesson page turn glossary words in plain runs into links.
 */
export function RichText({
  text,
  renderPlain,
}: {
  text: string;
  renderPlain?: (s: string) => ReactNode;
}) {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`|\*[^*]+\*)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) return <strong key={i}>{part.slice(2, -2)}</strong>;
        if (part.startsWith("`") && part.endsWith("`")) return <code key={i}>{part.slice(1, -1)}</code>;
        if (part.startsWith("*") && part.endsWith("*") && part.length > 2) return <em key={i}>{part.slice(1, -1)}</em>;
        return <Fragment key={i}>{renderPlain ? renderPlain(part) : part}</Fragment>;
      })}
    </>
  );
}
