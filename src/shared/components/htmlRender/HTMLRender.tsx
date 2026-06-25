import { useEffect, useRef } from "react";
import { MathJaxContext } from "better-react-mathjax";
import styles from "./style.module.css";

declare global {
  interface Window {
    MathJax: {
      typesetPromise?: (elements?: HTMLElement[]) => Promise<void>;
    };
  }
}

// Matches any Persian/Arabic character.
const ARABIC_RE = /[؀-ۿݐ-ݿﭐ-﷿ﹰ-﻿]/;

const HTMLRender = ({
  HTMLcontent,
  className,
}: {
  HTMLcontent: string;
  className?: string;
}) => {
  const mathRef = useRef<HTMLDivElement>(null);

  const config = {
    loader: { load: ["input/mml", "output/chtml"] },
    options: {
      skipHtmlTags: ["script", "noscript", "style", "textarea", "pre"],
    },
  };

  // Convert a MathML node to plain HTML. MathJax renders non-Latin text
  // (Persian/Arabic) one character per element, which breaks the contextual
  // letter-joining the script requires. By emitting each token's text as a
  // single text node the browser can shape and join the letters correctly.
  const mathmlToHtml = (node: Element): HTMLElement => {
    const tag = node.tagName.toLowerCase();
    const children = Array.from(node.children);

    if (tag === "mfrac" && children.length === 2) {
      const frac = document.createElement("span");
      frac.className = styles.mfrac;

      const num = document.createElement("span");
      num.className = styles.mfracNum;
      num.appendChild(mathmlToHtml(children[0]));

      const den = document.createElement("span");
      den.className = styles.mfracDen;
      den.appendChild(mathmlToHtml(children[1]));

      frac.append(num, den);
      return frac;
    }

    if (tag === "msup" && children.length === 2) {
      const span = document.createElement("span");
      span.appendChild(mathmlToHtml(children[0]));
      const sup = document.createElement("sup");
      sup.appendChild(mathmlToHtml(children[1]));
      span.appendChild(sup);
      return span;
    }

    if (tag === "msub" && children.length === 2) {
      const span = document.createElement("span");
      span.appendChild(mathmlToHtml(children[0]));
      const sub = document.createElement("sub");
      sub.appendChild(mathmlToHtml(children[1]));
      span.appendChild(sub);
      return span;
    }

    if (tag === "msqrt") {
      const span = document.createElement("span");
      const radical = document.createElement("span");
      radical.textContent = "√";
      const inner = document.createElement("span");
      inner.className = styles.msqrtInner;
      children.forEach((c) => inner.appendChild(mathmlToHtml(c)));
      span.append(radical, inner);
      return span;
    }

    // Container elements (math, mrow, mstyle, ...) — recurse into children.
    if (children.length > 0) {
      const span = document.createElement("span");
      children.forEach((c) => span.appendChild(mathmlToHtml(c)));
      return span;
    }

    // Token elements (mi, mn, mo, mtext, ...) — keep text as one node.
    const span = document.createElement("span");
    span.textContent = node.textContent || "";
    return span;
  };

  const cleanInvalidMathTags = (html: string): string => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    const mathElements = doc.querySelectorAll("math");

    mathElements.forEach((mathEl) => {
      // Persian/Arabic text inside MathML cannot be rendered correctly by
      // MathJax (letters get split apart), so render it as plain HTML instead.
      if (ARABIC_RE.test(mathEl.textContent || "")) {
        const replacement = mathmlToHtml(mathEl);
        replacement.classList.add(styles.mathInline);
        mathEl.replaceWith(replacement);
        return;
      }

      const tagList = Array.from(mathEl.children).map((el) =>
        el.tagName.toLowerCase()
      );

      const isTextOnlyMath =
        tagList.every((tag) => ["mi", "mo", "mn", "mspace"].includes(tag)) &&
        !mathEl.querySelector(
          "msup, mfrac, msqrt, mrow, msub, munderover, mroot"
        );

      if (isTextOnlyMath) {
        const plainText = mathEl.textContent?.replace(/\s+/g, " ").trim() || "";
        const textNode = document.createTextNode(plainText);
        mathEl.replaceWith(textNode);
      }
    });

    return doc.body.innerHTML;
  };

  const cleanedContent = cleanInvalidMathTags(HTMLcontent);

  useEffect(() => {
    if (window.MathJax?.typesetPromise && mathRef.current) {
      window.MathJax.typesetPromise([mathRef.current]);
    }
  }, [cleanedContent]);

  return (
    <MathJaxContext version={3} config={config}>
      <div
        dir="auto"
        ref={mathRef}
        className={className || styles.question}
        dangerouslySetInnerHTML={{ __html: cleanedContent }}
      />
    </MathJaxContext>
  );
};

export default HTMLRender;
