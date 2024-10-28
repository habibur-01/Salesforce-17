import * as React from "react";
import IconButton from "@mui/material/IconButton";
import EventIcon from "@mui/icons-material/Event";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Box, Tooltip, useTheme } from "@mui/material";
import dayjs from "dayjs";

export default function DateTesting() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Format the tooltip title based on whether a date is selected
  const tooltipTitle = selectedDate ? dayjs(selectedDate).format("MM/DD/YYYY") : "MM/DD/YYYY";

  return (
    <Box className="flex items-center justify-center">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box className="flex items-center gap-x-2">
            {!open && (
          <Tooltip title={tooltipTitle}>
            <IconButton
              size="large"
              sx={{
                border: `1px solid ${theme.palette.primary.darkSemiWhite}`,
                borderRadius: "100%",
              }}
              onClick={handleOpen}
            >
              <EventIcon
                sx={{
                  color: theme.palette.icon.iconColor,
                  fontSize: "22px",
                }}
              />
            </IconButton>
          </Tooltip>
            )}
          {open && (
            <DatePicker
            sx={{
              "& .css-nxo287-MuiInputBase-input-MuiOutlinedInput-input": {
                display: "none"
            },
          "& .css-1h9uykw-MuiInputBase-input-MuiOutlinedInput-input": {
            display: "none"
          }
          }}
            // disableFuture={true}
              open={open}
              onClose={handleClose}
              value={selectedDate}
              onChange={(newValue) => setSelectedDate(newValue)}
              renderInput={(params) => null} // hides the default input field
            />
          )}
        </Box>
      </LocalizationProvider>
    </Box>
  );
}
