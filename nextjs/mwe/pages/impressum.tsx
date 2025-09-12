"use client";

import React from "react";

// Tailwind + TypeScript (no Material UI)

interface Props {
  className?: string;
}

const Impressum: React.FC<Props> = ({ className = "" }) => {
  const API_ENDPOINT: string | undefined = process.env.NEXT_PUBLIC_API_ENDPOINT;
  const href = API_ENDPOINT ? `${API_ENDPOINT}/` : "#";
  const needsEnv = !API_ENDPOINT;

  return (
    <div className={className}>
      <p className="text-center text-sm text-gray-600">
        Auch ein Lunch Profil speichern:{" "}
        <a
          href={href}
          className="underline decoration-dotted hover:text-gray-800"
          target={needsEnv ? undefined : "_blank"}
          rel={needsEnv ? undefined : "noreferrer noopener"}
          title={
            needsEnv ? "NEXT_PUBLIC_API_ENDPOINT ist nicht gesetzt" : undefined
          }
        >
          Hier entlang
        </a>
      </p>
      <p className="text-center text-sm text-gray-500">
        Impressum{" "}
        <a
          href="https://github.com/jzakotnik"
          target="_blank"
          rel="noreferrer noopener"
          className="underline decoration-dotted hover:text-gray-700"
        >
          jzakotnik github
        </a>{" "}
        {new Date().getFullYear()}.
      </p>
    </div>
  );
};

export default Impressum;
