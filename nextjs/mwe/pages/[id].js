import React, { useState } from "react";
import LunchProfile from "./lunchprofile";

export default function profile({ id }) {
  console.log("Rendering page..");
  console.log(id);
  return <LunchProfile userName={id} />;
}

export function getProfileData(id) {
  console.log(id);
  // Combine the data with the id
  return id;
}

export async function getStaticPaths() {
  const paths = [{ params: { id: "jureUUID" } }];
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const id = getProfileData(params.id);
  console.log("Get Static Props content: " + id);
  return {
    props: {
      id,
    },
  };
}
