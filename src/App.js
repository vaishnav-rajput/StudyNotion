import "./App.css";
import {Route, Routes} from "react-router-dom"
import Home from "./pages/Home"
import Navbar from "./components/common/Navbar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import OpenRoute from "./components/core/auth/OpenRoute";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import About from "./pages/About";
import MyProfile from "./components/core/Dashboard/MyProfile";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/core/auth/PrivateRoute";
import Error from "./pages/Error"
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
import Settings from "./components/core/Dashboard/Settings/index"
import { ACCOUNT_TYPE } from "./utils/constants";
import { useSelector } from "react-redux";
import AddCourse from "./components/core/Dashboard/AddCourse/index";
import MyCourses from "./components/core/Dashboard/MyCourses";
import EditCourse from "./components/core/Dashboard/EditCourse";
import Catalog from "./pages/Catalog"
import CourseDetails from "./pages/CourseDetails";
import Cart from "./components/core/Dashboard/Cart";
import ViewCourse from "./pages/ViewCourse";

function App() {
  const {user} = useSelector((state) => state.profile)
  return (
   <div className="w-screen min-h-screen bg-richblack-900 flex-col font-inter">
    <Navbar/>
    <Routes>
      <Route path="/" element={
      <OpenRoute>
        <Home/>
      </OpenRoute> 
      }/>
        <Route path="catalog/:catalogName" element={<Catalog />} />
        <Route path="courses/:courseId" element={<CourseDetails />} />

      <Route path="/signup" element={
      <OpenRoute>
        <Signup/>
      </OpenRoute>
      }/>
      <Route path="/login" element={<OpenRoute><Login/></OpenRoute>}/>
      <Route path="/forgot-password" element={<OpenRoute><ForgotPassword/></OpenRoute>}/>
      <Route path="/update-password/:id" element={
      <OpenRoute>
        <UpdatePassword/>
      </OpenRoute>
      }/>
      <Route path="/verify-email" element={
      <OpenRoute>
        <VerifyEmail/>
      </OpenRoute>
      }/>
      <Route path="/about" element={
      <OpenRoute>
        <About/>
      </OpenRoute>
      }/>


      <Route
        element={
          <PrivateRoute>
            <Dashboard/>
          </PrivateRoute>
        }
      >
        <Route path="dashboard/my-profile" element={<MyProfile />} />
        <Route path="dashboard/settings" element={<Settings />} />


        {
          user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
                          <Route path="dashboard/enrolled-courses" element={<EnrolledCourses/>} />
                          <Route path="dashboard/cart" element={<Cart />}/>
            </>

           ) }

          {
          user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
            <>
                          <Route path="dashboard/add-course" element={<AddCourse/>} />
                          <Route path="dashboard/my-courses" element={<MyCourses/>} />
                          <Route path="dashboard/edit-course/:courseId" element={<EditCourse/>} />
                          

            </>

           ) }
    
        </Route> 

        <Route element={
          <PrivateRoute>
            <ViewCourse/>
          </PrivateRoute>}>
          {
            user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <>
                <Route path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId" 
                  element={<VideoDetails/>}
                />
              </>
            )
          }
        </Route>

      <Route path="*" element={<Error />}/>
    </Routes>
   </div>
  ); 
}

export default App;
