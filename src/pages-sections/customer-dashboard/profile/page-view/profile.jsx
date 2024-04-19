"use client";
import { Fragment } from "react";
import Person from "@mui/icons-material/Person"; // Local CUSTOM COMPONENT
import UserInfo from "../user-info";
import UserAnalytics from "../user-analytics";
import DashboardHeader from "../../dashboard-header"; // CUSTOM DATA MODEL
import { OrderCom } from "components/orderCom";
import { ShareCom } from "components/shareCom";
const ProfilePageView = async ({ user, authToken }) => {
  if(user.error) {
    window.location.href = "/login"
  }
  return (
    <Fragment>
      {/* TITLE HEADER AREA */}
      <DashboardHeader
        Icon={Person}
        title="My Profile"
        buttonText="Edit Profile"
        href={`/profile/edit/${authToken}`}
      />

      {/* USER PROFILE INFO */}
      <UserAnalytics user={user} />

      {/* USER PROFILE INFO */}
      <UserInfo user={user} />

      <OrderCom user={user} />
      <ShareCom user={user} />
    </Fragment>
  );
};

export default ProfilePageView;
