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
    return `
    <div class="flex items-center justify-between bg-neutral-900 rounded-t-lg pl-2 pb-1 border-b-4 border-neutral-800">
      <p class="text-white font-semibold">${lang}</p>
      <svg width="18px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"class="cursor-pointer mr-2 mt-1">
      <path d="M3 16V4C3 2.89543 3.89543 2 5 2H15M9 22H18C19.1046 22 20 21.1046 20 20V8C20 6.89543 19.1046 6 18 6H9C7.89543 6 7 6.89543 7 8V20C7 21.1046 7.89543 22 9 22Z" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
    <pre class="bg-neutral-900 rounded-b-lg p-3"><code class="pt-1">${highlighted}</code></pre>`;
  };

  marked.setOptions({
    renderer,
    gfm: true,
    breaks: true,
  });

  return marked(text);
}
