import { Application, Handler, IProvenanceGraph, NodeIdentifier, ProvenanceNode, RootNode, SerializedProvenanceGraph } from './api';
/**
 * Provenance Graph implementation
 *
 * @param version The version of the software to track the provenance of
 *
 */
export declare class ProvenanceGraph implements IProvenanceGraph {
    application: Application;
    readonly root: RootNode;
    private _current;
    private _mitt;
    private _nodes;
    constructor(application: Application, userid?: string, rootNode?: RootNode);
    addNode(node: ProvenanceNode): void;
    getNode(id: NodeIdentifier): ProvenanceNode;
    current: ProvenanceNode;
    readonly nodes: {
        [key: string]: ProvenanceNode;
    };
    emitNodeChangedEvent(node: ProvenanceNode): void;
    on(type: string, handler: Handler): void;
    off(type: string, handler: Handler): void;
}
export declare function restoreProvenanceGraph(serializedProvenanceGraph: SerializedProvenanceGraph): ProvenanceGraph;
export declare function serializeProvenanceGraph(graph: ProvenanceGraph): SerializedProvenanceGraph;
