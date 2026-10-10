"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { areas } from "@/lib/site";

export function CoverageSearch() {
  const [q, setQ] = useState("");
  const list = useMemo(() => areas.filter((a) => a.name.toLowerCase().includes(q.trim().toLowerCase())), [q]);

  return (
    <div>
      <div className="field cov-search">
        <label htmlFor="cov-q">Search your area</label>
        <input id="cov-q" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Type an area name" aria-controls="cov-list" />
      </div>
      <ul id="cov-list" className="cov-list" aria-live="polite">
        {list.map((a) => (
          <li key={a.name}>
            <span>{a.name}</span>
            <span className="pills">
              <span className={`pill ${a.fiber ? "on" : ""}`}>Fiber</span>
              <span className={`pill ${a.wireless ? "on" : ""}`}>Wireless</span>
            </span>
          </li>
        ))}
        {list.length === 0 && (
          <li>
            <span>“{q}” isn&apos;t on our published list yet.</span>
            <Link className="btn btn-primary" href="/contact/?type=coverage">Request a free site survey</Link>
          </li>
        )}
      </ul>
    </div>
  );
}
