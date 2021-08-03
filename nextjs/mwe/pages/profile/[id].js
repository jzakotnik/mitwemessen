import React, { useState } from "react";
import { useRouter } from "next/router";
import LunchProfile from "../lunchprofile";

const Profile = (data) => {
  const router = useRouter();
  const { id } = router.query;
  console.log("Rendering data");
  console.log(data, id);

  return (
    <LunchProfile
      lunchdata={data.lunchprofile}
      authid={id}
      reader={data.reader}
      admin={data.admin}
      userName="Jure"
    />
  );
};

// This gets called on every request
export async function getServerSideProps(context) {
  const { id } = context.query;
  console.log("Page get server side props for page: " + id);

  const res = await fetch(
    process.env.NEXT_PUBLIC_API_ENDPOINT + "/api/getData?id=" + id
  );
  const data = await res.json();
  console.log("Received response from API");
  console.log(data);

  // Pass data to the page via props
  return { props: data };
}

export default Profile;
