import dagre from 'dagre';
import type { EdgeConfig, NodeConfig } from './types';

// Node dimensions used for layout
const NODE_WIDTH = 172;
const NODE_HEIGHT = 48;
const NODE_DEFAULTS = { draggable: false, selectable: false };

// Apply automatic layout to nodes and edges
export function applyAutoLayout(
  rawNodes: Array<NodeConfig>,
  edges: Array<EdgeConfig>,
  direction: 'TB' | 'LR' | 'BT' | 'RL' = 'TB'
): Array<NodeConfig> {
  const map = new Map(rawNodes.map(n => [n.id, { ...n }]));
  const leafs = rawNodes.filter(n => n.type !== 'labeledGroup');

  const g = new dagre.graphlib.Graph();
  g.setDefaultEdgeLabel(() => ({}));
  g.setGraph({ rankdir: direction, marginx: 20, marginy: 20, nodesep: 50, ranksep: 80 });

  leafs.forEach(n => {
    const style = n.data?.style || {};
    const width = style.minWidth || NODE_WIDTH;
    const height = style.height || NODE_HEIGHT;
    g.setNode(n.id, { width, height });
  });
  edges.forEach(e => g.setEdge(e.source, e.target));
  dagre.layout(g);

  leafs.forEach(n => {
    const { x, y } = g.node(n.id);
    const laid = map.get(n.id)!;
    const style = laid.data?.style || {};
    const width = style.minWidth || NODE_WIDTH;
    const height = style.height || NODE_HEIGHT;
    laid.position = { x: x - width / 2, y: y - height / 2 };
  });

  // Return only info nodes (no groups)
  return Array.from(map.values()).filter(n => n.type !== 'labeledGroup');
}

// Add default styles to nodes
export function addDefaultsToNodes(
  nodes: Array<NodeConfig>
): Array<NodeConfig> {
  return nodes.map(node => ({
    ...node,
    style: {
      ...(node.type === 'info' ? NODE_DEFAULTS : {}),
      ...node.style
    },
    data: {
      ...node.data,
      style: {
        ...(node.type === 'info' ? NODE_DEFAULTS : {}),
        ...node.data.style
      }
    }
  }));
}
