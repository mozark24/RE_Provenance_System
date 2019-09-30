"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
var mitt_1 = require("./mitt");
function isNextNodeInTrackUp(currentNode, nextNode) {
    if (utils_1.isStateNode(currentNode) && currentNode.parent === nextNode) {
        return true;
    }
    else if (utils_1.isStateNode(nextNode) && nextNode.parent !== currentNode) {
        // This is a guard against the illegitimate use of this function for unconnected nodes
        /* istanbul ignore next */
        throw new Error('Unconnected nodes, you probably should not be using this function');
    }
    else {
        return false;
    }
}
function findPathToTargetNode(currentNode, targetNode, track, comingFromNode) {
    if (comingFromNode === void 0) { comingFromNode = currentNode; }
    if (currentNode && currentNode === targetNode) {
        track.unshift(currentNode);
        return true;
    }
    else if (currentNode) {
        // Map the StateNodes in the children StateEdges
        var nodesToCheck = currentNode.children.slice();
        // Add the parent node to that same list
        /* istanbul ignore else */
        if (utils_1.isStateNode(currentNode)) {
            nodesToCheck.push(currentNode.parent);
        }
        for (var _i = 0, nodesToCheck_1 = nodesToCheck; _i < nodesToCheck_1.length; _i++) {
            var node = nodesToCheck_1[_i];
            // If the node to check is in the track already, skip it.
            if (node === comingFromNode) {
                continue;
            }
            /* istanbul ignore else */
            if (findPathToTargetNode(node, targetNode, track, currentNode)) {
                track.unshift(currentNode);
                return true;
            }
        }
    }
    /* istanbul ignore next */
    return false;
}
var IrreversibleError = /** @class */ (function (_super) {
    __extends(IrreversibleError, _super);
    function IrreversibleError() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.invalidTraversal = true;
        return _this;
    }
    return IrreversibleError;
}(Error));
var ProvenanceGraphTraverser = /** @class */ (function () {
    function ProvenanceGraphTraverser(registry, graph, tracker) {
        if (tracker === void 0) { tracker = null; }
        /**
         * trackingWhenTraversing === false disables tracking when traversing to prevent feedback.
         * When applying an action, the object we're tracking might trigger its event listeners. This
         * means that more Nodes are added to the ProvenanceGraph when traversing, which is most likely
         * unwanted behaviour.
         *
         * It will enable/disable immediately before/after calling the action. So if the event is emitted
         * asynchronously after the action, it will not work.
         */
        this.trackingWhenTraversing = false;
        this.registry = registry;
        this.graph = graph;
        this.tracker = tracker;
        this._mitt = mitt_1.default();
    }
    ProvenanceGraphTraverser.prototype.executeFunctions = function (functionsToDo, argumentsToDo, transitionTimes) {
        return __awaiter(this, void 0, void 0, function () {
            var result, i, funcWithThis, promise;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < functionsToDo.length)) return [3 /*break*/, 4];
                        funcWithThis = functionsToDo[i];
                        promise = void 0;
                        if (this.tracker && this.tracker.acceptActions && !this.trackingWhenTraversing) {
                            this.tracker.acceptActions = false;
                            promise = funcWithThis.func.apply(funcWithThis.thisArg, argumentsToDo[i]);
                            this.tracker.acceptActions = true;
                        }
                        else {
                            promise = funcWithThis.func.apply(funcWithThis.thisArg, argumentsToDo[i]);
                        }
                        return [4 /*yield*/, promise];
                    case 2:
                        result = _a.sent();
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, result];
                }
            });
        });
    };
    /**
     * Finds shortest path between current node and node with request identifer.
     * Calls the do/undo functions of actions on the path.
     *
     * @param id Node identifier
     */
    ProvenanceGraphTraverser.prototype.toStateNode = function (id, transtionTime) {
        return __awaiter(this, void 0, void 0, function () {
            var currentNode, targetNode, trackToTarget, success, functionsToDo, argumentsToDo, transitionTimes, arg, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        currentNode = this.graph.current;
                        targetNode = this.graph.getNode(id);
                        if (currentNode === targetNode) {
                            return [2 /*return*/, Promise.resolve(currentNode)];
                        }
                        trackToTarget = [];
                        success = findPathToTargetNode(currentNode, targetNode, trackToTarget);
                        /* istanbul ignore if */
                        if (!success) {
                            throw new Error('No path to target node found in graph');
                        }
                        transitionTimes = [];
                        try {
                            arg = this.getFunctionsAndArgsFromTrack(trackToTarget);
                            functionsToDo = arg.functionsToDo;
                            argumentsToDo = arg.argumentsToDo;
                            functionsToDo.forEach(function (func) {
                                transitionTimes.push(transtionTime || 0);
                            });
                        }
                        catch (error) {
                            if (error.invalidTraversal) {
                                this._mitt.emit('invalidTraversal', targetNode);
                                return [2 /*return*/, undefined];
                            }
                            else {
                                throw error;
                            }
                        }
                        return [4 /*yield*/, this.executeFunctions(functionsToDo, argumentsToDo, transitionTimes)];
                    case 1:
                        result = _a.sent();
                        this.graph.current = targetNode;
                        return [2 /*return*/, result];
                }
            });
        });
    };
    ProvenanceGraphTraverser.prototype.getFunctionsAndArgsFromTrack = function (track) {
        var functionsToDo = [];
        var argumentsToDo = [];
        for (var i = 0; i < track.length - 1; i++) {
            var thisNode = track[i];
            var nextNode = track[i + 1];
            var up = isNextNodeInTrackUp(thisNode, nextNode);
            if (up) {
                /* istanbul ignore else */
                if (utils_1.isStateNode(thisNode)) {
                    if (!utils_1.isReversibleAction(thisNode.action)) {
                        throw new IrreversibleError('trying to undo an Irreversible action');
                    }
                    var undoFunc = this.registry.getFunctionByName(thisNode.action.undo);
                    functionsToDo.push(undoFunc);
                    argumentsToDo.push(thisNode.action.undoArguments);
                }
                else {
                    /* istanbul ignore next */
                    throw new Error('Going up from root? unreachable error ... i hope');
                }
            }
            else {
                /* istanbul ignore else */
                if (utils_1.isStateNode(nextNode)) {
                    var doFunc = this.registry.getFunctionByName(nextNode.action.do);
                    functionsToDo.push(doFunc);
                    argumentsToDo.push(nextNode.action.doArguments);
                }
                else {
                    /* istanbul ignore next */
                    throw new Error('Going down to the root? unreachable error ... i hope');
                }
            }
        }
        return { functionsToDo: functionsToDo, argumentsToDo: argumentsToDo };
    };
    ProvenanceGraphTraverser.prototype.on = function (type, handler) {
        this._mitt.on(type, handler);
    };
    ProvenanceGraphTraverser.prototype.off = function (type, handler) {
        this._mitt.off(type, handler);
    };
    return ProvenanceGraphTraverser;
}());
exports.ProvenanceGraphTraverser = ProvenanceGraphTraverser;
//# sourceMappingURL=ProvenanceGraphTraverser.js.map