/**
 * Gallery — the dictionary.
 *
 * Reuses the photographs declared in ./photos so there is still one source of
 * truth per image. An entry without a `shot` renders the placeholder frame and
 * states what photograph belongs there.
 */

import type { GalleryItem } from "./types";
import { media } from "./photos";

export const gallery: GalleryItem[] = [
  { shot: media.heroDeployment, group: "Personnel", figure: "Fig. 01" },
  { shot: media.guarding, group: "Personnel", figure: "Fig. 02" },
  { shot: media.briefing, group: "Operations", figure: "Fig. 03", wide: true },
  { shot: media.patrol, group: "Operations", figure: "Fig. 04" },
  { shot: media.records, group: "Operations", figure: "Fig. 05" },
  { shot: media.corporate, group: "Sites", figure: "Fig. 06" },
  { shot: media.residential, group: "Sites", figure: "Fig. 07" },
  { shot: media.hospitality, group: "Sites", figure: "Fig. 08" },
  { shot: media.industrial, group: "Sites", figure: "Fig. 09" },
  { shot: media.event, group: "Sites", figure: "Fig. 10" },
  { shot: media.coast, group: "Goa", figure: "Fig. 11", wide: true },
  { shot: media.goaLandscape, group: "Goa", figure: "Fig. 12" },
  { shot: media.estate, group: "Sites", figure: "Fig. 13" },
  { shot: media.night, group: "Operations", figure: "Fig. 14" },
];

/** The groups, in display order. Used for the gallery filter rail. */
export const galleryGroups = ["Personnel", "Operations", "Sites", "Goa"] as const;
