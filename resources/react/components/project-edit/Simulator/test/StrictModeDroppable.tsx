import { useEffect, useState } from "react";
import { Droppable, DroppableProps } from "react-beautiful-dnd";
export const StrictModeDroppable = ({direction, children, ...props }: DroppableProps&{direction:string}) => {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));
    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);
  if (!enabled) {
    return null;
  }
  return <Droppable direction={direction} {...props}>{children}</Droppable>;
};