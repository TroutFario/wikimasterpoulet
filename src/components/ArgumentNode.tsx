import { Handle, Position, type Node, type NodeProps } from "@xyflow/react";
import type { Argument } from "../types/argumentation";
import { valueLabels } from "../data/actors";

export interface ArgumentNodeData extends Record<string, unknown> {
  argument: Argument;
}

export type ArgumentFlowNode = Node<ArgumentNodeData, "argument">;

export default function ArgumentNode({
  data,
  selected,
}: NodeProps<ArgumentFlowNode>) {
  const argument = data.argument;

  return (
    <div
      className={`argument-node ${
        argument.position === "Soutient" ? "support" : "oppose"
      } ${selected ? "selected" : ""}`}
    >
      <Handle type="target" position={Position.Left} />

      <div className="argument-node-top">
        <span className="argument-position">
          {argument.position === "Soutient" ? "FAVORABLE" : "DÉFAVORABLE"}
        </span>

        <span className="argument-value">
          {valueLabels[argument.value]}
        </span>
      </div>

      <strong className="argument-title">{argument.title}</strong>
      <p className="argument-text">{argument.text}</p>

      <Handle type="source" position={Position.Right} />
    </div>
  );
}