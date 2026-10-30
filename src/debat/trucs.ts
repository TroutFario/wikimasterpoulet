import { Actor } from "../data/actors";
import { Value } from "../data/values";

function prefers(
  actor: Actor,
  valueA: Value,
  valueB: Value
): boolean {
  return (
    actor.preferences.indexOf(valueA) <
    actor.preferences.indexOf(valueB)
  );
}