export function extractMarkdownHeadings(markdown = "") {
  return markdown
    .split("\n")
    .filter((line) => /^#{1,3}\s/.test(line))
    .map((line) => line.replace(/^#{1,3}\s/, "").trim());
}

export function createMarkdownComponents(prefix = "notes") {
  return {
    h1: ({ children, node }) => (
      <h1 id={`${prefix}-h1-${node?.position?.start?.line ?? 0}`}>
        {children}
      </h1>
    ),

    h2: ({ children, node }) => (
      <h2 id={`${prefix}-h2-${node?.position?.start?.line ?? 0}`}>
        {children}
      </h2>
    ),

    h3: ({ children, node }) => (
      <h3 id={`${prefix}-h3-${node?.position?.start?.line ?? 0}`}>
        {children}
      </h3>
    ),
  };
}
