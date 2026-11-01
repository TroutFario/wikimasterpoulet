import ELK from "elkjs/lib/elk.bundled.js";
import type { ElkNode } from "elkjs/lib/elk-api";

const elk = new ELK();

const NODE_WIDTH = 280;
const NODE_HEIGHT = 150;

export type Point = {
  x: number;
  y: number;
};

type ArgumentLike = {
  id: string;
};

type AttackLike = {
  from: string;
  to: string;
};

export type ArgumentLayout = {
  positions: Record<string, Point>;
  edgePaths: Record<string, Point[]>;
};

export async function layoutArguments(
  argumentsList: ArgumentLike[],
  attacks: AttackLike[],
): Promise<ArgumentLayout> {
  const graph: ElkNode = {
    id: "root",
    layoutOptions: {
      "elk.algorithm": "layered",
      "elk.direction": "RIGHT",
      "elk.edgeRouting": "ORTHOGONAL",
      "elk.spacing.nodeNode": "50",
      "elk.layered.spacing.nodeNodeBetweenLayers": "100",
      "elk.layered.crossingMinimization.strategy": "LAYER_SWEEP",
    },

    children: argumentsList.map((argument) => ({
      id: argument.id,
      width: NODE_WIDTH,
      height: NODE_HEIGHT,
      layoutOptions: {
        "elk.portConstraints": "FIXED_POS",
      },
      ports: [
        {
          id: `${argument.id}-in`,
          x: 0,
          y: NODE_HEIGHT / 2,
          width: 1,
          height: 1,
          layoutOptions: {
            "elk.port.side": "WEST",
          },
        },
        {
          id: `${argument.id}-out`,
          x: NODE_WIDTH - 1,
          y: NODE_HEIGHT / 2,
          width: 1,
          height: 1,
          layoutOptions: {
            "elk.port.side": "EAST",
          },
        },
      ],
    })),

    edges: attacks.map((attack, index) => ({
      id: `attack-${index}`,
      sources: [`${attack.from}-out`],
      targets: [`${attack.to}-in`],
    })),
  };

  const layoutedGraph = await elk.layout(graph);

  const positions: Record<string, Point> = {};
  const edgePaths: Record<string, Point[]> = {};

  for (const node of layoutedGraph.children ?? []) {
    positions[node.id] = {
      x: node.x ?? 0,
      y: node.y ?? 0,
    };
  }

  for (const edge of layoutedGraph.edges ?? []) {
    const section = edge.sections?.[0];

    if (!section) {
      continue;
    }

    edgePaths[edge.id] = [section.startPoint, ...(section.bendPoints ?? []), section.endPoint].map(
      (point) => ({
        x: point.x,
        y: point.y,
      }),
    );
  }

  return { positions, edgePaths };
}
