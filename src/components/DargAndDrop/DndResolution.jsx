// Card.js
import { Avatar, Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDrag, useDrop } from "react-dnd";
import AddIcon from "@mui/icons-material/Add";
import { useXarrow } from "react-xarrows";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const ItemType = "CARD";

export const DndResolution = ({
  id,
  index,
  label,
  moveThirdBoxCard,
  children,
  rightSideChildren,
}) => {
  const theme = useTheme();

  const isSidebarOpen = useSelector(
    (state) => state.sidebarReducer.isSidebarOpen
  );
  const updateXarrow = useXarrow();

  // useEffect to trigger updateXarrow when isSidebarOpen changes
  useEffect(() => {
    updateXarrow();
  }, [isSidebarOpen, updateXarrow]);

  const [, ref] = useDrag({
    type: ItemType,
    item: { id, index },
  });

  const [, drop] = useDrop({
    accept: ItemType,
    hover(item) {
      if (item.index !== index) {
        moveThirdBoxCard(item.index, index);
        item.index = index; // Update the item's index
      }
    },
  });

  // console.log("rightSideChildren", rightSideChildren);

  return (
    <>
      <Box
        ref={(node) => ref(drop(node))}
        sx={{
          cursor: "move",
        }}
      >
        <Box
          className="rounded-3xl py-4 flex flex-1 flex-col gap-y-[37px]"
          sx={{
            // bgcolor: theme.palette.primary.main,
            color: theme.palette.text.black,
          }}
        >
          <Box className="flex items-center justify-between ">
            <Box className="flex items-center gap-x-2">
              {/* Left connected box */}
              <Box
                className="w-4 h-4 rounded-full -ml-8 hidden xl:block "
                sx={{
                  bgcolor: theme.palette.primary.cardLightBg,
                }}
              >
                <div
                  id={children}
                  onDrag={updateXarrow}
                  onStop={updateXarrow}
                  className="w-[6px] h-[6px] ml-[2px] mt-[5px]"
                />
              </Box>
              <Box className=" flex items-center gap-x-2 px-6">
                <IconButton
                  sx={{
                    border: `1px solid ${theme.palette.primary.darkSemiWhite}`,
                    borderRadius: "100%",
                  }}
                >
                  <AddIcon sx={{ color: theme.palette.icon.iconColor }} />
                </IconButton>
                <Typography sx={{ color: theme.palette.text.black }}>
                  {label}
                </Typography>
              </Box>
            </Box>

            {/* Right connected box */}
            <Box
              className="w-4 h-4 rounded-full -mr-8 hidden xl:block"
              sx={{
                bgcolor: theme.palette.primary.cardLightBg,
              }}
            >
              <div
                id={rightSideChildren}
                className="w-[6px] h-[6px] mt-[5px] ml-[10px] bg-red-400 rounded-full hidden lg:block"
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};
