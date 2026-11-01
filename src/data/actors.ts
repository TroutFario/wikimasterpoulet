import type { Actor, Value } from "../types/argumentation";

export const valueLabels = {
  Environment: "Environnement",
  Economy: "Économie",
  PublicHealth: "Santé publique",
  SocialEquity: "Équité sociale",
  IndividualFreedom: "Liberté individuelle",
  PublicSafety: "Sécurité routière",
  Heritage: "Patrimoine",
  Innovation: "Innovation",
} satisfies Record<Value, string>;

const actorPreferences = {
  Écologiste: [
    "Environment",
    "PublicHealth",
    "SocialEquity",
    "PublicSafety",
    "Heritage",
    "Innovation",
    "Economy",
    "IndividualFreedom",
  ],

  "Lobbyiste économique": [
    "Economy",
    "Innovation",
    "IndividualFreedom",
    "PublicSafety",
    "SocialEquity",
    "PublicHealth",
    "Environment",
    "Heritage",
  ],

  "Vieux citadin": [
    "PublicSafety",
    "Heritage",
    "PublicHealth",
    "IndividualFreedom",
    "Environment",
    "SocialEquity",
    "Economy",
    "Innovation",
  ],

  "Jeune actif": [
    "Innovation",
    "Economy",
    "Environment",
    "IndividualFreedom",
    "SocialEquity",
    "PublicHealth",
    "PublicSafety",
    "Heritage",
  ],

  "Parent de famille": [
    "PublicSafety",
    "PublicHealth",
    "SocialEquity",
    "Environment",
    "Economy",
    "IndividualFreedom",
    "Heritage",
    "Innovation",
  ],

  Automobiliste: [
    "IndividualFreedom",
    "Economy",
    "PublicSafety",
    "PublicHealth",
    "Innovation",
    "SocialEquity",
    "Environment",
    "Heritage",
  ],

  "Commerçant du centre-ville": [
    "Economy",
    "IndividualFreedom",
    "PublicSafety",
    "Innovation",
    "SocialEquity",
    "PublicHealth",
    "Environment",
    "Heritage",
  ],

  "Urbaniste municipal": [
    "PublicSafety",
    "SocialEquity",
    "Innovation",
    "Environment",
    "PublicHealth",
    "Economy",
    "Heritage",
    "IndividualFreedom",
  ],

  "Défenseur du patrimoine": [
    "Heritage",
    "Environment",
    "PublicHealth",
    "SocialEquity",
    "PublicSafety",
    "Economy",
    "IndividualFreedom",
    "Innovation",
  ],

  "Habitant d'un quartier populaire": [
    "SocialEquity",
    "Economy",
    "PublicHealth",
    "PublicSafety",
    "Environment",
    "IndividualFreedom",
    "Innovation",
    "Heritage",
  ],
} as const satisfies Record<string, readonly Value[]>;

type ActorName = keyof typeof actorPreferences;

type HasAllValues<T extends readonly Value[]> =
  Exclude<Value, T[number]> extends never ? (T["length"] extends 8 ? T : never) : never;

type ValidatePreferences<T> = {
  [K in keyof T]: T[K] extends readonly Value[] ? HasAllValues<T[K]> : never;
};

const validatedPreferences: ValidatePreferences<typeof actorPreferences> = actorPreferences;

void validatedPreferences;

const actorEmojis = {
  Écologiste: "🌱",
  "Lobbyiste économique": "💼",
  "Vieux citadin": "👴",
  "Jeune actif": "🧑‍💻",
  "Parent de famille": "👨‍👩‍👧‍👦",
  Automobiliste: "🚗",
  "Commerçant du centre-ville": "🏪",
  "Urbaniste municipal": "🏙️",
  "Défenseur du patrimoine": "🏛️",
  "Habitant d'un quartier populaire": "🏘️",
} satisfies Record<ActorName, string>;

export function getActorEmoji(actorName: string): string {
  if (actorName in actorEmojis) {
    return actorEmojis[actorName as ActorName];
  }

  return "👤";
}

export const actors: Actor[] = Object.entries(actorPreferences).map(([name, preferences]) => ({
  name,
  preferences: [...preferences],
}));
