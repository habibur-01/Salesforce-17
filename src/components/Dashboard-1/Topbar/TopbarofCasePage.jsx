import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import React, { useEffect, useMemo, useRef, useState } from "react";
import LayersIcon from "@mui/icons-material/Layers";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import SearchIcon from "@mui/icons-material/Search";
import { useLocation, useNavigate } from "react-router-dom";
import TopbarsmCasePage from "./TopbarsmCasePage";
import { useSelector } from "react-redux";

const TopbarofCasePage = () => {
  const theme = useTheme();
  const mode = useSelector((state) => state.themeSlice.themeMode);
  const location = useLocation();
  const navigate = useNavigate();
  const textFieldRef = useRef(null); // Reference for the TextField

  const [activeTab, setActiveTab] = useState("");
  const [focused, setFocused] = useState(false);

  const tabs = useMemo(
    () => [
      // {name: "Relationship", url: "/relationship"},
      // {name: "Opportunities", url: "/opportunities"},
      // {name: "Leads", url: "/leads"},
      // {name: "Calender", url: "/calender"},
      // {name: "Cases", url: "/cases"},
      // {name: "Invoices", url: "/invoices"},
      // {name: "Reports", url: "/reports"},
      // {name: "Quotes", url: "/"},
      "Relationship",
      "Opportunities",
      "Leads",
      "Planning",
      "Cases",
      "Invoices",
      "Reports",
      "Quotes",
    ],
    []
  );

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const threeDotMenuOption = [
    {
      title: "Profile",
      icon: (
        <AccountCircleIcon
          sx={{ color: theme.palette.text.black, fontSize: "30px" }}
        />
      ),
    },
    {
      title: "Settings",
      icon: (
        <SettingsIcon
          sx={{ color: theme.palette.text.black, fontSize: "30px" }}
        />
      ),
    },
    {
      title: "Logout",
      icon: (
        <LogoutIcon
          sx={{ color: theme.palette.primary.redBg, fontSize: "25px" }}
        />
      ),
    },
  ];

  const ITEM_HEIGHT = 48;

  const handleNavigate = (tab) => {
    setActiveTab(tab);
    navigate(`/${tab.toLowerCase().replace(/\s+/g, "-")}`);
  };

  useEffect(() => {
    const currentPath = location.pathname.substring(1).replace(/-/g, " ");
    const activeTabFromPath = tabs.find(
      (tab) => tab.toLowerCase() === currentPath.toLowerCase()
    );
    if (activeTabFromPath) {
      setActiveTab(activeTabFromPath);
    }
  }, [location.pathname, tabs]);

  // Detect clicks outside of TextField to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        textFieldRef.current &&
        !textFieldRef.current.contains(event.target)
      ) {
        setFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Box>
      <Box className="hidden xl:block py-3">
        <Box className="flex items-center justify-between">
          <Box className="cursor-pointer flex items-center gap-2 w-[25%]">
            <LayersIcon sx={{ fontSize: "32px" }} />
            <Typography sx={{ fontSize: "30px" }}>
              <span className="font-bold">sugar</span>crm
            </Typography>
          </Box>

          <Box className="flex items-center justify-center gap-x-1 w-[50%]">
            <Box
              className="px-1 rounded-3xl flex items-center gap-x-3"
              sx={{ bgcolor: "transparent" }}
            >
              {tabs.map((tab) => (
                <Typography
                  key={tab}
                  onClick={() => handleNavigate(tab)}
                  className={`px-4 py-3 rounded-[32px] cursor-pointer ${
                    activeTab === tab
                      ? mode === "dark"
                        ? "bg-[#DFFE23]"
                        : "bg-[#000000]"
                      : ""
                  }`}
                  sx={{
                    color:
                      activeTab === tab
                        ? mode === "dark"
                          ? "black"
                          : theme.palette.text.white
                        : theme.palette.text.black,
                    fontWeight: "500",
                  }}
                >
                  {tab}
                </Typography>
              ))}
            </Box>
          </Box>

          <Box className="flex items-center gap-x-2 w-[25%] justify-end">
            <Box ref={textFieldRef} className="flex items-center">
              {!focused && (
                <IconButton
                  size="large"
                  sx={{
                    bgcolor: theme.palette.icon.lightIconBg,
                    borderRadius: "100%",
                    opacity: focused ? 0 : 1,
                    visibility: focused ? "hidden" : "visible",
                    transition: "opacity 0.4s ease",
                  }}
                  onClick={() => setFocused(true)}
                >
                  <SearchIcon sx={{ fontSize: "24px" }} />
                </IconButton>
              )}
              <TextField
                placeholder="Search..."
                sx={{
                  width: focused ? "200px" : "0px",
                  visibility: focused ? "visible" : "hidden",
                  opacity: focused ? 1 : 0,
                  transition: "width 0.4s ease, opacity 0.4s ease",
                  marginLeft: focused ? "10px" : "0px",
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { border: "none" },
                  },
                  "& .MuiInputBase-input": {
                    padding: "12px",
                    borderRadius: "13px",
                    bgcolor:
                      mode === "dark"
                        ? theme.palette.icon.lightIconBg
                        : theme.palette.primary.semiWhite,
                    color: "#333",
                    "&::placeholder": { color: "#888" },
                  },
                }}
                onBlur={() => setFocused(false)}
                onFocus={() => setFocused(true)}
              />
            </Box>

            <IconButton
              size="large"
              sx={{
                bgcolor: theme.palette.icon.lightIconBg,
                borderRadius: "100%",
              }}
            >
              <MailOutlineIcon />
            </IconButton>

            <IconButton
              size="large"
              sx={{
                bgcolor: theme.palette.icon.lightIconBg,
                borderRadius: "100%",
              }}
            >
              <NotificationsNoneIcon />
            </IconButton>

            <Box className="cursor-pointer">
              <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? "long-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                aria-haspopup="true"
                onClick={handleClick}
                sx={{ borderRadius: "100%" }}
              >
                <Avatar
                  alt="Remy Sharp"
                  src="https://i.ibb.co/YcXc5Cg/1.png"
                  sx={{ width: 48, height: 48 }}
                />
              </IconButton>
              <Menu
                id="long-menu"
                MenuListProps={{ "aria-labelledby": "long-button" }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                slotProps={{
                  paper: {
                    style: { maxHeight: ITEM_HEIGHT * 4.5, width: "20ch" },
                  },
                }}
              >
                {threeDotMenuOption.map((option) => (
                  <MenuItem key={option.title} onClick={handleClose}>
                    <Box className="flex items-center gap-x-2">
                      {option.icon}
                      <Typography
                        sx={{
                          color:
                            option.title === "Logout"
                              ? theme.palette.primary.redBg
                              : theme.palette.text.black,
                        }}
                      >
                        {option.title}
                      </Typography>
                    </Box>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Box>
        </Box>
      </Box>
      {/* top header section for sm devices */}
      <Box className=" block  xl:hidden pb-4">
        <Box className=" flex items-center justify-between">
          {/* logo */}
          <Box className="cursor-pointer flex items-center gap-2 w-[25%]">
            <LayersIcon sx={{ fontSize: "32px" }} />
            <Typography sx={{ fontSize: "30px" }}>
              <span className="font-bold">sugar</span>crm
            </Typography>
          </Box>
          {/* sidebar for sm */}
          <Box>
            <TopbarsmCasePage />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default TopbarofCasePage;
