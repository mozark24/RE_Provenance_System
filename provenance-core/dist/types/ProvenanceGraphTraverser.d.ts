import { IProvenanceGraphTraverser, ProvenanceNode, StateNode, IActionFunctionRegistry, IProvenanceGraph, NodeIdentifier, ActionFunctionWithThis, IProvenanceTracker, Handler } from './api';
export declare class ProvenanceGraphTraverser implements IProvenanceGraphTraverser {
    graph: IProvenanceGraph;
    tracker: IProvenanceTracker | null;
    /**
     * trackingWhenTraversing === false disables tracking when traversing to prevent feedback.
     * When applying an action, the object we're tracking might trigger its event listeners. This
     * means that more Nodes are added to the ProvenanceGraph when traversing, which is most likely
     * unwanted behaviour.
     *
     * It will enable/disable immediately before/after calling the action. So if the event is emitted
     * asynchronously after the action, it will not work.
     */
    trackingWhenTraversing: boolean;
    private registry;
    private _mitt;
    constructor(registry: IActionFunctionRegistry, graph: IProvenanceGraph, tracker?: IProvenanceTracker | null);
    executeFunctions(functionsToDo: ActionFunctionWithThis[], argumentsToDo: any[], transitionTimes: number[]): Promise<StateNode>;
    /**
     * Finds shortest path between current node and node with request identifer.
     * Calls the do/undo functions of actions on the path.
     *
     * @param id Node identifier
     */
    toStateNode(id: NodeIdentifier, transtionTime?: number): Promise<ProvenanceNode | undefined>;
    private getFunctionsAndArgsFromTrack;
    on(type: string, handler: Handler): void;
    off(type: string, handler: Handler): void;
}
