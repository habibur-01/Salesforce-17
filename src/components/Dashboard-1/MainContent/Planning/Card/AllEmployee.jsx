import {
  Avatar,
  Box,
  Grid,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import StorageIcon from "@mui/icons-material/Storage";
import DonutChartWithIcon from "../Chart/DonutCahrtWithIcon";
import EmployeeDetailsCard from "./EmployeeDetailsCard";
import SouthEastIcon from "@mui/icons-material/SouthEast";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import axios from "axios";
// import RadialBarChart from "../Chart/RadialBarChart";

const AllEmployee = () => {
  const theme = useTheme();
  const [data, setData] = useState([]);
  const [employeeInfo, setEmployeeInfo] = useState([]);
  const [employeeId, setEmployeeId] = useState([]);

  useEffect(() => {
    axios("/data.json")
      .then((res) => {
        setData(res?.data);
        if (res?.data.length > 0) {
          setEmployeeId(res.data[2]?.id);
          setEmployeeInfo(res.data[2]);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleEmployeeData = (info) => {
    setEmployeeId(info?.id);
    setEmployeeInfo(info);
  };
  return (
    <Box className="mt-8">
      <Grid container spacing={2} className="pl-4">
        <Grid
          item
          xs={3.5}
          sx={{
            bgcolor: theme.palette.background.main,
            // height: "calc(100vh - 200px )",
            borderRadius: "32px",

            "&.MuiGrid-item": {
              paddingLeft: "0px",
              paddingTop: "0px",
            },
            // overflow: "hidden",
            // overflowY: "auto",
          }}
        >
          <Box className="px-4 py-4">
            {/* Top section */}
            <Box className="flex justify-between items-center px-3">
              <Typography>Employee Personnel</Typography>
              <Box className="flex gap-x-2">
                <IconButton
                  size="large"
                  sx={{
                    // border: `1px solid ${theme.palette.primary.semiWhite}`,
                    bgcolor: theme.palette.icon.lightIconBg,
                    borderRadius: "100%",
                  }}
                >
                  <FilterAltIcon />
                </IconButton>
                <IconButton
                  size="large"
                  sx={{
                    // border: `1px solid ${theme.palette.primary.semiWhite}`,
                    bgcolor: theme.palette.icon.lightIconBg,
                    borderRadius: "100%",
                  }}
                >
                  <SearchIcon />
                </IconButton>
                <IconButton
                  size="large"
                  sx={{
                    // border: `1px solid ${theme.palette.primary.semiWhite}`,
                    bgcolor: theme.palette.icon.lightIconBg,
                    borderRadius: "100%",
                  }}
                >
                  <StorageIcon />
                </IconButton>
              </Box>
            </Box>

            {/* Employee list section */}
            <Box
              className="py-4 flex flex-col gap-2 "
              //   sx={{ overflowY: "scroll", height: "calc(100%-72px)" }}
            >
              {data.map((info) => (
                <Box key={info?.id} onClick={() => handleEmployeeData(info)}>
                  {info?.id === employeeId ? (
                    <Box
                      className="px-3 py-4 flex justify-between rounded-l-[36px]"
                      sx={{
                        bgcolor: theme.palette.background.cardBg,
                        position: "relative",
                        "&::before": {
                          content: '"eat burger"',
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          backgroundColor: "rgba(0, 0, 0, 0.1)",
                          // other styles for ::before
                        },
                        "&::after": {
                          content: '"After Text"', // Example with text
                          position: "absolute",
                          bottom: 0,
                          right: 0,
                          color: "red",
                        
                          // other styles for ::after
                        },
                      }}
                    >
                      <IconButton
                        size="large"
                        sx={{ bgcolor: theme.palette.primary.main }}
                      >
                        <KeyboardArrowLeftIcon />
                      </IconButton>
                      <IconButton
                        size="large"
                        sx={{ bgcolor: theme.palette.primary.main }}
                      >
                        <NotificationsIcon />
                      </IconButton>
                      <IconButton
                        size="large"
                        sx={{ bgcolor: theme.palette.primary.main }}
                      >
                        <EditCalendarIcon />
                      </IconButton>
                      <IconButton
                        size="large"
                        sx={{ bgcolor: theme.palette.primary.main }}
                      >
                        <SearchIcon />
                      </IconButton>
                      <IconButton
                        size="large"
                        sx={{ bgcolor: theme.palette.primary.main }}
                      >
                        <FilterAltIcon />
                      </IconButton>
                      <IconButton
                        size="large"
                        sx={{ bgcolor: theme.palette.primary.main }}
                      >
                        <SouthEastIcon />
                      </IconButton>
                    </Box>
                  ) : (
                    <Box
                      className="w-full rounded-[35px] px-[6px] py-[6px] flex items-center justify-between cursor-pointer"
                      sx={{
                        bgcolor: "#25293C",
                      }}
                    >
                      {/* avatar and invoice details */}
                      <Box className="flex items-center gap-x-2">
                        <Avatar
                          alt="Remy Sharp"
                          src={info?.imgUrl}
                          sx={{
                            width: 50,
                            height: 50,
                          }}
                        />
                        {/* Employee name and designition */}
                        <Box>
                          <Typography
                            sx={{
                              fontWeight: "600",
                              fontSize: { xs: "14px", md: "16px" },
                              color: theme.palette.primary.semiWhite,
                            }}
                          >
                            {info?.employeeName}{" "}
                            {/* Display dynamic employee name */}
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: "13px",
                              color: theme.palette.text.white,
                            }}
                          >
                            {info?.designition}
                          </Typography>
                        </Box>
                      </Box>

                      {/* dot section */}
                      <Box
                        className="py-1 px-2 flex gap-x-2"
                        //   sx={{
                        //     background: `repeating-linear-gradient(-55deg, #373737, #373737 7px, #4f4d4d 7px, #4f4d4d 9px)`,
                        //     border: `1px solid ${theme.palette.primary.semiWhite}`,
                        //     borderRadius: "20px",
                        //   }}
                      >
                        <Box className="grid grid-cols-1 text-center">
                          <Typography>1</Typography>
                          <Box
                            className="w-6 h-6 rounded-full flex justify-center items-center "
                            sx={{
                              border: "3px solid",
                              borderColor: theme.palette.primary.cardBg2,
                            }}
                          >
                            <Box
                              className="w-2 h-2 rounded-full"
                              sx={{ bgcolor: "#4CAF50" }}
                            ></Box>
                          </Box>
                        </Box>
                        <Box className="grid grid-cols-1 text-center">
                          <Typography>2</Typography>
                          <Box
                            className="w-6 h-6 rounded-full flex justify-center items-center "
                            sx={{
                              border: "3px solid",
                              borderColor: theme.palette.primary.cardBg2,
                            }}
                          >
                            <Box
                              className="w-2 h-2 rounded-full"
                              sx={{ bgcolor: "#2196F3" }}
                            ></Box>
                          </Box>
                        </Box>
                        <Box className="grid grid-cols-1 text-center">
                          <Typography>3</Typography>
                          <Box
                            className="w-6 h-6 rounded-full flex justify-center items-center "
                            sx={{
                              border: "3px solid",
                              borderColor: theme.palette.primary.cardBg2,
                            }}
                          >
                            <Box
                              className="w-2 h-2 rounded-full"
                              sx={{ bgcolor: "#2196F3" }}
                            ></Box>
                          </Box>
                        </Box>
                        <Box className="grid grid-cols-1 text-center">
                          <Typography>4</Typography>
                          <Box
                            className="w-6 h-6 rounded-full flex justify-center items-center "
                            sx={{
                              border: "3px solid",
                              borderColor: theme.palette.primary.cardBg2,
                            }}
                          >
                            <Box
                              className="w-2 h-2 rounded-full"
                              sx={{ bgcolor: "#2196F3" }}
                            ></Box>
                          </Box>
                        </Box>
                      </Box>

                      {/* donut */}
                      <Box className="flex justify-end items-center pl-2">
                        <DonutChartWithIcon></DonutChartWithIcon>
                      </Box>
                    </Box>
                  )}
                </Box>
              ))}
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={8.5}
          sx={{
            "&.MuiGrid-item": {
              paddingLeft: "16px",
              paddingTop: "0px",
            },
          }}
        >
          <Box
            className="px-4 py-4"
            sx={{
              bgcolor: theme.palette.background.cardBg,
              borderRadius: "32px",
              height: "100vh",
            }}
          >
            <EmployeeDetailsCard
              employeeInfo={employeeInfo}
            ></EmployeeDetailsCard>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AllEmployee;
