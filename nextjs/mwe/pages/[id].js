import React, { useState } from "react";

export default function profile({ id }) {
  console.log("Rendering page..");
  console.log(id.id);
  return <p>hallo {id}</p>;
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
