import type { Argument, ArgumentId, Attack, Actor } from "../types/argumentation";

import { evaluateAttack } from "./evaluateAttack";

export function computePreferredExtensions(
  argumentsList: Argument[],
  attacks: Attack[],
  actor: Actor,
): Argument[][] {
  // 1. Associer chaque identifiant à son argument.
  const argumentsById = new Map<string, Argument>(
    argumentsList.map((argument): [string, Argument] => [argument.id, argument]),
  );

  // 2. Conserver uniquement les attaques effectives pour cet acteur.
  const effectiveAttacks = attacks.filter(
    (attack) => evaluateAttack(attack, actor, argumentsById) === "effective",
  );

  // 3. Vérifier si un ensemble d'arguments est sans conflit.
  function isConflictFree(argumentIds: Set<ArgumentId>): boolean {
    return !effectiveAttacks.some(
      (attack) => argumentIds.has(attack.from) && argumentIds.has(attack.to),
    );
  }

  // 4. Vérifier si l'ensemble défend un argument donné.
  function defends(argumentId: ArgumentId, argumentIds: Set<ArgumentId>): boolean {
    // Tous les arguments qui attaquent argumentId...
    const attackers = effectiveAttacks.filter((attack) => attack.to === argumentId);

    // ...doivent être attaqués par au moins un argument de l'ensemble.
    return attackers.every((attacker) =>
      effectiveAttacks.some(
        (counterAttack) =>
          counterAttack.to === attacker.from && argumentIds.has(counterAttack.from),
      ),
    );
  }

  // 5. Vérifier si un ensemble est admissible.
  function isAdmissible(argumentIds: Set<ArgumentId>): boolean {
    if (!isConflictFree(argumentIds)) {
      return false;
    }

    return [...argumentIds].every((argumentId) => defends(argumentId, argumentIds));
  }

  // 6. Générer tous les sous-ensembles d'arguments.
  const subsets: ArgumentId[][] = [];

  function generateSubsets(index: number, current: ArgumentId[]): void {
    if (index === argumentsList.length) {
      subsets.push([...current]);
      return;
    }

    // Cas 1 : ne pas inclure cet argument.
    generateSubsets(index + 1, current);

    // Cas 2 : inclure cet argument.
    current.push(argumentsList[index].id);
    generateSubsets(index + 1, current);
    current.pop();
  }

  generateSubsets(0, []);

  // 7. Garder uniquement les ensembles admissibles.
  const admissibleSets = subsets.map((subset) => new Set(subset)).filter(isAdmissible);

  // 8. Garder les ensembles admissibles maximaux pour l'inclusion.
  const preferredSets = admissibleSets.filter((candidate) => {
    return !admissibleSets.some((other) => {
      // Un ensemble ne peut pas être strictement inclus dans lui-même.
      if (other.size <= candidate.size) {
        return false;
      }

      // candidate est-il inclus dans other ?
      return [...candidate].every((id) => other.has(id));
    });
  });

  // 9. Retourner les extensions sous forme de tableau d'arguments.
  return preferredSets.map((extension) =>
    argumentsList.filter((argument) => extension.has(argument.id)),
  );
}
