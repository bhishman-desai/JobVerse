import { lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import withLayout from "./components/layout/withLayout";
import "./App.css";

const Home = lazy(() => import("./pages/Home"));
const FaqPage = lazy(() => import("./pages/Faq"));
const ContactPage = lazy(() => import("./pages/Contact"));

/* Auth Pages */
const UserNamePage = lazy(() => import("./pages/auth/Username"));
const PasswordPage = lazy(() => import("./pages/auth/Password"));
const RegisterPage = lazy(() => import("./pages/auth/Register"));
const ProfilePage = lazy(() => import("./pages/auth/Profile"));
const RecoveryPage = lazy(() => import("./pages/auth/Recovery"));
const ResetPage = lazy(() => import("./pages/auth/Reset"));

/* Recruiter Pages*/
const JobCreation = lazy(()=>import("./pages/recruiter/JobCreation"))
const JobsDashboard = lazy(()=>import("./pages/recruiter/JobsDashboard"))
const UpdateJob = lazy(()=>import("./pages/recruiter/UpdateJob"))
const JobDetail = lazy(()=>import("./pages/recruiter/JobDetail"))

/* Page Not Found */
const PageNotFoundPage = lazy(() => import("./components/pageNotFound"));

function App() {
  return (
    <Box>
      <Router>
        <Routes>
          <Route element={withLayout(Home)()} path="/" />
          <Route element={withLayout(PageNotFoundPage)()} path="/about" />
          <Route element={withLayout(FaqPage)()} path="/faq" />
          <Route element={withLayout(ContactPage)()} path="/contact-us" />

          {/*Auth Routes*/}
          <Route element={withLayout(UserNamePage)()} path="/login" />
          <Route element={withLayout(PasswordPage)()} path="/password" />
          <Route element={withLayout(RegisterPage)()} path="/register" />
          <Route element={withLayout(ProfilePage)()} path="/profile" />
          <Route element={withLayout(RecoveryPage)()} path="/recovery" />
          <Route element={withLayout(ResetPage)()} path="/reset" />

          {/* Recruiter Routes */}
          <Route element={withLayout(JobCreation)()} path="/recruiter/create-job" />
          <Route element={withLayout(JobsDashboard)()} path="/recruiter/dashboard" />
          <Route element={withLayout(JobDetail)()}path="/recruiter/job/:jobId" />

          <Route element={withLayout(UpdateJob)()} path="/recruiter/update-job/:id" />

          {/*404 Page Not Found*/}
          <Route element={withLayout(PageNotFoundPage)()} path="*" />
        </Routes>
      </Router>
    </Box>
  );
}

export default App;
