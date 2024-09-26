export const polarChartData = [
  {
    category: "TOTAL EMPLOYEES",
    value: 25,
  },
  {
    category: "ACTIVE EMPLOYEES",
    value: 21,
  },
  {
    category: "LATE LOGIN",
    value: 8,
  },
  {
    category: "ON LEAVE",
    value: 4,
  },
  {
    category: "NEW HIRE",
    value: 12,
  },
  {
    category: "RESIGN",
    value: 3,
  },
];



// Daily Activity
export const dailyEmployeeActivity = () => {
  const totalEmployees = 100;
  const activeEmployees = Math.floor(Math.random() * totalEmployees);
  const lateLoginEmployees = Math.floor(Math.random() * (totalEmployees - activeEmployees));
  const onLeaveEmployees = totalEmployees - (activeEmployees + lateLoginEmployees);
  
  return { activeEmployees, lateLoginEmployees, onLeaveEmployees, totalEmployees };
};



// This file will only contain the series data and labels
export const leaveChartSeries = [5, 3, 7, 2];
export const leaveChartLabels = ['Sick Leave', 'Casual Leave', 'Paid Leave', 'Duty Leave'];

