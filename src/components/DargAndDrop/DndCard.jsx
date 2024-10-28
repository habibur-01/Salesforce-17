// Card.js
import { useDrag, useDrop } from "react-dnd";
import { Avatar, Box, IconButton, Typography, useTheme } from "@mui/material";

import DoneAllIcon from "@mui/icons-material/DoneAll";
import { useSelector } from "react-redux";
import DateTesting from "components/Dashboard-1/MainContent/Testing/DateTesting";

const ItemType = "CARD";

export const DndCard = ({
  id,
  index,
  moveCard,
  label,
  imgUrl,
  IssueIdentification,
  firstBox,
  children,
  rightSideChildren,
}) => {
  const theme = useTheme();
  const isSidebarOpen = useSelector(
    (state) => state.sidebarReducer.isSidebarOpen
  );
  const mode = useSelector((state) => state.themeSlice.themeMode);
  // console.log("label", label);
  // console.log("staus", IssueIdentification);
  // console.log("firstBox", firstBox);
  // console.log("child", children);
  // console.log("rightSideChildren", rightSideChildren);
  // console.log("ImgUrl:", imgUrl);

  const [, ref] = useDrag({
    type: ItemType,
    item: { id, index },
  });

  const [, drop] = useDrop({
    accept: ItemType,
    hover(item) {
      if (item.index !== index) {
        moveCard(item.index, index);
        item.index = index; // Update the item's index
      }
    },
  });

  return (
    <>
      {IssueIdentification && (
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
          {/* <Typography>{label}</Typography> */}
          <Box className="flex flex-col  ">
            <Box
              className="rounded-3xl flex-1"
              sx={{
                // bgcolor: "primary.main", old
                bgcolor: mode === "dark" ? "#25293C" : "white",
                color: "text.black",
              }}
            >
              {/* item 1 */}
              <Box className="  py-4  ">
                <Box
                  id={children}
                  className=" flex items-center justify-between px-6"
                >
                  {/* there will be the connected box  */}
                  <Box
                    className=" w-4 h-4 rounded-full -ml-8  hidden xl:block"
                    sx={{
                      bgcolor: theme.palette.primary.cardLightBg,
                    }}
                  ></Box>
                  {/* avatar and text  */}
                  <Box className=" flex w-[65%] px-3 items-center gap-x-2">
                    <Avatar
                      alt="Remy Sharp"
                      src={imgUrl}
                      sx={{ width: 50, height: 50 }}
                    />
                    <Typography
                      className=" line-clamp-2"
                      sx={{ color: theme.palette.text.black }}
                    >
                      {label}
                    </Typography>
                  </Box>
                  {/* icon section  */}
                  <Box className=" flex items-center gap-x-1">
                    <IconButton size="large">
                      <DoneAllIcon
                        sx={{
                          color: theme.palette.icon.iconColor,
                          fontSize: "18px",
                        }}
                      />
                    </IconButton>
                    <DateTesting />
                    {/* <IconButton
                      size="large"
                      sx={{
                        border: `1px solid ${theme.palette.primary.darkSemiWhite}`,
                        borderRadius: "100%",
                      }}
                    >
                      <CalendarTodayIcon
                        sx={{
                          color: theme.palette.icon.iconColor,
                          fontSize: "18px",
                        }}
                      />
                    </IconButton> */}
                  </Box>
                  {/* there will be the right side connected box  */}
                  <Box
                    className=" w-4 h-4  rounded-full -mr-8 hidden xl:block"
                    sx={{
                      bgcolor: theme.palette.primary.cardLightBg,
                    }}
                  >
                    <div
                      id={rightSideChildren}
                      className=" w-[6px] h-[6px] mt-[5px] ml-[8px] rounded-full "
                    />
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};
