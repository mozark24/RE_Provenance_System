(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3')) :
    typeof define === 'function' && define.amd ? define(['exports', 'd3'], factory) :
    (factory((global.provenanceTreeVisualization = {}),global.d3));
}(this, (function (exports,d3) { 'use strict';

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
    var IrreversibleError = /** @class */ (function (_super) {
        __extends(IrreversibleError, _super);
        function IrreversibleError() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.invalidTraversal = true;
            return _this;
        }
        return IrreversibleError;
    }(Error));

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

    function depthSort(a, b) {
        if (a.maxDescendantDepth > b.maxDescendantDepth) {
            return -1;
        }
        else if (a.maxDescendantDepth < b.maxDescendantDepth) {
            return 1;
        }
        return 0;
    }
    function GratzlLayout() {
        var dx = 5;
        var dy = 50;
        var widths = [];
        function setTreeX(node, val) {
            node.xOffset = val;
            widths[node.depth] = val;
            if (node.children) {
                node
                    .leaves()
                    .sort(depthSort)
                    .forEach(function (leaf) {
                    if (typeof leaf.xOffset === 'undefined') {
                        var width = Math.max.apply(null, widths.slice(node.depth, leaf.depth + 1));
                        setTreeX(leaf, val > width ? val : width + 1);
                    }
                });
            }
            if (node.parent && typeof node.parent.xOffset === 'undefined') {
                setTreeX(node.parent, val);
            }
        }
        var tree = Object.assign(function (_root, _activeNode) {
            /*
             * set maxDescendantDepth on each node,
             * which is the depth of its deepest child
             *
             * */
            var root = _root;
            var activeNode = _activeNode;
            root.leaves().forEach(function (leaf) {
                leaf.ancestors().forEach(function (leafAncestor) {
                    if (!leafAncestor.maxDescendantDepth ||
                        leaf.depth > leafAncestor.maxDescendantDepth) {
                        leafAncestor.maxDescendantDepth = leaf.depth;
                    }
                });
            });
            /* rendering should start at the deepest leaf of activeNode. */
            var deepestLeaf = activeNode;
            activeNode.leaves().forEach(function (leaf) {
                if (deepestLeaf.depth < leaf.depth) {
                    deepestLeaf = leaf;
                }
            });
            setTreeX(deepestLeaf, 0);
            var maxX = Math.max.apply(null, widths);
            var maxY = Math.max.apply(null, root.leaves().map(function (leaf) { return leaf.depth; }));
            root.each(function (node) {
                sizeNode(node, maxX, maxY);
            });
            return root;
        }, {
            size: (function (x) {
                return x ? ((dx = +x[0]), (dy = +x[1]), tree) : [dx, dy];
            }),
        });
        function sizeNode(node, maxX, maxY) {
            node.x = maxX === 0 ? dx : dx - (dx / maxX) * node.xOffset;
            node.y = maxY === 0 ? dy : (dy / maxY) * node.depth;
        }
        return tree;
    }

    var ProvenanceTreeVisualization = /** @class */ (function () {
        function ProvenanceTreeVisualization(traverser, elm) {
            var _this = this;
            this.taskId = 1;
            this.taskName = 'Task' + this.taskId;
            this.newTaskNodes = [];
            this.taskList = [
                {
                    taskId: this.taskId,
                    taskName: this.taskName,
                    taskNodes: this.newTaskNodes,
                },
            ];
            this.counter = 0;
            this.treeNodes = [];
            this.currentIndex = 0;
            this.checkBoxY = 0;
            this.traverser = traverser;
            this.svg = d3.select(elm)
                .append('svg')
                .attr('viewBox', '-10 -10 130 130')
                .attr('style', 'width: 100%; height: 100%');
            this.tasksTable = elm.children[1];
            traverser.graph.on('currentChanged', function () { return _this.update(); });
            // this.onChange = this.onChange.bind(this);
            this.update();
        }
        ProvenanceTreeVisualization.prototype.addTask = function () {
            console.log(this.taskList);
            if (this.newTaskNodes.length > 0) {
                this.addMetaData();
            }
            this.counter += 1;
            if (this.counter > 1) {
                this.setCurrentIndex();
                this.taskId += 1;
                this.taskName = 'Task' + this.taskId;
                this.createNewTask();
            }
            var inputContainer = document.createElement('div');
            inputContainer.className = 'inputContainer';
            var checkbox = this.createCheckbox();
            var label = this.createLabel();
            var radioBtn = this.createRadioButton();
            inputContainer.appendChild(radioBtn);
            inputContainer.appendChild(label);
            inputContainer.appendChild(checkbox);
            this.tasksTable.appendChild(inputContainer);
        };
        ProvenanceTreeVisualization.prototype.createNewTask = function () {
            var task = {
                taskId: this.taskId,
                taskName: this.taskName,
                taskNodes: [],
            };
            this.taskList.push(task);
        };
        ProvenanceTreeVisualization.prototype.createRadioButton = function () {
            var radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = 'name';
            radio.setAttribute('checked', 'checked');
            return radio;
        };
        ProvenanceTreeVisualization.prototype.createCheckbox = function () {
            var checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.name = 'name';
            checkbox.value = 'value';
            checkbox.id = this.taskId.toString();
            return checkbox;
        };
        ProvenanceTreeVisualization.prototype.enableEdit = function (event) {
            event.target.readOnly = false;
        };
        ProvenanceTreeVisualization.prototype.updateTaskName = function (event) {
            var id = event.target.id;
            this.taskList[id - 1].taskName = event.target.value;
        };
        ProvenanceTreeVisualization.prototype.createLabel = function () {
            var label = document.createElement('input');
            label.type = 'text';
            label.name = 'taskName';
            label.value = this.taskName;
            label.id = this.taskId.toString();
            label.readOnly = true;
            label.addEventListener('click', this.enableEdit.bind(this));
            label.addEventListener('change', this.updateTaskName.bind(this));
            return label;
            // const label = document.createElement("label");
            // // label.htmlFor = 'id';
            // label.setAttribute("contenteditable", "true");
            // label.id = this.taskId.toString();
            // label.appendChild(
            //   document.createTextNode(this.taskList[this.taskId - 1].taskName)
            // );
            // return label;
        };
        ProvenanceTreeVisualization.prototype.setCurrentIndex = function () {
            var _this = this;
            this.treeNodes.forEach(function (node, index) {
                if (node.data.id === _this.traverser.graph.current.id) {
                    console.log('Nodes from index', index);
                    _this.currentIndex = index;
                }
            });
        };
        ProvenanceTreeVisualization.prototype.updateTreeNodes = function () {
            var newTaskNodes = Object.assign([], this.treeNodes);
            newTaskNodes.splice(0, this.currentIndex + 1);
            return newTaskNodes;
        };
        ProvenanceTreeVisualization.prototype.addMetaData = function () {
            var _this = this;
            this.newTaskNodes.forEach(function (node) {
                if (isStateNode(node.data)) {
                    if (node.data.action.metadata) {
                        node.data.action.metadata.taskId = _this.taskId;
                    }
                    else {
                        node.data.action.metadata = { taskId: _this.taskId };
                    }
                }
            });
        };
        // public addCheckbox() {
        //   this.svg
        //     .append("svg:foreignObject")
        //     .attr("x", 0)
        //     .attr("y", this.checkBoxY)
        //     .attr("cursor", "pointer")
        //     .attr("width", 20)
        //     .attr("height", 20)
        //     .append("xhtml:body")
        //     .html('<input type="checkbox" id=' + this.id + ">")
        //     .on("change", this.onChange);
        //   this.id += 1;
        //   this.checkBoxY += 25;
        // }
        // public onChange(event: any) {
        //   console.log(event.target);
        //   if (this.checkBoxList.length === 1) {
        //     this.taskList[0].taskNodes = this.treeNodes;
        //   } else if (this.checkBoxList.length > 1) {
        //     const newTaskNodes = Object.assign([], this.treeNodes);
        //     newTaskNodes.splice(0, this.currentIndex + 1);
        //     const task = {
        //       taskId: this.taskId,
        //       taskName: 'Task' + this.taskId,
        //       taskNodes: newTaskNodes,
        //     };
        //     this.taskList.push(task);
        //     newTaskNodes.forEach(
        //       (node: IHierarchyPointNodeWithMaxDepth<ProvenanceNode>) => {
        //         if (isStateNode(node.data)) {
        //           if (node.data.action.metadata) {
        //             node.data.action.metadata.taskId = this.taskId;
        //           } else {
        //             node.data.action.metadata = { taskId: this.taskId };
        //           }
        //         }
        //       },
        //     );
        //     // this.taskList.push(task);
        //   }
        //   this.treeNodes.forEach((node, index) => {
        //     if (node.data.id === this.traverser.graph.current.id) {
        //       console.log('Nodes from index', index);
        //       this.currentIndex = index;
        //     }
        //   });
        //   this.taskId += 1;
        //   this.checkBoxList.push(this.taskId);
        //   console.log('TaskList', this.taskList);
        // }
        ProvenanceTreeVisualization.prototype.update = function () {
            var _this = this;
            var treeRoot = d3.hierarchy(this.traverser.graph.root);
            var treeLayout = GratzlLayout().size([100 / 2, 100]);
            var layoutCurrentNode = treeRoot;
            treeRoot.each(function (node) {
                if (node.data === _this.traverser.graph.current) {
                    layoutCurrentNode = node;
                }
            });
            var tree = treeLayout(treeRoot, layoutCurrentNode);
            this.treeNodes = tree.descendants();
            console.log(this.treeNodes);
            if (this.taskId > 1) {
                this.newTaskNodes = this.updateTreeNodes();
            }
            else {
                this.newTaskNodes = this.treeNodes;
            }
            this.taskList[this.taskId - 1].taskNodes = this.newTaskNodes;
            var oldNodes = this.svg
                .selectAll('g.node')
                .data(this.treeNodes, function (d) { return d.data.id; });
            var newNodes = oldNodes
                .enter()
                .append('g')
                .attr('class', 'node')
                .attr('transform', function (d) { return "translate(" + d.x + ", " + d.y + ")"; })
                .on('click', function (d) { return _this.traverser.toStateNode(d.data.id); });
            newNodes.append('circle').attr('r', 2);
            newNodes
                .append('text')
                .text(function (d) { return (isStateNode(d.data) ? d.data.label : ''); })
                .attr('style', 'font-size: 6px')
                .attr('x', 7)
                .attr('y', 3);
            newNodes
                .merge(oldNodes)
                .attr('class', 'node')
                .filter(function (d) { return d.xOffset === 0; })
                .attr('class', 'node branch-active')
                .filter(function (d) { return d.data === _this.traverser.graph.current; })
                .attr('class', 'node branch-active node-active');
            newNodes
                .merge(oldNodes)
                .transition()
                .duration(500)
                .attr('transform', function (d) { return "translate(" + d.x + ", " + d.y + ")"; });
            var linkPath = function (_a) {
                var source = _a.source, target = _a.target;
                var _b = [source, target], s = _b[0], t = _b[1];
                // tslint:disable-next-line
                return "M" + s.x + "," + s.y + "C" + s.x + "," + (s.y + t.y) / 2 + " " + t.x + "," + (s.y + t.y) /
                    2 + " " + t.x + "," + t.y;
            };
            var oldLinks = this.svg
                .selectAll('path.link')
                .data(tree.links(), function (d) { return d.target.data.id; });
            var newLinks = oldLinks
                .enter()
                .insert('path', 'g')
                .attr('d', linkPath);
            oldLinks
                .merge(newLinks)
                .attr('class', 'link')
                .filter(function (d) { return d.target.xOffset === 0; })
                .attr('class', 'link active');
            oldLinks
                .merge(newLinks)
                .transition()
                .duration(500)
                .attr('d', linkPath);
        };
        return ProvenanceTreeVisualization;
    }());

    exports.ProvenanceTreeVisualization = ProvenanceTreeVisualization;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=provenance-tree-visualization.umd.js.map
