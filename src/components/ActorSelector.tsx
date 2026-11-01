import { getActorEmoji } from "../data/actors";
import type { Actor } from "../types/argumentation";

type ActorSelectorProps = {
  actor: Actor;
  actors: Actor[];
  onChange: (actor: Actor) => void;
};

export default function ActorSelector({ actor, actors, onChange }: ActorSelectorProps) {
  return (
    <div className="actor-selector">
      <label htmlFor="actor-select">Acteur étudié</label>

      <select
        id="actor-select"
        value={actor.name}
        onChange={(event) => {
          const nextActor = actors.find((item) => item.name === event.target.value);

          if (nextActor) {
            onChange(nextActor);
          }
        }}
      >
        {actors.map((item) => (
          <option key={item.name} value={item.name}>
            {`${getActorEmoji(item.name)}\t${item.name}`}
          </option>
        ))}
      </select>
    </div>
  );
}
