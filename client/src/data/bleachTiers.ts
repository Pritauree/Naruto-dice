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
    id: "academie",
    label: "Académie Shin'ō",
    diceSides: 9,
    events: {
      1: "Attaque de Hollow",
      2: "Cours à l'Académie",
      3: "Mission de nuit dangereuse",
      4: "Boutique Urahara",
      5: "Amélioration du Zanpakutô",
      6: "Rencontre avec un Vice-Capitaine",
      7: "Quête secondaire au Rukongai",
      8: "Duel contre un camarade",
      9: "Boss : Menos Grande",
    },
  },
  {
    id: "shinigami",
    label: "Shinigami Remplaçant",
    diceSides: 11,
    events: {
      1: "Attaque de Hollow",
      2: "Entraînement au Bankai",
      3: "Mission dangereuse au Rukongai",
      4: "Boutique Urahara",
      5: "Amélioration du Zanpakutô",
      6: "Rencontre avec un Capitaine",
      7: "Quête secondaire",
      8: "Duel contre un Espada mineur",
      9: "Combat flashback",
      10: "Et si...? (What if)",
      11: "Boss : Grimmjow",
    },
  },
  {
    id: "vice-capitaine",
    label: "Vice-Capitaine",
    diceSides: 13,
    events: {
      1: "Attaque de Hollow",
      2: "Entraînement au Bankai",
      3: "Mission dangereuse au Rukongai",
      4: "Boutique Urahara",
      5: "Amélioration du Zanpakutô",
      6: "Rencontre avec un Capitaine",
      7: "Quête secondaire",
      8: "Duel contre un Espada",
      9: "Combat flashback",
      10: "Et si...? (What if)",
      11: "Invasion du Hueco Mundo",
      12: "Trahison inattendue",
      13: "Boss : Ulquiorra",
    },
  },
  {
    id: "capitaine",
    label: "Capitaine",
    diceSides: 15,
    events: {
      1: "Attaque de Hollow",
      2: "Entraînement au Bankai",
      3: "Mission dangereuse au Rukongai",
      4: "Boutique Urahara",
      5: "Amélioration du Zanpakutô",
      6: "Réunion des Capitaines",
      7: "Quête secondaire",
      8: "Duel contre un Espada",
      9: "Combat flashback",
      10: "Et si...? (What if)",
      11: "Invasion du Hueco Mundo",
      12: "Trahison inattendue",
      13: "Chute de la Soul Society",
      14: "L'Armée du Roi",
      15: "Boss final : Yhwach",
    },
  },
];

export const defaultBleachTierId = bleachTiers[0].id;
