import styles from "./styles.module.css";
import { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Image from "@tiptap/extension-image";
// components
import { MathExtension } from "./MathExtension";
import Toolbar from "./Toolbar";
// hooks
import { useDebounce } from "@/shared/hook/useDebounce";

interface RichTextEditorProps {
  content?: string;
  onChange?: (content: string) => void;
  placeholder?: string;
  editable?: boolean;
  className?: string;
  minHeight?: number;
  showToolbar?: boolean;
}

const RichTextEditor = ({
  content = "",
  onChange,
  placeholder = "Start writing...",
  editable = true,
  className,
  minHeight = 400,
  showToolbar = true,
}: RichTextEditorProps) => {
  const debouncedOnChange = useDebounce((html: string) => {
    onChange?.(html);
  }, 500);

  const editor = useEditor({
    extensions: [
      StarterKit,
      MathExtension,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Image.configure({
        inline: true,
      }),
    ],
    content: content,
    editable,
    editorProps: {
      attributes: {
        class: `${styles.editor} ${className || ""}`,
        style: `min-height: ${minHeight}rem;`,
        placeholder,
      },
      handleKeyDown: (_, event) => {
        event.stopPropagation();
        return false;
      },
    },
    onUpdate: ({ editor }) => {
      if (onChange) {
        debouncedOnChange(editor.getHTML());
      }
    },
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  return (
    <div
      className={`${styles.container} `}
      style={{ minHeight: `${minHeight}px` }}
    >
      {editable && showToolbar && <Toolbar editor={editor} />}
      <EditorContent editor={editor} />
    </div>
  );
};

export default RichTextEditor;
