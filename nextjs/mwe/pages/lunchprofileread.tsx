"use client";

import React, { useEffect, useMemo, useState } from "react";
import { LunchData } from "../types/lunch";

interface LunchProfileReadProps {
  lunchdata: LunchData;
  authid?: string; // not used on read-only view
  reader?: string; // not used directly, but kept for parity
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

type DayKey = "mon" | "tue" | "wed" | "thu" | "fri";

const dayLabels: { key: DayKey; label: string }[] = [
  { key: "mon", label: "Montag" },
  { key: "tue", label: "Dienstag" },
  { key: "wed", label: "Mittwoch" },
  { key: "thu", label: "Donnerstag" },
  { key: "fri", label: "Freitag" },
];
const moodEmoji = (ok: boolean) => (ok ? "😊" : "🙁");

const LunchProfileRead: React.FC<LunchProfileReadProps> = ({ lunchdata }) => {
  const [lunchProfile, setLunchProfile] = useState<LunchData>({
    mon: true,
    tue: true,
    wed: true,
    thu: true,
    fri: true,
    lunchtopic: 50,
  });

  useEffect(() => {
    if (lunchdata) setLunchProfile(lunchdata);
  }, [lunchdata]);

  const topicLabel = useMemo(() => {
    const v = lunchProfile.lunchtopic;
    if (v <= 33) return "Lieber Privates";
    if (v >= 67) return "Lieber Arbeit";
    return "Ist mir egal";
  }, [lunchProfile.lunchtopic]);

  return (
    <div className="min-h-screen grid md:grid-cols-2 bg-gray-50">
      {/* Left image panel */}
      <div className="relative hidden md:block">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/lunch1.jpg')" }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-black/40 to-black/10" />
        <div className="absolute bottom-6 left-6 text-white/90">
          <div className="backdrop-blur-sm bg-white/10 rounded-xl px-4 py-2 text-sm">
            Lunch – Read Only
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
          <p className="mt-1 text-center text-sm text-gray-600">
            An diesen Tagen habe ich typischerweise Zeit für einen Lunch
          </p>

          {/* Card */}
          <div className="mt-6 space-y-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            {/* Days table */}
            <section>
              <ul className="divide-y divide-gray-100 rounded-xl border border-gray-100 bg-white">
                {dayLabels.map(({ key, label }) => (
                  <li
                    key={key}
                    className="flex items-center justify-between p-3"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`grid h-10 w-10 place-items-center rounded-full ${
                          lunchProfile[key]
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-rose-100 text-rose-700"
                        }`}
                      >
                        <span className="text-xl" aria-hidden>
                          {moodEmoji(lunchProfile[key])}
                        </span>
                      </div>
                      <span className="text-gray-800">{label}</span>
                    </div>
                    <span
                      className={`text-sm ${
                        lunchProfile[key] ? "text-emerald-700" : "text-rose-700"
                      }`}
                    >
                      {lunchProfile[key] ? "Ja" : "Eher nicht"}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Topic gauge */}
            <section>
              <h2 className="text-sm font-semibold text-gray-800 mb-2">
                Am liebsten spreche ich über:
              </h2>
              <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                <span>Privat</span>
                <span>Ist mir egal</span>
                <span>Arbeit</span>
              </div>
              <div className="h-3 w-full rounded-full bg-gray-200 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-sky-400 via-amber-400 to-lime-500"
                  style={{
                    width: `${Math.max(
                      0,
                      Math.min(100, lunchProfile.lunchtopic)
                    )}%`,
                  }}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={lunchProfile.lunchtopic}
                  role="progressbar"
                />
              </div>
              <div className="mt-2 text-sm text-gray-700">
                {topicLabel} ({lunchProfile.lunchtopic}%)
              </div>
            </section>
          </div>

          <Impressum className="mt-6" />
        </div>
      </div>
    </div>
  );
};

export default LunchProfileRead;
