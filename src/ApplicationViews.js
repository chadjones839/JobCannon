import React from "react";
import { Route, Redirect } from "react-router-dom";

import Home from "./components/auth/Home.jsx";
import Register from "./components/auth/Register.jsx";
import RegisterEmployer from "./components/auth/RegisterEmployer.jsx";
import RegisterCandidate from "./components/auth/RegisterCandidate.jsx";
import Login from "./components/auth/Login.jsx";

import EmployerDiscovery from "./components/discovery/EmployerDiscoveryList.jsx";
import CandidateDiscovery from "./components/discovery/CandidateDiscoveryList.jsx";

import EmployerProfile from "./components/profile/EmployerProfile.jsx";
import EditEmployer from "./components/profile/EditEmployerProfile.jsx";
import CandidateProfile from "./components/profile/CandidateProfile.jsx";
import EditCandidate from "./components/profile/EditCandidateProfile.jsx";
import UserDetail from "./components/profile/UserDetail.jsx";

import Chat from "./components/chat/ChatList.jsx";
import MessageList from "./components/messages/MessageList.jsx";

import JobList from "./components/jobs/JobListingList.jsx";
import JobDetail from "./components/jobs/JobDetail.jsx";
import JobListingEdit from "./components/jobs/JobListingEdit.jsx";
import JobForm from "./components/jobs/JobForm.jsx";
import CandidateJobListings from "./components/jobs/CandidateJobListings.jsx";

import UserResume from "./components/resumes/UserResume.jsx";
import ResumeList from "./components/resumes/ResumeList.jsx";
import WorkHistory from "./components/resumes/WorkHistoryForm.jsx";

const ApplicationViews = (props) => {

  const sessionUser = JSON.parse(sessionStorage.getItem("user"));
  const hasUser = props.hasUser;
  const setUser = props.setUser;

  return (
    <React.Fragment>
      <Route 
        exact
        path="/" 
        render={props => {
          return <Home />
      }} 
      />
      <Route 
        exact
        path="/register" 
        render={props => {
          return <Register {...props} />
      }} 
      />
      <Route 
        exact
        path="/register-employer" 
        render={props => {
          return <RegisterEmployer 
            setUser={setUser} 
            {...props} />
      }} 
      />
      <Route 
        exact
        path="/register-candidate" 
        render={props => {
          return <RegisterCandidate 
            setUser={setUser} 
            {...props} />
      }} 
      />
      <Route 
        exact
        path="/login" 
        render={props => {
          return <Login 
            setUser={setUser} 
            {...props} />
      }} 
      />
      <Route 
        exact
        path="/profile" 
        render={props => {
          if (hasUser && sessionUser.accountType === "employer") {
            return <EmployerProfile {...props} />
          } 
          if (hasUser && sessionUser.accountType === "candidate") {
            return <CandidateProfile {...props} />
          } 
          else {
            return <Redirect to="/" />
          }
      }} 
      />
      <Route
        exact
          path="/users/:userId(\d+)/edit"
          render={props => {
            if (hasUser && sessionUser.accountType === "employer") {
              return <EditEmployer 
                {...props} 
                userId={props.match.params.userId} />
            }
            else if (hasUser && sessionUser.accountType === "candidate") {
              return <EditCandidate 
                {...props} 
                userId={props.match.params.userId} />
            } 
      }}
      />
      <Route
        exact
          path="/users/:userId(\d+)/details"
          render={props => {
            return <UserDetail
              {...props} 
              userId={props.match.params.userId} />
          }}
      />
      <Route 
        exact
        path="/discovery" 
        render={props => {
          if (hasUser && sessionUser.accountType === "employer") {
            return <CandidateDiscovery {...props} />
          } 
          if (hasUser && sessionUser.accountType === "candidate") {
            return <EmployerDiscovery {...props} />
          } 
          else {
            return <Redirect to="/" />
          }
      }} 
      />
      <Route 
        exact
        path="/chat" 
        render={props => {
          if (hasUser) {
            return <Chat {...props} />
          }
          else {
            return <Redirect to="/" />
          }
      }} 
      />
      <Route 
        exact
        path="/chats/:chatId(\d+)" 
        render={props => {
          return <MessageList 
            chatId={parseInt(props.match.params.chatId)}
            {...props} />
      }} 
      />

      <Route 
        exact
        path="/messages" 
        render={props => {
          if (hasUser) {
            return <MessageList {...props} />
          }
          else {
            return <Redirect to="/" />
          }
      }} 
      />
      <Route 
        exact
        path="/jobs" 
        render={props => {
            return <JobList 
            {...props} />
        }} 
      />
      <Route 
        exact
        path="/jobs/:userId(\d+)/listings" 
        render={props => {
            return <JobList 
            userId={parseInt(props.match.params.userId)}
            {...props} />
        }} 
      />
      <Route 
        exact
        path="/companies" 
        render={props => {
          return <CandidateJobListings {...props} />
        }} 
      />
      <Route
        exact
        path="/jobs/:jobId(\d+)"
        render={props => {
          return <JobDetail
          jobId={parseInt(props.match.params.jobId)} 
          {...props} />
        }}
      />
      <Route
        exact
        path="/jobs/:jobId(\d+)/edit"
        render={props => {
          return <JobListingEdit 
            {...props} 
            jobId={props.match.params.jobId} />
        }} 
      />
      <Route
        exact
        path="/jobs/new"
        render={props => {
          return <JobForm
            {...props} />
        }} 
      />
      <Route 
        exact
        path="/resume" 
        render={props => {
          return <UserResume {...props} />
        }} 
      />
      <Route 
        exact
        path="/candidates" 
        render={props => {
          return <ResumeList {...props} />
        }} 
      />
      <Route
        exact
        path="/work-history/new"
        render={props => {
          return <WorkHistory
            {...props} />
        }} 
      />
    </React.Fragment>
  )
}


export default ApplicationViews