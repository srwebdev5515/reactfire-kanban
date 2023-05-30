import React, { useRef } from "react";
import { useDrag } from "react-dnd";

const Card = ({ id, children }) => {
  const ref = useRef(null);
  const [{ isDragging }, drag] = useDrag({
    type: "card",
    item: { type: "card", id },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });
  const opacity = isDragging ? 0 : 1;
  drag(ref);
  return (
    <div className="m-2 p-3 block cursor-pointer bg-white" ref={ref} style={{ opacity }}>
      {children}
    </div>
  );
};

export default Card;
