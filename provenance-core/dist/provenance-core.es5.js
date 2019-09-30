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

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
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
}

function generateUUID() {
    // Public Domain/MIT
    var d = new Date().getTime();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
        d += performance.now(); // use high-precision timer if available
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        // tslint:disable-next-line:no-bitwise
        var r = ((d + Math.random() * 16) % 16) | 0;
        d = Math.floor(d / 16);
        // tslint:disable-next-line:no-bitwise
        return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
    });
}
/**
 * Generate a Unix timestamp in milliseconds
 *
 * @returns {number} in milliseconds
 */
function generateTimestamp() {
    // Removed, because performance.now() returns a floating point number, which is not compatible with the Date.getTime() integer
    // if (
    //   window.performance &&
    //   window.performance.now &&
    //   window.performance.timing &&
    //   window.performance.timing.navigationStart
    // ) {
    //   return window.performance.now();
    // }
    return new Date().getTime();
}
function isStateNode(node) {
    return 'parent' in node;
}
function isReversibleAction(action) {
    return 'undo' in action;
}

/** Mitt: Tiny (~200b) functional event emitter / pubsub.
 *  @name mitt
 *  @returns {Mitt}
 */
function mitt(all) {
    all = all || Object.create(null);
    return {
        /**
         * Register an event handler for the given type.
         *
         * @param  {String} type	Type of event to listen for
         * @param  {Function} handler Function to call in response to given event
         * @memberOf mitt
         */
        on: function (type, handler) {
            (all[type] || (all[type] = [])).push(handler);
        },
        /**
         * Remove an event handler for the given type.
         *
         * @param  {String} type	Type of event to unregister `handler` from
         * @param  {Function} handler Handler function to remove
         * @memberOf mitt
         */
        off: function (type, handler) {
            if (all[type]) {
                // tslint:disable-next-line:no-bitwise
                all[type].splice(all[type].indexOf(handler) >>> 0, 1);
            }
        },
        /**
         * Invoke all handlers for the given type.
         *
         * @param {String} type  The event type to invoke
         * @param {Any} [evt]  Any value (object is recommended and powerful), passed to each handler
         * @memberOf mitt
         */
        emit: function (type, evt) {
            (all[type] || []).slice().map(function (handler) {
                handler(evt);
            });
        }
    };
}

/**
 * Provenance Graph implementation
 *
 * @param version The version of the software to track the provenance of
 *
 */
