import { ProvenanceNode, StateNode, Action, ReversibleAction } from './api';
export declare function generateUUID(): string;
/**
 * Generate a Unix timestamp in milliseconds
 *
 * @returns {number} in milliseconds
 */
export declare function generateTimestamp(): number;
export declare function isStateNode(node: ProvenanceNode): node is StateNode;
export declare function isReversibleAction(action: Action): action is ReversibleAction;
