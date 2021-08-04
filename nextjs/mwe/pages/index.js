import React, { useState } from "react";
import { useRouter } from "next/router";

const IndexRedirect = () => {
  return <p>Redirecting to Admin page</p>;
};

// This gets called on every request
export async function getServerSideProps(context) {
  return {
    redirect: {
      destination: "/admin",
      permanent: false,
    },
  };
}

export default IndexRedirect;
