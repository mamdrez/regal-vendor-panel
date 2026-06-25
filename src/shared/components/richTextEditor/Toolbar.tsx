import { useEffect, useRef } from "react";
import styles from "./styles.module.css";
// components
import { Editor } from "@tiptap/react";
import Icons from "@/shared/icons";
// hooks
import { useVisible } from "@/shared/hook/useVisible";

interface ToolbarProps {
  editor: Editor | null;
}

interface Shortcut {
  key: string;
  description: string;
  example: string;
}

const Toolbar = ({ editor }: ToolbarProps) => {
  if (!editor) {
    return null;
  }

  const shortcutsRef = useRef<HTMLDivElement | null>(null);

  const { open, handleVisibleType, handleVisible } = useVisible({
    showShortcuts: false,
  });

  const insertMath = (latex: string) => {
    const currentAlignment =
      editor.getAttributes("paragraph").textAlign ||
      editor.getAttributes("heading").textAlign;

    editor.chain().focus().insertMath(latex).run();

    if (currentAlignment) {
      setTimeout(() => {
        editor.chain().focus().setTextAlign(currentAlignment).run();
      }, 10);
    }
  };

  const handleTextAlign = (align: "right" | "left" | "center") => {
    editor.chain().focus().setTextAlign(align).run();
  };

  // MathLive keyboard shortcuts
  const mathShortcuts: Shortcut[] = [
    {
      key: "/",
      description: "ایجاد کسر",
      example: "ابتدا 'a' سپس '/' و بعد 'b' را تایپ کنید ← a/b",
    },
    {
      key: "^ (Shift+6)",
      description: "ایجاد توان (بالانویس)",
      example: "ابتدا 'x' سپس '^' و بعد '2' را تایپ کنید ← x²",
    },
    {
      key: "_ (-+Shift)",
      description: "ایجاد زیرنویس",
      example: "ابتدا 'x' سپس '_' و بعد '1' را تایپ کنید ← x₁",
    },
    {
      key: "sqrt",
      description: "ریشه‌ی دوم",
      example: "عبارت 'sqrt' را تایپ کرده و فاصله بزنید ← √",
    },
    {
      key: "Tab",
      description: "رفتن به بخش بعدی",
      example: "جابجایی بین صورت و مخرج کسر",
    },
    {
      key: "Arrow → ←",
      description: "حرکت در داخل فرمول",
      example: "جابجا کردن مکان‌نما در بخش‌های مختلف",
    },
    {
      key: "( )",
      description: "گروه‌بندی عبارات",
      example: "(a+b)/c",
    },
    {
      key: "Ctrl+Z",
      description: "بازگردانی (Undo) در ناحیه فرمول",
      example: "بازگردانی آخرین عملیات ریاضی",
    },
    {
      key: "Esc",
      description: "خروج از ویرایش فرمول",
      example: "توقف ویرایش فرمول فعلی",
    },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        shortcutsRef.current &&
        !shortcutsRef.current.contains(event.target as Node)
      ) {
        handleVisibleType("showShortcuts", false);
      }
    };

    if (open["showShortcuts"]) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open["showShortcuts"]]);

  return (
    <div className={styles.toolbar}>
      <div className={styles.group}>
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? styles.active : ""}
          title="درست"
        >
          <strong>B</strong>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? styles.active : ""}
          title="کج"
        >
          <em>I</em>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={editor.isActive("underline") ? styles.active : ""}
          title="خط زیر"
        >
          <u>S</u>
        </button>
      </div>

      <div className={styles.separator}></div>

      <div className={styles.group}>
        <button
          onClick={() => handleTextAlign("right")}
          className={
            editor.isActive({ textAlign: "right" }) ? styles.active : ""
          }
        >
          <Icons
            cursor="pointer"
            name="Align-right"
            size={20}
            color="#767676ff"
          />
        </button>
        <button
          onClick={() => handleTextAlign("center")}
          className={
            editor.isActive({ textAlign: "center" }) ? styles.active : ""
          }
        >
          <Icons
            cursor="pointer"
            name="Align-center"
            size={20}
            color="#767676ff"
          />
        </button>
        <button
          onClick={() => handleTextAlign("left")}
          className={
            editor.isActive({ textAlign: "left" }) ? styles.active : ""
          }
        >
          <Icons
            cursor="pointer"
            name="Align-left"
            size={20}
            color="#767676ff"
          />
        </button>
      </div>

      <div className={styles.separator}></div>

      <div className={styles.group}>
        <button onClick={() => insertMath("")} title="نوشتن فرمول">
          <Icons name="formula" size={22} color="#4a4a4aff" />
        </button>
        <button onClick={() => insertMath("x^2")} title="توان">
          x²
        </button>
        <button onClick={() => insertMath("\\frac{a}{b}")} title="کسر">
          a/b
        </button>
        <button onClick={() => insertMath("\\sqrt{x}")} title="جذر">
          √x
        </button>
        <button
          onClick={() => insertMath("\\int_{a}^{b} f(x) dx")}
          title="انتگرال"
        >
          ∫
        </button>
        <button onClick={() => insertMath("\\sum_{i=1}^{n} x_i")} title="مجموع">
          Σ
        </button>
      </div>

      <div className={styles.separator}></div>

      <div className={styles.group}>
        <button
          onClick={() => handleVisible("showShortcuts")}
          className={open["showShortcuts"] ? styles.active : ""}
          title="کلید‌های میانبر"
        >
          <Icons name="keyboard" size={22} color="#1d1d1dff" cursor="pointer" />
        </button>
        {open["showShortcuts"] && (
          <div className={styles.shortcutsPanel} ref={shortcutsRef}>
            <div className={styles.shortcutsHeader}>
              <h4>کلید‌های میانبر فرمول‌ها</h4>
              <button
                onClick={() => handleVisibleType("showShortcuts", false)}
                className={styles.closeShortcuts}
              >
                <Icons
                  name="Close"
                  size={20}
                  color="#424242ff"
                  isFill
                  cursor="pointer"
                />
              </button>
            </div>
            <div className={styles.shortcutsList}>
              {mathShortcuts.map((shortcut, index) => (
                <div key={index} className={styles.shortcutItem}>
                  <div className={styles.shortcutKey}>
                    <kbd>{shortcut.key}</kbd>
                  </div>
                  <div className={styles.shortcutInfo}>
                    <div className={styles.shortcutDescription}>
                      {shortcut.description}
                    </div>
                    <div className={styles.shortcutExample}>
                      {shortcut.example}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.shortcutsFooter}>
              <p>
                <strong>نکته:</strong>
                <div>روی هر فرمول دوبار کلیک کنید تا ویرایش آن آغاز شود.</div>
              </p>
              <p>
                <strong>کسر تو در تو:</strong>
                <div>
                  داخل یک کسر دوباره "/" را تایپ کنید تا یک کسر تو در تو ایجاد
                  شود.
                </div>
              </p>
              <p>
                <strong>نوشتن فرمول:</strong>{" "}
                <div className={styles.formulaHint}>
                  از دکمه «<Icons name="Formula" size={22} color="#4e4d4dff" />»
                  استفاده کنید تا فرمول را وارد کنید.
                </div>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Toolbar;
