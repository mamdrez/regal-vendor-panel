import React, { CSSProperties, useEffect, useState } from "react";
import { ReactSVG } from "react-svg";

interface IconProps {
  name: string;
  size?: number;
  color?: string;
  isFill?: boolean;
  isStroke?: boolean;
  strokeWidth?: string;
  onClick?: () => void;
  cursor?: CSSProperties["cursor"];
}

const Icons: React.FC<IconProps> = ({
  name,
  size = 24,
  color = "#000",
  isFill = true,
  isStroke = false,
  strokeWidth,
  onClick,
  cursor = "auto",
}) => {
  const [iconSrc, setIconSrc] = useState<string | null>(null);

  useEffect(() => {
    if (name?.startsWith("data:")) {
      setIconSrc(name);
    } else {
      import(`@/shared/icons/svgs/${name}.svg`)
        .then((module) => {
          setIconSrc(module.default);
        })
        .catch(() => {
          // console.error("Error loading SVG file:", error);
        });
    }
  }, [name]);

  if (!iconSrc) {
    return <span></span>;
  }

  return (
    <ReactSVG
      onClick={(e) => {
        if (onClick) {
          e.stopPropagation();
          onClick?.();
        }
      }}
      src={iconSrc}
      className="custom-icon"
      style={{ overflow: "hidden", cursor: cursor }}
      beforeInjection={(svg) => {
        if (color) svg.setAttribute("fill", isFill ? color : "none");
        svg.setAttribute("stroke", color);
        svg.setAttribute("width", `${size}px`);
        svg.setAttribute("height", `${size}px`);
        const paths = svg.querySelectorAll("path");
        paths.forEach((path) => {
          if (color)
            path.setAttribute("stroke", isStroke ? color : "none"),
              path.setAttribute("fill", isFill ? color : "none");
          path.setAttribute("stroke-width", strokeWidth ? strokeWidth : "0.8");
        });
      }}
    />
  );
};

export default Icons;
