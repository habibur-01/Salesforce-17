import { createTheme } from "@mui/material";

// Global theme configuration
export const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: '"Poppins", sans-serif', // or any other font you prefer
    },
  },
});

// For dark theme
export const darkTheme = createTheme({
  typography: {
    allVariants: {
      fontFamily: '"Gilroy", sans-serif', // Set the font family for light theme
    },
  },
  palette: {
    mode: "dark",
    primary: {
      main: "#2A2E32",
      white: "#0D175D",
      semiWhite: "#D3E0F3",
      darkSemiWhite: "#BFC0C1",
      active: "#DFFE23",
      icon: "#72799B",
      cardBg: "#303030",
      cardBg2: "#373737",
      cardBg3: "#9BB1C0",
      // cardLightBg: "#40444e", old
      cardLightBg: "#2F3349",
      border: "#ACACAC29",
      border2: "#aca9a9a8",
      grid: "#E5E5E5",
      redBg: "#EA6863",
      blueBg: "#83A2DB",
    },
    secondary: {
      main: "#303030",
    },
    background: {
      main: "#2F3349",
      cardBg: "#829DB0",
      btnBg: "#313852",
      listItemBg: "#ffffff",
      inputBg: "#D3E0F3",
      inputLabelBg: "#d3d9f2",
    },
    text: {
      white: "#898B8D",
      black: "#ffffff",
    },
    icon: {
      iconBg: "#EDEDEF",
      lightIconBg: "#212529",
      darkIconBg: "#303030",
    },
    breakpoints: {
      values: {
        mobile: 0,
        tablet: 640,
        laptop: 1024,
        desktop: 1200,
      },
    },
  },
});

// For light theme
export const lightTheme = createTheme({
  typography: {
    allVariants: {
      fontFamily: '"Gilroy", sans-serif', // Set the font family for light theme
    },
  },
  palette: {
    mode: "light",
    primary: {
      main: "#F7FAFF",
      white: "#0D175D",
      semiWhite: "#D3E0F3",
      darkSemiWhite: "#BFC0C1",
      active: "#DFFE23",
      icon: "#72799B",
      cardBg: "#303030",
      cardBg2: "#373737",
      cardBg3: "#9BB1C0",
      cardLightBg: "#DBE5F2",
      border: "#ACACAC29",
      border2: "#aca9a9a8",
      grid: "#E5E5E5",
      redBg: "#EA6863",
      blueBg: "#83A2DB",
    },
    secondary: {
      main: "#303030",
    },
    background: {
      main: "#F7FAFF",
      cardBg: "#829DB0",
      btnBg: "#313852",
      listItemBg: "#ffffff",
      inputBg: "#D3E0F3",
      inputLabelBg: "#d3d9f2",
    },
    text: {
      white: "#ffffff",
      black: "#303030",
    },
    icon: {
      iconBg: "#EDEDEF",
      lightIconBg: "#D3DFF3",
      darkIconBg: "#303030",
    },
    breakpoints: {
      values: {
        mobile: 0,
        tablet: 640,
        laptop: 1024,
        desktop: 1200,
      },
    },
  },
});
