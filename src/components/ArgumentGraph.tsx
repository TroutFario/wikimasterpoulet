import { useMemo, useState } from "react";

import {
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  MarkerType,
  type Edge,
  type Node,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import "../styles/ArgumentGraph.css";

import ArgumentNode from "./ArgumentNode";

import { argumentsList } from "../data/arguments";
import { attacks } from "../data/attacks";
import { actors, valueLabels } from "../data/actors";

import { evaluateAttack } from "../logic/evaluateAttack";

import type { Actor, Argument, ArgumentId } from "../types/argumentation";

import type { AttackStatus } from "../logic/evaluateAttack";

// --------------------------------------------------
// Types utilisés par React Flow
// --------------------------------------------------

type ArgumentNodeData = {
  argument: Argument;
};

type VafEdgeData = {
  status: AttackStatus;
  justification: string;
  fromTitle: string;
  toTitle: string;
};

const nodeTypes = {
  argument: ArgumentNode,
};

// --------------------------------------------------
// Positions des arguments dans le graphe
// --------------------------------------------------

const nodePositions: Record<ArgumentId, { x: number; y: number }> = {
  reductionCO2: { x: 0, y: 0 },
  tropCher: { x: 450, y: 0 },
  santePollution: { x: 0, y: 220 },
  placeVoitures: { x: 450, y: 250 },
  catenairePatrimoine: { x: 900, y: 0 },
  transportAccessible: { x: 900, y: 250 },
  innovationUrbaine: { x: 1350, y: 120 },
  reductionAccidents: { x: 900, y: 500 },
  coutPollution: { x: 450, y: 500 },
};

// --------------------------------------------------
// Composant principal
// --------------------------------------------------

export default function ArgumentGraph() {
  const [actor, setActor] = useState<Actor>(actors[0]);
  const [showNeutralized, setShowNeutralized] = useState(true);

  const [selectedArgumentId, setSelectedArgumentId] = useState<ArgumentId | null>(null);

  const [selectedEdgeId, setSelectedEdgeId] = useState<string | null>(null);

  // Permet de retrouver rapidement un argument à partir de son ID.
  const argumentsById = useMemo(
    () => new Map(argumentsList.map((argument) => [argument.id, argument])),
    [],
  );

  // --------------------------------------------------
  // Construction des nœuds
  // --------------------------------------------------

  const nodes = useMemo<Node<ArgumentNodeData, "argument">[]>(
    () =>
      argumentsList.map((argument) => ({
        id: argument.id,
        type: "argument",
        position: nodePositions[argument.id],
        data: {
          argument,
        },
      })),
    [],
  );

  // --------------------------------------------------
  // Évaluation des attaques selon les préférences
  // de l'acteur sélectionné
  // --------------------------------------------------

  const evaluatedAttacks = useMemo(
    () =>
      attacks.map((attack, index) => {
        const attacker = argumentsById.get(attack.from);
        const target = argumentsById.get(attack.to);

        if (!attacker || !target) {
          throw new Error(`Attaque invalide : ${attack.from} -> ${attack.to}`);
        }

        const status = evaluateAttack(attack, actor, argumentsById);

        return {
          id: `attack-${index}`,
          attack,
          attacker,
          target,
          status,
        };
      }),
    [actor, argumentsById],
  );

  // --------------------------------------------------
  // Construction des flèches React Flow
  // --------------------------------------------------

  const edges = useMemo<Edge<VafEdgeData>[]>(
    () =>
      evaluatedAttacks
        .filter(({ status }) => showNeutralized || status === "effective")
        .map(({ id, attack, attacker, target, status }) => {
          const effective = status === "effective";

          const color = effective ? "#dc2626" : "#9ca3af";

          return {
            id,
            source: attack.from,
            target: attack.to,

            type: "smoothstep",

            animated: effective,

            label: effective ? "Effective" : "Neutralisée",

            labelStyle: {
              fill: color,
              fontWeight: 600,
              fontSize: 11,
            },

            labelBgStyle: {
              fill: "#ffffff",
              fillOpacity: 0.9,
            },

            style: {
              stroke: color,
              strokeWidth: effective ? 2.5 : 1.5,
              strokeDasharray: effective ? undefined : "6 4",
            },

            markerEnd: {
              type: MarkerType.ArrowClosed,
              color,
            },

            data: {
              status,
              justification: attack.justification,
              fromTitle: attacker.title,
              toTitle: target.title,
            },
          };
        }),
    [evaluatedAttacks, showNeutralized],
  );

  // --------------------------------------------------
  // Éléments sélectionnés
  // --------------------------------------------------

  const selectedArgument = selectedArgumentId ? argumentsById.get(selectedArgumentId) : undefined;

  const selectedEdge = selectedEdgeId
    ? edges.find((edge) => edge.id === selectedEdgeId)
    : undefined;

  // --------------------------------------------------
  // Statistiques
  // --------------------------------------------------

  const effectiveCount = evaluatedAttacks.filter(({ status }) => status === "effective").length;

  const neutralizedCount = evaluatedAttacks.filter(({ status }) => status === "neutralized").length;

  // --------------------------------------------------
  // Affichage
  // --------------------------------------------------

  return (
    <main className="vaf-page">
      <header className="vaf-header">
        <div>
          <h1>Débat autour du tramway</h1>

          <p>Argumentation fondée sur les valeurs et les préférences des acteurs.</p>
        </div>

        <div className="actor-selector">
          <label htmlFor="actor-select">Acteur étudié</label>

          <select
            id="actor-select"
            value={actor.name}
            onChange={(event) => {
              const nextActor = actors.find((item) => item.name === event.target.value);

              if (nextActor) {
                setActor(nextActor);
                setSelectedArgumentId(null);
                setSelectedEdgeId(null);
              }
            }}
          >
            {actors.map((item) => (
              <option key={item.name} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
      </header>

      {/* Statistiques générales */}

      <section className="stats">
        <div className="stat-card stat-argc">
          <span className="stat-label">Arguments</span>
          <strong>{argumentsList.length}</strong>
        </div>

        <div className="stat-card stat-atkc">
          <span className="stat-label">Attaques totales</span>
          <strong>{attacks.length}</strong>
        </div>

        <div className="stat-card stat-atks">
          <span className="stat-label">Attaques effectives</span>
          <strong className="effective-count">{effectiveCount}</strong>
        </div>

        <div className="stat-card stat-atkn">
          <span className="stat-label">Attaques neutralisées</span>
          <strong className="neutralized-count">{neutralizedCount}</strong>
        </div>

        <div className="stat-card stat-det">
          {selectedArgument ? (
            <>
              <span className="stat-label">Détails de l'argument</span>
              <h2>{selectedArgument.title}</h2>

              <p>{selectedArgument.text}</p>

              <div className="detail-tags">
                <span className="value-tag">Valeur : {valueLabels[selectedArgument.value]}</span>
                <span
                  className={
                    selectedArgument.position === "Support"
                      ? "position-tag support"
                      : "position-tag oppose"
                  }
                >
                  Position : {selectedArgument.position}
                </span>
              </div>
            </>
          ) : selectedEdge?.data ? (
            <>
              <span className="stat-label">Détails de l'attaque</span>
              <h2>
                {selectedEdge.data.fromTitle} &rarr; {selectedEdge.data.toTitle}
              </h2>

              <p>{selectedEdge.data.justification}</p>

              <p>
                Statut pour <strong>{actor.name}</strong> :{" "}
                <strong>
                  {selectedEdge.data.status === "effective" ? "Effective" : "Neutralisée"}
                </strong>
              </p>
            </>
          ) : (
            <>
              <span className="stat-label">Explorer le débat</span>

              <p>
                Clique sur un argument pour consulter ses détails, ou sur une flèche pour comprendre
                la justification d'une attaque.
              </p>
            </>
          )}
        </div>

        <section className="stat-card stat-actinfo">
          <span className="stat-label">Information sur l'acteur</span>
          <h2>{actor.name}</h2>

          <p>Les valeurs sont classées de la plus préférée à la moins préférée.</p>

          <ol>
            {actor.preferences.map((value) => (
              <li key={value}>{valueLabels[value]}</li>
            ))}
          </ol>
        </section>
      </section>

      {/* Graphe interactif */}

      <section className="graph-container">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.2 }}
          minZoom={0.15}
          maxZoom={2}
          onNodeClick={(_, node) => {
            setSelectedArgumentId(node.id as ArgumentId);
            setSelectedEdgeId(null);
          }}
          onEdgeClick={(_, edge) => {
            setSelectedEdgeId(edge.id);
            setSelectedArgumentId(null);
          }}
          onPaneClick={() => {
            setSelectedArgumentId(null);
            setSelectedEdgeId(null);
          }}
        >
          <Background gap={20} />
          <Controls />
          <MiniMap pannable zoomable />
        </ReactFlow>
      </section>

      {/* Légende et options d'affichage */}

      <section className="graph-toolbar">
        <span>
          <span className="legend-line effective-line" />
          Attaque effective
        </span>

        <span>
          <span className="legend-line neutralized-line" />
          Attaque neutralisée
        </span>

        <label className="neutralized-toggle">
          <input
            type="checkbox"
            checked={showNeutralized}
            onChange={(event) => {
              setShowNeutralized(event.target.checked);
              setSelectedEdgeId(null);
            }}
          />
          Afficher les attaques neutralisées
        </label>
      </section>

      <footer className="vaf-footer">
        <p>
          Le statut des attaques dépend des préférences de l'acteur sélectionné. Une attaque
          neutralisée n'implique pas que l'argument attaquant soit rejeté.
        </p>
      </footer>
    </main>
  );
}
