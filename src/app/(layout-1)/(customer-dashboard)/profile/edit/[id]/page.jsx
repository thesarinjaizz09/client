"use client"
import { ProfileEditPageView } from "pages-sections/customer-dashboard/profile/page-view"; // API FUNCTIONS

import { getUser } from "utils/__api__/auth";

export default async function ProfileEdit({
  params
}) {
  const userToken = String(params.id)
  const user = await getUser({ authToken: userToken });
  return <ProfileEditPageView user={user} authToken={userToken} />;
}