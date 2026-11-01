import { useState } from "react";
import type { DragEvent } from "react";
import type { Actor } from "../types/argumentation";
import { getActorEmoji, valueLabels } from "../data/actors";

type ActorPreferencesProps = {
  actor: Actor;
  onPreferencesChange: (preferences: Actor["preferences"]) => void;
  hasChanged: boolean;
};

export default function ActorPreferences({
  actor,
  onPreferencesChange,
  hasChanged,
}: ActorPreferencesProps) {
  const [draggedValue, setDraggedValue] = useState<Actor["preferences"][number] | null>(null);

  function handleDragStart(event: DragEvent<HTMLLIElement>, value: Actor["preferences"][number]) {
    setDraggedValue(value);

    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", String(value));
  }

  function handleDrop(event: DragEvent<HTMLLIElement>, targetValue: Actor["preferences"][number]) {
    event.preventDefault();

    if (draggedValue === null || draggedValue === targetValue) {
      setDraggedValue(null);
      return;
    }

    const nextPreferences = [...actor.preferences];

    const fromIndex = nextPreferences.indexOf(draggedValue);
    const toIndex = nextPreferences.indexOf(targetValue);

    if (fromIndex === -1 || toIndex === -1) {
      setDraggedValue(null);
      return;
    }

    nextPreferences.splice(fromIndex, 1);
    nextPreferences.splice(toIndex, 0, draggedValue);

    onPreferencesChange(nextPreferences);
    setDraggedValue(null);
  }

  return (
    <section className="stat-card stat-actinfo">
      <span className="stat-label">Information sur l'acteur</span>

      <h2>
        {`${getActorEmoji(actor.name)}\t${actor.name}`}
        {hasChanged && <span className="modified-label"> (modifié)</span>}
      </h2>

      <p>
        Faites glisser les valeurs pour modifier leur ordre de préférence. La première valeur est la
        préférée.
      </p>

      <ol className="actor-preferences-list">
        {actor.preferences.map((value) => (
          <li
            key={value}
            draggable
            onDragStart={(event) => handleDragStart(event, value)}
            onDragOver={(event) => event.preventDefault()}
            onDrop={(event) => handleDrop(event, value)}
            onDragEnd={() => setDraggedValue(null)}
            className={draggedValue === value ? "preference-item dragging" : "preference-item"}
          >
            <span className="preference-drag-handle" aria-hidden="true">
              ⠿
            </span>
            {"\t"}
            <span className="preference-name">{valueLabels[value]}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
