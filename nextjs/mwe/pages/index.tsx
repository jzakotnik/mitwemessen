import React from "react";

const IndexRedirect = () => {
  return <p>Redirecting to Admin page</p>;
};

// This gets called on every request
export async function getServerSideProps() {
  return {
    redirect: {
      destination: "/admin",
      permanent: false,
    },
  };
}

export default IndexRedirect;
