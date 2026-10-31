import type { Actor, Value } from "../types/argumentation";

export const valueLabels: Record<Value, string> = {
  Environment: "Environnement",
  Economy: "Économie",
  PublicHealth: "Santé publique",
  SocialEquity: "Équité sociale",
  IndividualFreedom: "Liberté individuelle",
  PublicSafety: "Sécurité publique",
  Heritage: "Patrimoine",
  Innovation: "Innovation",
};

export const actorPreferences: Record<string, Value[]> = {
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
};

export const actors: Actor[] = Object.entries(actorPreferences).map(([name, preferences]) => ({
  name,
  preferences,
}));
