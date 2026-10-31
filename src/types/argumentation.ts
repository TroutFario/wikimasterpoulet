export type PolicyPosition = "Support" | "Oppose";

export type Value =
  | "Environment"
  | "Economy"
  | "PublicHealth"
  | "SocialEquity"
  | "IndividualFreedom"
  | "PublicSafety"
  | "Heritage"
  | "Innovation";

export type ArgumentId =
  | "reductionCO2"
  | "tropCher"
  | "santePollution"
  | "placeVoitures"
  | "catenairePatrimoine"
  | "transportAccessible"
  | "innovationUrbaine"
  | "reductionAccidents"
  | "coutPollution";

export interface Argument {
  id: ArgumentId;
  title: string;
  text: string;
  value: Value;
  position: PolicyPosition;
}

export interface Attack {
  from: ArgumentId;
  to: ArgumentId;
  justification: string;
}

export interface Actor {
  name: string;
  preferences: Value[];
}