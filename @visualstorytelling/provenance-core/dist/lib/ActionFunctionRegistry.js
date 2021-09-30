"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ActionFunctionRegistry = /** @class */ (function () {
    function ActionFunctionRegistry() {
        this.functionRegistry = {};
    }
    /**
     * Register a new function into the provenance tracker (to be able to call it later)
     *
     * @param name The name of the new function to register
     * @param func The ActionFunction to register
     * @param thisArg Value to use as this (i.e the reference Object) when executing callback
     *
     */
    ActionFunctionRegistry.prototype.register = function (name, func, thisArg) {
        if (thisArg === void 0) { thisArg = null; }
        if (this.functionRegistry[name]) {
            throw new Error('Function already registered');
        }
        this.functionRegistry[name] = { func: func, thisArg: thisArg };
    };
    ActionFunctionRegistry.prototype.getFunctionByName = function (name) {
        if (!this.functionRegistry[name]) {
            throw new Error('Function \'' + name + '\' not found in registry');
        }
        return this.functionRegistry[name];
    };
    return ActionFunctionRegistry;
}());
exports.ActionFunctionRegistry = ActionFunctionRegistry;
//# sourceMappingURL=ActionFunctionRegistry.js.map