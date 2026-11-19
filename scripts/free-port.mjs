/**
 * Free the dev port.
 *
 *   npm run dev:free
 *
 * Next's dev server can outlive the terminal that started it — closing the
 * window kills the npm wrapper but leaves the server itself listening. The
 * next `npm run dev` then refuses to start with either "Another next dev
 * server is already running" or EADDRINUSE, naming a PID that is tedious to
 * chase down by hand. This finds whatever holds the port and stops it.
 *
 * It only ever touches the one port passed in (3002 for this project), so a
 * dev server belonging to another project is never disturbed.
 */

import { execSync } from "node:child_process";

const port = Number(process.argv[2] ?? 3002);

if (!Number.isInteger(port) || port < 1 || port > 65535) {
  console.error(`Not a usable port: ${process.argv[2]}`);
  process.exit(1);
}

/** PIDs listening on `port`, by whichever tool this platform provides. */
function listeners() {
  const isWindows = process.platform === "win32";
  const command = isWindows
    ? `powershell -NoProfile -Command "Get-NetTCPConnection -LocalPort ${port} -State Listen -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -Unique"`
    : `lsof -ti tcp:${port} -s tcp:LISTEN`;

  try {
    return execSync(command, { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] })
      .split(/\s+/)
      .map((line) => Number(line.trim()))
      .filter((pid) => Number.isInteger(pid) && pid > 0);
  } catch {
    /* Nothing listening: both tools exit non-zero when they find no match. */
    return [];
  }
}

const pids = listeners();

if (pids.length === 0) {
  console.log(`Port ${port} is already free.`);
  process.exit(0);
}

let stopped = 0;

for (const pid of pids) {
  try {
    process.kill(pid, "SIGKILL");
    console.log(`Stopped process ${pid}, which held port ${port}.`);
    stopped += 1;
  } catch (error) {
    console.error(`Could not stop process ${pid}: ${error.message}`);
  }
}

if (stopped < pids.length) {
  console.error(`Port ${port} may still be held. Run the command again, or stop the process yourself.`);
  process.exit(1);
}

console.log(`Port ${port} is free. Run \`npm run dev\`.`);
