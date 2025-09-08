import { marked } from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/panda-syntax-dark.css";

export function formatMessage(text: string) {
  const renderer = new marked.Renderer();
  renderer.code = ({
    text,
    lang,
  }: {
    text: string;
    lang?: string;
    escaped?: boolean;
  }): string => {
    const language: string =
      lang && hljs.getLanguage(lang) ? lang : "plaintext";
    const highlighted: string = hljs.highlight(text, { language }).value;
    return `<pre><code class="hljs ${language}">${highlighted}</code></pre>`;
  };

  marked.setOptions({
    renderer,
    gfm: true,
    breaks: true,
  });

  return marked(text);
}
