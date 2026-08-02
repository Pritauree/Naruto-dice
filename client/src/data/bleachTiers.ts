// Paliers de progression du mode Bleach.
// Chaque palier définit la taille du dé principal (nombre de cases du plateau)
// et l'évènement associé à chaque case.
export interface BleachTier {
  id: string;
  label: string;
  diceSides: number;
  events: Record<number, string>;
}

export const bleachTiers: BleachTier[] = [
  {
    id: "rukongai",
    label: "Rukongai",
    diceSides: 6,
    events: {
      1: "Combat",
      2: "Combat dangereux",
      3: "Entraînement",
      4: "Rencontre",
      5: "Shop",
      6: "Croisement"
    },
  },
  {
    id: "academie",
    label: "Académie Shin'o",
    diceSides: 7,
    events: {
      1: "Combat",
      2: "Combat dangereux",
      3: "Entraînement",
      4: "Rencontre",
      5: "Shop",
      6: "Croisement",
      7: "Examen"
    },
  },
  {
    id: "shinigami",
    label: "Shinigami",
    diceSides: 8,
    events: {
      1: "Combat",
      2: "Combat dangereux",
      3: "Entraînement",
      4: "Rencontre",
      5: "Shop",
      6: "Croisement",
      7: "Mission",
      8: "Maîtrise Zanpakuto"
    },
  },
  {
    id: "officer",
    label: "Officier",
    diceSides: 9,
    events: {
      1: "Combat",
      2: "Combat dangereux",
      3: "Entraînement",
      4: "Rencontre",
      5: "Shop",
      6: "Croisement",
      7: "Mission",
      8: "Maîtrise Zanpakuto",
      9: "Entraînement Hollow"
    },
  },
  {
    id: "officier-grade",
    label: "Officier gradé",
    diceSides: 10,
    events: {
      1: "Combat",
      2: "Combat dangereux",
      3: "Entraînement",
      4: "Rencontre",
      5: "Shop",
      6: "Croisement",
      7: "Mission",
      8: "Maîtrise Zanpakuto",
      9: "Entraînement Hollow",
      10: "Raids"
    },
  },
];

export const defaultBleachTierId = bleachTiers[0].id;
