import { useMemo, useState } from "react";
import { Background, Controls, ReactFlow, MarkerType, type Edge, type Node } from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import "../styles/ArgumentGraph.css";

import { argumentsList } from "../data/arguments";
import { attacks } from "../data/attacks";
import { actors } from "../data/actors";
import { evaluateAttack } from "../logic/evaluateAttack";

import {
  nodeTypes,
  type Actor,
  type ArgumentId,
  type ArgumentNodeData,
  type VafEdgeData,
} from "../types/argumentation";

import ActorSelector from "./ActorSelector";
import ActorPreferences from "./ActorPreferences";
import ArgumentDetails from "./ArgumentDetails";

// Configuration de l'affichage du graphe
const EDGE_STYLE: "smoothstep" | "straight" = "smoothstep";

// Positions des arguments dans le graphe.
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

export default function ArgumentGraph() {
  const [actor, setActor] = useState<Actor>(actors[0]);
  const [showNeutralized, setShowNeutralized] = useState(true);
  const [selectedArgumentId, setSelectedArgumentId] = useState<ArgumentId | null>(null);
  const [selectedEdgeId, setSelectedEdgeId] = useState<string | null>(null);

  // Index des arguments pour retrouver rapidement un argument par son ID.
  const argumentsById = useMemo(
    () => new Map(argumentsList.map((argument) => [argument.id, argument])),
    [],
  );

  // Création des nœuds.
  const nodes = useMemo<Node<ArgumentNodeData, "argument">[]>(
    () =>
      argumentsList.map((argument) => ({
        id: argument.id,
        type: "argument",
        position: nodePositions[argument.id],
        data: { argument },
      })),
    [],
  );

  // Évaluation des attaques selon les préférences de l'acteur.
  const evaluatedAttacks = useMemo(
    () =>
      attacks.map((attack, index) => {
        const attacker = argumentsById.get(attack.from);
        const target = argumentsById.get(attack.to);

        if (!attacker || !target) {
          throw new Error(`Attaque invalide : ${attack.from} -> ${attack.to}`);
        }

        return {
          id: `attack-${index}`,
          attack,
          attacker,
          target,
          status: evaluateAttack(attack, actor, argumentsById),
        };
      }),
    [actor, argumentsById],
  );

  // Création des arêtes React Flow.
  const edges = useMemo<Edge<VafEdgeData>[]>(
    () =>
      evaluatedAttacks
        .filter(({ status }) => showNeutralized || status === "effective")
        .map(({ id, attack, attacker, target, status }) => {
          const effective = status === "effective";
          const selected = id === selectedEdgeId;
          const color = effective ? "#2563eb" : "#6b7280";

          return {
            id,
            source: attack.from,
            target: attack.to,
            type: EDGE_STYLE,
            selectable: true,
            interactionWidth: 18,
            style: {
              stroke: color,
              strokeWidth: selected ? 4 : effective ? 2.5 : 1.5,
              strokeDasharray: effective ? undefined : "6 4",
              opacity: selected ? 1 : 0.85,
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
    [evaluatedAttacks, selectedEdgeId, showNeutralized],
  );

  const selectedArgument = selectedArgumentId ? argumentsById.get(selectedArgumentId) : undefined;

  const selectedEdge = selectedEdgeId
    ? edges.find((edge) => edge.id === selectedEdgeId)
    : undefined;

  // Statistiques globales des attaques pour l'acteur choisi.
  const { effectiveCount, neutralizedCount } = evaluatedAttacks.reduce(
    (counts, { status }) => {
      if (status === "effective") {
        counts.effectiveCount++;
      } else {
        counts.neutralizedCount++;
      }

      return counts;
    },
    { effectiveCount: 0, neutralizedCount: 0 },
  );

  function handleActorChange(nextActor: Actor) {
    setActor(nextActor);
    setSelectedArgumentId(null);
    setSelectedEdgeId(null);
  }

  return (
    <main className="vaf-page">
      <header className="vaf-header">
        <div>
          <h1>Débat autour du tramway</h1>
          <p>Argumentation fondée sur les valeurs et les préférences des acteurs.</p>
        </div>

        <ActorSelector actor={actor} actors={actors} onChange={handleActorChange} />
      </header>

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

        <ArgumentDetails
          argument={selectedArgument}
          edgeData={selectedEdge?.data}
          actorName={actor.name}
        />

        <ActorPreferences actor={actor} />
      </section>

      <section className="graph-container">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.2 }}
          minZoom={0.15}
          maxZoom={2}

          nodesDraggable={false}
          nodesConnectable={false}
          edgesReconnectable={false}
          deleteKeyCode={null}

          elementsSelectable={true}
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
        </ReactFlow>
      </section>

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
