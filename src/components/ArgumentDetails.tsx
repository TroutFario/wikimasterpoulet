import type { Argument } from "../types/argumentation";
import type { VafEdgeData } from "../types/argumentation";
import { valueLabels } from "../data/actors";

type ArgumentDetailsProps = {
  argument: Argument | undefined;
  edgeData: VafEdgeData | undefined;
  actorName: string;
};

export default function ArgumentDetails({ argument, edgeData, actorName }: ArgumentDetailsProps) {
  return (
    <div className="stat-card stat-det">
      {argument ? (
        <>
          <span className="stat-label">Détails de l'argument</span>

          <h2>{argument.title}</h2>
          <p>{argument.text}</p>

          <div className="detail-tags">
            <span className="value-tag">Valeur : {valueLabels[argument.value]}</span>

            <span
              className={
                argument.position === "Soutient" ? "position-tag support" : "position-tag oppose"
              }
            >
              Position : {argument.position}
            </span>
          </div>
        </>
      ) : edgeData ? (
        <>
          <span className="stat-label">Détails de l'attaque</span>

          <h2>
            {edgeData.fromTitle} &rarr; {edgeData.toTitle}
          </h2>

          <p>{edgeData.justification}</p>

            <span
              className={
                edgeData.status === "effective" ? "position-tag effective" : "position-tag neutralized"
              }
            >
            Statut pour {" "}<strong>{actorName}</strong>{" "}:{" "}
            <strong>{edgeData.status === "effective" ? "Effective" : "Neutralisée"}</strong>
          </span>
        </>
      ) : (
        <>
          <span className="stat-label">Explorer le débat</span>
          <p>
            Cliquez sur un argument pour consulter ses détails, ou sur une flèche pour comprendre la
            justification d'une attaque.
          </p>
        </>
      )}
    </div>
  );
}
