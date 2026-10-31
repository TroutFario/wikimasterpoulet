import type { Attack } from "../types/argumentation";

export const attacks: Attack[] = [
  {
    from: "tropCher",
    to: "reductionCO2",
    justification:
      "Le coût de construction pourrait être disproportionné par rapport aux bénéfices environnementaux.",
  },
  {
    from: "tropCher",
    to: "santePollution",
    justification: "Les fonds pourraient être consacrés à d'autres mesures de santé publique.",
  },
  {
    from: "tropCher",
    to: "transportAccessible",
    justification:
      "Le coût du projet pourrait limiter les moyens disponibles pour financer des transports accessibles.",
  },
  {
    from: "tropCher",
    to: "innovationUrbaine",
    justification: "Le coût du tramway pourrait limiter le financement d'autres projets innovants.",
  },
  {
    from: "reductionCO2",
    to: "tropCher",
    justification:
      "Les bénéfices environnementaux à long terme pourraient justifier l'investissement.",
  },
  {
    from: "santePollution",
    to: "tropCher",
    justification:
      "L'amélioration de la qualité de l'air pourrait réduire certains coûts sanitaires.",
  },
  {
    from: "placeVoitures",
    to: "transportAccessible",
    justification:
      "La réduction de l'espace routier peut compliquer les déplacements des personnes dépendantes de leur voiture.",
  },
  {
    from: "transportAccessible",
    to: "placeVoitures",
    justification:
      "Le tramway offre une alternative à la voiture, notamment aux personnes qui ne conduisent pas.",
  },
  {
    from: "placeVoitures",
    to: "reductionCO2",
    justification:
      "Une réduction de la capacité routière sans alternative adaptée pourrait allonger certains trajets.",
  },
  {
    from: "catenairePatrimoine",
    to: "innovationUrbaine",
    justification:
      "Certains aménagements pourraient dégrader les perspectives et le caractère historique du centre-ville.",
  },
  {
    from: "innovationUrbaine",
    to: "catenairePatrimoine",
    justification:
      "Des solutions techniques innovantes pourraient mieux intégrer les infrastructures au patrimoine.",
  },
  {
    from: "innovationUrbaine",
    to: "tropCher",
    justification:
      "Les bénéfices durables des aménagements innovants pourraient justifier une partie du coût.",
  },
  {
    from: "santePollution",
    to: "placeVoitures",
    justification:
      "Les bénéfices sanitaires peuvent justifier une réorganisation de l'espace public.",
  },
  {
    from: "transportAccessible",
    to: "santePollution",
    justification:
      "Un transport accessible ne garantit pas à lui seul une amélioration de la santé si la pollution ne diminue pas.",
  },
  {
    from: "reductionAccidents",
    to: "placeVoitures",
    justification:
      "Les bénéfices potentiels en matière de sécurité peuvent justifier une réorganisation de la voirie.",
  },
  {
    from: "placeVoitures",
    to: "reductionAccidents",
    justification:
      "Un report mal planifié du trafic pourrait déplacer certains risques d'accident vers d'autres rues.",
  },
  {
    from: "reductionAccidents",
    to: "tropCher",
    justification:
      "Les bénéfices potentiels en matière de sécurité doivent entrer dans l'évaluation du coût du projet.",
  },
  {
    from: "coutPollution",
    to: "tropCher",
    justification: "Les coûts de l'inaction pourraient dépasser ceux de l'investissement.",
  },
  {
    from: "tropCher",
    to: "coutPollution",
    justification:
      "Les économies attendues grâce à la réduction de la pollution ne garantissent pas que le projet compensera son coût.",
  },
];
