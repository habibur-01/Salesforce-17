import { Box, IconButton, Typography, useTheme } from "@mui/material";
import Layout1 from "components/Dashboard-1/Layout1";
import React from "react";
import CachedIcon from "@mui/icons-material/Cached";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import MobileScreenShareIcon from "@mui/icons-material/MobileScreenShare";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SouthEastIcon from "@mui/icons-material/SouthEast";
import AllEmployee from "./Card/AllEmployee";

const PalnningSection = () => {
  const theme = useTheme();
  return (
    <Layout1>
      <Box>
        {/* Planning top section */}
        <Box className="flex justify-between items-center">
          <Typography
            className="flex-1"
            sx={{
              fontSize: "30px",
              color: theme.palette.text.black,
            }}
          >
            Planning <br /> Resources
          </Typography>
          {/* mid section icons */}
          <Box className="flex gap-x-2 w-auto px-4">
            <IconButton
              size="large"
              sx={{
                // border: `1px solid ${theme.palette.primary.semiWhite}`,
                bgcolor: theme.palette.icon.lightIconBg,
                borderRadius: "100%",
              }}
            >
              <CachedIcon />
            </IconButton>
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
              <CalendarMonthIcon />
            </IconButton>
            <IconButton
              size="large"
              sx={{
                // border: `1px solid ${theme.palette.primary.semiWhite}`,
                bgcolor: theme.palette.icon.lightIconBg,
                borderRadius: "100%",
              }}
            >
              <EditCalendarIcon />
            </IconButton>
            <IconButton
              size="large"
              sx={{
                // border: `1px solid ${theme.palette.primary.semiWhite}`,
                bgcolor: theme.palette.icon.lightIconBg,
                borderRadius: "100%",
              }}
            >
              <MobileScreenShareIcon />
            </IconButton>
            <IconButton
              size="large"
              sx={{
                // border: `1px solid ${theme.palette.primary.semiWhite}`,
                bgcolor: theme.palette.icon.lightIconBg,
                borderRadius: "100%",
              }}
            >
              <DashboardIcon />
            </IconButton>
          </Box>

          {/* Right side project statistics */}
          <Box className="flex gap-1 flex-1 justify-end">
            {/* Active stat */}
            <Box className="w-[210px] flex justify-between px-5 py-[10px] bg-white rounded-3xl text-black">
              <Box className="">
                <Typography sx={{ fontSize: "15px" }}>
                  Active projects
                </Typography>
                <Typography
                  sx={{ fontSize: "24px", fontWeight: "bold", mt: 2 }}
                >
                  24
                </Typography>
              </Box>
              <Box className="flex items-end">
                <IconButton>
                  <SouthEastIcon sx={{ color: "black", fontSize: "16px" }} />
                </IconButton>
              </Box>
            </Box>
            {/* Pending stat */}
            <Box className="w-[210px] flex justify-between px-5 py-[10px] bg-white rounded-3xl text-black">
              <Box className="">
                <Typography sx={{ fontSize: "15px" }}>
                  Pending projects
                </Typography>
                <Typography
                  sx={{ fontSize: "24px", fontWeight: "bold", mt: 2 }}
                >
                  9
                </Typography>
              </Box>
              <Box className="flex items-end">
                <IconButton>
                  <SouthEastIcon sx={{ color: "black", fontSize: "16px" }} />
                </IconButton>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box>
          <AllEmployee />
        </Box>
      </Box>
    </Layout1>
  );
};

export default PalnningSection;
