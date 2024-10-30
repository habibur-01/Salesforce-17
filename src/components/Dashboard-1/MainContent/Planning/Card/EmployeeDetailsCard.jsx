import { Box, Typography } from "@mui/material";

const EmployeeDetailsCard = ({ employeeInfo }) => {
  // console.log(employeeInfo);
  const {
    employeeName,
    imgUrl,
    designition,
    todayWorkingHour,
    ratePerHour,
    experince,
    exp_this_platform,
    totalWorkHour,
    hoursPerWeek,
    completeProject,
    pendingProject,
  } = employeeInfo;

  return (
    <Box>
      <Box>
        <Typography>{employeeName}</Typography>
       
      </Box>
    </Box>
  );
};

export default EmployeeDetailsCard;
