import { Route, Routes } from "react-router-dom";
import { LeftSidebar, TopNavbar } from "./sections";
import {
  AddAsset,
  AddEmployee,
  Assets,
  AttendanceReportPage,
  Dashboard,
  Employees,
  LeaveReportPage,
  PerformanceReportPage,
  RoleManage,
} from "./pages";
import { useUser } from "./context/userContext";
import Signin from "./components/signin/signin";
import ProtectedRoute from "./routes/protectedRoute";

function App() {
  const { user } = useUser();

  return (
    <>
      {!user ? (
        <Signin />
      ) : (
        <div className="app">
          <LeftSidebar />
          <main className="content">
            <TopNavbar />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              {/* Secure /roles and /roles/addRole for Admin only */}
              <Route
                path="/roles"
                element={
                  <ProtectedRoute role="Admin">
                    <RoleManage />
                  </ProtectedRoute>
                }
              />

              <Route path="/employees" element={<Employees />} />
              <Route path="/employees/addEmployee" element={<AddEmployee />} />
              <Route path="/assets" element={<Assets />} />
              <Route path="/assets/addAsset" element={<AddAsset />} />
              <Route
                path="/reports/attendance"
                element={<AttendanceReportPage />}
              />
              <Route path="/reports/leave" element={<LeaveReportPage />} />
              <Route
                path="/reports/performance"
                element={<PerformanceReportPage />}
              />
            </Routes>
          </main>
        </div>
      )}
    </>
  );
}

export default App;
