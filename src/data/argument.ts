import { Value } from "./values";

export enum PolicyPosition {
  Support = "Support",
  Oppose = "Oppose",
}

export interface Argument {
  id: string;
  text: string;
  value: Value;
  position: PolicyPosition;
}

export const ArgumentId = {
  ReductionCO2: "reductionCO2",
  TropCher: "tropCher",
  SantePollution: "santePollution",
  PlaceVoitures: "placeVoitures",
  CatenairePatrimoine: "catenairePatrimoine",
  TransportAccessible: "transportAccessible",
  InnovationUrbaine: "innovationUrbaine",
} as const;

export type ArgumentId = (typeof ArgumentId)[keyof typeof ArgumentId];

export const argumentsList: Argument[] = [
  {
    id: "reductionCO2",
    text: "Le tramway réduit les émissions de CO2",
    value: Value.Environment,
    position: PolicyPosition.Support
  },
  {
    id: "tropCher",
    text: "Poser des rails et des caténaires, et aménager les voies coûte trop cher",
    value: Value.Economy,
    position: PolicyPosition.Oppose
  },
  {
    id: "reductionPollutionSante",
    text: "Moins de pollution améliore la santé des habitants",
    value: Value.PublicHealth,
    position: PolicyPosition.Support
  },
  {
    id: "placePourVoitures",
    text: "Les voies de tramway réduisent la place pour les voitures (et Rémi ne pourra plus aller à la fac direct en voiture)",
    value: Value.IndividualFreedom,
    position: PolicyPosition.Oppose
  },
  {
    id: "emcombrePaysage",
    text: "L'installation de caténaires peut dégrader les perspectives visuelles et l'esthétique des quartiers historiques du centre-ville",
    value: Value.Heritage,
    position: PolicyPosition.Oppose
  },
  {
    id: "fiablePourTous",
    text: "Le tramway est un mode de transport fiable et adapté à tous",
    value: Value.SocialEquity,
    position: PolicyPosition.Support
  },
  {
    id: "moderniseVille",
    text: "La création d'une ligne de tramway encourage la modernisation des infrastructures et le développement de nouveaux aménagements urbains",
    value: Value.Innovation,
    position: PolicyPosition.Support
  },
  {
    id: "redVoitAccidents",
    text: "Remplacer les voitures par des tramways réduit les risques d'accident",
    value: Value.PublicSafety,
    position: PolicyPosition.Support
  },
];
