import React, { useRef } from "react";
import { useDrop } from "react-dnd";

const Column = ({ status, changeTaskStatus, children }) => {
  const ref = useRef(null);
  const [, drop] = useDrop({
    accept: "card",
    drop(item) {
      changeTaskStatus(item.id, status);
    }
  });
  drop(ref);
  return <div className="min-w-[200px] min-h-[90vh] mx-auto w-1/5 bg-column rounded-lg" ref={ref}> {children}</div>;
};

export default Column;
