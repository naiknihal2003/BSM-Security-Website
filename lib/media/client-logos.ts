import type { ClientSlug } from "@/lib/site";

/* --------------------------------------------------------------------------
   Client logos
   --------------------------------------------------------------------------
   One line per client, keyed by the client's slug in lib/site.ts.

   To add a logo, set its value to either
     • a file you dropped in /public/media/clients  →  "/media/clients/gsl.webp"
     • or a full URL on the organisation's own site →  "https://…/logo.png"

   To remove one, set it back to "". An empty value renders the neutral
   [Logo] frame — the card layout is identical either way, so adding and
   removing artwork never moves anything on the page.

   A logo is the organisation's property: only put one here that BSM is
   permitted to display. Nothing is filled in with a substitute or lookalike.
   -------------------------------------------------------------------------- */

export const clientLogos: Record<ClientSlug, string> = {
  /* Each file below was taken from that organisation's own website and is
     stored unmodified apart from trimming and resizing. */
  hpcl: "/media/clients/hpcl.webp",
  gsl: "/media/clients/gsl.webp",
  /* The CSIR emblem: CSIR-NIO is a CSIR laboratory and carries the council's
     mark. Same artwork as csir.res.in, from the full-resolution upload. */
  "csir-nio": "/media/clients/csir-nio.webp",
  aai: "/media/clients/aai.webp",
  iocl: "/media/clients/iocl.webp",
  bpcl: "/media/clients/bpcl.webp",
  /* Supplied by BSM: the Manohar International Airport, Goa mark. The file
     came in at 120×33 (kept in assets-src/originals) and was upscaled once
     for the plates — replace the master with a larger file when available. */
  gia: "/media/clients/gia.webp",
  /* The Indian Navy crest: INS Hansa is a naval air station, and no separate
     establishment logo is published. */
  "ins-hansa": "/media/clients/ins-hansa.webp",
  esic: "/media/clients/esic.webp",
  /* Header logo from concorindia.co.in, kept as the original SVG. */
  concor: "/media/clients/concor.svg",
};
