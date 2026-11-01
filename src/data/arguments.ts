import type { Argument } from "../types/argumentation";

export const argumentsList: Argument[] = [
  {
    id: "reductionCO2",
    title: "Réduction du CO₂",
    text: "Le tramway réduit les émissions de CO₂.",
    value: "Environment",
    position: "Soutient",
  },
  {
    id: "tropCher",
    title: "Coût du projet",
    text: "Poser des rails et des caténaires, et aménager les voies coûte trop cher.",
    value: "Economy",
    position: "Opposé",
  },
  {
    id: "santePollution",
    title: "Santé et pollution",
    text: "Moins de pollution améliore la santé des habitants.",
    value: "PublicHealth",
    position: "Soutient",
  },
  {
    id: "placeVoitures",
    title: "Place des voitures",
    text: "Les voies de tramway réduisent la place disponible pour les voitures.",
    value: "IndividualFreedom",
    position: "Opposé",
  },
  {
    id: "catenairePatrimoine",
    title: "Patrimoine historique",
    text: "Les caténaires peuvent dégrader les perspectives visuelles des quartiers historiques.",
    value: "Heritage",
    position: "Opposé",
  },
  {
    id: "transportAccessible",
    title: "Transport accessible",
    text: "Le tramway est un mode de transport fiable et adapté à tous.",
    value: "SocialEquity",
    position: "Soutient",
  },
  {
    id: "innovationUrbaine",
    title: "Innovation urbaine",
    text: "Le tramway encourage la modernisation des infrastructures et les nouveaux aménagements.",
    value: "Innovation",
    position: "Soutient",
  },
  {
    id: "reductionAccidents",
    title: "Sécurité routière",
    text: "Remplacer certains déplacements en voiture par le tramway peut réduire les risques d'accident.",
    value: "PublicSafety",
    position: "Soutient",
  },
  {
    id: "coutPollution",
    title: "Coût de l'inaction",
    text: "Laisser la pollution empirer peut coûter plus cher à long terme que d'agir.",
    value: "Economy",
    position: "Soutient",
  },
];
