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
    empName: "ABC",
    empPhone: "9876543210",
    empEmail: "abc@gmail.com",
    empPermanentAddress: "permanent address",
    empCurrentAddress: "current address",
    empAadhaarId: "987654321242",
    empPanId: "BHYUF9163Y",
    empDob: "12/12/1990",
    empDoj: "06/21/2024",
    empDepartment: "IT",
    empDesignation: "Data Analyst",
    empGrade: 4,
    empRole: "Admin",
    empReporting1:"",
    empReporting2:"",
    empAssets:"",
    empStatus: "Active",
    empPhoto: PersonOne,
  },
  {
    id: 2,
    empId: 763221,
    empName: "XYJ",
    empPhone: "9834567889",
    empEmail: "xyj@gmail.com",
    empPermanentAddress: "permanent address",
    empCurrentAddress: "current address",
    empAadhaarId: "987654321242",
    empPanId: "BHYUF9163Y",
    empDob: "12/12/1990",
    empDoj: "10/02/2023",
    empDepartment: "Support",
    empDesignation: "Technician",
    empGrade: 2,
    empRole: "HR",
    empReporting1:"",
    empReporting2:"",
    empAssets:"",
    empStatus: "Active",
    empPhoto: PersonTwo,
  },
  {
    id: 3,
    empId: 142892,
    empName: "MNO",
    empPhone: "6543345689",
    empEmail: "MNO@gmail.com",
    empPermanentAddress: "permanent address",
    empCurrentAddress: "current address",
    empAadhaarId: "987654321242",
    empPanId: "BHYUF9163Y",
    empDob: "12/12/1990",
    empDoj: "09/09/2024",
    empDepartment: "IT",
    empDesignation: "Web Developer",
    empGrade: 3,
    empRole: "Finance",
    empReporting1:"",
    empReporting2:"",
    empAssets:"",
    empStatus: "Active",
    empPhoto: PersonThree,
  },
  {
    id: 4,
    empId: 142892,
    empName: "PQR",
    empPhone: "6543345689",
    empEmail: "Pqr@gmail.com",
    empPermanentAddress: "permanent address",
    empCurrentAddress: "current address",
    empAadhaarId: "987654321242",
    empPanId: "BHYUF9163Y",
    empDob: "12/12/2000",
    empDoj: "08/08/2024",
    empDepartment: "Management",
    empDesignation: "BDE",
    empGrade: 4,
    empRole: "Developer",
    empReporting1:"",
    empReporting2:"",
    empAssets:"",
    empStatus: "Inactive",
    empPhoto: PersonOne,
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
    assetDop: "11/09/2000",
    ownershipType: "",
    usageHistory: "",
    assetInvoice: LaptopImage,
    assetQty: "20",
    assetPhoto: LaptopImage,
    assignedEmpId: 876543,
  },
  {
    id: 2,
    assetId: "MOB653NOOBDEV",
    assetType: "MOBILE",
    brandName: "SAMSUNG",
    serialNumber: "SAM43789782Z",
    assetDop: "21/01/2010",
    ownershipType: "",
    usageHistory: "",
    assetInvoice: MobileImage,
    assetQty: "8",
    assetPhoto: MobileImage,
    assignedEmpId: 763221,
  },
  {
    id: 3,
    assetId: "HEAD471BEGDEV",
    assetType: "HEADPHONE",
    brandName: "SONY",
    serialNumber: "SON14375643Z",
    assetDop: "01/11/2015",
    ownershipType: "",
    usageHistory: "",
    assetInvoice: HeadphoneImage,
    assetQty: "4",
    assetPhoto: HeadphoneImage,
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
