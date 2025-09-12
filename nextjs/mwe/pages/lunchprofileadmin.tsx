"use client";

import React, { useEffect, useMemo, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { LunchData } from "../types/lunch";

// Tailwind + TypeScript refactor (no Material UI)
// Replaces switches, slider, accordion, buttons, layout with Tailwind equivalents.

interface LunchProfileAdminProps {
  authid: string; // admin id
  readerid: string; // public read-only id
  lunchdata: LunchData;
}

// Optional inline Impressum (replace/remove if you have your own component)
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

const dayLabels: Record<
  keyof Pick<LunchData, "mon" | "tue" | "wed" | "thu" | "fri">,
  string
> = {
  mon: "Montag",
  tue: "Dienstag",
  wed: "Mittwoch",
  thu: "Donnerstag",
  fri: "Freitag",
};

const topicMarks = [
  { value: 0, label: "Lieber Privates" },
  { value: 50, label: "Ist mir egal" },
  { value: 100, label: "Lieber Arbeit" },
];

const LunchProfileAdmin: React.FC<LunchProfileAdminProps> = ({
  authid,
  readerid,
  lunchdata,
}) => {
  const [lunchProfile, setLunchProfile] = useState<LunchData>({
    mon: true,
    tue: true,
    wed: true,
    thu: true,
    fri: true,
    lunchtopic: 50,
  });
  const [saving, setSaving] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);

  const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;
  const PROFILE_ENDPOINT = process.env.NEXT_PUBLIC_PROFILE_ENDPOINT;

  useEffect(() => {
    if (lunchdata) setLunchProfile(lunchdata);
  }, [lunchdata]);

  const readerLink = useMemo(() => {
    return PROFILE_ENDPOINT ? `${PROFILE_ENDPOINT}/${readerid}` : "";
  }, [PROFILE_ENDPOINT, readerid]);

  const handleCopyReader = async () => {
    if (!readerLink) return;
    try {
      await navigator.clipboard.writeText(readerLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch (e) {
      console.error("Copy failed", e);
    }
  };

  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = async (
    event
  ) => {
    event.preventDefault();
    setSaving(true);
    setStatus("");

    try {
      if (!API_ENDPOINT)
        throw new Error("NEXT_PUBLIC_API_ENDPOINT ist nicht gesetzt.");

      const data = { lunchProfile, authid: { admin: authid } };
      const res = await fetch(`${API_ENDPOINT}/api/updateData`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `Fehler: ${res.status}`);
      }

      setStatus("Gespeichert!");
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Unbekannter Fehler beim Speichern.";
      setStatus(message);
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const toggleDay = (day: keyof LunchData) => {
    setLunchProfile((prev) => ({ ...prev, [day]: !prev[day] }));
  };

  const handleTopic = (value: number) => {
    setLunchProfile((prev) => ({ ...prev, lunchtopic: value }));
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2 bg-gray-50">
      {/* Left image panel */}
      <div className="relative hidden md:block">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/lunch1.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-black/40 to-black/10" />
        <div className="absolute bottom-6 left-6 text-white/90">
          <div className="backdrop-blur-sm bg-white/10 rounded-xl px-4 py-2 text-sm">
            Mein Lunch Profil
          </div>
        </div>
      </div>

      {/* Right content panel */}
      <div className="flex items-start md:items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-xl">
          {/* Header */}
          <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-orange-500 text-white shadow-md">
            <span className="text-2xl" aria-hidden>
              🍽️
            </span>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900 text-center">
            Mein Lunch Profil
          </h1>

          {/* Form Card */}
          <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            {/* Availability Switches */}
            <section>
              <h2 className="text-sm font-semibold text-gray-800">
                Typischerweise Zeit am
              </h2>
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(Object.keys(dayLabels) as Array<keyof typeof dayLabels>).map(
                  (key) => (
                    <label
                      key={key}
                      className="flex items-center justify-between rounded-xl border border-gray-200 p-3 shadow-xs"
                    >
                      <span className="text-gray-800">{dayLabels[key]}</span>
                      {/* Toggle */}
                      <button
                        type="button"
                        role="switch"
                        aria-checked={lunchProfile[key]}
                        onClick={() => toggleDay(key as keyof LunchData)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                          lunchProfile[key] ? "bg-emerald-500" : "bg-gray-300"
                        }`}
                      >
                        <span
                          className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition ${
                            lunchProfile[key]
                              ? "translate-x-5"
                              : "translate-x-1"
                          }`}
                        />
                      </button>
                    </label>
                  )
                )}
              </div>
            </section>

            {/* Topic Slider */}
            <section className="mt-8">
              <h2 className="text-sm font-semibold text-gray-800">
                Lieblingsthema beim Essen
              </h2>

              <div className="mt-4">
                <input
                  type="range"
                  min={0}
                  max={100}
                  step={10}
                  value={lunchProfile.lunchtopic}
                  onChange={(e) => handleTopic(Number(e.target.value))}
                  aria-label="Essensthema"
                  className="w-full appearance-none rounded-lg bg-gradient-to-r from-orange-200 via-amber-200 to-yellow-200 h-2 outline-none"
                />
                <div className="mt-2 flex justify-between text-xs text-gray-600">
                  {topicMarks.map((m) => (
                    <span
                      key={m.value}
                      className={
                        m.value === 50 ? "font-medium text-gray-800" : ""
                      }
                    >
                      {m.label}
                    </span>
                  ))}
                </div>
                <div className="mt-2 text-right text-sm text-gray-700">
                  {lunchProfile.lunchtopic}%
                </div>
              </div>
            </section>

            {/* Save Button + Status */}
            <div className="mt-8 flex items-center gap-3">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={saving}
                className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 px-5 py-3 text-white shadow-lg transition hover:from-orange-600 hover:to-amber-600 focus:outline-none focus:ring-4 focus:ring-orange-300 disabled:opacity-60"
              >
                {saving && (
                  <svg
                    className="mr-2 h-5 w-5 animate-spin"
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
                Speichern
              </button>
              <div className="min-h-[1.25rem] text-sm text-emerald-700">
                {status}
              </div>
            </div>

            {/* Accordion: Public Links */}
            <details className="mt-6 group rounded-2xl border border-gray-200 bg-gray-50 p-4 open:bg-white open:shadow-sm">
              <summary className="flex cursor-pointer list-none items-center justify-between">
                <span className="font-medium text-gray-800">
                  Öffentliche Links (read-only)
                </span>
                <svg
                  className="h-5 w-5 transition-transform group-open:rotate-180"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </summary>

              <div className="mt-4 space-y-3">
                <div>
                  <div className="text-xs uppercase tracking-wide text-emerald-700 font-semibold">
                    Nur-Lesen Link
                  </div>
                  {PROFILE_ENDPOINT ? (
                    <>
                      <a
                        href={readerLink}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="mt-1 block break-all font-medium text-emerald-900 underline decoration-dotted"
                      >
                        {readerLink}
                      </a>
                      <div className="mt-2 flex items-center gap-2">
                        <button
                          type="button"
                          onClick={handleCopyReader}
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
                          {copied ? "Kopiert!" : "Kopieren"}
                        </button>
                      </div>
                      <div className="mt-4 flex justify-center">
                        <div className="rounded-xl bg-white p-3 ring-1 ring-emerald-200">
                          <QRCodeSVG value={readerLink} size={128} />
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="text-sm text-gray-500">
                      Hinweis: NEXT_PUBLIC_PROFILE_ENDPOINT ist nicht gesetzt.
                    </div>
                  )}
                </div>
              </div>
            </details>
          </div>

          <Impressum className="mt-6" />

          {/* ENV hint */}
          <div className="mt-2 text-xs text-gray-400">
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

export default LunchProfileAdmin;
