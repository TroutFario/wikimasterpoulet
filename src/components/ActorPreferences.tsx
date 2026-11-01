import type { Actor } from "../types/argumentation";
import { valueLabels } from "../data/actors";

type ActorPreferencesProps = {
  actor: Actor;
};

export default function ActorPreferences({
  actor,
}: ActorPreferencesProps) {
  return (
    <section className="stat-card stat-actinfo">
      <span className="stat-label">Information sur l'acteur</span>

      <h2>{actor.name}</h2>

      <p>
        Les valeurs sont classées de la plus préférée à la moins préférée.
      </p>

      <ol>
        {actor.preferences.map((value) => (
          <li key={value}>{valueLabels[value]}</li>
        ))}
      </ol>
    </section>
  );
}