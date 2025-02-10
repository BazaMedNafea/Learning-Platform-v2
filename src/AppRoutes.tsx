import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/homepage/Homepage";
import ClassPage from "./pages/classpage/ClassPage";
import CourseContentPage from "./pages/coursecontent/CourseContentPage"; // Import the new page
import Layout from "./layouts/Layout";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Homepage />
            </Layout>
          }
        />
        <Route
          path="/class/:classId"
          element={
            <Layout>
              <ClassPage />
            </Layout>
          }
        />
        {/* Add the new route for Course Content */}
        <Route
          path="/course/:courseId"
          element={
            <Layout>
              <CourseContentPage />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
