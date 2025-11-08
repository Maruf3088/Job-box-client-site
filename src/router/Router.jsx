import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import JobDetails from "../pages/JobDetails";
import PrivateRoute from "./PrivateRoute";
import JobApply from "../pages/JobApply";
import MyJobApplication from "../pages/MyJobApplication";
import AddjobPost from "../pages/AddjobPost";
import MyPostedJobs from "../pages/MyPostedJobs";
import ViewApplicants from "../pages/ViewApplicants";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <h1>Route Not found</h1>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/jobs/:id",
        element: (
          <PrivateRoute>
            <JobDetails></JobDetails>
          </PrivateRoute>
        ),
        loader: ({ params }) => {
          return fetch(`http://localhost:3000/jobs/${params.id}`);
        },
      },
      {
        path: "/job-apply/:id",
        element: (
          <PrivateRoute>
            <JobApply></JobApply>
          </PrivateRoute>
        ),
        loader: ({ params }) => {
          return fetch(`http://localhost:3000/jobs/${params.id}`);
        },
      },
      {
        path: "/my-applications",
        element: (
          <PrivateRoute>
            <MyJobApplication></MyJobApplication>
          </PrivateRoute>
        ),
      },
      {
        path: "/add-job-post",
        element: (
          <PrivateRoute>
            <AddjobPost></AddjobPost>
          </PrivateRoute>
        ),
      },
      {
        path: "/my-posted-jobs",
        element: (
          <PrivateRoute>
            <MyPostedJobs></MyPostedJobs>
          </PrivateRoute>
        ),
      },
      {
        path: "/job-applicants/:id",
        element: (
          <PrivateRoute>
            <ViewApplicants></ViewApplicants>
          </PrivateRoute>
        ),
        loader:({params})=>{
          return fetch(`http://localhost:3000/job-applications/${params.id}`)
        }
      },
    ],
  },
]);

export default router;
