import type { QTreeNode } from "quasar";

export enum EntityType {
  job,
  story,
  comment,
  poll,
  pollopt,
}

type UnixTimestampInSeconds = number;

export interface BaseEntity {
  id: number;
  deleted?: boolean;
  type?: EntityType;
  by?: string;
  time?: UnixTimestampInSeconds;
  text?: string;
  dead?: boolean;
  parent?: number;
  poll?: string;
  kids?: number[];
  url?: string;
  score?: number;
  title?: string;
  parts?: number[];
  descendants?: number;
}

export interface BaseUser {
  id: string;
  created: UnixTimestampInSeconds;
  karma: number;
  about?: string;
  submitted?: number[];
}

export interface CommentNode extends QTreeNode, BaseEntity {
  children?: CommentNode[];
}
