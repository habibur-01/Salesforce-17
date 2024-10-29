import React, { useState } from "react";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Box, Typography, useTheme } from "@mui/material";
import { useSelector } from "react-redux";

const ItemType = "BOX";

const DraggableBox = ({ box, index, moveBox, mode }) => {
  const [, ref] = useDrag({
    type: ItemType,
    item: { index },
  });

  const [, drop] = useDrop({
    accept: ItemType,
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveBox(draggedItem.index, index);
        draggedItem.index = index; // Update the dragged item index
      }
    },
  });

  return (
    <Box
      id={box.child}
      ref={(node) => ref(drop(node))}
      sx={{
        backgroundColor:
          box.id === "1"
            ? "#25293C"
            : mode === "dark"
            ? { xs: "#454c6b", sm: "rgb(83 90 102)" }
            : { xs: "#e2e2e2", sm: "#fff" },
      }}
      style={{
        color: box.id === "1" ? "#fff" : mode === "dark" ? "#fff" : "#000",
        borderRadius: "24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "12px",
        cursor: "move",
      }}
    >
      <Typography
        sx={{
          display: "flex",
          justifyContent: "center",
          wordBreak: "break-word",
        }}
      >
        {box.content}
      </Typography>
    </Box>
  );
};

const DndNewTaskCard = () => {
  const theme = useTheme();
  const mode = useSelector((state) => state.themeSlice.themeMode);
  const [boxList, setBoxList] = useState([
    { id: "1", child: "new-task-1", content: "Request Processing" },
    { id: "2", child: "new-task-2", content: "Problem Resolution" },
    { id: "3", child: "new-task-3", content: "Customer Communication" },
    { id: "4", child: "new-task-4", content: "Testing and Verification" },
    { id: "5", child: "new-task-5", content: "Customer Notification" },
    { id: "6", child: "new-task-6", content: "Customer Satisfaction" },
  ]);

  const moveBox = (fromIndex, toIndex) => {
    const updatedList = [...boxList];
    const [movedBox] = updatedList.splice(fromIndex, 1);
    updatedList.splice(toIndex, 0, movedBox);
    setBoxList(updatedList);
  };

  return (
    <Box
      className="rounded-3xl h-full px-6 py-4 w-full grid grid-cols-1 md:grid-cols-2  gap-3 "
      sx={{
        border: `1px solid ${theme.palette.primary.main}`,
        color: theme.palette.text.black,
      }}
    >
      {boxList.map((box, index) => (
        <DraggableBox
          key={box.id}
          index={index}
          box={box}
          moveBox={moveBox}
          mode={mode}
        />
      ))}
    </Box>
  );
};

export default DndNewTaskCard;
