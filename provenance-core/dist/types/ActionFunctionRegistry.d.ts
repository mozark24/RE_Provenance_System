import { IActionFunctionRegistry, ActionFunction, ActionFunctionWithThis } from './api';
export declare class ActionFunctionRegistry implements IActionFunctionRegistry {
    private functionRegistry;
    /**
     * Register a new function into the provenance tracker (to be able to call it later)
     *
     * @param name The name of the new function to register
     * @param func The ActionFunction to register
     * @param thisArg Value to use as this (i.e the reference Object) when executing callback
     *
     */
    register(name: string, func: ActionFunction, thisArg?: any): void;
    getFunctionByName(name: string): ActionFunctionWithThis;
}
