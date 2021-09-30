import { HierarchyNode, HierarchyPointNode } from 'd3-hierarchy';
export interface IGratzlLayout<Datum> {
    (root: HierarchyNode<Datum>, activeNode: HierarchyNode<Datum>): IHierarchyPointNodeWithMaxDepth<Datum>;
    size(): [number, number];
    size(size: [number, number]): this;
}
export interface IHierarchyPointNodeWithMaxDepth<Datum> extends HierarchyPointNode<Datum> {
    maxDescendantDepth: number;
    xOffset: number;
}
export default function GratzlLayout<Datum>(): IGratzlLayout<Datum>;
