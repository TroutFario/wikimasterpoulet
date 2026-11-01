import type { Argument } from "../types/argumentation";

export const argumentsList: Argument[] = [
  // ─────────────────────────────────────────
  // ENVIRONNEMENT ET SANTÉ
  // ─────────────────────────────────────────
  {
    id: "reductionCO2",
    title: "Réduction du CO₂",
    text: "Le tramway peut réduire les émissions de CO₂ en remplaçant une partie des déplacements motorisés individuels.",
    value: "Environment",
    position: "Soutient",
  },
  {
    id: "santePollution",
    title: "Santé et pollution",
    text: "Une diminution du trafic automobile peut réduire l'exposition des habitants à certains polluants atmosphériques.",
    value: "PublicHealth",
    position: "Soutient",
  },
  {
    id: "coutPollution",
    title: "Coût de l'inaction",
    text: "Ne pas agir contre la pollution peut entraîner des coûts sanitaires et environnementaux à long terme.",
    value: "Economy",
    position: "Soutient",
  },
  {
    id: "reportModal",
    title: "Report vers les transports collectifs",
    text: "Un tramway fréquent et fiable peut inciter certains automobilistes à utiliser les transports collectifs.",
    value: "Environment",
    position: "Soutient",
  },

  // ─────────────────────────────────────────
  // ÉCONOMIE ET FINANCEMENT
  // ─────────────────────────────────────────
  {
    id: "tropCher",
    title: "Coût du projet",
    text: "La construction des rails, des stations et des équipements peut représenter un investissement public important.",
    value: "Economy",
    position: "Opposé",
  },
  {
    id: "coutEntretien",
    title: "Coûts d'entretien",
    text: "L'entretien des voies, des stations et des rames entraîne des dépenses récurrentes après la mise en service.",
    value: "Economy",
    position: "Opposé",
  },
  {
    id: "financementPublic",
    title: "Priorités budgétaires",
    text: "Les dépenses consacrées au tramway ne pourront pas être affectées simultanément à d'autres besoins publics.",
    value: "Economy",
    position: "Opposé",
  },
  {
    id: "emploisLocaux",
    title: "Emplois et activité locale",
    text: "Les travaux et l'exploitation du réseau peuvent soutenir certains emplois et certaines activités économiques locales.",
    value: "Economy",
    position: "Soutient",
  },
  {
    id: "dynamismeCommercial",
    title: "Dynamisme commercial",
    text: "Une meilleure desserte peut faciliter l'accès aux commerces et attirer de nouveaux visiteurs dans certains quartiers.",
    value: "Economy",
    position: "Soutient",
  },

  // ─────────────────────────────────────────
  // MOBILITÉ ET LIBERTÉ INDIVIDUELLE
  // ─────────────────────────────────────────
  {
    id: "placeVoitures",
    title: "Place des voitures",
    text: "L'aménagement des voies de tramway peut réduire l'espace disponible pour la circulation et le stationnement automobile.",
    value: "IndividualFreedom",
    position: "Opposé",
  },
  {
    id: "transportAccessible",
    title: "Transport accessible",
    text: "Le tramway peut faciliter les déplacements des personnes âgées, des personnes handicapées et des habitants sans voiture, si les aménagements sont adaptés.",
    value: "SocialEquity",
    position: "Soutient",
  },
  {
    id: "intermodalite",
    title: "Correspondances facilitées",
    text: "Des correspondances efficaces avec les bus, les trains et les mobilités actives peuvent améliorer l'utilité du réseau.",
    value: "Innovation",
    position: "Soutient",
  },
  {
    id: "reductionAccidents",
    title: "Sécurité routière",
    text: "La réorganisation de la voirie et le report de certains trajets vers les transports collectifs peuvent modifier les risques d'accident.",
    value: "PublicSafety",
    position: "Soutient",
  },
  {
    id: "congestionTrafic",
    title: "Congestion pendant les travaux",
    text: "Les travaux peuvent provoquer des ralentissements, des déviations et des difficultés de circulation pendant plusieurs années.",
    value: "IndividualFreedom",
    position: "Opposé",
  },

  // ─────────────────────────────────────────
  // PATRIMOINE ET INNOVATION
  // ─────────────────────────────────────────
  {
    id: "catenairePatrimoine",
    title: "Patrimoine historique",
    text: "Les caténaires, les rails et les stations peuvent modifier les perspectives visuelles de certains quartiers historiques.",
    value: "Heritage",
    position: "Opposé",
  },
  {
    id: "innovationUrbaine",
    title: "Innovation urbaine",
    text: "Le projet peut moderniser les infrastructures et favoriser une réorganisation durable de l'espace public.",
    value: "Innovation",
    position: "Soutient",
  },
  {
    id: "amenagementUrbain",
    title: "Réaménagement des espaces publics",
    text: "Le projet peut être l'occasion de créer des cheminements piétons, des espaces végétalisés et des aménagements plus agréables.",
    value: "Environment",
    position: "Soutient",
  },
];
