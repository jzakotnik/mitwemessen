import React, { useState } from "react";
import { useRouter } from "next/router";
import LunchProfile from "../lunchprofile";

const Profile = (data) => {
  const router = useRouter();
  const { id } = router.query;
  console.log("Rendering data");
  console.log(data);

  return (
    <LunchProfile
      lunchdata={data.lunchprofile}
      admin={data.admin}
      userName="Jure"
    />
  );
};

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(
    "http://localhost:3000/api/getData?id=48bf4e6a-c92e-4d7c-9fad-6e141685fb31"
  );
  const data = await res.json();
  console.log("Received response from API");
  console.log(data);

  // Pass data to the page via props
  return { props: data };
}

export default Profile;
