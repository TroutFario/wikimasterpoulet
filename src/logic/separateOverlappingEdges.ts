import type { Point } from "./layoutArguments";

type EdgePath = {
  id: string;
  points: Point[];
};

type Segment = {
  edgeId: string;
  index: number;
  orientation: "horizontal" | "vertical";
  fixed: number;
  start: number;
  end: number;
};

const TOLERANCE = 2;
const OFFSET_STEP = 8;

function getSegments(paths: EdgePath[]): Segment[] {
  const segments: Segment[] = [];

  for (const path of paths) {
    for (let i = 0; i < path.points.length - 1; i++) {
      const a = path.points[i];
      const b = path.points[i + 1];

      if (Math.abs(a.y - b.y) <= TOLERANCE && Math.abs(a.x - b.x) > TOLERANCE) {
        segments.push({
          edgeId: path.id,
          index: i,
          orientation: "horizontal",
          fixed: (a.y + b.y) / 2,
          start: Math.min(a.x, b.x),
          end: Math.max(a.x, b.x),
        });
      } else if (Math.abs(a.x - b.x) <= TOLERANCE && Math.abs(a.y - b.y) > TOLERANCE) {
        segments.push({
          edgeId: path.id,
          index: i,
          orientation: "vertical",
          fixed: (a.x + b.x) / 2,
          start: Math.min(a.y, b.y),
          end: Math.max(a.y, b.y),
        });
      }
    }
  }

  return segments;
}

function getSegmentOffsets(segments: Segment[]): Map<string, number> {
  const offsets = new Map<string, number>();
  const visited = new Set<string>();

  const keyOf = (segment: Segment) => `${segment.edgeId}::${segment.index}`;

  const neighbors = new Map<string, Set<string>>();

  for (const segment of segments) {
    neighbors.set(keyOf(segment), new Set());
  }

  for (let i = 0; i < segments.length; i++) {
    for (let j = i + 1; j < segments.length; j++) {
      const a = segments[i];
      const b = segments[j];

      if (a.edgeId === b.edgeId) continue;
      if (a.orientation !== b.orientation) continue;

      if (Math.abs(a.fixed - b.fixed) > TOLERANCE) continue;

      const overlap = Math.min(a.end, b.end) - Math.max(a.start, b.start);

      if (overlap <= TOLERANCE) continue;

      const keyA = keyOf(a);
      const keyB = keyOf(b);

      neighbors.get(keyA)?.add(keyB);
      neighbors.get(keyB)?.add(keyA);
    }
  }

  for (const segment of segments) {
    const startKey = keyOf(segment);

    if (visited.has(startKey)) continue;
    if ((neighbors.get(startKey)?.size ?? 0) === 0) continue;

    const component: string[] = [];
    const stack = [startKey];

    while (stack.length > 0) {
      const current = stack.pop()!;

      if (visited.has(current)) continue;

      visited.add(current);
      component.push(current);

      for (const neighbor of neighbors.get(current) ?? []) {
        if (!visited.has(neighbor)) {
          stack.push(neighbor);
        }
      }
    }

    component.sort();

    component.forEach((key, index) => {
      offsets.set(key, (index - (component.length - 1) / 2) * OFFSET_STEP);
    });
  }

  return offsets;
}

function getOrientation(a: Point, b: Point): "horizontal" | "vertical" {
  return Math.abs(a.y - b.y) <= TOLERANCE ? "horizontal" : "vertical";
}

export function separateOverlappingEdges(paths: EdgePath[]): Record<string, Point[]> {
  const segments = getSegments(paths);
  const offsets = getSegmentOffsets(segments);

  const result: Record<string, Point[]> = {};

  for (const path of paths) {
    const points = path.points;

    if (points.length < 3) {
      result[path.id] = points;
      continue;
    }

    const segmentOffsets = points.slice(0, -1).map((_, index) => {
      if (index === 0 || index === points.length - 2) {
        return 0;
      }

      return offsets.get(`${path.id}::${index}`) ?? 0;
    });

    const adjusted: Point[] = [points[0]];

    for (let i = 1; i < points.length - 1; i++) {
      const previous = points[i - 1];
      const current = points[i];
      const next = points[i + 1];

      const previousOrientation = getOrientation(previous, current);
      const nextOrientation = getOrientation(current, next);

      const previousOffset = segmentOffsets[i - 1];
      const nextOffset = segmentOffsets[i];

      let point: Point;

      if (previousOrientation === "horizontal" && nextOrientation === "vertical") {
        point = {
          x: current.x + nextOffset,
          y: current.y + previousOffset,
        };
      } else if (previousOrientation === "vertical" && nextOrientation === "horizontal") {
        point = {
          x: current.x + previousOffset,
          y: current.y + nextOffset,
        };
      } else if (previousOrientation === "horizontal") {
        point = {
          x: current.x,
          y: current.y + (previousOffset + nextOffset) / 2,
        };
      } else {
        point = {
          x: current.x + (previousOffset + nextOffset) / 2,
          y: current.y,
        };
      }

      adjusted.push(point);
    }

    adjusted.push(points[points.length - 1]);

    result[path.id] = adjusted;
  }

  return result;
}