var ProvenanceGraph = /** @class */ (function () {
    function ProvenanceGraph(application, userid, rootNode) {
        if (userid === void 0) { userid = 'Unknown'; }
        this._nodes = {};
        this._mitt = mitt();
        this.application = application;
        if (rootNode) {
            this.root = rootNode;
        }
        else {
            this.root = {
                id: generateUUID(),
                label: 'Root',
                metadata: {
                    createdBy: userid,
                    createdOn: generateTimestamp()
                },
                children: [],
                artifacts: {}
            };
        }
        this.addNode(this.root);
        this._current = this.root;
    }
    ProvenanceGraph.prototype.addNode = function (node) {
        if (this._nodes[node.id]) {
            throw new Error('Node already added');
        }
        this._nodes[node.id] = node;
        this._mitt.emit('nodeAdded', node);
    };
    ProvenanceGraph.prototype.getNode = function (id) {
        var result = this._nodes[id];
        if (!result) {
            throw new Error('Node id not found');
        }
        return this._nodes[id];
    };
    Object.defineProperty(ProvenanceGraph.prototype, "current", {
        get: function () {
            return this._current;
        },
        set: function (node) {
            if (!this._nodes[node.id]) {
                throw new Error('Node id not found');
            }
            this._current = node;
            this._mitt.emit('currentChanged', node);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProvenanceGraph.prototype, "nodes", {
        get: function () {
            return this._nodes;
        },
        enumerable: true,
        configurable: true
    });
    ProvenanceGraph.prototype.emitNodeChangedEvent = function (node) {
        /* istanbul ignore if */
        if (!this._nodes[node.id]) {
            throw new Error('Node id not found');
        }
        this._mitt.emit('nodeChanged', node);
    };
    ProvenanceGraph.prototype.on = function (type, handler) {
        this._mitt.on(type, handler);
    };
    ProvenanceGraph.prototype.off = function (type, handler) {
        this._mitt.off(type, handler);
    };
    return ProvenanceGraph;
}());
/* Beware that deeply nested properties in serializedProvenanceGraph is mutated in the process */
function restoreProvenanceGraph(serializedProvenanceGraph) {
    var nodes = {};
    // restore nodes as key value
    for (var _i = 0, _a = serializedProvenanceGraph.nodes; _i < _a.length; _i++) {
        var node = _a[_i];
        nodes[node.id] = __assign({}, node);
    }
    // restore parent/children relations
    for (var _b = 0, _c = Object.keys(nodes); _b < _c.length; _b++) {
        var nodeId = _c[_b];
        var node = nodes[nodeId];
        node.children = node.children.map(function (id) { return nodes[id]; });
        if ('parent' in node) {
            node.parent = nodes[node.parent];
        }
    }
    var graph = new ProvenanceGraph(serializedProvenanceGraph.application);
    graph._nodes = nodes;
    graph._current = nodes[serializedProvenanceGraph.current];
    graph.root = nodes[serializedProvenanceGraph.root];
    return graph;
}
function serializeProvenanceGraph(graph) {
    var nodes = Object.keys(graph.nodes).map(function (nodeId) {
        var node = graph.getNode(nodeId);
        var serializedNode = __assign({}, node);
        if (isStateNode(node)) {
            serializedNode.parent = node.parent.id;
        }
        serializedNode.children = node.children.map(function (child) { return child.id; });
        return serializedNode;
    });
    return {
        nodes: nodes,
        root: graph.root.id,
        application: graph.application,
        current: graph.current.id
    };
}

/**
 * Provenance Graph Tracker implementation
 *
 * @param graph The provenance graph to track (this will serve as storage construct)
 * @param current Optional parameter to set current node for importing a provenance graph that is non-empty
 *
 */
var ProvenanceTracker = /** @class */ (function () {
    function ProvenanceTracker(registry, graph, username) {
        if (username === void 0) { username = 'Unknown'; }
        /**
         * When acceptActions is false, the Tracker will ignore calls to applyAction
         */
        this.acceptActions = true;
        this.registry = registry;
        this.graph = graph;
        this.username = username;
    }
    /**
     * Calls the action.do function with action.doArguments
     *
     * @param action
     * @param skipFirstDoFunctionCall If set to true, the do-function will not be called this time,
     *        it will only be called when traversing.
     */
    ProvenanceTracker.prototype.applyAction = function (action, skipFirstDoFunctionCall) {
        if (skipFirstDoFunctionCall === void 0) { skipFirstDoFunctionCall = false; }
        return __awaiter(this, void 0, void 0, function () {
            var createNewStateNode, newNode, currentNode, functionNameToExecute, funcWithThis, actionResult;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.acceptActions) {
                            return [2 /*return*/, Promise.resolve(this.graph.current)];
                        }
                        createNewStateNode = function (parentNode, actionResult) { return ({
                            id: generateUUID(),
                            label: action.do,
                            metadata: {
                                createdBy: _this.username,
                                createdOn: generateTimestamp()
                            },
                            action: action,
                            actionResult: actionResult,
                            parent: parentNode,
                            children: [],
                            artifacts: {}
                        }); };
                        currentNode = this.graph.current;
                        if (!skipFirstDoFunctionCall) return [3 /*break*/, 1];
                        newNode = createNewStateNode(this.graph.current, null);
                        return [3 /*break*/, 3];
                    case 1:
                        functionNameToExecute = action.do;
                        funcWithThis = this.registry.getFunctionByName(functionNameToExecute);
                        return [4 /*yield*/, funcWithThis.func.apply(funcWithThis.thisArg, action.doArguments)];
                    case 2:
                        actionResult = _a.sent();
                        newNode = createNewStateNode(currentNode, actionResult);
                        _a.label = 3;
                    case 3:
                        // When the node is created, we need to update the graph.
                        currentNode.children.push(newNode);
                        this.graph.addNode(newNode);
                        this.graph.current = newNode;
                        return [2 /*return*/, newNode];
                }
            });
        });
    };
    return ProvenanceTracker;
}());

