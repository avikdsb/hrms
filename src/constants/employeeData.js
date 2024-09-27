import PersonOne from "../assets/person1.png";
import PersonTwo from "../assets/person2.png";
import PersonThree from "../assets/person3.png";

import LaptopImage from "../assets/laptop.png";
import MobileImage from "../assets/mobile.png";
import HeadphoneImage from "../assets/headphone.png";

// Employees Data
export const employeeData = [
  {
    id: 1,
    empId: 876543,
    name: "ABC",
    phone: "9876543210",
    email: "abc@gmail.com",
    address: "address",
    department: "IT",
    role: "Admin",
    dob: "12/12/1990",
    doj: "12/12/2010",
    status: "Active",
    image: PersonOne,
  },
  {
    id: 2,
    empId: 763221,
    name: "XYJ",
    phone: "9834567889",
    email: "xyj@gmail.com",
    address: "address",
    department: "Support",
    role: "HR",
    dob: "12/12/1990",
    doj: "12/12/2010",
    status: "Active",
    image: PersonTwo,
  },
  {
    id: 3,
    empId: 142892,
    name: "MNO",
    phone: "6543345689",
    email: "MNO@gmail.com",
    address: "address",
    department: "Development",
    role: "Finance",
    dob: "12/12/2000",
    doj: "12/12/2010",
    status: "Inactive",
    image: PersonThree,
  },
  {
    id: 4,
    empId: 142892,
    name: "PQR",
    phone: "6543345689",
    email: "Pqr@gmail.com",
    address: "address",
    department: "Management",
    role: "Team Member",
    dob: "12/12/2000",
    doj: "12/12/2010",
    status: "Inactive",
    image: PersonThree,
  },
];

// Assets Data
export const assetsData = [
  {
    id: 1,
    assetId: "LAP928PRODEV",
    assetType: "LAPTOP",
    brandName: "APPLE",
    serialNumber: "APP91736818Z",
    dop: "11/09/2000",
    assignedEmpId: 876543,
  },
  {
    id: 2,
    assetId: "MOB653NOOBDEV",
    assetType: "MOBILE",
    brandName: "SAMSUNG",
    serialNumber: "SAM43789782Z",
    dop: "21/01/2010",
    assignedEmpId: 763221,
  },
  {
    id: 3,
    assetId: "HEAD471BEGDEV",
    assetType: "HEADPHONE",
    brandName: "SONY",
    serialNumber: "SON14375643Z",
    dop: "01/11/2015",
    assignedEmpId: 142892,
  },
];

// Assets Data
export const totalAssetsData = [
  {
    id: 1,
    assetType: "LAPTOP",
    totalStock: 111,
    stockAddedDate: "11/09/2000",
    availableStock: 20,
    stockUpdatedDate: "01/03/2010",
    image: LaptopImage,
  },
  {
    id: 2,
    assetType: "MOBILE",
    totalStock: 133,
    stockAddedDate: "11/09/2010",
    availableStock: 82,
    stockUpdatedDate: "21/11/2019",
    image: MobileImage,
  },
  {
    id: 3,
    assetType: "HEADPHONE",
    totalStock: 412,
    stockAddedDate: "11/09/2015",
    availableStock: 212,
    stockUpdatedDate: "11/09/2023",
    image: HeadphoneImage,
  },
];

// Reports Data

// Attendance Data
export const attendanceData = [
  {
    id: 1,
    empId: 876543,
    name: "ABC",
    department: "IT",
    checkInTime: "",
    checkOutTime: "",
    workingHours: "",
    date: "09/13/2024",
    geoCode: "",
    capturedPhoto: "../assets/logo.png",
  },
  {
    id: 2,
    empId: 763221,
    name: "mno",
    department: "Management",
    checkInTime: "",
    checkOutTime: "",
    workingHours: "",
    date: "06/01/2024",
    geoCode: "",
    capturedPhoto: "../assets/logo.png",
  },
  {
    id: 3,
    empId: 142892,
    name: "Xyj",
    department: "DEV",
    checkInTime: "",
    checkOutTime: "",
    workingHours: "",
    date: "08/01/2023",
    geoCode: "",
    capturedPhoto: "../assets/logo.png",
  },
];

// Leave Data
export const leaveData = [
  {
    id: 1,
    empId: 876543,
    name: "ABC",
    department: "IT",
    leaveType: "",
    totalLeave: 12,
    takenLeave: 7,
    startDate: "09/11/2024",
    endDate: "12/11/2024",
    status: "",
  },
  {
    id: 2,
    empId: 731739,
    name: "XYJ",
    department: "Management",
    leaveType: "",
    totalLeave: 12,
    takenLeave: 4,
    startDate: "09/11/2024",
    endDate: "12/11/2024",
    status: "",
  },
  {
    id: 3,
    empId: 914321,
    name: "MNO",
    department: "Support",
    leaveType: "",
    totalLeave: 12,
    takenLeave: 2,
    startDate: "09/11/2024",
    endDate: "12/11/2024",
    status: "",
  },
];
