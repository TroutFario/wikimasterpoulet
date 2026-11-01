import type { Attack } from "../types/argumentation";

export const attacks: Attack[] = [
  // ─────────────────────────────────────────
  // COÛT DU PROJET
  // ─────────────────────────────────────────
  {
    from: "tropCher",
    to: "reductionCO2",
    justification:
      "Le coût de construction pourrait être disproportionné par rapport aux bénéfices environnementaux attendus.",
  },
  {
    from: "tropCher",
    to: "santePollution",
    justification:
      "Les fonds consacrés au tramway pourraient être affectés à d'autres mesures de santé publique.",
  },
  {
    from: "tropCher",
    to: "transportAccessible",
    justification:
      "Le coût du projet pourrait limiter les moyens disponibles pour améliorer l'accessibilité des transports.",
  },
  {
    from: "tropCher",
    to: "innovationUrbaine",
    justification:
      "L'investissement pourrait réduire les budgets disponibles pour d'autres projets de modernisation.",
  },
  {
    from: "tropCher",
    to: "emploisLocaux",
    justification:
      "La création d'emplois ne garantit pas que les bénéfices économiques compenseront l'investissement public.",
  },
  {
    from: "tropCher",
    to: "amenagementUrbain",
    justification:
      "Le budget consacré au tramway pourrait limiter le financement d'autres aménagements urbains.",
  },
  {
    from: "reductionCO2",
    to: "tropCher",
    justification:
      "Les bénéfices climatiques à long terme pourraient justifier une partie de l'investissement.",
  },
  {
    from: "santePollution",
    to: "tropCher",
    justification:
      "Une amélioration de la qualité de l'air pourrait contribuer à réduire certains coûts sanitaires.",
  },
  {
    from: "coutPollution",
    to: "tropCher",
    justification:
      "Les coûts sanitaires et environnementaux de l'inaction pourraient dépasser une partie du coût du projet.",
  },
  {
    from: "emploisLocaux",
    to: "tropCher",
    justification:
      "Les retombées économiques locales pourraient compenser une partie des dépenses engagées.",
  },

  // ─────────────────────────────────────────
  // ENTRETIEN ET FINANCES PUBLIQUES
  // ─────────────────────────────────────────
  {
    from: "coutEntretien",
    to: "innovationUrbaine",
    justification:
      "Les dépenses d'entretien à long terme pourraient réduire les moyens disponibles pour moderniser le réseau.",
  },
  {
    from: "financementPublic",
    to: "amenagementUrbain",
    justification:
      "Les contraintes budgétaires pourraient limiter les aménagements complémentaires promis autour du tramway.",
  },
  {
    from: "financementPublic",
    to: "transportAccessible",
    justification:
      "Un budget contraint pourrait empêcher de financer toutes les améliorations nécessaires à l'accessibilité.",
  },
  {
    from: "innovationUrbaine",
    to: "coutEntretien",
    justification:
      "Des choix techniques durables pourraient limiter certaines dépenses d'entretien, selon leur conception.",
  },
  {
    from: "emploisLocaux",
    to: "financementPublic",
    justification:
      "Les retombées économiques locales pourraient contribuer à compenser une partie des dépenses publiques.",
  },

  // ─────────────────────────────────────────
  // ENVIRONNEMENT ET REPORT MODAL
  // ─────────────────────────────────────────
  {
    from: "reportModal",
    to: "reductionCO2",
    justification:
      "Le report vers le tramway ne réduit les émissions que si les déplacements effectués en voiture diminuent réellement.",
  },
  {
    from: "reductionCO2",
    to: "reportModal",
    justification:
      "La réduction des émissions dépend aussi de l'électricité utilisée, de la fréquentation et des conditions d'exploitation.",
  },
  {
    from: "placeVoitures",
    to: "reportModal",
    justification:
      "La réduction de la place accordée aux voitures ne garantit pas que les automobilistes disposeront d'une alternative pratique.",
  },
  {
    from: "intermodalite",
    to: "reportModal",
    justification:
      "Des correspondances bien organisées peuvent rendre le report vers les transports collectifs plus attractif.",
  },
  {
    from: "congestionTrafic",
    to: "reductionCO2",
    justification:
      "Si le trafic est simplement déplacé vers d'autres rues, les bénéfices environnementaux locaux pourraient être réduits.",
  },
  {
    from: "coutPollution",
    to: "financementPublic",
    justification:
      "Ne pas investir dans la lutte contre la pollution peut entraîner des coûts sanitaires et environnementaux qui pèseront aussi sur les finances publiques.",
  },
  {
    from: "coutPollution",
    to: "coutEntretien",
    justification:
      "Les dépenses d'entretien du tramway doivent être comparées aux coûts à long terme de l'inaction face à la pollution.",
  },
  
  // ─────────────────────────────────────────
  // MOBILITÉ ET ACCESSIBILITÉ
  // ─────────────────────────────────────────
  {
    from: "placeVoitures",
    to: "transportAccessible",
    justification:
      "La réduction de la capacité routière peut compliquer certains déplacements pour les personnes dépendantes de leur voiture.",
  },
  {
    from: "transportAccessible",
    to: "placeVoitures",
    justification:
      "Le tramway offre une alternative aux personnes qui ne conduisent pas ou ne peuvent pas utiliser une voiture.",
  },
  {
    from: "intermodalite",
    to: "transportAccessible",
    justification:
      "Des correspondances adaptées peuvent faciliter les déplacements de personnes aux besoins variés.",
  },
  {
    from: "transportAccessible",
    to: "intermodalite",
    justification:
      "L'accessibilité du tramway dépend aussi de la qualité des correspondances et des cheminements autour des stations.",
  },
  {
    from: "congestionTrafic",
    to: "placeVoitures",
    justification:
      "Les perturbations de circulation peuvent renforcer les difficultés rencontrées par les automobilistes pendant les travaux.",
  },
  {
    from: "reductionAccidents",
    to: "placeVoitures",
    justification:
      "Une réorganisation de la voirie peut être défendue si elle améliore la sécurité des déplacements.",
  },
  {
    from: "placeVoitures",
    to: "reductionAccidents",
    justification:
      "Une modification de la circulation peut déplacer les risques vers d'autres rues si elle est mal planifiée.",
  },

  // ─────────────────────────────────────────
  // COMMERCE ET TRAVAUX
  // ─────────────────────────────────────────
  {
    from: "congestionTrafic",
    to: "dynamismeCommercial",
    justification:
      "Les travaux et les difficultés d'accès peuvent décourager certains clients pendant le chantier.",
  },
  {
    from: "dynamismeCommercial",
    to: "congestionTrafic",
    justification:
      "Une meilleure desserte peut, à terme, faciliter l'accès aux commerces malgré les perturbations temporaires.",
  },
  {
    from: "emploisLocaux",
    to: "dynamismeCommercial",
    justification:
      "Une activité économique locale renforcée peut soutenir les commerces desservis.",
  },
  {
    from: "placeVoitures",
    to: "dynamismeCommercial",
    justification:
      "La réduction du stationnement à proximité peut gêner les clients qui se déplacent en voiture.",
  },
  {
    from: "dynamismeCommercial",
    to: "placeVoitures",
    justification:
      "L'accès aux commerces peut aussi être facilité par les piétons et les usagers du tramway.",
  },

  // ─────────────────────────────────────────
  // PATRIMOINE ET INNOVATION
  // ─────────────────────────────────────────
  {
    from: "catenairePatrimoine",
    to: "innovationUrbaine",
    justification:
      "Certains équipements pourraient dégrader les perspectives visuelles et le caractère historique du centre-ville.",
  },
  {
    from: "innovationUrbaine",
    to: "catenairePatrimoine",
    justification:
      "Des solutions techniques et des choix d'aménagement adaptés pourraient mieux intégrer les infrastructures au patrimoine.",
  },
  {
    from: "amenagementUrbain",
    to: "catenairePatrimoine",
    justification:
      "Le réaménagement des espaces publics pourrait améliorer le cadre urbain autour des sites historiques.",
  },
  {
    from: "catenairePatrimoine",
    to: "amenagementUrbain",
    justification:
      "Les contraintes de préservation du patrimoine peuvent limiter certains aménagements envisagés.",
  },
  {
    from: "innovationUrbaine",
    to: "tropCher",
    justification:
      "Les bénéfices durables des aménagements pourraient justifier une partie du coût initial.",
  },
];
