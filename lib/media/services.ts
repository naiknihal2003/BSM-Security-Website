/**
 * Service photographs — the dictionary.
 *
 * One frame per service category, keyed by the slug in lib/site.ts so a
 * missing or mistyped entry is a type error. Used by the services page, the
 * home page index and the Services menu in the navbar.
 */

import type { ServiceSlug } from "@/lib/site";
import type { Shot } from "./types";
import { media } from "./photos";

export const serviceShots: Record<ServiceSlug, Shot> = {
  "public-sector-government-defence-security": media.publicSectorSecurity,
  "industrial-corporate-security": media.industrialCorporateSecurity,
  "security-guard-services": media.securityGuardServices,
  "bouncer-personal-security-services": media.bouncerPersonalSecurity,
  "access-control-surveillance": media.accessControlSurveillance,
  "banking-commercial-security": media.bankingCommercialSecurity,
  "residential-institutional-security": media.residentialInstitutionalSecurity,
  "wedding-event-specialised-security": media.weddingEventSecurity,
  "security-training-personnel-development": media.securityTrainingDevelopment,
  "housekeeping-services": media.housekeepingServices,
};
