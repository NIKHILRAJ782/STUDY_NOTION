import "./App.css";
import { Route,Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/common/Navbar";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Error from "./pages/Error";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import MyProfile from "./components/core/Dashboard/MyProfile";
import Settings from "./components/core/Dashboard/Settings";
import { ACCOUNT_TYPE } from "./utils/constants";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
import { useDispatch, useSelector } from "react-redux";
import Cart from "./components/core/Dashboard/Cart";
import MyCourses from "./components/core/Dashboard/MyCourses";
import AddCourse from "./components/core/Dashboard/AddCourse";
import Issue from "./components/common/Issue";
import EditCourse from "./components/core/Dashboard/EditCourse";
import Catalog from "./pages/Catalog";
import CourseDetails from "./pages/CourseDetails";
import ViewCourse from "./pages/ViewCourse";
import VideoDetails from "./components/core/ViewCourse/VideoDetails";
import InstructorDashboard from "./components/core/Dashboard/InstructorDashboard/Instructor";


function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.profile);
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter relative">
      <Navbar/>
      <Routes>
        <Route path ="/" element={<Home/>} />
        <Route path ="/about" element={<About/>} />
        <Route path ="/contact" element={<Contact/>} />
        <Route path ="courses/:courseId" element={<CourseDetails/>} />
        <Route path ="catalog/:catalogName" element={<Catalog/>} />

        <Route path="login" element={<Login/>} />
        <Route path ="signup" element={<Signup/>} />
        <Route path ="forgot-password" element={<ForgotPassword/>} />
        <Route path ="update-password/:id" element={<UpdatePassword/>} />
        <Route path ="verify-email" element={<VerifyEmail/>} />
        <Route element={
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
          }
        >
          <Route path ="dashboard/my-profile" element={<MyProfile/>} />
          <Route path ="dashboard/Settings" element={<Settings/>} />

          {user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <Route path="dashboard/cart" element={<Cart />} />
              <Route path="dashboard/enrolled-courses" element={<EnrolledCourses />}
              />
            </>
          )}
          {user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
            <>
              <Route path="dashboard/my-courses" element={<MyCourses/>}
              />
              <Route path="dashboard/add-course" element={<AddCourse/>}
              />
              <Route path="dashboard/instructor" element={<InstructorDashboard/>}
              />
              <Route path="dashboard/edit-course/:courseId" element={<EditCourse/>}
              />
            </>
          )}
        </Route>
        <Route element={
          <PrivateRoute>
            <ViewCourse/>
          </PrivateRoute>
        }>
          {
            user?.accountType === ACCOUNT_TYPE.STUDENT  && (
              <Route path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId" element={<VideoDetails/>}/>
              )
            }
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
      <div className="fixed top-[93vh] right-[4vw] lg:right-[2vw] z-[1000]">
        <Issue/>
      </div>
    </div>
  );
}

export default App;
