import AddIcon from "@mui/icons-material/Add";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import update from "immutability-helper";
import { DndCard } from "components/DargAndDrop/DndCard";
import { DndTaskCard } from "components/DargAndDrop/DndTaskCard";
import Xarrow, { Xwrapper } from "react-xarrows";
import { DndResolution } from "components/DargAndDrop/DndResolution";
import { useSelector } from "react-redux";
import DndNewTaskCard from "components/DargAndDrop/DndNewTaskCard";
import DateTesting from "../../Testing/DateTesting";

// Constants for drag and drop
const ItemType = "ITEM";

const DraggableItem = ({ item, index, moveItem }) => {
  const [, ref] = useDrag({
    type: ItemType,
    item: { index },
  });

  return (
    <Box ref={ref} className="px-6 py-4 relative" style={{ cursor: "move" }}>
      <Box className="flex items-center justify-between">
        <Box
          className="w-5 h-5 rounded-full absolute -left-3 hidden lg:block"
          sx={{ bgcolor: "#E0E0E0" }}
        >
          <div className="w-3 h-3 rounded-full bg-[#83A2DB] m-1" />
        </Box>
        <Box className="flex w-[50%] items-center gap-x-2">
          <Avatar
            alt="Remy Sharp"
            src="https://i.ibb.co/YcXc5Cg/1.png"
            sx={{ width: 50, height: 50 }}
          />
          <Typography sx={{ color: "#000" }}>{item.label}</Typography>
        </Box>
        <Box className="flex items-center gap-x-2">
          <IconButton size="large">
            <DoneAllIcon sx={{ color: "#000", fontSize: "18px" }} />
          </IconButton>
          <IconButton
            size="large"
            sx={{ border: "1px solid #ccc", borderRadius: "100%" }}
          >
            <CalendarTodayIcon sx={{ color: "#000", fontSize: "18px" }} />
          </IconButton>
        </Box>
        <Box
          className="w-5 h-5 rounded-full absolute -right-3 hidden lg:block"
          sx={{ bgcolor: "#E0E0E0" }}
        >
          <div className="w-[6px] h-[6px] rounded-full bg-[#83A2DB] m-2" />
        </Box>
      </Box>
    </Box>
  );
};

const DroppableArea = ({ items, moveItem }) => {
  const [, ref] = useDrop({
    accept: ItemType,
    hover(item, monitor) {
      const draggedIndex = item.index;
      const hoverIndex = items.findIndex((i) => i.id === item.id); // Find the index of the hovered item

      if (draggedIndex === hoverIndex) {
        return; // Do nothing if the item is dropped on the same index
      }

      moveItem(draggedIndex, hoverIndex); // Move the item
      item.index = hoverIndex; // Update the dragged item's index
    },
  });

  return (
    <Box ref={ref}>
      {items.map((item, index) => (
        <DraggableItem
          key={item.id}
          item={item}
          index={index}
          moveItem={moveItem}
        />
      ))}
    </Box>
  );
};

