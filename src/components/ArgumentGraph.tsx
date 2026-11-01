import { useEffect, useMemo, useState } from "react";
import { Background, Controls, ReactFlow, MarkerType, type Edge, type Node } from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { argumentsList } from "../data/arguments";
import { attacks } from "../data/attacks";
import { actors } from "../data/actors";
import { evaluateAttack } from "../logic/evaluateAttack";
import { computePreferredExtensions } from "../logic/computePreferredExtension";

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
import ActorComparison from "./actor/ActorComparaison";
import GraphToolbar from "./graph/GraphToolbar";
import { layoutArguments, type Point } from "../logic/layoutArguments";
import { edgeTypes } from "./edgeTypes";
import { separateOverlappingEdges } from "../logic/separateOverlappingEdges";

type RoutedEdgeData = VafEdgeData & {
  points?: Point[];
};

export default function ArgumentGraph() {
  // Agent principal : ses préférences restent personnalisables.
  const [actor, setActor] = useState<Actor>(() => ({
    ...actors[0],
    preferences: [...actors[0].preferences],
  }));

  const [hasChanged, setHasChanged] = useState(false);

  // Agent secondaire : sélection d'un acteur de référence.
  const [comparisonActorIndex, setComparisonActorIndex] = useState<string>("");

  const [showNeutralized, setShowNeutralized] = useState(true);
  const [selectedArgumentId, setSelectedArgumentId] = useState<ArgumentId | null>(null);
  const [selectedEdgeId, setSelectedEdgeId] = useState<string | null>(null);

  const argumentsById = useMemo(
    () => new Map(argumentsList.map((argument) => [argument.id, argument])),
    [],
  );

  const [nodes, setNodes] = useState<Node<ArgumentNodeData, "argument">[]>([]);
  const [edgePaths, setEdgePaths] = useState<Record<string, Point[]>>({});

  useEffect(() => {
    let cancelled = false;

    async function calculateLayout() {
      try {
        const layout = await layoutArguments(argumentsList, attacks);

        if (cancelled) {
          return;
        }

        const layoutedNodes: Node<ArgumentNodeData, "argument">[] = argumentsList.map(
          (argument) => ({
            id: argument.id,
            type: "argument",
            position: layout.positions[argument.id] ?? { x: 0, y: 0 },
            data: { argument },
          }),
        );

        setNodes(layoutedNodes);
        setEdgePaths(layout.edgePaths);
      } catch (error) {
        console.error("Erreur lors du calcul de la disposition ELK :", error);
      }
    }

    void calculateLayout();

    return () => {
      cancelled = true;
    };
  }, []);

  // Agent de référence : on utilise ses préférences initiales.
  const comparisonActor = useMemo<Actor | null>(() => {
    if (comparisonActorIndex === "") {
      return null;
    }

    const selected = actors[Number(comparisonActorIndex)];

    if (!selected) {
      return null;
    }

    return {
      ...selected,
      preferences: [...selected.preferences],
    };
  }, [comparisonActorIndex]);

  // Calcul des attaques pour l'agent principal.
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

  // Calcul des attaques pour l'agent de comparaison.
  const comparisonEvaluatedAttacks = useMemo(() => {
    if (!comparisonActor) {
      return [];
    }

    return attacks.map((attack, index) => {
      const attacker = argumentsById.get(attack.from);
      const target = argumentsById.get(attack.to);

      if (!attacker || !target) {
        throw new Error(`Attaque invalide : ${attack.from} -> ${attack.to}`);
      }

      return {
        id: `comparison-attack-${index}`,
        status: evaluateAttack(attack, comparisonActor, argumentsById),
      };
    });
  }, [comparisonActor, argumentsById]);

  const separatedEdgePaths = useMemo(
    () =>
      separateOverlappingEdges(
        Object.entries(edgePaths).map(([id, points]) => ({
          id,
          points,
        })),
      ),
    [edgePaths],
  );
  const edges = useMemo<Edge<RoutedEdgeData>[]>(
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
            type: "elk",
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
              points: separatedEdgePaths[id] ?? edgePaths[id],
            },
          };
        }),
    [evaluatedAttacks, selectedEdgeId, showNeutralized, edgePaths, separatedEdgePaths],
  );

  const selectedArgument = selectedArgumentId ? argumentsById.get(selectedArgumentId) : undefined;

  const selectedEdge = selectedEdgeId
    ? edges.find((edge) => edge.id === selectedEdgeId)
    : undefined;

  // Statistiques de l'agent principal.
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

  // Statistiques de l'agent de comparaison.
  const comparisonCounts = comparisonEvaluatedAttacks.reduce(
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
    setActor({
      ...nextActor,
      preferences: [...nextActor.preferences],
    });

    setHasChanged(false);
    setSelectedArgumentId(null);
    setSelectedEdgeId(null);
  }

  function handlePreferencesChange(nextPreferences: Actor["preferences"]) {
    const matchingActor = actors.find(
      (originalActor) =>
        originalActor.preferences.length === nextPreferences.length &&
        originalActor.preferences.every((value, index) => value === nextPreferences[index]),
    );

    if (matchingActor) {
      setActor({
        ...matchingActor,
        preferences: [...matchingActor.preferences],
      });

      setHasChanged(false);
    } else {
      setActor((currentActor) => ({
        ...currentActor,
        preferences: [...nextPreferences],
      }));

      setHasChanged(true);
    }

    setSelectedArgumentId(null);
    setSelectedEdgeId(null);
  }

  // Calcul des extensions préférées des deux agents.
  const extensions = useMemo(
    () => computePreferredExtensions(argumentsList, attacks, actor),
    [actor],
  );

  const comparisonExtensions = useMemo(
    () =>
      comparisonActor ? computePreferredExtensions(argumentsList, attacks, comparisonActor) : [],
    [comparisonActor],
  );

  return (
    <main className="vaf-page">
      <header className="vaf-header">
        <div>
          <h1>WikiMasterPoulet</h1>
          <p>Argumentation fondée sur les valeurs et les préférences des acteurs.</p>
        </div>

        <div className="actor-selectors">
          <div className="actor-selector-item">
            <span className="comparison-label">Agent principal</span>
            <ActorSelector actor={actor} actors={actors} onChange={handleActorChange} />
          </div>

          <div className="actor-selector-item">
            <label className="comparison-label" htmlFor="comparison-actor">
              Comparer avec
            </label>

            <select
              id="comparison-actor"
              className="comparison-select"
              value={comparisonActorIndex}
              onChange={(event) => setComparisonActorIndex(event.target.value)}
            >
              <option value="">Aucune comparaison</option>

              {actors.map((availableActor, index) => (
                <option key={index} value={String(index)}>
                  {availableActor.name}
                </option>
              ))}
            </select>
          </div>
        </div>
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

        <div className="stat-card stat-exts">
          <span className="stat-label">
            {(extensions.length > 1 ? "Extensions préférées" : "Extension préférée") + ` (${extensions.length})`}
          </span>

          <div className="extensions-container">
            {extensions.map((extension, extIndex) => (
              <div key={`extension-${extIndex}`} className="extension-box">
                <h2>#{extIndex + 1}</h2>

                {extension.map((argument, argIndex) => (
                  <span className="value-tag" key={`argument-${argIndex}`}>
                    {argument.title}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        <ActorPreferences
          actor={actor}
          onPreferencesChange={handlePreferencesChange}
          hasChanged={hasChanged}
        />
      </section>

      {comparisonActor && (
        <ActorComparison
          mainActor={actor}
          comparisonActor={comparisonActor}
          mainEffectiveCount={effectiveCount}
          mainNeutralizedCount={neutralizedCount}
          comparisonEffectiveCount={comparisonCounts.effectiveCount}
          comparisonNeutralizedCount={comparisonCounts.neutralizedCount}
          mainExtensions={extensions}
          comparisonExtensions={comparisonExtensions}
        />
      )}

      <section className="graph-container">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
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

      <GraphToolbar
        showNeutralized={showNeutralized}
        onShowNeutralizedChange={(show) => {
          setShowNeutralized(show);
          setSelectedEdgeId(null);
        }}
      />
    </main>
  );
}
