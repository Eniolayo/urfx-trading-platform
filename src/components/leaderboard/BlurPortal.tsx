import React from "react";
import ReactDOM from "react-dom";

interface BlurPortalProps {
  rect: DOMRect | null;
  show: boolean | undefined;
}

const BlurPortal: React.FC<BlurPortalProps> = ({ rect, show }) => {
  if (!rect || !show) return null;

  const style: React.CSSProperties = {
    position: "absolute",
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY,
    width: rect.width,
    height: rect.height,
    pointerEvents: "none",
    zIndex: 9999,
  };

  return ReactDOM.createPortal(
    <div style={style}>
      <div className="w-full h-full bg-gradient-to-r from-[#1CCDE6] via-[#9ED473] to-[#DBD633] blur-3xl opacity-50"></div>
    </div>,
    document.body
  );
};

export default BlurPortal;