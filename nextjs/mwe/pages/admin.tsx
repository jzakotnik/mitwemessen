"use client";

import React, { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { v4 as uuidv4 } from "uuid";

// AdminPage.tsx — Tailwind + TypeScript

interface AuthUrl {
  admin: string;
  reader: string;
}

function Impressum({ className = "" }: { className?: string }) {
  return (
    <p className={`text-center text-sm text-gray-500 ${className}`}>
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
  );
}

const Admin: React.FC = () => {
  const [authurl, setAuthurl] = useState<AuthUrl>({
    admin: "Keiner",
    reader: "Keiner",
  });
  const [linkCreated, setLinkCreated] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("");
  const [copied, setCopied] = useState<{ admin: boolean; reader: boolean }>({
    admin: false,
    reader: false,
  });

  const API_ENDPOINT: string | undefined = process.env.NEXT_PUBLIC_API_ENDPOINT;
  const PROFILE_ENDPOINT: string | undefined =
    process.env.NEXT_PUBLIC_PROFILE_ENDPOINT;

  useEffect(() => {
    let t: number | undefined;
    if (copied.admin || copied.reader) {
      t = window.setTimeout(
        () => setCopied({ admin: false, reader: false }),
        1500
      );
    }
    return () => {
      if (t) window.clearTimeout(t);
    };
  }, [copied]);

  const handleCreate: React.MouseEventHandler<HTMLButtonElement> = async (
    event
  ) => {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus("");

    try {
      const authid: AuthUrl = { admin: uuidv4(), reader: uuidv4() };
      const dayselection = {
        mon: true,
        tue: true,
        wed: true,
        thu: true,
        fri: true,
      } as const;

      if (!API_ENDPOINT)
        throw new Error("NEXT_PUBLIC_API_ENDPOINT ist nicht gesetzt.");

      const res = await fetch(`${API_ENDPOINT}/api/insertData`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ authid, dayselection }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `Fehler: ${res.status}`);
      }

      setAuthurl(authid);
      setLinkCreated(true);
      setStatus("Links wurden erzeugt!");
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Unbekannter Fehler beim Erzeugen.";
      console.error(err);
      setStatus(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const adminLink =
    PROFILE_ENDPOINT && linkCreated
      ? `${PROFILE_ENDPOINT}/${authurl.admin}`
      : "";
  const readerLink =
    PROFILE_ENDPOINT && linkCreated
      ? `${PROFILE_ENDPOINT}/${authurl.reader}`
      : "";

  const copy = async (type: "admin" | "reader") => {
    const text = type === "admin" ? adminLink : readerLink;
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied((c) => ({ ...c, [type]: true }));
    } catch (e) {
      console.error("Clipboard error", e);
    }
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2 bg-gray-50">
      {/* Left visual panel */}
      <div className="relative hidden md:block">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/lunch1.jpg')" }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-black/40 to-black/10" />
        <div className="absolute bottom-6 left-6 text-white/90">
          <div className="backdrop-blur-sm bg-white/10 rounded-xl px-4 py-2 text-sm">
            Finde gemeinsame Lunch-Zeiten mit Kolleg:innen
          </div>
        </div>
      </div>

      {/* Right content panel */}
      <div className="flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-xl">
          {/* Avatar / logo */}
          <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-orange-500 text-white shadow-md">
            <span className="text-2xl" aria-hidden>
              🍽️
            </span>
          </div>

          <h1 className="text-2xl font-semibold tracking-tight text-gray-900 text-center">
            Links zum Lunchprofil erzeugen
          </h1>

          <p className="mt-4 text-gray-700 leading-relaxed">
            Was macht dieses Tool? In Zeiten von hybridem Arbeiten ist es
            schwierig rauszufinden, an welchen Tagen man ein gemeinsames
            Lunch-Date machen kann. Ziel ist es, ein kleines Lunch Profil zu
            haben, auf dem steht an welchen Tagen man prinzipiell Zeit hat.
          </p>

          <div className="mt-4 text-gray-700 leading-relaxed">
            <p>
              Wenn Du <i>Erzeugen</i> klickst werden zwei Web-Links erzeugt, mit
              denen Du Dein Lunch-Profil verwalten kannst.
            </p>
            <ul className="mt-2 list-disc pl-5 space-y-1">
              <li>
                Den Leser-Link kannst Du verteilen (z.B. im eMail Footer) und so
                können Deine Kontakte sehen, wann Du potentiell Zeit für Lunch
                hast.
              </li>
              <li>
                Mit dem Admin Link kannst Du Dein Lunch-Profil verändern, also
                halte diesen geheim.
              </li>
            </ul>
          </div>

          {/* Actions card */}
          <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            {/* Status row */}
            <div className="min-h-[1.25rem]" aria-live="polite">
              {status && (
                <div className="text-sm text-emerald-600">{status}</div>
              )}
            </div>

            {/* Generated links */}
            {linkCreated && PROFILE_ENDPOINT ? (
              <div className="space-y-4">
                {/* Admin */}
                <div className="rounded-xl bg-orange-50 p-4 ring-1 ring-orange-200">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-xs uppercase tracking-wide text-orange-700 font-semibold">
                        Admin Link
                      </div>
                      <a
                        href={adminLink}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="mt-1 block break-all font-medium text-orange-900 underline decoration-dotted"
                      >
                        {adminLink}
                      </a>
                    </div>
                    <button
                      type="button"
                      onClick={() => copy("admin")}
                      className="inline-flex items-center gap-2 rounded-lg border border-orange-300 px-3 py-1.5 text-sm font-medium text-orange-800 hover:bg-orange-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-4 w-4"
                      >
                        <path d="M16 1H4a2 2 0 0 0-2 2v12h2V3h12V1Zm1 4H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Zm0 16H8V7h9v14Z" />
                      </svg>
                      {copied.admin ? "Kopiert!" : "Kopieren"}
                    </button>
                  </div>
                </div>

                {/* Reader */}
                <div className="rounded-xl bg-emerald-50 p-4 ring-1 ring-emerald-200">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-xs uppercase tracking-wide text-emerald-700 font-semibold">
                        Nur-Lesen Link
                      </div>
                      <a
                        href={readerLink}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="mt-1 block break-all font-medium text-emerald-900 underline decoration-dotted"
                      >
                        {readerLink}
                      </a>
                    </div>
                    <button
                      type="button"
                      onClick={() => copy("reader")}
                      className="inline-flex items-center gap-2 rounded-lg border border-emerald-300 px-3 py-1.5 text-sm font-medium text-emerald-800 hover:bg-emerald-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-4 w-4"
                      >
                        <path d="M16 1H4a2 2 0 0 0-2 2v12h2V3h12V1Zm1 4H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Zm0 16H8V7h9v14Z" />
                      </svg>
                      {copied.reader ? "Kopiert!" : "Kopieren"}
                    </button>
                  </div>

                  <div className="mt-4 flex justify-center">
                    <div className="rounded-xl bg-white p-3 ring-1 ring-emerald-200">
                      <QRCodeSVG value={readerLink || ""} size={128} />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-sm text-gray-500">
                {PROFILE_ENDPOINT
                  ? "Noch keine Links erzeugt."
                  : "Hinweis: NEXT_PUBLIC_PROFILE_ENDPOINT ist nicht gesetzt."}
              </div>
            )}

            {/* Generate button */}
            <div className="mt-6">
              <button
                type="button"
                onClick={handleCreate}
                disabled={isSubmitting}
                className="relative inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 px-5 py-3 text-white shadow-lg transition hover:from-orange-600 hover:to-amber-600 focus:outline-none focus:ring-4 focus:ring-orange-300 disabled:opacity-60"
              >
                {isSubmitting && (
                  <svg
                    className="h-5 w-5 animate-spin"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                )}
                Erzeugen
              </button>
            </div>

            <Impressum className="mt-6" />
          </div>

          {/* Footer hint for envs */}
          <div className="mt-4 text-xs text-gray-400">
            {(!API_ENDPOINT || !PROFILE_ENDPOINT) && (
              <>
                <div>⚠️ Bitte ENV Variablen setzen:</div>
                <code className="mt-1 block rounded bg-gray-100 px-2 py-1">
                  NEXT_PUBLIC_API_ENDPOINT, NEXT_PUBLIC_PROFILE_ENDPOINT
                </code>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
