import {
  Box,
  Collapse,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import TripOriginIcon from "@mui/icons-material/TripOrigin";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import ShareIcon from "@mui/icons-material/Share";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import AddIcon from "@mui/icons-material/Add";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import StorageIcon from "@mui/icons-material/Storage";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import TelegramIcon from "@mui/icons-material/Telegram";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import BedtimeIcon from "@mui/icons-material/Bedtime";
import LightModeIcon from "@mui/icons-material/LightMode";

import React, { useEffect, useState } from "react";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setThemeMode } from "redux/features/theme/themeSlice";
import { setIsSidebarOpen } from "redux/features/sidebar/sidebarSlice";

const Sidebar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const [isTrue, setIsTrue] = useState(() => {
    const saved = localStorage.getItem("sidebarHidden");
    return saved === "true";
  });
  const theme = useTheme();
  const mode = useSelector((state) => state.themeSlice.themeMode);

  const dispatch = useDispatch();

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

  const handleSidebar = () => {
    const newValue = !isTrue;
    setIsTrue(newValue);
    dispatch(setIsSidebarOpen());
    localStorage.setItem("sidebarHidden", newValue);
    if (newValue === true) {
      setOpen(false);
      setSubMenuOpen(false);
    }
  };

  const handleClick = () => {
    const value = !open;
    setOpen(value);
    if (value === true && isTrue === true) {
      setIsTrue(false);
      localStorage.setItem("sidebarHidden", false);
    }
  };
  const handleCalender = () => {
    const value = !subMenuOpen;
    setSubMenuOpen(value);
    if (value === true && isTrue === true) {
      setIsTrue(false);
      localStorage.setItem("sidebarHidden", false);
    }
  };

  return (
    <Box
      sx={{
        // // mt:  isScrolled &&  "100px",
        position: "sticky",
        top: isScrolled && "100px", // Adjust this value to control how far from the top it should stick
        zIndex: 30,
        maxWidth: isTrue ? "56px" : "220px",
        height: "calc(100vh - 100px)",
        transition: "max-width 0.5s ease-in-out",
        overflowY: "auto",
        pr: isTrue ? "8px" : 0,
        overflowX: "hidden",
      }}
      className="flex flex-col justify-between pb-10  "
    >
      <List
        sx={{
          width: "220px",
          maxWidth: 360,
          pl: 0,
        }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        <IconButton
          onClick={handleSidebar}
          size="large"
          sx={{
            // border: `1px solid ${theme.palette.primary.semiWhite}`,
            bgcolor: theme.palette.icon.lightIconBg,
            borderRadius: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "48px",
            width: "48px",
          }}
        >
          <KeyboardBackspaceIcon />
        </IconButton>
        <ListItemButton
          disableGutters
          disableRipple
          className="gap-3"
          sx={{
            "&:hover": {
              bgcolor: "transparent",
            },
          }}
        >
          <IconButton
            size="large"
            sx={{
              // border: `1px solid ${theme.palette.primary.semiWhite}`,
              bgcolor: theme.palette.icon.lightIconBg,
              borderRadius: "100%",
            }}
          >
            <ShareIcon />
          </IconButton>
          <ListItemText primary="Share" />
        </ListItemButton>
        <ListItemButton
          disableGutters
          disableRipple
          className="gap-3"
          sx={{
            "&:hover": {
              bgcolor: "transparent",
            },
          }}
        >
          <IconButton
            size="large"
            sx={{
              // border: `1px solid ${theme.palette.primary.semiWhite}`,
              bgcolor: theme.palette.icon.lightIconBg,
              borderRadius: "100%",
            }}
          >
            <DriveFolderUploadIcon />
          </IconButton>
          <ListItemText primary="Upload" />
        </ListItemButton>
        <ListItemButton
          disableGutters
          disableRipple
          className="gap-3"
          sx={{
            "&:hover": {
              bgcolor: "transparent",
            },
          }}
        >
          <IconButton
            size="large"
            sx={{
              // border: `1px solid ${theme.palette.primary.semiWhite}`,
              bgcolor: theme.palette.icon.lightIconBg,
              borderRadius: "100%",
            }}
          >
            <StarBorderIcon />
          </IconButton>
          <ListItemText primary="Favourite" />
        </ListItemButton>
        <ListItemButton
          disableGutters
          disableRipple
          className="gap-3"
          sx={{
            "&:hover": {
              bgcolor: "transparent",
            },
          }}
        >
          <IconButton
            size="large"
            sx={{
              // border: `1px solid ${theme.palette.primary.semiWhite}`,
              bgcolor: theme.palette.icon.lightIconBg,
              borderRadius: "100%",
            }}
          >
            <AddIcon />
          </IconButton>
          <ListItemText primary="Add more" />
        </ListItemButton>
        <ListItemButton
          className="gap-3"
          disableGutters
          disableRipple
          onClick={handleClick}
          sx={{
            "&:hover": {
              bgcolor: "transparent",
            },
          }}
        >
          <IconButton
            size="large"
            sx={{
              // border: `1px solid ${theme.palette.primary.semiWhite}`,
              bgcolor: theme.palette.icon.lightIconBg,
              borderRadius: "100%",
            }}
          >
            <PhoneIphoneIcon />
          </IconButton>
          <ListItemText primary="Mobile" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List
            component="div"
            disablePadding
            sx={{
              clipPath: isTrue ? "inset(0 100% 0 0)" : "inset(0 0 0 0)",
              transition: "clip-path 0.5s ease-in-out",
              whiteSpace: "nowrap",
            }}
          >
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <TripOriginIcon />
              </ListItemIcon>
              <ListItemText primary="Tablet" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <RadioButtonCheckedIcon />
              </ListItemIcon>
              <ListItemText primary="Desktop" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <TripOriginIcon />
              </ListItemIcon>
              <ListItemText primary="Laptop" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <TripOriginIcon />
              </ListItemIcon>
              <ListItemText primary="Laptop" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <TripOriginIcon />
              </ListItemIcon>
              <ListItemText primary="Laptop" />
            </ListItemButton>
          </List>
        </Collapse>
        <ListItemButton
          disableGutters
          disableRipple
          className="gap-3"
          sx={{
            "&:hover": {
              bgcolor: "transparent",
            },
          }}
        >
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
          <ListItemText primary="Storage" />
        </ListItemButton>
        <ListItemButton
          disableGutters
          disableRipple
          onClick={handleCalender}
          className="gap-3"
          sx={{
            "&:hover": {
              bgcolor: "transparent",
            },
          }}
        >
          <IconButton
            size="large"
            sx={{
              // border: `1px solid ${theme.palette.primary.semiWhite}`,
              bgcolor: theme.palette.icon.lightIconBg,
              borderRadius: "100%",
            }}
          >
            <CalendarTodayIcon />
          </IconButton>
          <ListItemText primary="Calendar" />
          {subMenuOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={subMenuOpen} timeout="auto" unmountOnExit>
          <List
            component="div"
            disablePadding
            sx={{
              clipPath: isTrue ? "inset(0 100% 0 0)" : "inset(0 0 0 0)",
              transition: "clip-path 0.5s ease-in-out",
              whiteSpace: "nowrap",
            }}
          >
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <TripOriginIcon />
              </ListItemIcon>
              <ListItemText primary="October 2024" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <RadioButtonCheckedIcon />
              </ListItemIcon>
              <ListItemText primary="November 2024" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <TripOriginIcon />
              </ListItemIcon>
              <ListItemText primary="December 2024" />
            </ListItemButton>
          </List>
        </Collapse>
        <ListItemButton
          disableGutters
          disableRipple
          className="gap-3"
          sx={{
            "&:hover": {
              bgcolor: "transparent",
            },
          }}
        >
          <IconButton
            size="large"
            sx={{
              // border: `1px solid ${theme.palette.primary.semiWhite}`,
              bgcolor: theme.palette.icon.lightIconBg,
              borderRadius: "100%",
            }}
          >
            <TelegramIcon />
          </IconButton>
          <ListItemText primary="Transfer" />
        </ListItemButton>
        <ListItemButton
          disableGutters
          disableRipple
          className="gap-3"
          sx={{
            "&:hover": {
              bgcolor: "transparent",
            },
          }}
        >
          <IconButton
            size="large"
            sx={{
              // border: `1px solid ${theme.palette.primary.semiWhite}`,
              bgcolor: theme.palette.icon.lightIconBg,
              borderRadius: "100%",
            }}
          >
            <WarningAmberIcon />
          </IconButton>
          <ListItemText primary="Warning" />
        </ListItemButton>
      </List>

      {/* bottom section  */}
      <Box className=" flex flex-col gap-y-2 ">
        {/* dark mode icon  */}
        {mode === "light" ? (
          <Box
            onClick={() => dispatch(setThemeMode("dark"))}
            className="flex justify-start items-center gap-x-2 cursor-pointer"
          >
            <IconButton
              size="large"
              sx={{
                // border: `1px solid ${theme.palette.primary.semiWhite}`,
                bgcolor: theme.palette.icon.lightIconBg,
                borderRadius: "100%",
              }}
            >
              <BedtimeIcon />
            </IconButton>
            <Typography
              sx={{
                clipPath: isTrue ? "inset(0 100% 0 0)" : "inset(0 0 0 0)",
                transition: "clip-path 0.5s ease-in-out",
                whiteSpace: "nowrap",
              }}
            >
              Night
            </Typography>
          </Box>
        ) : (
          <Box
            onClick={() => dispatch(setThemeMode("light"))}
            className="flex justify-start items-center gap-x-2 cursor-pointer"
          >
            <IconButton
              size="large"
              sx={{
                // border: `1px solid ${theme.palette.primary.semiWhite}`,
                bgcolor: theme.palette.icon.lightIconBg,
                borderRadius: "100%",
              }}
            >
              <LightModeIcon />
            </IconButton>
            <Typography
              sx={{
                clipPath: isTrue ? "inset(0 100% 0 0)" : "inset(0 0 0 0)",
                transition: "clip-path 0.5s ease-in-out",
                whiteSpace: "nowrap",
              }}
            >
              Light
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Sidebar;
