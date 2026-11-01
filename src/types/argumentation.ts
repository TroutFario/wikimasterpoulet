import ArgumentNode from "../components/ArgumentNode";
import type { AttackStatus } from "../logic/evaluateAttack";

type PolicyPosition = "Soutient" | "Opposé";

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
  | "coutPollution"
  | "reportModal"
  | "coutEntretien"
  | "financementPublic"
  | "emploisLocaux"
  | "dynamismeCommercial"
  | "intermodalite"
  | "congestionTrafic"
  | "amenagementUrbain";
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

export interface Argument {
  id: ArgumentId;
  title: string;
  text: string;
  value: Value;
  position: PolicyPosition;
}

export type Actor = {
  name: string;
  preferences: Value[];
};

// Types utilisés par React Flow
export type ArgumentNodeData = {
  argument: Argument;
};

export type VafEdgeData = {
  status: AttackStatus;
  justification: string;
  fromTitle: string;
  toTitle: string;
};

export const nodeTypes = {
  argument: ArgumentNode,
};
