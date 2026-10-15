import { FunctionTool, LlmAgent } from "@google/adk";
import { z } from "zod";
import { loadDebate, evaluateActor } from "./vaf";

const MODEL = "gemini-3.5-flash-lite";
const debate = loadDebate("debate/debate.json");

/* ---------- Tools (all computation is done in code, not by the LLM) ---------- */

const describeDebate = new FunctionTool({
  name: "describe_debate",
  description:
    "Returns the policy issue, the arguments (with their social value), the attack relations and the actors.",
  parameters: z.object({}),
  execute: () => ({
    status: "success",
    issue: debate.issue,
    arguments: debate.arguments,
    attacks: debate.attacks,
    actors: debate.actors.map((a) => ({ id: a.id, name: a.name })),
  }),
});

const compareActors = new FunctionTool({
  name: "compare_actors",
  description:
    "Evaluates the debate for every actor (each with its own value ordering) and returns, per actor, " +
    "the preferred extensions and the accepted arguments, plus the arguments accepted by all actors.",
  parameters: z.object({}),
  execute: () => {
    const evals = debate.actors.map((a) => evaluateActor(debate, a));
    const ids = debate.arguments.map((a) => a.id);
    return {
      status: "success",
      perActor: evals,
      acceptedByAllActors: ids.filter((id) =>
        evals.every((e) => e.credulouslyAccepted.includes(id)),
      ),
      acceptedByNoActor: ids.filter((id) =>
        evals.every((e) => !e.credulouslyAccepted.includes(id)),
      ),
    };
  },
});

/* ---------- One agent per actor, each bound to its own preference ordering ---------- */

const actorAgents = debate.actors.map((actor) => {
  const evaluateMine = new FunctionTool({
    name: `evaluate_${actor.id}`,
    description: `Computes the argument acceptability and preferred extensions for the ${actor.name}.`,
    parameters: z.object({}),
    execute: () => ({ status: "success", ...evaluateActor(debate, actor) }),
  });

  return new LlmAgent({
    name: actor.id,
    model: MODEL,
    description: `Speaks for the ${actor.name} and explains which arguments are acceptable from its point of view.`,
    instruction: `You are the ${actor.name} in a policy debate. Your strict value ordering,
from most to least important, is: ${actor.preferences.join(" > ")}.
Call '${`evaluate_${actor.id}`}' to know which arguments you accept, then explain the result briefly,
mentioning which attacks you consider ineffective because of your value ordering.
Only use results from the tool. Never invent arguments or results.
If asked about anything unrelated to this debate, refuse in one sentence.`,
    tools: [evaluateMine],
  });
});

/* ---------- Coordinator ---------- */

export const rootAgent = new LlmAgent({
  name: "policy_platform",
  model: MODEL,
  description:
    "Policy evaluation platform based on Value-Based Argumentation Frameworks (Bench-Capon).",
  instruction: `You run a policy evaluation platform based on Value-Based Argumentation Frameworks.
The debate topic is: "${debate.issue}".
- Use 'describe_debate' to present the arguments, their values and the attack relations.
- Use 'compare_actors' to compare how all actors evaluate the debate (acceptable arguments, preferred extensions,
  points of agreement and disagreement).
- Delegate to a specific actor agent when the user wants one actor's point of view.
Never compute acceptability yourself: rely only on tool results.
If the user asks anything unrelated to this debate, refuse politely in one sentence.`,
  tools: [describeDebate, compareActors],
  subAgents: actorAgents,
});
