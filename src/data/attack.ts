import { ArgumentId } from "./argument";

export interface Attack {
  from: ArgumentId;
  to: ArgumentId;
  justification: string;
}

export const attacks: Attack[] = [
  // --- Coût économique ---

  {
    from: ArgumentId.TropCher,
    to: ArgumentId.ReductionCO2,
    justification:
      "Le coût de construction du tramway pourrait être disproportionné par rapport aux bénéfices environnementaux attendus.",
  },
  {
    from: ArgumentId.TropCher,
    to: ArgumentId.SantePollution,
    justification:
      "Les fonds investis dans le tramway pourraient être consacrés à d'autres mesures d'amélioration de la santé publique.",
  },
  {
    from: ArgumentId.TropCher,
    to: ArgumentId.TransportAccessible,
    justification:
      "Le coût du projet pourrait peser sur le budget municipal et limiter les moyens disponibles pour financer des transports accessibles à tous.",
  },
  {
    from: ArgumentId.TropCher,
    to: ArgumentId.InnovationUrbaine,
    justification:
      "Le coût du tramway pourrait limiter la capacité de la ville à financer d'autres projets d'innovation urbaine.",
  },

  // --- Environnement et santé ---

  {
    from: ArgumentId.ReductionCO2,
    to: ArgumentId.TropCher,
    justification:
      "Les bénéfices environnementaux à long terme pourraient justifier l'investissement initial dans le tramway.",
  },
  {
    from: ArgumentId.SantePollution,
    to: ArgumentId.TropCher,
    justification:
      "L'amélioration de la qualité de l'air pourrait réduire certains coûts sanitaires à long terme et compenser une partie de l'investissement.",
  },

  // --- Place des voitures et liberté individuelle ---

  {
    from: ArgumentId.PlaceVoitures,
    to: ArgumentId.TransportAccessible,
    justification:
      "La réduction de l'espace routier peut compliquer les déplacements des personnes qui dépendent de leur voiture.",
  },
  {
    from: ArgumentId.TransportAccessible,
    to: ArgumentId.PlaceVoitures,
    justification:
      "Un réseau de tramway accessible offre une alternative à la voiture et peut faciliter les déplacements des personnes qui ne conduisent pas.",
  },
  {
    from: ArgumentId.PlaceVoitures,
    to: ArgumentId.ReductionCO2,
    justification:
      "Si le tramway réduit la capacité routière sans offrir une alternative adaptée à tous les automobilistes, certains déplacements pourraient être reportés vers des itinéraires plus longs.",
  },

  // --- Patrimoine et aménagement urbain ---

  {
    from: ArgumentId.CatenairePatrimoine,
    to: ArgumentId.InnovationUrbaine,
    justification:
      "Certains aménagements nécessaires au tramway peuvent dégrader les perspectives visuelles et le caractère historique du centre-ville.",
  },
  {
    from: ArgumentId.InnovationUrbaine,
    to: ArgumentId.CatenairePatrimoine,
    justification:
      "Des solutions techniques et architecturales innovantes peuvent permettre d'intégrer les infrastructures du tramway tout en préservant le patrimoine.",
  },

  // --- Innovation et environnement ---

  {
    from: ArgumentId.InnovationUrbaine,
    to: ArgumentId.TropCher,
    justification:
      "Les aménagements innovants peuvent améliorer l'efficacité du réseau et produire des bénéfices durables qui justifient une partie des coûts.",
  },

  // --- Santé et liberté de déplacement ---

  {
    from: ArgumentId.SantePollution,
    to: ArgumentId.PlaceVoitures,
    justification:
      "La réduction de la pollution liée au trafic routier peut justifier une réorganisation de l'espace public, même si elle contraint certains automobilistes.",
  },

  // --- Équité sociale et santé publique ---

  {
    from: ArgumentId.TransportAccessible,
    to: ArgumentId.SantePollution,
    justification:
      "L'accessibilité du tramway ne garantit pas à elle seule une amélioration de la santé si le réseau ne réduit pas effectivement la pollution.",
  },
];
