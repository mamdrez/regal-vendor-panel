import { Node, mergeAttributes } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import MathNodeView from "./MathNodeView";

// Define the attributes interface for type safety
export interface MathNodeAttributes {
  latex: string;
}

// Extend the global Commands interface to include our custom command
declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    mathNode: {
      insertMath: (latex: string) => ReturnType;
    };
  }
}

export const MathExtension = Node.create<{}, MathNodeAttributes>({
  name: "mathNode",

  group: "inline",

  inline: true,

  atom: true,

  addAttributes() {
    return {
      latex: {
        default: "",
        parseHTML: (element) => element.getAttribute("data-latex"),
        renderHTML: (attributes) => {
          if (!attributes.latex) {
            return {};
          }
          return {
            "data-latex": attributes.latex,
          };
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "math-node",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["math-node", mergeAttributes(HTMLAttributes)];
  },

  addNodeView() {
    return ReactNodeViewRenderer(MathNodeView as any);
  },

  addCommands() {
    return {
      insertMath:
        (latex: string) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: { latex },
          });
        },
    };
  },
});
