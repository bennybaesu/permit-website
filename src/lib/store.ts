import { useCallback, useEffect, useState } from "react";
import type { Job } from "../types";
import { SEED_JOBS } from "../data/seed";

/**
 * PHASE 1 STORAGE.
 *
 * Jobs live in the browser's localStorage. That means:
 *   - Edits made in /admin persist on THAT machine and THAT browser only.
 *   - Your wife editing on her laptop will not change what a client sees.
 *
 * This is deliberate for launch: it lets you use the real UI while you
 * validate the workflow, with zero backend and zero hosting cost. When you
 * outgrow it, swap the four functions below for fetch() calls against a real
 * API and nothing else in the app has to change.
 */

const KEY = "permit-track:jobs:v1";

function read(): Job[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return SEED_JOBS;
    const parsed = JSON.parse(raw) as Job[];
    return Array.isArray(parsed) && parsed.length ? parsed : SEED_JOBS;
  } catch {
    return SEED_JOBS;
  }
}

function write(jobs: Job[]): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(jobs));
  } catch {
    // Storage full or blocked — fail quietly, the UI still works in memory.
  }
  window.dispatchEvent(new Event("permit-track:changed"));
}

export function getJobs(): Job[] {
  return read();
}

export function saveJob(job: Job): void {
  const jobs = read();
  const i = jobs.findIndex(
    (j) => j.locator.toUpperCase() === job.locator.toUpperCase()
  );
  if (i >= 0) jobs[i] = job;
  else jobs.push(job);
  write(jobs);
}

export function deleteJob(locator: string): void {
  write(read().filter((j) => j.locator.toUpperCase() !== locator.toUpperCase()));
}

export function resetJobs(): void {
  write(SEED_JOBS);
}

/**
 * The public lookup. Matches locator exactly (case-insensitive) and requires
 * the second factor to prefix-match one of the job's verifiers.
 */
export function findJob(locator: string, verifier: string): Job | null {
  const code = locator.trim().toUpperCase();
  const v = verifier.trim().toLowerCase();
  if (!code || !v) return null;
  const job = read().find((j) => j.locator.toUpperCase() === code);
  if (!job) return null;
  const ok = job.verifiers.some(
    (x) => x.startsWith(v) || v.startsWith(x)
  );
  return ok ? job : null;
}

/** Live list of jobs that re-renders when the store changes. */
export function useJobs(): Job[] {
  const [jobs, setJobs] = useState<Job[]>(() => read());
  const sync = useCallback(() => setJobs(read()), []);
  useEffect(() => {
    window.addEventListener("permit-track:changed", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("permit-track:changed", sync);
      window.removeEventListener("storage", sync);
    };
  }, [sync]);
  return jobs;
}

/** Generates the next locator in the RC-#### series. */
export function nextLocator(): string {
  const nums = read()
    .map((j) => parseInt(j.locator.replace(/\D/g, ""), 10))
    .filter((n) => !Number.isNaN(n));
  const next = (nums.length ? Math.max(...nums) : 4000) + 1;
  return `RC-${next}`;
}