function isNextNodeInTrackUp(currentNode, nextNode) {
    if (isStateNode(currentNode) && currentNode.parent === nextNode) {
        return true;
    }
    else if (isStateNode(nextNode) && nextNode.parent !== currentNode) {
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
        if (isStateNode(currentNode)) {
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
        this._mitt = mitt();
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
                if (isStateNode(thisNode)) {
                    if (!isReversibleAction(thisNode.action)) {
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
                if (isStateNode(nextNode)) {
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

var ProvenanceSlide = /** @class */ (function () {
    function ProvenanceSlide(name, duration, transitionTime, annotations, node) {
        if (annotations === void 0) { annotations = []; }
        if (node === void 0) { node = null; }
        this._id = generateUUID();
        this._name = name;
        this._duration = duration;
        this._transitionTime = transitionTime;
        this._annotations = annotations;
        this._node = node;
        this._mitt = mitt();
        this._xPosition = 0;
    }
    Object.defineProperty(ProvenanceSlide.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProvenanceSlide.prototype, "node", {
        get: function () {
            return this._node;
        },
        set: function (value) {
            this._node = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProvenanceSlide.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (value) {
            this._name = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProvenanceSlide.prototype, "duration", {
        get: function () {
            return this._duration;
        },
        set: function (value) {
            this._duration = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProvenanceSlide.prototype, "transitionTime", {
        get: function () {
            return this._transitionTime;
        },
        set: function (value) {
            this._transitionTime = value;
        },
        enumerable: true,
        configurable: true
    });
    ProvenanceSlide.prototype.addAnnotation = function (annotation) {
        this._annotations.push(annotation);
        this._mitt.emit('addAnnotation', annotation);
    };
    ProvenanceSlide.prototype.removeAnnotation = function (annotation) {
        var index = this._annotations.indexOf(annotation);
        this._annotations.splice(index, 1);
        this._mitt.emit('removeAnnotation', annotation);
    };
    Object.defineProperty(ProvenanceSlide.prototype, "annotations", {
        get: function () {
            return this._annotations;
        },
        enumerable: true,
        configurable: true
    });
    ProvenanceSlide.prototype.on = function (type, handler) {
        this._mitt.on(type, handler);
    };
    ProvenanceSlide.prototype.off = function (type, handler) {
        this._mitt.off(type, handler);
    };
    Object.defineProperty(ProvenanceSlide.prototype, "xPosition", {
        get: function () {
            return this._xPosition;
        },
        set: function (value) {
            this._xPosition = value;
        },
        enumerable: true,
        configurable: true
    });
    return ProvenanceSlide;
}());

var ProvenanceSlidedeck = /** @class */ (function () {
    function ProvenanceSlidedeck(application, traverser) {
        this._slides = [];
        this._captainPlaceholder = new ProvenanceSlide('Captain Placeholder', 0, 0);
        this._mitt = mitt();
        this._application = application;
        this._graph = traverser.graph;
        this._traverser = traverser;
        this._selectedSlide = null;
    }
    Object.defineProperty(ProvenanceSlidedeck.prototype, "application", {
        get: function () {
            return this._application;
        },
        enumerable: true,
        configurable: true
    });
    ProvenanceSlidedeck.prototype.addSlide = function (slide, index) {
        if (!index ||
            isNaN(index) ||
            !Number.isInteger(index) ||
            index > this._slides.length ||
            index < 0) {
            index = this._slides.length;
        }
        if (slide && this._slides.indexOf(slide) >= 0) {
            throw new Error('Cannot add a slide that is already in the deck');
        }
        if (!slide) {
            var node = this._graph.current;
            slide = new ProvenanceSlide(node.label, 1, 0, [], node);
        }
        if (this._slides.length === 0) {
            this._selectedSlide = slide;
        }
        this._slides.splice(index, 0, slide);
        this._mitt.emit('slideAdded', slide);
        return slide;
    };
    ProvenanceSlidedeck.prototype.removeSlideAtIndex = function (index) {
        var deletedSlides = this._slides.splice(index, 1);
        // This can only be 1 slide now, therefore this is ok.
        if (this._selectedSlide === deletedSlides[0]) {
            this.selectedSlide = null;
        }
        this._mitt.emit('slideRemoved', deletedSlides[0]);
    };
    ProvenanceSlidedeck.prototype.removeSlide = function (slide) {
        this.removeSlideAtIndex(this._slides.indexOf(slide));
    };
    Object.defineProperty(ProvenanceSlidedeck.prototype, "selectedSlide", {
        get: function () {
            return this._selectedSlide;
        },
        set: function (slide) {
            if (slide && slide.node) {
                this._traverser.toStateNode(slide.node.id, slide.transitionTime);
            }
            this._selectedSlide = slide;
            this._mitt.emit('slideSelected', slide);
        },
        enumerable: true,
        configurable: true
    });
    ProvenanceSlidedeck.prototype.moveSlide = function (indexFrom, indexTo) {
        if (indexTo < 0 || indexTo > this.slides.length - 1) {
            throw new Error('target index out of bounds');
        }
        if (indexTo >= this._slides.length) {
            var k = indexTo - this._slides.length + 1;
            while (k--) {
                this._slides.push(this._captainPlaceholder);
            }
        }
        this._slides.splice(indexTo, 0, this._slides.splice(indexFrom, 1)[0]);
        this._mitt.emit('slidesMoved', this._slides);
    };
    ProvenanceSlidedeck.prototype.startTime = function (slide) {
        var index = this._slides.indexOf(slide);
        var previousTime = 0;
        for (var i = 0; i < index; i++) {
            previousTime += this._slides[i].transitionTime;
            previousTime += this._slides[i].duration;
        }
        return previousTime;
    };
    ProvenanceSlidedeck.prototype.slideAtTime = function (time) {
        var index = 0;
        var currentSlide = null;
        while (time >= 0 && index < this.slides.length) {
            currentSlide = this.slides[index];
            var nextSlideOffset = currentSlide.transitionTime + currentSlide.duration;
            if (time - nextSlideOffset < 0) {
                break;
            }
            time -= nextSlideOffset;
            index++;
        }
        return currentSlide;
    };
    Object.defineProperty(ProvenanceSlidedeck.prototype, "slides", {
        get: function () {
            return this._slides;
        },
        enumerable: true,
        configurable: true
    });
    ProvenanceSlidedeck.prototype.next = function () {
        if (this._selectedSlide !== null) {
            var currentIndex = this._slides.indexOf(this._selectedSlide);
            if (currentIndex < this._slides.length - 1) {
                currentIndex += 1;
                this.selectedSlide = this._slides[currentIndex];
            }
            else {
                this.selectedSlide = this._slides[0];
            }
        }
    };
    ProvenanceSlidedeck.prototype.previous = function () {
        if (this._selectedSlide !== null) {
            var currentIndex = this._slides.indexOf(this._selectedSlide);
            if (currentIndex > 0) {
                currentIndex -= 1;
                this.selectedSlide = this._slides[currentIndex];
            }
            else {
                this.selectedSlide = this._slides[this._slides.length - 1];
            }
        }
    };
    Object.defineProperty(ProvenanceSlidedeck.prototype, "graph", {
        get: function () {
            return this._graph;
        },
        enumerable: true,
        configurable: true
    });
    ProvenanceSlidedeck.prototype.on = function (type, handler) {
        this._mitt.on(type, handler);
    };
    ProvenanceSlidedeck.prototype.off = function (type, handler) {
        this._mitt.off(type, handler);
    };
    return ProvenanceSlidedeck;
}());

var STATUS;
(function (STATUS) {
    STATUS[STATUS["IDLE"] = 0] = "IDLE";
    STATUS[STATUS["PLAYING"] = 1] = "PLAYING";
})(STATUS || (STATUS = {}));
var wait = function (duration) { return new Promise(function (resolve) { return setTimeout(resolve, duration); }); };
var ProvenanceSlidedeckPlayer = /** @class */ (function () {
    function ProvenanceSlidedeckPlayer(slides, selectCallback) {
        this._selectCallback = selectCallback;
        this._slides = slides;
        this._currentSlideIndex = 0;
        this._status = STATUS.IDLE;
    }
    ProvenanceSlidedeckPlayer.prototype.setSlideIndex = function (slideIndex) {
        this._currentSlideIndex = slideIndex;
    };
    Object.defineProperty(ProvenanceSlidedeckPlayer.prototype, "slides", {
        get: function () {
            return this._slides;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProvenanceSlidedeckPlayer.prototype, "currentSlideIndex", {
        get: function () {
            return this._currentSlideIndex;
        },
        set: function (index) {
            this._currentSlideIndex = index;
        },
        enumerable: true,
        configurable: true
    });
    ProvenanceSlidedeckPlayer.prototype.play = function () {
        return __awaiter(this, void 0, void 0, function () {
            var shouldPlayNext, slide;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        shouldPlayNext = function () {
                            return _this._status === STATUS.PLAYING && _this._currentSlideIndex < _this._slides.length - 1;
                        };
                        if (!(this._status === STATUS.IDLE)) return [3 /*break*/, 4];
                        this._status = STATUS.PLAYING;
                        this._selectCallback(this._slides[this._currentSlideIndex]);
                        _a.label = 1;
                    case 1:
                        slide = this._slides[this._currentSlideIndex];
                        return [4 /*yield*/, wait(slide.duration)];
                    case 2:
                        _a.sent();
                        if (shouldPlayNext()) {
                            this._currentSlideIndex += 1;
                            this._selectCallback(this._slides[this._currentSlideIndex]);
                        }
                        _a.label = 3;
                    case 3:
                        if (shouldPlayNext()) return [3 /*break*/, 1];
                        _a.label = 4;
                    case 4:
                        this._status = STATUS.IDLE;
                        return [2 /*return*/];
                }
            });
        });
    };
    ProvenanceSlidedeckPlayer.prototype.next = function () {
        this._currentSlideIndex += 1;
        this._selectCallback(this._slides[this._currentSlideIndex]);
    };
    Object.defineProperty(ProvenanceSlidedeckPlayer.prototype, "status", {
        get: function () {
            return this._status;
        },
        enumerable: true,
        configurable: true
    });
    ProvenanceSlidedeckPlayer.prototype.stop = function () {
        this._status = STATUS.IDLE;
    };
    return ProvenanceSlidedeckPlayer;
}());

var SlideAnnotation = /** @class */ (function () {
    function SlideAnnotation(data) {
        this._id = generateUUID();
        this._data = data;
        this._mitt = mitt();
    }
    Object.defineProperty(SlideAnnotation.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlideAnnotation.prototype, "data", {
        get: function () {
            return this._data;
        },
        set: function (value) {
            this._data = value;
            this._mitt.emit('change', value);
        },
        enumerable: true,
        configurable: true
    });
    SlideAnnotation.prototype.on = function (type, handler) {
        this._mitt.on(type, handler);
    };
    SlideAnnotation.prototype.off = function (type, handler) {
        this._mitt.off(type, handler);
    };
    return SlideAnnotation;
}());

// export { SerializedProvenanceGraph } from './api';
// export { SerializedRootNode } from './api';
// export { SerializedStateNode } from './api';
// export { SerializedProvenanceNode } from './api';

export { ActionFunctionRegistry, ProvenanceGraph, restoreProvenanceGraph, serializeProvenanceGraph, ProvenanceTracker, ProvenanceGraphTraverser, ProvenanceSlide, ProvenanceSlidedeck, STATUS, ProvenanceSlidedeckPlayer, SlideAnnotation, generateUUID, generateTimestamp, isStateNode, isReversibleAction };
//# sourceMappingURL=provenance-core.es5.js.map
