export const roleManagementData = {
  Admin: {
    Dashboard: {
      EmployeeCharts: true,
      DailyActivityCharts: true,
      HolidayCard: true,
      EventCard: true,
    },
    Reports: {
      PerformanceReports: true,
      LeaveReports: true,
      AttendanceReports: true,
    },
    PaySlips: true,
    Events: true,
    Holidays: {
      NationalHolidays: true,
      RegionalHolidays: true,
    },
  },
  HR: {
    Dashboard: {
      EmployeeCharts: true,
      DailyActivityCharts: true,
      HolidayCard: true,
      EventCard: true,
    },
    Reports: {
      PerformanceReports: false,
      LeaveReports: true,
      AttendanceReports: true,
    },
    PaySlips: false,
    Events: true,
    Holidays: {
      NationalHolidays: true,
      RegionalHolidays: true,
    },
  },
  Finance: {
    Dashboard: {
      EmployeeCharts: true,
      DailyActivityCharts: true,
      HolidayCard: true,
      EventCard: true,
    },
    Reports: {
      PerformanceReports: false,
      LeaveReports: false,
      AttendanceReports: false,
    },
    PaySlips: true,
    Events: true,
    Holidays: {
      NationalHolidays: true,
      RegionalHolidays: true,
    },
  },
  TeamMember: {
    Dashboard: {
      EmployeeCharts: true,
      DailyActivityCharts: true,
      HolidayCard: true,
      EventCard: true,
    },
    Reports: {
      PerformanceReports: false,
      LeaveReports: false,
      AttendanceReports: false,
    },
    PaySlips: false,
    Events: true,
    Holidays: {
      NationalHolidays: true,
      RegionalHolidays: true,
    },
  },
  Accountant: {
    Dashboard: {
      EmployeeCharts: true,
      DailyActivityCharts: true,
      HolidayCard: true,
      EventCard: true,
    },
    Reports: {
      PerformanceReports: false,
      LeaveReports: false,
      AttendanceReports: false,
    },
    PaySlips: true,
    Events: true,
    Holidays: {
      NationalHolidays: true,
      RegionalHolidays: true,
    },
  },
};

export const modulesData = {
  Dashboard: {
    EmployeeCharts: true,
    DailyActivityCharts: true,
    HolidayCard: true,
    EventCard: true,
  },
  Reports: {
    PerformanceReports: true,
    LeaveReports: true,
    AttendanceReports: true,
  },
  PaySlips: true,
  Events: true,
  Holidays: {
    NationalHolidays: true,
    RegionalHolidays: true,
  },
};

export const rolesListData = [
  {
    id: 1,
    roleType: "HR",
  },
  {
    id: 2,
    roleType: "Accountant",
  },
  {
    id: 3,
    roleType: "Tech Lead",
  },
  {
    id: 4,
    roleType: "Admin",
  },
  {
    id: 5,
    roleType: "Team Member",
  },
];
