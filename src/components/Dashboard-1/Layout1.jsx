import { Box, useTheme } from "@mui/material";
import React, { useState, useEffect } from "react";
import Topbar from "./Topbar/Topbar";
import Sidebar from "./Sidebar/Sidebar";
import { useLocation, useNavigate } from "react-router-dom";
import TopbarofCasePage from "./Topbar/TopbarofCasePage";
import { useSelector } from "react-redux";

const Layout1 = ({ children }) => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const changeHeader = location.pathname.includes("invoices");
  const mode = useSelector((state) => state.themeSlice.themeMode);

  // console.log("check the theme mode: ", mode);

  console.log(changeHeader);
  // Detect scroll event to toggle background color
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Box
      className="px-3 md:px-8 "
      sx={{
        backgroundImage:
          mode === "dark"
            ? "linear-gradient(#2F3349, #616476, #0f1618)"
            : "linear-gradient(#DEEBFF, white, #DEEBFF)",
      }}
    >
      <Box className="flex flex-col gap-x-1">
        {/* Topbar */}
        <Box
          className="w-full   pt-4 px-2 rounded-b-3xl"
          sx={{
            position: "sticky",
            bgcolor: isScrolled
              ? mode === "dark"
                ? "#25293C"
                : "white"
              : "transparent", // bg color only shows when scrolled
            top: 0, // Sticky position at the top
            zIndex: 50,
            transition: "background-color 0.3s ease", // Smooth transition when scroll changes
          }}
        >
          {changeHeader ? <Topbar /> : <TopbarofCasePage />}
        </Box>
        {/* Main content area */}
        <Box className="flex gap-x-4">
          {/* Sidebar - make it sticky */}
          <Box className=" hidden md:block">
            <Sidebar />
          </Box>
          {/* Children or content section */}
          <Box className="mt-3 pb-3 w-full">{children}</Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Layout1;
