import type { Actor, Attack, Argument } from "../types/argumentation";

export type AttackStatus = "effective" | "neutralized";

export function evaluateAttack(
  attack: Attack,
  actor: Actor,
  argumentsById: Map<string, Argument>,
): AttackStatus {
  const attacker = argumentsById.get(attack.from);
  const target = argumentsById.get(attack.to);

  if (!attacker || !target) {
    throw new Error(`Attaque invalide : ${attack.from} -> ${attack.to}`);
  }

  const attackerRank = actor.preferences.indexOf(attacker.value);
  const targetRank = actor.preferences.indexOf(target.value);

  if (attackerRank === -1 || targetRank === -1) {
    throw new Error("Une valeur manque dans les préférences de l'acteur.");
  }

  return targetRank < attackerRank ? "neutralized" : "effective";
}
