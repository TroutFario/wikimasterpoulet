import { readFileSync } from "node:fs";
import { resolve } from "node:path";

export interface Argument {
  id: string;
  value: string;
  text: string;
}
export interface Attack {
  from: string;
  to: string;
}
export interface Actor {
  id: string;
  name: string;
  preferences: string[];
} // most preferred first
export interface Debate {
  issue: string;
  values: string[];
  arguments: Argument[];
  attacks: Attack[];
  actors: Actor[];
}

const MAX_ARGS = 20; // preferred extensions are enumerated by brute force

/** Loads the debate from JSON and checks it is consistent. */
export function loadDebate(path = "debate/debate.json"): Debate {
  const debate: Debate = JSON.parse(
    readFileSync(resolve(process.cwd(), path), "utf-8"),
  );
  const argIds = new Set(debate.arguments.map((a) => a.id));
  const values = new Set(debate.values);

  if (debate.arguments.length > MAX_ARGS)
    throw new Error(`Max ${MAX_ARGS} arguments supported.`);
  for (const a of debate.arguments)
    if (!values.has(a.value))
      throw new Error(`Argument ${a.id} has unknown value '${a.value}'.`);
  for (const t of debate.attacks)
    if (!argIds.has(t.from) || !argIds.has(t.to))
      throw new Error(`Bad attack ${t.from} -> ${t.to}.`);
  for (const actor of debate.actors) {
    // strict total order: every value appears exactly once
    const p = actor.preferences;
    if (
      p.length !== values.size ||
      new Set(p).size !== p.length ||
      !p.every((v) => values.has(v))
    )
      throw new Error(
        `Actor ${actor.id}: preferences must be a strict ordering of all values.`,
      );
  }
  return debate;
}

/**
 * VAF defeat relation for one actor: A attacks B succeeds
 * unless the actor strictly prefers the value of B to the value of A.
 */
export function defeats(debate: Debate, actor: Actor): Attack[] {
  const rank = new Map(actor.preferences.map((v, i) => [v, i])); // lower = preferred
  const valueOf = new Map(debate.arguments.map((a) => [a.id, a.value]));
  return debate.attacks.filter(
    (t) => rank.get(valueOf.get(t.to)!)! >= rank.get(valueOf.get(t.from)!)!,
  );
}

/** Dung semantics: all preferred extensions (maximal admissible sets) by brute force. */
export function preferredExtensions(
  ids: string[],
  defeat: Attack[],
): string[][] {
  const n = ids.length;
  const idx = new Map(ids.map((id, i) => [id, i]));
  const attackedBy: number[] = new Array(n).fill(0); // bitmask of attackers of i
  const attacks: number[] = new Array(n).fill(0); // bitmask of targets of i
  for (const d of defeat) {
    attackedBy[idx.get(d.to)!] |= 1 << idx.get(d.from)!;
    attacks[idx.get(d.from)!] |= 1 << idx.get(d.to)!;
  }

  const admissible: number[] = [];
  for (let s = 0; s < 1 << n; s++) {
    let attacked = 0; // everything attacked by S
    let ok = true;
    for (let i = 0; i < n; i++) if (s & (1 << i)) attacked |= attacks[i];
    if (attacked & s) ok = false; // not conflict-free
    for (let i = 0; ok && i < n; i++) {
      if (!(s & (1 << i))) continue;
      // every attacker of i must itself be attacked by S
      if ((attackedBy[i] & ~attacked) !== 0) ok = false;
    }
    if (ok) admissible.push(s);
  }
  const preferred = admissible.filter(
    (s) => !admissible.some((t) => t !== s && (t & s) === s),
  );
  return preferred.map((s) => ids.filter((_, i) => s & (1 << i)));
}

export interface ActorEvaluation {
  actor: string;
  preferences: string[];
  effectiveDefeats: Attack[];
  ignoredAttacks: Attack[]; // attacks that fail because of the actor's values
  preferredExtensions: string[][];
  credulouslyAccepted: string[]; // in at least one preferred extension
  skepticallyAccepted: string[]; // in every preferred extension
}

export function evaluateActor(debate: Debate, actor: Actor): ActorEvaluation {
  const ids = debate.arguments.map((a) => a.id);
  const eff = defeats(debate, actor);
  const key = (t: Attack) => `${t.from}>${t.to}`;
  const effKeys = new Set(eff.map(key));
  const ext = preferredExtensions(ids, eff);
  return {
    actor: actor.name,
    preferences: actor.preferences,
    effectiveDefeats: eff,
    ignoredAttacks: debate.attacks.filter((t) => !effKeys.has(key(t))),
    preferredExtensions: ext,
    credulouslyAccepted: ids.filter((id) => ext.some((e) => e.includes(id))),
    skepticallyAccepted: ids.filter((id) => ext.every((e) => e.includes(id))),
  };
}
