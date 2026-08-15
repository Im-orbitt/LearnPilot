export function extractMarkdownHeadings(markdown = "") {
  return markdown
    .split("\n")
    .filter((line) => /^#{1,3}\s/.test(line))
    .map((line) => line.replace(/^#{1,3}\s/, "").trim());
}

export function createMarkdownComponents() {
  let headingIndex = 0;

  return {
    h1: ({ children }) => (
      <h1 id={`notes-heading-${headingIndex++}`}>{children}</h1>
    ),

    h2: ({ children }) => (
      <h2 id={`notes-heading-${headingIndex++}`}>{children}</h2>
    ),

    h3: ({ children }) => (
      <h3 id={`notes-heading-${headingIndex++}`}>{children}</h3>
    ),
  };
}
