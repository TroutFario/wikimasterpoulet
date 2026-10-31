import { Value } from "./values";

export interface Agent {
  name: string;
  preferences: Value[];
}

export function prefers(agent: Agent, valueA: Value, valueB: Value): boolean {
  return agent.preferences.indexOf(valueA) < agent.preferences.indexOf(valueB);
}

export const agentList: Agent[] = [
  {
    name: "Écologiste",
    preferences: [
      Value.Environment,
      Value.PublicHealth,
      Value.SocialEquity,
      Value.PublicSafety,
      Value.Heritage,
      Value.Innovation,
      Value.Economy,
      Value.IndividualFreedom,
    ],
  },
  {
    name: "Lobbyiste économique",
    preferences: [
      Value.Economy,
      Value.Innovation,
      Value.IndividualFreedom,
      Value.PublicSafety,
      Value.SocialEquity,
      Value.PublicHealth,
      Value.Environment,
      Value.Heritage,
    ],
  },
  {
    name: "Vieux citadin",
    preferences: [
      Value.PublicSafety,
      Value.Heritage,
      Value.PublicHealth,
      Value.IndividualFreedom,
      Value.Environment,
      Value.SocialEquity,
      Value.Economy,
      Value.Innovation,
    ],
  },
  {
    name: "Jeune actif",
    preferences: [
      Value.Innovation,
      Value.Economy,
      Value.Environment,
      Value.IndividualFreedom,
      Value.SocialEquity,
      Value.PublicHealth,
      Value.PublicSafety,
      Value.Heritage,
    ],
  },
  {
    name: "Parent de famille",
    preferences: [
      Value.PublicSafety,
      Value.PublicHealth,
      Value.SocialEquity,
      Value.Environment,
      Value.Economy,
      Value.IndividualFreedom,
      Value.Heritage,
      Value.Innovation,
    ],
  },
  {
    name: "Automobiliste",
    preferences: [
      Value.IndividualFreedom,
      Value.Economy,
      Value.PublicSafety,
      Value.PublicHealth,
      Value.Innovation,
      Value.SocialEquity,
      Value.Environment,
      Value.Heritage,
    ],
  },
  {
    name: "Commerçant du centre-ville",
    preferences: [
      Value.Economy,
      Value.IndividualFreedom,
      Value.PublicSafety,
      Value.Innovation,
      Value.SocialEquity,
      Value.PublicHealth,
      Value.Environment,
      Value.Heritage,
    ],
  },
  {
    name: "Urbaniste municipal",
    preferences: [
      Value.PublicSafety,
      Value.SocialEquity,
      Value.Innovation,
      Value.Environment,
      Value.PublicHealth,
      Value.Economy,
      Value.Heritage,
      Value.IndividualFreedom,
    ],
  },
  {
    name: "Défenseur du patrimoine",
    preferences: [
      Value.Heritage,
      Value.Environment,
      Value.PublicHealth,
      Value.SocialEquity,
      Value.PublicSafety,
      Value.Economy,
      Value.IndividualFreedom,
      Value.Innovation,
    ],
  },
  {
    name: "Habitant d'un quartier populaire",
    preferences: [
      Value.SocialEquity,
      Value.Economy,
      Value.PublicHealth,
      Value.PublicSafety,
      Value.Environment,
      Value.IndividualFreedom,
      Value.Innovation,
      Value.Heritage,
    ],
  },
];
