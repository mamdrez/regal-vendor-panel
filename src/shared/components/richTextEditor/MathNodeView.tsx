import { useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";
// components
import { NodeViewWrapper } from "@tiptap/react";
import type { NodeViewProps } from "@tiptap/react";
// types
import { MathNodeAttributes } from "./MathExtension";

interface MathNodeViewProps extends NodeViewProps {
  node: NodeViewProps["node"] & {
    attrs: MathNodeAttributes;
  };
}

const MathNodeView = ({
  node,
  updateAttributes,
  selected,
}: MathNodeViewProps) => {
  const mathFieldRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isEditing, setIsEditing] = useState(true);
  const [mathLive, setMathLive] = useState<any>(null);

  useEffect(() => {
    import("mathlive").then((ml) => {
      setMathLive(ml);
    });
  }, []);

  useEffect(() => {
    if (mathLive && containerRef.current && !mathFieldRef.current) {
      const mathField = new mathLive.MathfieldElement();
      mathField.value = node.attrs.latex || "";
      mathField.readOnly = true;

      mathField.keypressSound = null;
      mathField.plonkSound = null;
      mathField.soundURL = "";

      // Style the math field
      mathField.style.border = "none";
      mathField.style.outline = "none";
      mathField.style.fontSize = "16px";
      mathField.style.display = "inline-block";
      mathField.style.verticalAlign = "middle";

      mathField.style.background = "transparent";
      mathField.style.boxShadow = "none";

      mathField.addEventListener("input", () => {
        updateAttributes({ latex: mathField.value });
      });

      mathField.addEventListener("focus", () => {
        setIsEditing(true);
      });

      mathField.addEventListener("blur", () => {
        setIsEditing(false);
        mathField.readOnly = true;
      });

      const stopPropagationHandler = (e: Event) => {
        e.stopPropagation();
      };

      mathField.addEventListener("keydown", stopPropagationHandler);

      containerRef.current.appendChild(mathField);
      mathFieldRef.current = mathField;
    }
  }, [mathLive, node.attrs.latex, updateAttributes]);

  useEffect(() => {
    if (
      mathFieldRef.current &&
      mathFieldRef.current.value !== node.attrs.latex
    ) {
      mathFieldRef.current.value = node.attrs.latex || "";
    }
  }, [node.attrs.latex]);

  const handleDoubleClick = () => {
    if (mathFieldRef.current) {
      mathFieldRef.current.readOnly = false;
      mathFieldRef.current.focus();
      setIsEditing(true);
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <NodeViewWrapper
      className={`${styles.mathNode} ${selected ? styles.selected : ""} ${
        isEditing ? styles.editing : ""
      }`}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
    >
      <div ref={containerRef} className={styles.mathContainer} />
      {selected && !isEditing && (
        <div className={styles.tooltip}>برای ویرایش فرمول دوبار کلیک کنید</div>
      )}
    </NodeViewWrapper>
  );
};

export default MathNodeView;