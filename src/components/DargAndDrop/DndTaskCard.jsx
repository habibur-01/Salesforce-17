// Card.js
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import { useDrag, useDrop } from "react-dnd";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import { useXarrow } from "react-xarrows";
import DateTesting from "components/Dashboard-1/MainContent/Testing/DateTesting";

const ItemType = "CARD";

export const DndTaskCard = ({
  id,
  index,
  label,
  CaseAllocation,
  moveFirstBoxCard,
  task,
}) => {
  const theme = useTheme();
  const updateXarrow = useXarrow();
  // console.log("label", label);
  // console.log("staus", CaseAllocation);
  // console.log("task", task);

  const [, ref] = useDrag({
    type: ItemType,
    item: { id, index },
  });

  const [, drop] = useDrop({
    accept: ItemType,
    hover(item) {
      if (item.index !== index) {
        moveFirstBoxCard(item.index, index);
        item.index = index; // Update the item's index
      }
    },
  });

  return (
    <>
      <Box
        ref={(node) => ref(drop(node))}
        sx={{
          // border: '1px solid #ccc',
          // padding: 2,
          // margin: 1,
          // backgroundColor: '#fff',
          cursor: "move",
          // boxShadow: '2px 2px 8px rgba(0,0,0,0.1)',
        }}
      >
        <Box
          onDrag={updateXarrow}
          onStop={updateXarrow}
          className=" flex flex-col gap-y-11  py-4 mb-10"
        >
          <Box className=" flex items-center justify-between px-6">
            {/* avatar  */}
            <Box>
              <Avatar
                alt="Remy Sharp"
                src="https://i.ibb.co/YcXc5Cg/1.png"
                sx={{ width: 50, height: 50 }}
              />
            </Box>
            {/* icon section  */}
            <Box className=" flex items-center gap-x-2">
              <IconButton size="large">
                <DoneAllIcon
                  sx={{
                    color: theme.palette.icon.iconColor,
                    fontSize: "18px",
                  }}
                />
              </IconButton>
              {/* date and time  */}
              <DateTesting />
            </Box>
          </Box>
          {/* text and connection box  */}

          {/* connection div or box   */}
          <Box id={task}>
            <Box className=" flex items-center justify-between px-6">
              <Typography
                className=" line-clamp-2 "
                sx={{ color: theme.palette.text.black }}
              >
                {label}
              </Typography>
              <Box
                className={` w-4 h-4 rounded-full   hidden xl:block -mr-8`}
                sx={{ bgcolor: theme.palette.primary.cardLightBg }}
              ></Box>
            </Box>
          </Box>
        </Box>

        {/* divider  */}
        <Divider variant="middle" />
      </Box>
    </>
  );
};