const CaseCard = () => {
  // first box
  const [firstBox, setFirstBox] = useState([
    {
      id: 1,
      label: "Allocate case to user",
      CaseAllocation: true,
      task: "task-one",
    },
    {
      id: 2,
      label: "Acknowledge Case receipt to customer",
      CaseAllocation: true,
      task: "task-two",
    },
  ]);

  // second box
  const [cards, setCards] = useState([
    {
      id: 1,
      label: "Identify Issue Category",
      IssueIdentification: true,
      children: "child-one",
      rightSideChildren: "child-right-one",
      imgUrl: "https://i.ibb.co.com/GPrhFkv/2.png",
    },
    {
      id: 2,
      label: "Identify Issue Severity",
      IssueIdentification: true,
      children: "child-two",
      rightSideChildren: "child-right-two",
      imgUrl: "https://i.ibb.co.com/GPrhFkv/2.png",
    },
    {
      id: 3,
      label: "Identify Issue Impact",
      IssueIdentification: true,
      children: "child-three",
      rightSideChildren: "child-right-three",
      imgUrl: "https://i.ibb.co.com/GPrhFkv/2.png",
    },
    {
      id: 4,
      label: "Allocate to Resolution Team",
      IssueIdentification: true,
      children: "child-four",
      rightSideChildren: "child-right-four",
      imgUrl: "https://i.ibb.co.com/xfGjJyz/3.png",
    },
    {
      id: 5,
      label: "Advise Customer of Resolution Estimate",
      IssueIdentification: true,
      children: "child-five",
      rightSideChildren: "child-right-five",
      imgUrl: "https://i.ibb.co.com/nfFG5fL/4.png",
    },
  ]);

  // Third box
  const [thirdBox, setThirdBox] = useState([
    {
      id: 1,
      label: "Identify Issue Dependencies",
      TechnicalResolution: true,
      children: "resolution-1",
      rightSideChildren: "child-right-1",
    },
    {
      id: 2,
      label: "Identify Issue Resolution",
      TechnicalResolution: true,
      children: "resolution-2",
      rightSideChildren: "child-right-2",
    },
    {
      id: 3,
      label: "Estimate Resolution Time",
      TechnicalResolution: true,
      children: "resolution-3",
      rightSideChildren: "child-right-3",
    },
    {
      id: 4,
      label: "Advice Customer of Resolution Estimate",
      TechnicalResolution: true,
      children: "resolution-4",
      rightSideChildren: "child-right-4",
    },
    {
      id: 5,
      label: "Advice Customer Issue Resolved",
      TechnicalResolution: true,
      children: "resolution-5",
      rightSideChildren: "child-right-5",
    },
  ]);

  const isSidebarOpen = useSelector(
    (state) => state.sidebarReducer.isSidebarOpen
  );

  const mode = useSelector((state) => state.themeSlice.themeMode);

  const moveCard = useCallback((dragIndex, hoverIndex) => {
    setCards((prevCards) =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex]],
        ],
      })
    );
  }, []);

  // that is for first box
  const moveFirstBoxCard = useCallback((dragIndex, hoverIndex) => {
    setFirstBox((prevCards) =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex]],
        ],
      })
    );
  }, []);

  // that is for third box
  const moveThirdBoxCard = useCallback((dragIndex, hoverIndex) => {
    setThirdBox((prevCards) =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex]],
        ],
      })
    );
  });

  // that is for first box section
  const renderFirstCard = useCallback((card, index) => {
    return (
      <DndTaskCard
        key={card.id}
        CaseAllocation={card.CaseAllocation}
        index={index}
        id={card.id}
        label={card.label}
        task={card.task}
        moveFirstBoxCard={moveFirstBoxCard}
      />
    );
  });

  // that is for second box section
  const renderCard = useCallback((card, index) => {
    return (
      <DndCard
        key={card.id}
        IssueIdentification={card.IssueIdentification}
        index={index}
        id={card.id}
        label={card.label}
        imgUrl={card.imgUrl}
        children={card.children}
        rightSideChildren={card.rightSideChildren}
        moveCard={moveCard}
      />
    );
  }, []);

  // that is for third box section
  const renderThirdCard = useCallback((card, index) => {
    return (
      <DndResolution
        key={card.id}
        TechnicalResolution={card.TechnicalResolution}
        index={index}
        id={card.id}
        label={card.label}
        children={card.children}
        rightSideChildren={card.rightSideChildren}
        moveThirdBoxCard={moveThirdBoxCard}
      />
    );
  }, []);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery("(max-width:1220px)");

  console.log("check isSidebarIsOpen or not form CaseCard", isSidebarOpen);

  return (
    <Box className=" flex flex-col gap-y-4 ">
      {/* card content section */}
      <Box className=" flex items-center justify-center">
        <Box
          className="  rounded-[35px] overflow-hidden w-full " // there will be changed******
          sx={{ bgcolor: theme.palette.primary.cardLightBg }}
        >
          <Box
            className={`lg:flex w-full 
              ${isSidebarOpen ? "lg:flex-col xl:flex-row" : "lg:flex-row "}`}
          >
            <Box
              className={`flex-2  ${
                isSidebarOpen ? "lg:flex-2 xl:w-[40%]" : "lg:w-[40%] "
              }`}
              sx={{ bgcolor: mode === "dark" ? "#3C3F54" : "#E8F1FF" }}
            >
              <Box
                className=" h-full lg:rounded-tr-[20px] pl-6 md:pl-8  lg:px-10 py-6"
                sx={{
                  color: theme.palette.text.black,
                  bgcolor: theme.palette.primary.cardLightBg,
                }}
              >
                <Typography
                  sx={{ fontSize: "23px", fontWeight: "600", mt: "5px" }}
                >
                  New Case Management
                </Typography>
              </Box>
            </Box>

            {/* middle section  */}
            <Box
              className={`flex-[1.5] w-auto  lg:rounded-bl-[30px] lg:rounded-br-[30px] ml-3 md:ml-5 lg:ml-0  px-4`}
              sx={{
                bgcolor:
                  mode === "dark"
                    ? {
                        sm: "transparent",
                        md: `${isSidebarOpen ? "transparent" : "#3C3F54"}`,
                        lg: "#3C3F54",
                      }
                    : {
                        sm: "transparent",
                        md: `${isSidebarOpen ? "transparent" : "#E8F1FF"}`,
                        lg: "#E8F1FF",
                      },
              }}
            >
              <Box
                className={`flex items-center ${
                  isSidebarOpen
                    ? "lg:justify-start xl:justify-center lg:px-4 xl:px-0"
                    : "lg:justify-center"
                }`}
              >
                {/* middle tab section here  */}
                <Box className=" flex items-center gap-x-2 mb-2">
                  <Box className=" flex flex-col items-center">
                    <Avatar
                      alt="Remy Sharp"
                      src="https://i.ibb.co/YcXc5Cg/1.png"
                      sx={{ width: 50, height: 50 }}
                    />
                    <Box className=" p-[2px] bg-white rounded-full">
                      <Box
                        className=" rounded-full flex items-center justify-center"
                        sx={{
                          bgcolor: "#83A2DB",
                          width: "20px",
                          height: "20px",
                          color: theme.palette.text.white,
                          fontSize: "15px",
                        }}
                      >
                        2
                      </Box>
                    </Box>
                  </Box>
                  <Box className=" flex flex-col items-center">
                    <Avatar
                      alt="Remy Sharp"
                      src="https://i.ibb.co.com/GPrhFkv/2.png"
                      sx={{ width: 50, height: 50 }}
                    />
                    <Box className=" p-[2px] bg-white rounded-full">
                      <Box
                        className=" rounded-full flex items-center justify-center"
                        sx={{
                          bgcolor: "#83A2DB",
                          width: "20px",
                          height: "20px",
                          color: theme.palette.text.white,
                          fontSize: "15px",
                        }}
                      >
                        1
                      </Box>
                    </Box>
                  </Box>
                  <Box className=" flex flex-col items-center">
                    <Avatar
                      alt="Remy Sharp"
                      src="https://i.ibb.co.com/xfGjJyz/3.png"
                      sx={{ width: 50, height: 50 }}
                    />
                    <Box className=" p-[2px] bg-white rounded-full">
                      <Box
                        className=" rounded-full flex items-center justify-center"
                        sx={{
                          bgcolor: "#EA6863",
                          width: "20px",
                          height: "20px",
                          color: theme.palette.text.white,
                          fontSize: "15px",
                        }}
                      >
                        1
                      </Box>
                    </Box>
                  </Box>
                  <Box className=" flex flex-col items-center">
                    <Avatar
                      alt="Remy Sharp"
                      src="https://i.ibb.co.com/nfFG5fL/4.png"
                      sx={{ width: 50, height: 50 }}
                    />
                    <Box className=" p-[2px] bg-white rounded-full">
                      <Box
                        className=" rounded-full flex items-center justify-center"
                        sx={{
                          bgcolor: "#EA6863",
                          width: "20px",
                          height: "20px",
                          color: theme.palette.text.white,
                          fontSize: "15px",
                        }}
                      >
                        3
                      </Box>
                    </Box>
                  </Box>
                  <Box className=" flex flex-col items-center">
                    <Avatar
                      alt="Remy Sharp"
                      src="https://i.ibb.co.com/8KLgrT2/5.png"
                      sx={{ width: 50, height: 50 }}
                    />
                    <Box className=" p-[2px] bg-white rounded-full">
                      <Box
                        className=" rounded-full flex items-center justify-center"
                        sx={{
                          bgcolor: "#EEF1F7",
                          width: "20px",
                          height: "20px",
                          color: theme.palette.text.black,
                          fontSize: "15px",
                        }}
                      >
                        +
                      </Box>
                    </Box>
                  </Box>
                  <Box className=" flex flex-col items-center">
                    <Avatar
                      alt="Remy Sharp"
                      src="https://i.ibb.co.com/HNvMtzP/6.png"
                      sx={{ width: 50, height: 50 }}
                    />
                    <Box className=" p-[2px] bg-white rounded-full">
                      <Box
                        className=" rounded-full flex items-center justify-center"
                        sx={{
                          bgcolor: "#EA6863",
                          width: "20px",
                          height: "20px",
                          color: theme.palette.text.white,
                          fontSize: "15px",
                        }}
                      >
                        2
                      </Box>
                    </Box>
                  </Box>
                  <Box className=" flex flex-col items-center">
                    <Avatar
                      alt="Remy Sharp"
                      src="https://i.ibb.co.com/RjY0Tzt/7.png"
                      sx={{ width: 50, height: 50 }}
                    />
                    <Box className=" p-[2px] bg-white rounded-full">
                      <Box
                        className=" rounded-full flex items-center justify-center"
                        sx={{
                          bgcolor: "#EEF1F7",
                          width: "20px",
                          height: "20px",
                          color: theme.palette.text.black,
                          fontSize: "15px",
                        }}
                      >
                        +
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
            {/* right side  */}
            <Box
              className="flex-2  w-[40%]"
              sx={{ bgcolor: mode === "dark" ? "#3C3F54" : "#E8F1FF" }}
            >
              <Box
                className={`h-full ${
                  isSidebarOpen
                    ? "lg:rounded-tl-none xl:rounded-tl-[20px]"
                    : "lg:rounded-tl-[20px]"
                } `}
                sx={{ bgcolor: theme.palette.primary.cardLightBg }}
              >
                <Box
                  className={`flex items-center  pl-4 md:pl-6 lg:pl-0 lg:px-6 py-3 ${
                    isSidebarOpen
                      ? "lg:justify-start xl:justify-end lg:pl-7 xl:pl-0"
                      : "lg:justify-end"
                  }`}
                  sx={{ color: theme.palette.primary.semiWhite }}
                >
                  {/* right side icon section  */}
                  <Box className=" flex items-center gap-x-2">
                    {/* icon 1  */}
                    <IconButton
                      sx={{
                        border: `1px solid ${theme.palette.primary.darkSemiWhite}`,
                        borderRadius: "100%",
                      }}
                    >
                      <AddIcon sx={{ color: theme.palette.icon.iconColor }} />
                    </IconButton>
                    {/* icon 2  */}
                    <IconButton
                      sx={{
                        border: `1px solid ${theme.palette.primary.darkSemiWhite}`,
                        borderRadius: "100%",
                      }}
                    >
                      <DriveFolderUploadIcon
                        sx={{ color: theme.palette.icon.iconColor }}
                      />
                    </IconButton>
                    {/* icon 3  */}
                    <IconButton
                      sx={{
                        border: `1px solid ${theme.palette.primary.darkSemiWhite}`,
                        borderRadius: "100%",
                      }}
                    >
                      <CalendarTodayIcon
                        sx={{ color: theme.palette.icon.iconColor }}
                      />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
          {/* card content section  */}
          <Box>
            <Xwrapper>
              <Box className="px-[30px] mb-5 w-[100%]">
                {/* card content section */}
                <Box className="grid grid-cols-1 xl:grid-cols-4 gap-x-14 gap-y-4 mt-4">
                  {/* box 1 */}
                  <Box className="flex flex-col">
                    <Typography
                      className="xl:hidden pb-2"
                      sx={{ fontWeight: "600" }}
                    >
                      Case Allocation
                    </Typography>
                    <Box
                      className="rounded-3xl flex-1"
                      sx={{
                        // bgcolor: "primary.main",
                        bgcolor: mode === "dark" ? "#25293C" : "white",
                        color: "primary.semiWhite",
                      }}
                    >
                      <DndProvider backend={HTML5Backend}>
                        <div>
                          {firstBox.map((card, i) =>
                            isSidebarOpen
                              ? renderFirstCard(card, i)
                              : renderFirstCard(card, i)
                          )}
                        </div>
                      </DndProvider>
                    </Box>
                  </Box>

                  {/* box 2 */}
                  <Box className="flex flex-col">
                    <Typography
                      className="xl:hidden pb-2"
                      sx={{ fontWeight: "600" }}
                    >
                      Issue Identification
                    </Typography>
                    <Box
                      className="rounded-3xl flex-1"
                      sx={{
                        // bgcolor: "primary.main", old
                        bgcolor: mode === "dark" ? "#25293C" : "white",
                        color: "text.black",
                      }}
                    >
                      <DndProvider backend={HTML5Backend}>
                        <div>
                          {cards.map((card, i) =>
                            isSidebarOpen
                              ? renderCard(card, i)
                              : renderCard(card, i)
                          )}
                        </div>
                      </DndProvider>
                    </Box>
                  </Box>

                  {/* box 3 */}
                  <Box className="flex flex-col">
                    <Typography
                      className="xl:hidden pb-2"
                      sx={{ fontWeight: "600" }}
                    >
                      Technical Resolution
                    </Typography>
                    <Box
                      className="rounded-3xl px-3 md:px-6 py-4 flex-1 flex-col gap-y-[37px]"
                      sx={{
                        bgcolor: mode === "dark" ? "#25293C" : "white",
                        color: "text.black",
                      }}
                    >
                      <DndProvider backend={HTML5Backend}>
                        <div>
                          {thirdBox.map((card, i) => renderThirdCard(card, i))}
                        </div>
                      </DndProvider>
                    </Box>
                  </Box>

                  {/* box 4 */}
                  <Box className="flex flex-col">
                    <Typography
                      className="xl:hidden pb-2"
                      sx={{ fontWeight: "600" }}
                    >
                      New Task
                    </Typography>
                    <Box className="rounded-3xl w-full h-full">
                      {/* Ensure DndNewTaskCard has access to DnD context */}
                      <DndProvider backend={HTML5Backend}>
                        <DndNewTaskCard />
                      </DndProvider>
                    </Box>
                  </Box>
                </Box>

                {/* card bottom content section */}
                <Box className="hidden xl:grid grid-cols-4 gap-4 mt-10">
                  <Box className="flex items-center justify-center">
                    <Typography sx={{ fontWeight: "600" }}>
                      Case Allocation
                    </Typography>
                  </Box>
                  <Box className="flex items-center justify-center">
                    <Typography sx={{ fontWeight: "600" }}>
                      Issue Identification
                    </Typography>
                  </Box>
                  <Box className="flex items-center justify-center">
                    <Typography sx={{ fontWeight: "600" }}>
                      Technical Resolution
                    </Typography>
                  </Box>
                  <Box className="flex items-center justify-center">
                    <Typography sx={{ fontWeight: "600" }}>New Task</Typography>
                  </Box>
                </Box>
              </Box>

              {/* connection will be here  */}

              {/* case allocation connection with issue identification start here  */}
              {!isSmallScreen && (
                <Xarrow
                  start={"task-one"}
                  end={"child-one"}
                  curveness={0.6}
                  color="#83A2DB"
                  strokeWidth={1}
                  headSize={6}
                  startAnchor="right"
                  endAnchor="left"
                  headShape={"circle"}
                  tailShape={"circle"}
                  showTail={true}
                />
              )}
              {!isSmallScreen && (
                <Xarrow
                  start={"task-one"}
                  end={"child-two"}
                  curveness={0.6}
                  color="#83A2DB"
                  strokeWidth={1}
                  headSize={6}
                  startAnchor="right"
                  endAnchor="left"
                  headShape={"circle"}
                  tailShape={"circle"}
                  showTail={true}
                />
              )}
              {!isSmallScreen && (
                <Xarrow
                  start={"task-one"}
                  end={"child-three"}
                  curveness={0.6}
                  color="#83A2DB"
                  strokeWidth={1}
                  headSize={6}
                  startAnchor="right"
                  endAnchor="left"
                  headShape={"circle"}
                  tailShape={"circle"}
                  showTail={true}
                />
              )}
              {!isSmallScreen && (
                <Xarrow
                  start={"task-two"}
                  end={"child-three"}
                  curveness={0.6}
                  color="#83A2DB"
                  strokeWidth={1}
                  headSize={6}
                  startAnchor="right"
                  endAnchor="left"
                  headShape={"circle"}
                  tailShape={"circle"}
                  showTail={true}
                />
              )}
              {!isSmallScreen && (
                <Xarrow
                  start={"task-two"}
                  end={"child-four"}
                  curveness={0.6}
                  color="#EA6863"
                  strokeWidth={1}
                  headSize={6}
                  startAnchor="right"
                  endAnchor="left"
                  headShape={"circle"}
                  tailShape={"circle"}
                  showTail={true}
                />
              )}
              {!isSmallScreen && (
                <Xarrow
                  start={"task-two"}
                  end={"child-five"}
                  curveness={0.6}
                  color="#EA6863"
                  strokeWidth={1}
                  headSize={6}
                  startAnchor="right"
                  endAnchor="left"
                  headShape={"circle"}
                  tailShape={"circle"}
                  showTail={true}
                />
              )}
              {/* case allocation connection with issue identification end here  */}

              {/* issue identification  connection with Technical Resolution start here  */}
              {!isSmallScreen && (
                <Xarrow
                  start={"child-right-one"}
                  end={"resolution-3"}
                  curveness={0.6}
                  color="#83A2DB"
                  strokeWidth={1}
                  headSize={6}
                  startAnchor="left"
                  endAnchor="right"
                  headShape={"circle"}
                  tailShape={"circle"}
                  showTail={true}
                />
              )}
              {!isSmallScreen && (
                <Xarrow
                  start={"child-right-two"}
                  end={"resolution-1"}
                  curveness={0.6}
                  color="#83A2DB"
                  strokeWidth={1}
                  headSize={6}
                  startAnchor="left"
                  endAnchor="right"
                  headShape={"circle"}
                  tailShape={"circle"}
                  showTail={true}
                />
              )}
              {!isSmallScreen && (
                <Xarrow
                  start={"child-right-three"}
                  end={"resolution-2"}
                  curveness={0.6}
                  color="#83A2DB"
                  strokeWidth={1}
                  headSize={6}
                  startAnchor="left"
                  endAnchor="right"
                  headShape={"circle"}
                  tailShape={"circle"}
                  showTail={true}
                />
              )}
              {!isSmallScreen && (
                <Xarrow
                  start={"child-right-four"}
                  end={"resolution-3"}
                  curveness={0.6}
                  color="#EA6863"
                  strokeWidth={1}
                  headSize={6}
                  startAnchor="left"
                  endAnchor="right"
                  dashness={true}
                  headShape={"circle"}
                  tailShape={"circle"}
                  showTail={true}
                />
              )}
              {!isSmallScreen && (
                <Xarrow
                  start={"child-right-five"}
                  end={"resolution-4"}
                  curveness={0.6}
                  color="#EA6863"
                  strokeWidth={1}
                  headSize={6}
                  startAnchor="left"
                  endAnchor="right"
                  dashness={true}
                  headShape={"circle"}
                  tailShape={"circle"}
                  showTail={true}
                />
              )}
              {!isSmallScreen && (
                <Xarrow
                  start={"child-right-five"}
                  end={"resolution-5"}
                  curveness={0.6}
                  color="#EA6863"
                  strokeWidth={1}
                  headSize={6}
                  startAnchor="left"
                  endAnchor="right"
                  dashness={true}
                  headShape={"circle"}
                  tailShape={"circle"}
                  showTail={true}
                />
              )}
              {/* case allocation connection with issue identification end here  */}

              {/* Issue Identification connection with technical resolution  */}

              {/* technical resolution connection with New task start here  */}
              {!isSmallScreen && (
                <Xarrow
                  start={"child-right-3"}
                  end={"new-task-1"}
                  startAnchor={"right"}
                  endAnchor={"left"}
                  curveness={0.6}
                  color="#83A2DB"
                  strokeWidth={2}
                  lineColor={mode === "dark" ? "#25293C" : "#303030"}
                  headColor={mode === "dark" ? "#25293C" : "#303030"}
                  headSize={12}
                />
              )}
            </Xwrapper>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CaseCard;
