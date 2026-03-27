// Types matching old/src/components/Project/Graph/types.ts
export type NodeStyle = {
  padding?: number;
  border?: string;
  borderRadius?: number;
  minWidth?: number;
  background?: string;
  zIndex?: number;
  height?: number;
  width?: number;
  textAlign?: 'left' | 'center' | 'right';
  [key: string]: any;
};

export type CardContent = {
  Header?: string;
  Body?: string;
  Footer?: string;
};

export type LabelData = {
  iconName: string;
  text: string;
};

export type NodeData = {
  name?: string;
  label: LabelData | string;
  info?: string;
  style?: NodeStyle;
  Card?: CardContent;
};

export type NodeConfig = {
  id: string;
  type: string;
  data: NodeData;
  position?: { x: number; y: number };
  height?: number;
  width?: number;
  parentId?: string;
  extent?: string;
  style?: NodeStyle;
};

export type EdgeConfig = {
  id: string;
  source: string;
  target: string;
  label?: string;
  markerEnd?: { type: string };
};

export type ArchitectureDiagramProps = {
  nodes: Array<NodeConfig>;
  edges: Array<EdgeConfig>;
  direction?: 'TB' | 'LR' | 'BT' | 'RL';
  height?: number | string;
  padding?: number;
  id?: any;
};
