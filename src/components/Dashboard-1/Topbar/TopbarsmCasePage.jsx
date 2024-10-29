import React, { useEffect, useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";

import CasesIcon from "@mui/icons-material/Cases";
import ReceiptIcon from "@mui/icons-material/Receipt";

import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import SettingsIcon from "@mui/icons-material/Settings";
import StarsIcon from "@mui/icons-material//Stars";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import OutlinedFlagIcon from "@mui/icons-material/OutlinedFlag";
import WorkspacesIcon from "@mui/icons-material/Workspaces";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { Avatar, Typography, useTheme } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import LayersIcon from "@mui/icons-material/Layers";
import BedtimeIcon from "@mui/icons-material/Bedtime";
import LightModeIcon from "@mui/icons-material/LightMode";
import { setThemeMode } from "redux/features/theme/themeSlice";
import { useDispatch, useSelector } from "react-redux";

const TopbarsmCasePage = () => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [activeTab, setActiveTab] = useState("");
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.themeSlice.themeMode);
  const icons = [
    <WorkspacesIcon />,
    <StarsIcon />,
    <ReceiptIcon />,
    <CalendarMonthIcon />,
    <CasesIcon />,
    <OutlinedFlagIcon />,
    <FormatQuoteIcon />,
  ];
  const icons2 = [
    <NotificationsActiveIcon />,
    <SettingsIcon />,
    <Avatar
      alt="Remy Sharp"
      src="https://i.ibb.co/YcXc5Cg/1.png"
      sx={{ width: 28, height: 28 }}
    />,
  ];
  // Memoize the tabs array
  const tabs = useMemo(
    () => [
      "Relationship",
      "Opportunities",
      "Leads",
      "Calender",
      "Cases",
      "Reports",
      "Quotes",
    ],
    []
  );

  const handleNavigate = (tab) => {
    setActiveTab(tab); // Update the tab state
    navigate(`/${tab.toLowerCase().replace(/\s+/g, "-")}`); // Navigate to the correct route
  };

  // Sync the active tab with the URL on route change
  useEffect(() => {
    const currentPath = location.pathname.substring(1).replace(/-/g, " ");
    const activeTabFromPath = tabs.find(
      (tab) => tab.toLowerCase() === currentPath.toLowerCase()
    );
    if (activeTabFromPath) {
      setActiveTab(activeTabFromPath);
    }
  }, [location.pathname, tabs]);
  const DrawerList = (
    <Box
      sx={{
        width: 250,
        bgcolor: theme.palette.background.main,
        height: "100vh",
        overflowY: "auto",
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      {/* logo */}
      <Box className="cursor-pointer flex items-center gap-2 w-[25%] pl-3">
        <LayersIcon sx={{ fontSize: "32px" }} />
        <Typography sx={{ fontSize: "30px" }}>
          <span className="font-bold">sugar</span>crm
        </Typography>
      </Box>
      <List>
        {tabs.map((tab, index) => (
          <ListItem
            key={tab}
            disablePadding
            onClick={() => handleNavigate(tab)}
          >
            <ListItemButton
              className={`px-3 py-1 rounded-3xl cursor-pointer`}
              sx={{
                color:
                  activeTab === tab
                    ? theme.palette.primary.white
                    : theme.palette.text.black,
                bgcolor:
                  activeTab === tab
                    ? theme.palette.primary.active
                    : "transparent",
              }}
            >
              <ListItemIcon>{icons[index]}</ListItemIcon>
              <ListItemText primary={tab} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider />
      <List>
        {["Notifications", "Settings", "Profile"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>{icons2[index]}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
        {/* Dark mode section  */}
        <ListItem disablePadding>
          {/* dark mode icon  */}
          {mode === "light" ? (
            <ListItemButton onClick={() => dispatch(setThemeMode("dark"))}>
              <ListItemIcon>
                <BedtimeIcon />
              </ListItemIcon>

              <ListItemText primary={"Night"} />
            </ListItemButton>
          ) : (
            <ListItemButton onClick={() => dispatch(setThemeMode("light"))}>
              <ListItemIcon>
                <LightModeIcon />
              </ListItemIcon>

              <ListItemText primary={"Light"} />
            </ListItemButton>
          )}
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      <Button onClick={toggleDrawer(true)}>
        <MenuOpenIcon
          sx={{ color: theme.palette.primary.icon, fontSize: "32px" }}
        />
      </Button>
      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
};

export default TopbarsmCasePage;
