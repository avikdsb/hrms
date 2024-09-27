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
import { useDispatch } from "react-redux";
import { getContentPermission } from "./Store/ContentConfigurations/contentconfig.actions";
import { useEffect } from "react";
import LeaveApprovalsPage from "./pages/approvalsPage/leaveApprovalsPage";
import AttandenceRegularization from "./pages/approvalsPage/AttandenceRegularization";
import TimeSheet from "./pages/approvalsPage/TimeSheet";

function App() {
  const { user } = useUser();

  // rertrive the data from local storage while application is mounted
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getContentPermission()) // calling redux actions
  }, [dispatch])

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

              {/* reports sub menu */}
              <Route
                path="/reports/attendance"
                element={<AttendanceReportPage />}
              />
              <Route path="/reports/leave" element={<LeaveReportPage />} />
              <Route
                path="/reports/performance"
                element={<PerformanceReportPage />}
              />

              {/* approval sub menu */}
              <Route
                path="/approval/leave-approval"
                element={<LeaveApprovalsPage />}
              />

              <Route
                path="/approval/attandance-egularzation"
                element={<AttandenceRegularization />}
              />

              <Route
                path="/approval/timesheet-approval"
                element={<TimeSheet />}
              />

            </Routes>
          </main>
        </div>
      )}
    </>
  );
}

export default App;
