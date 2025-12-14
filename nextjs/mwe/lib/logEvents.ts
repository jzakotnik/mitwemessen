export const LogEvents = {
  // MWE operations
  LUNCH_GET: "lunch.get",
  LUNCH_CREATE: "lunch.create",
  LUNCH_UPDATE: "lunch.update",

  // System events
  API_ERROR: "api.error",
  DB_ERROR: "db.error",
  STARTUP: "system.startup",
  SHUTDOWN: "system.shutdown",
} as const;

export type LogEvent = (typeof LogEvents)[keyof typeof LogEvents];
