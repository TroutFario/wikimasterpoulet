import { BaseEdge, type Edge, type EdgeProps } from "@xyflow/react";
import type { Point } from "../logic/layoutArguments";
import type { VafEdgeData } from "../types/argumentation";

type RoutedEdgeData = VafEdgeData & {
  points?: Point[];
};

type RoutedEdge = Edge<RoutedEdgeData>;

export default function ElkEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  data,
  markerEnd,
  style,
  interactionWidth,
}: EdgeProps<RoutedEdge>) {
  const points = data?.points;

  const route =
    points && points.length >= 2
      ? points
      : [
          { x: sourceX, y: sourceY },
          { x: targetX, y: targetY },
        ];

  const path = route
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
    .join(" ");

  return (
    <BaseEdge
      id={id}
      path={path}
      markerEnd={markerEnd}
      style={style}
      interactionWidth={interactionWidth}
    />
  );
}
