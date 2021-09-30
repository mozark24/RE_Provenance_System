import { event, select, drag } from 'd3';

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

function firstArgThis(f) {
    return function (...args) {
        return f(this, ...args);
    };
}
class SlideDeckVisualization {
    constructor(slideDeck, elm) {
        this._tableHeight = 125;
        this._tableWidth = 1800;
        this._minimumSlideDuration = 1000;
        this._barWidthTimeMultiplier = 0.05;
        this._barPadding = 5;
        this._resizebarwidth = 5;
        this._previousSlideX = 0;
        this._lineX1 = 50;
        this._placeholderWidth = 60;
        this._placeholderX = 0;
        this._placeholderHeight = 60;
        this._toolbarX = 10;
        this._toolbarY = 35;
        this._toolbarPadding = 20;
        // Upon dragging a slide, no matter where you click on it, the beginning of the slide jumps to the mouse position.
        // This next variable is calculated to adjust for that error, it is a workaround but it works
        this._draggedSlideReAdjustmentFactor = 0;
        this._originPosition = 60;
        this._currentTime = 0;
        this._currentlyPlaying = false;
        this._timelineShift = 0;
        this._timeIndexedSlides = [];
        this._gridTimeStep = 1000;
        this._gridSnap = false;
        this.onDelete = (slide) => {
            this._slideDeck.removeSlide(slide);
        };
        this.onSelect = (slide) => {
            if (event.defaultPrevented)
                return;
            if (this._currentlyPlaying) {
                this.stopPlaying();
            }
            this.selectSlide(slide);
        };
        this.selectSlide = (slide) => {
            if (slide === null) {
                return;
            }
            let originalSlideTransitionTime = slide.transitionTime;
            let artificialTransitionTime = 0;
            if (this._currentlyPlaying) {
                artificialTransitionTime =
                    slide.transitionTime -
                        (this._currentTime - this._slideDeck.startTime(slide));
            }
            else {
                artificialTransitionTime = 250;
            }
            slide.transitionTime =
                artificialTransitionTime >= 0 ? artificialTransitionTime : 0;
            this._slideDeck.selectedSlide = slide;
            slide.transitionTime = originalSlideTransitionTime;
            // this.displayAnnotationText(this._slideDeck.selectedSlide.mainAnnotation, 350);
            this.update();
        };
        this.onAdd = () => {
            let slideDeck = this._slideDeck;
            const node = slideDeck.graph.current;
            const slide = new ProvenanceSlide(node.label, 5000, 0, [], node);
            slideDeck.addSlide(slide, slideDeck.slides.length);
            this.selectSlide(slide);
        };
        this.onClone = (slide) => {
            let slideDeck = this._slideDeck;
            const cloneSlide = new ProvenanceSlide(slide.name, 5000, 0, [], slide.node);
            // cloneSlide.mainAnnotation = slide.mainAnnotation;
            slideDeck.addSlide(cloneSlide, slideDeck.selectedSlide
                ? slideDeck.slides.indexOf(slideDeck.selectedSlide) + 1
                : slideDeck.slides.length);
        };
        this.moveDragged = (that, draggedObject) => {
            select(that).attr("transform", (slide) => {
                const originalX = this.previousSlidesWidth(slide) - this._timelineShift;
                const draggedX = event.x;
                const myIndex = this._slideDeck.slides.indexOf(slide);
                if (draggedX < originalX && myIndex > 0) {
                    // check upwards
                    const previousSlide = this._slideDeck.slides[myIndex - 1];
                    let previousSlideCenterY = this.previousSlidesWidth(previousSlide) -
                        this._timelineShift +
                        this.barTotalWidth(previousSlide) / 2;
                    if (draggedX < previousSlideCenterY) {
                        this._slideDeck.moveSlide(myIndex, myIndex - 1);
                    }
                }
                else if (draggedX > originalX &&
                    myIndex < this._slideDeck.slides.length - 1) {
                    // check downwards
                    const nextSlide = this._slideDeck.slides[myIndex + 1];
                    let nextSlideCenterY = this.previousSlidesWidth(nextSlide) -
                        this._timelineShift +
                        this.barTotalWidth(nextSlide) / 2;
                    if (draggedX > nextSlideCenterY) {
                        this._slideDeck.moveSlide(myIndex, myIndex + 1);
                    }
                }
                if (this._draggedSlideReAdjustmentFactor === 0) {
                    this._draggedSlideReAdjustmentFactor =
                        draggedX - slide.xPosition;
                }
                let slidePosition = event.x -
                    this._draggedSlideReAdjustmentFactor -
                    this._timelineShift;
                return "translate(" + slidePosition + ", 0)";
            });
        };
        this.moveDragended = (that, draggedObject) => {
            select(that)
                .classed("active", false)
                .attr("transform", (slide) => {
                return ("translate(" +
                    (this.previousSlidesWidth(slide) +
                        50 +
                        this._resizebarwidth -
                        this._timelineShift) +
                    ", 0)");
            });
            this._draggedSlideReAdjustmentFactor = 0;
        };
        this.transitionTimeDragged = (that, slide) => {
            let transitionTime = Math.max(event.x, 0) / this._barWidthTimeMultiplier;
            slide.transitionTime = this.getSnappedTime(slide, transitionTime, 0);
            this.update();
        };
        this.transitionTimeSubject = (that, slide) => {
            return { x: this.barTransitionTimeWidth(slide) };
        };
        this.durationDragged = (that, slide) => {
            let duration = Math.max(Math.max(event.x, 0) / this._barWidthTimeMultiplier, this._minimumSlideDuration);
            slide.duration = this.getSnappedTime(slide, duration, 1);
            this.update();
        };
        this.durationSubject = (that, slide) => {
            return { x: this.barDurationWidth(slide) };
        };
        this.getSnappedTime = (slide, time, isDuration) => {
            if (this._gridSnap) {
                let currentTime = this._slideDeck.startTime(slide) +
                    slide.transitionTime * isDuration +
                    time;
                let remainder = currentTime % this._gridTimeStep;
                if (remainder > this._gridTimeStep / 2) {
                    return time + this._gridTimeStep - remainder;
                }
                else {
                    return time - remainder;
                }
            }
            return time;
        };
        this.rescaleTimeline = () => {
            let wheelDirection = event.deltaY < 0 ? "up" : "down";
            if (event.shiftKey) {
                let correctedShiftAmount = event.x - (this._originPosition - this._timelineShift);
                if (wheelDirection === "down") {
                    let scalingFactor = 0.2;
                    if (this._placeholderX > this._tableWidth / 2) {
                        this._barWidthTimeMultiplier *= 1 - scalingFactor;
                        this._timelineShift -= correctedShiftAmount * scalingFactor;
                    }
                }
                else {
                    let scalingFactor = 0.25;
                    this._barWidthTimeMultiplier *= 1 + scalingFactor;
                    if (!(this._placeholderX - this._timelineShift < event.x)) {
                        this._timelineShift += correctedShiftAmount * scalingFactor;
                    }
                }
                this.adjustGridScale();
            }
            else {
                let shiftAmount = 100;
                if (wheelDirection === "down") {
                    this._timelineShift += shiftAmount;
                }
                else {
                    this._timelineShift -= shiftAmount;
                }
            }
            this.update();
        };
        this.onBackward = () => {
            this.stopPlaying();
            for (let i = this._timeIndexedSlides.length - 1; i >= 0; i--) {
                if (this._currentTime > this._timeIndexedSlides[i].startTime) {
                    this._currentTime = this._timeIndexedSlides[i].startTime;
                    this.update();
                    break;
                }
            }
        };
        this.onPlay = () => {
            if (this._currentlyPlaying) {
                this.stopPlaying();
            }
            else {
                this.startPlaying();
            }
        };
        this.startPlaying = () => {
            select("foreignObject.player_play")
                .select("body")
                .html('<i class="fa fa-pause"></i>');
            this._currentlyPlaying = true;
            this.playTimeline();
        };
        this.stopPlaying = () => {
            select("foreignObject.player_play")
                .select("body")
                .html('<i class="fa fa-play"></i>');
            this._currentlyPlaying = false;
        };
        this.onForward = () => {
            this.stopPlaying();
            for (let timedSlide of this._timeIndexedSlides) {
                if (this._currentTime < timedSlide.startTime) {
                    this._currentTime = timedSlide.startTime;
                    this.update();
                    break;
                }
            }
        };
        this.seekStarted = (that) => {
            if (this._currentlyPlaying) {
                this.stopPlaying();
            }
            this._currentTime =
                (event.x - this._originPosition + this._timelineShift) /
                    this._barWidthTimeMultiplier;
            this.update();
        };
        this.seekDragged = (that) => {
            this._currentTime =
                (event.x + this._timelineShift - this._originPosition) /
                    this._barWidthTimeMultiplier;
            this.update();
        };
        this.updateGridSnap = () => {
            if (event.y === 540 || event.y === 539) {
                // By far the biggest workaround in the history of code. If the mouse clicks here,
                // this event still fires, but the checkbox does not get checked. As a result, the gridsnap should
                // not be updated. This could all be avoided if I could check the checkbox property itself, but
                // for some reason, all my attempts at accessing the checkbox through d3 is turning up a null value.
                return;
            }
            if (this._gridSnap) {
                this._gridSnap = false;
            }
            else {
                this._gridSnap = true;
            }
        };
        this.fixDrawingPriorities = () => {
            this._slideTable
                .select("rect.seek-dragger")
                .attr("width", this._placeholderX)
                .raise();
            this._slideTable.select("rect.mask").raise();
            this._slideTable.select("#player_placeholder").raise();
            this._slideTable.select("foreignObject.player_backward").raise();
            this._slideTable.select("foreignObject.player_play").raise();
            this._slideTable.select("foreignObject.player_forward").raise();
        };
        this.displayGridLevel = () => {
            select("text.grid_display").text("Grid step: " + (this._gridTimeStep / 1000).toFixed(2) + " Sec");
        };
        this.drawSeekBar = () => {
            const timeWidth = this._currentTime * this._barWidthTimeMultiplier;
            if (timeWidth >= this._placeholderX) {
                this.stopPlaying();
                this._currentTime =
                    this._placeholderX / this._barWidthTimeMultiplier;
            }
            if (this._currentTime < 0) {
                this._currentTime = 0;
            }
            const shiftedPosition = this._originPosition + timeWidth - this._timelineShift;
            this._slideTable
                .select("circle.currentTime")
                .attr("cx", shiftedPosition)
                .raise();
            this._slideTable
                .select("line.vertical-line-seek")
                .attr("x1", shiftedPosition)
                .attr("y1", 65)
                .attr("x2", shiftedPosition)
                .attr("y2", 0)
                .raise();
        };
        this.adjustSlideAddObjectPosition = () => {
            this._slideTable
                .select("foreignObject.slide_add")
                .attr("x", this._placeholderX + 105 - this._timelineShift)
                .attr("y", 15);
        };
        this.adjustHorizontalLine = () => {
            this._slideTable
                .select("line.horizontal-line")
                .attr("x2", this._placeholderX + 60 - this._timelineShift);
        };
        this._tableWidth = window.innerWidth - 400;
        window.addEventListener("resize", this.resizeTable);
        this._slideDeck = slideDeck;
        this._root = select(elm);
        this._slideTable = this._root
            .append("svg")
            .attr("class", "slide__table")
            .attr("height", this._tableHeight)
            .attr("width", this._tableWidth);
        this._slideTable
            .append("rect")
            .attr("class", "slides_background_rect")
            .attr("x", 0)
            .attr("y", 0)
            .attr("height", this._tableHeight)
            .attr("width", this._tableWidth);
        this._slideTable
            .append("line")
            .attr("class", "vertical-line")
            .attr("x1", this._lineX1)
            .attr("y1", 0)
            .attr("x2", this._lineX1)
            .attr("y2", 100)
            .attr("stroke", "gray")
            .attr("stroke-width", 2);
        this._slideTable
            .append("line")
            .attr("class", "horizontal-line")
            .attr("x1", this._lineX1)
            .attr("y1", this._resizebarwidth + this._originPosition)
            .attr("y2", this._resizebarwidth + this._originPosition)
            .attr("stroke", "gray")
            .attr("stroke-width", 2);
        this._slideTable
            .append("rect")
            .attr("class", "seek-dragger")
            .attr("fill", "transparent")
            .attr("x", this._originPosition)
            .attr("y", this._originPosition)
            .attr("height", 12)
            .attr("width", 12)
            .attr("cursor", "pointer")
            .call(drag()
            .on("start", firstArgThis(this.seekStarted))
            .on("drag", firstArgThis(this.seekDragged)));
        this._slideTable
            .append("rect")
            .attr("class", "slides_placeholder")
            .attr("x", this._lineX1 + this._barPadding)
            .attr("y", 0)
            .attr("width", this._placeholderWidth)
            .attr("height", this._placeholderHeight);
        this._slideTable
            .append("circle")
            .attr("class", "currentTime")
            .attr("fill", "red")
            .attr("r", 4)
            .attr("cx", this._originPosition)
            .attr("cy", 65);
        this._slideTable
            .append("line")
            .attr("class", "vertical-line-seek")
            .attr("x1", this._originPosition)
            .attr("y1", 65)
            .attr("x2", this._originPosition)
            .attr("y2", 0)
            .attr("stroke", "red")
            .attr("stroke-width", 1);
        this._slideTable
            .append("svg:foreignObject")
            .attr("class", "slide_add")
            .attr("x", this._placeholderX + 18)
            .attr("cursor", "pointer")
            .attr("width", 30)
            .attr("height", 30)
            .append("xhtml:body")
            .on("click", this.onAdd)
            .html('<i class="fa fa-file-text-o"></i>');
        this._slideTable
            .append("rect")
            .attr("class", "mask")
            .attr("x", 0)
            .attr("y", 0)
            .attr("width", 50)
            .attr("height", 100)
            .attr("fill", "white");
        this._slideTable
            .append("rect")
            .attr("class", "slides_placeholder")
            .attr("id", "player_placeholder")
            .attr("x", 15)
            .attr("y", 0)
            .attr("width", 30)
            .attr("height", 75);
        this._slideTable
            .append("svg:foreignObject")
            .attr("class", "player_backward")
            .attr("x", 22)
            .attr("y", 5)
            .attr("cursor", "pointer")
            .attr("width", 20)
            .attr("height", 20)
            .append("xhtml:body")
            .on("click", this.onBackward)
            .html('<i class="fa fa-backward"></i>');
        this._slideTable
            .append("svg:foreignObject")
            .attr("class", "player_play")
            .attr("x", 22)
            .attr("y", 25)
            .attr("cursor", "pointer")
            .attr("width", 20)
            .attr("height", 20)
            .append("xhtml:body")
            .on("click", this.onPlay)
            .html('<i class="fa fa-play"></i>');
        this._slideTable
            .append("svg:foreignObject")
            .attr("class", "player_forward")
            .attr("x", 22)
            .attr("y", 45)
            .attr("cursor", "pointer")
            .attr("width", 20)
            .attr("height", 20)
            .append("xhtml:body")
            .on("click", this.onForward)
            .html('<i class="fa fa-forward"></i>');
        this._slideTable
            .append("text")
            .attr("class", "grid_display")
            .attr("x", this._originPosition + 10)
            .attr("y", 110);
        this._slideTable
            .append("text")
            .attr("class", "checkBox_text")
            .attr("x", this._originPosition + 195)
            .attr("y", 110)
            .text("Grid Snap");
        this._slideTable
            .append("foreignObject")
            .attr("width", 13)
            .attr("height", 15)
            .attr("x", this._originPosition + 175)
            .attr("y", 96)
            .append("xhtml:body")
            .html("<form><input type=checkbox class=gridSnap/></form>")
            .on("click", this.updateGridSnap);
        // let area = this._root
        //     .append<SVGElement>("svg")
        //     .attr("class", "annotation-area")
        //     .attr("x", this._tableWidth + 5)
        //     .attr("y", 0)
        //     .attr("width", 350)
        //     .attr("height", 150);
        // area
        //     .append("rect")
        //     .attr("class", "slides_placeholder")
        //     .attr("id", "annotation-box")
        //     .attr("x", 0)
        //     .attr("y", 0)
        //     .attr("width", 350)
        //     .attr("height", 100);
        // area
        //     .append("text")
        //     .attr("x", 10)
        //     .attr("y", 120)
        //     .attr("font-size", 18)
        //     .text("Edit slide story");
        // area
        //     .append("rect")
        //     .attr("class", "add_annotation")
        //     .attr("x", 0)
        //     .attr("y", 100)
        //     .attr("width", 150)
        //     .attr("height", 30)
        //     .attr("cursor", "pointer")
        //     .attr("fill", "transparent")
        //     .on("click", this.addAnnotation);
        slideDeck.on("slideAdded", () => this.update());
        slideDeck.on("slideRemoved", () => this.update());
        slideDeck.on("slidesMoved", () => this.update());
        slideDeck.on("slideSelected", () => this.update());
        this.update();
    }
    onMouseEnter() {
        let toolbar = event.target.parentElement.querySelector(".slide_toolbar");
        toolbar.style.display = "block";
    }
    onMouseLeave() {
        let toolbar = event.target.parentElement.querySelector(".slide_toolbar");
        toolbar.style.display = "none";
    }
    moveDragStarted(draggedObject) {
        select(this)
            .raise()
            .classed("active", true);
    }
    barTransitionTimeWidth(slide) {
        let calculatedWidth = this._barWidthTimeMultiplier * slide.transitionTime;
        return Math.max(calculatedWidth, 0);
    }
    barDurationWidth(slide) {
        let calculatedWidth = this._barWidthTimeMultiplier * slide.duration;
        return Math.max(calculatedWidth, this._minimumSlideDuration * this._barWidthTimeMultiplier);
    }
    barTotalWidth(slide) {
        let calculatedWidth = this.barTransitionTimeWidth(slide) + this.barDurationWidth(slide);
        return calculatedWidth;
    }
    previousSlidesWidth(slide) {
        let myIndex = this._slideDeck.slides.indexOf(slide);
        let calculatedWidth = 0;
        for (let i = 0; i < myIndex; i++) {
            calculatedWidth += this.barTotalWidth(this._slideDeck.slides[i]);
        }
        return calculatedWidth;
    }
    updateTimeIndices(slideDeck) {
        this._timeIndexedSlides = [];
        let timeIndex = 0;
        slideDeck.slides.forEach(slide => {
            this._timeIndexedSlides.push({
                slide: slide,
                startTime: timeIndex
            });
            timeIndex += slide.transitionTime + slide.duration;
        });
    }
    playTimeline() {
        let intervalStepMS = 25;
        let playingID = setInterval(() => {
            if (!this._currentlyPlaying) {
                clearInterval(playingID);
            }
            else {
                this._currentTime += intervalStepMS;
                let currentSlide = this._slideDeck.slideAtTime(this._currentTime);
                if (currentSlide !== this._slideDeck.selectedSlide) {
                    this.selectSlide(currentSlide);
                }
            }
            this.update();
        }, intervalStepMS);
    }
    resizeTable() {
        this._tableWidth = window.innerWidth - 400;
        select(".slide__table").attr("width", this._tableWidth);
        select(".slides_background_rect").attr("width", this._tableWidth);
    }
    // private getTextWidth(text: string, fontSize: number, fontFace: string) {
    //     let canvas = document.createElement('canvas');
    //     let context = canvas.getContext('2d');
    //     if (context === null) {
    //         return 0;
    //     }
    //     context.font = fontSize + 'px ' + fontFace;
    //     return context.measureText(text).width;
    // }
    // private displayAnnotationText = (annotation: string, width: number) => {
    //     d3.selectAll("text.annotation").remove();
    //     let words = annotation.split(" ");
    //     let currentLine = "";
    //     let newLine = "";
    //     let y = 20;
    //     let fontSize = 20;
    //     words.forEach(word => {
    //         newLine = currentLine + word + " ";
    //         if (this.getTextWidth(newLine, fontSize - 1, "Arial") > width){
    //             d3.select("svg.annotation-area")
    //                 .append("text")
    //                 .attr("class", "annotation")
    //                 .attr("x", 10)
    //                 .attr("y", y)
    //                 .attr("font-size", fontSize)
    //                 .text(currentLine);
    //             y += 22;
    //             currentLine = word + " ";
    //         } else {
    //             currentLine = newLine;
    //         }
    //     });
    //     d3.select("svg.annotation-area")
    //             .append("text")
    //             .attr("class", "annotation")
    //             .attr("x", 10)
    //             .attr("y", y)
    //             .attr("font-size", fontSize)
    //             .text(currentLine);
    //     this.update();
    // }
    // private addAnnotation = () => {
    //     if(this._slideDeck.selectedSlide === null){
    //         alert("There is no slide currently selected!");
    //         return;
    //     }
    //     let newAnnotation =  prompt("Edit story: ", this._slideDeck.selectedSlide.mainAnnotation);
    //     if(newAnnotation !== null){
    //         this._slideDeck.selectedSlide.mainAnnotation = newAnnotation;
    //         if(newAnnotation.length > 150){
    //             alert("Find a way to describe your slide in less than 150 characters!");
    //             this.addAnnotation();
    //             return;
    //         }
    //     } else {
    //         this._slideDeck.selectedSlide.mainAnnotation = "";
    //     }
    //     this.displayAnnotationText(this._slideDeck.selectedSlide.mainAnnotation, 350);
    // }
    adjustGridScale() {
        if (this._barWidthTimeMultiplier < 0.02) {
            this._gridTimeStep = 5000;
            return;
        }
        if (this._barWidthTimeMultiplier < 0.2) {
            this._gridTimeStep = 1000;
            return;
        }
        this._gridTimeStep = 200;
    }
    drawGrid(maxWidth) {
        this._slideTable.selectAll("circle.gridTime").remove();
        let time = 0;
        let currentX = this._originPosition +
            time * this._barWidthTimeMultiplier -
            this._timelineShift;
        while (currentX < maxWidth) {
            let radius = time % (this._gridTimeStep * 5) === 0 ? 4 : 2;
            this._slideTable
                .append("circle")
                .attr("class", "gridTime")
                .attr("fill", "black")
                .attr("r", radius)
                .attr("cx", this._originPosition +
                time * this._barWidthTimeMultiplier -
                this._timelineShift)
                .attr("cy", 65);
            time += this._gridTimeStep;
            currentX =
                this._originPosition +
                    time * this._barWidthTimeMultiplier -
                    this._timelineShift;
        }
        this._slideTable.selectAll("circle.gridTime").lower();
        this._slideTable.select("line.horizontal-line").lower();
    }
    update() {
        this.updateTimeIndices(this._slideDeck);
        if (this._timelineShift < 0) {
            this._timelineShift = 0;
        }
        const allExistingNodes = this._slideTable
            .selectAll("g.slide")
            .data(this._slideDeck.slides, (d) => {
            return d.id;
        });
        const newNodes = allExistingNodes
            .enter()
            .append("g")
            .attr("class", "slide")
            .call(drag()
            .clickDistance([2, 2])
            .on("start", this.moveDragStarted)
            .on("drag", firstArgThis(this.moveDragged))
            .on("end", firstArgThis(this.moveDragended)));
        newNodes
            .append("rect")
            .attr("class", "slides_transitionTime_rect")
            .attr("x", this._resizebarwidth)
            .attr("y", 0)
            .attr("height", 60)
            .on("click", this.onSelect);
        let slideGroup = newNodes
            .append("g")
            .attr("transform", "translate(5,0)")
            .attr("class", "slide_group")
            .on("mouseenter", this.onMouseEnter)
            .on("mouseleave", this.onMouseLeave);
        slideGroup
            .append("rect")
            .attr("class", "slides_rect")
            .attr("height", 60)
            .attr("cursor", "move")
            .on("click", this.onSelect);
        slideGroup
            .append("svg")
            .attr("class", "text-viewport")
            .attr("height", 60)
            .append("text")
            .attr("class", "slides_text")
            .attr("y", this._resizebarwidth + 2 * this._barPadding)
            .attr("font-size", 20)
            .attr("dy", ".35em");
        const textPosition = this._resizebarwidth + 4 * this._barPadding + 68;
        slideGroup
            .append("text")
            .attr("class", "slides_transitionTimetext")
            .attr("y", textPosition)
            .attr("font-size", 16)
            .attr("dy", "-.65em");
        let toolbar = slideGroup.append("g").attr("class", "slide_toolbar");
        toolbar
            .append("svg:foreignObject")
            .attr("class", "slides_delete_icon")
            .attr("cursor", "pointer")
            .attr("width", 20)
            .attr("height", 20)
            .append("xhtml:body")
            .on("click", this.onDelete)
            .html('<i class="fa fa-trash-o"></i>');
        toolbar
            .append("svg:foreignObject")
            .attr("class", "slides_clone_icon")
            .attr("cursor", "pointer")
            .attr("width", 20)
            .attr("height", 20)
            .append("xhtml:body")
            .on("click", this.onClone)
            .html('<i class="fa fa-copy"></i>');
        const placeholder = this._slideTable.select("rect.slides_placeholder");
        newNodes
            .append("text")
            .attr("class", "slides_durationtext")
            .attr("y", textPosition)
            .attr("font-size", 16)
            .attr("dy", "-.65em");
        newNodes
            .append("circle")
            .attr("class", "time")
            .attr("cy", this._resizebarwidth + 60)
            .attr("r", 4)
            .attr("fill", "blue");
        newNodes
            .append("circle")
            .attr("class", "transitionTime_time")
            .attr("cy", this._resizebarwidth + 60)
            .attr("r", 4)
            .attr("fill", "blue");
        newNodes
            .append("rect")
            .attr("class", "slides_duration_resize")
            .attr("x", 0)
            .attr("width", this._resizebarwidth)
            .attr("height", 60)
            .attr("cursor", "ew-resize")
            .call(drag()
            .subject(firstArgThis(this.durationSubject))
            .on("drag", firstArgThis(this.durationDragged)));
        newNodes
            .append("rect")
            .attr("class", "slides_transitionTime_resize")
            .attr("y", 0)
            .attr("width", this._resizebarwidth)
            .attr("height", 60)
            .attr("cursor", "ew-resize")
            .call(drag()
            .subject(firstArgThis(this.transitionTimeSubject))
            .on("drag", firstArgThis(this.transitionTimeDragged)));
        select(".slide__table").on("wheel", this.rescaleTimeline);
        // Update all nodes
        const allNodes = newNodes
            .merge(allExistingNodes)
            .attr("transform", (slide) => {
            this._previousSlideX = this.previousSlidesWidth(slide);
            slide.xPosition =
                50 + this._resizebarwidth + this.previousSlidesWidth(slide);
            return ("translate(" +
                (slide.xPosition - this._timelineShift) +
                ", 0 )");
        });
        allNodes
            .select("rect.slides_transitionTime_rect")
            .attr("width", (slide) => {
            return this.barTransitionTimeWidth(slide);
        });
        allNodes
            .select("rect.slides_transitionTime_resize")
            .attr("x", (slide) => {
            return (this.barTransitionTimeWidth(slide) + this._resizebarwidth);
        });
        slideGroup = allNodes.select("g.slide_group");
        slideGroup
            .select("rect.slides_rect")
            .attr("selected", (slide) => {
            return this._slideDeck.selectedSlide === slide;
        })
            .attr("x", (slide) => {
            return this.barTransitionTimeWidth(slide);
        })
            .attr("width", (slide) => {
            this._placeholderX =
                this._previousSlideX +
                    this.barDurationWidth(slide) +
                    this.barTransitionTimeWidth(slide);
            return this.barDurationWidth(slide);
        });
        slideGroup
            .select("svg.text-viewport")
            .attr("x", (slide) => {
            return this.barTransitionTimeWidth(slide);
        })
            .attr("width", (slide) => {
            return this.barDurationWidth(slide) - 5;
        });
        toolbar = allNodes.select("g.slide_toolbar");
        toolbar
            .select("foreignObject.slides_delete_icon")
            .attr("y", (slide) => {
            return this._toolbarY;
        })
            .attr("x", (slide) => {
            return this._toolbarX + this.barTransitionTimeWidth(slide) - 3;
        });
        toolbar
            .select("foreignObject.slides_clone_icon")
            .attr("y", (slide) => {
            return this._toolbarY;
        })
            .attr("x", (slide) => {
            return (this._toolbarX +
                this._toolbarPadding +
                this.barTransitionTimeWidth(slide) -
                3);
        });
        slideGroup
            .select("text.slides_text")
            .attr("x", (slide) => {
            return this._barPadding * 2 - 2;
        })
            .text((slide) => {
            return slide.name;
        });
        slideGroup
            .select("text.slides_transitionTimetext")
            .attr("x", (slide) => {
            return (this.barTransitionTimeWidth(slide) + this._barPadding * 2);
        })
            .text((slide) => {
            if (this.barTransitionTimeWidth(slide) > 35 ||
                this._slideDeck.startTime(slide) === 0) {
                return ((this._slideDeck.startTime(slide) +
                    slide.transitionTime) /
                    1000).toFixed(2);
            }
            else {
                return "";
            }
        });
        allNodes.select("circle.time").attr("cx", (slide) => {
            return this.barTotalWidth(slide) + this._resizebarwidth;
        });
        allNodes
            .select("circle.transitionTime_time")
            .attr("cx", (slide) => {
            return (this.barTransitionTimeWidth(slide) + this._resizebarwidth);
        });
        allNodes
            .select("rect.slides_duration_resize")
            .attr("x", (slide) => {
            return this.barTotalWidth(slide);
        });
        allNodes
            .select("text.slides_durationtext")
            .attr("x", (slide) => {
            return this.barTotalWidth(slide) + this._barPadding + 10;
        })
            .text((slide) => {
            return ((this._slideDeck.startTime(slide) +
                slide.duration +
                slide.transitionTime) /
                1000).toFixed(2);
        });
        placeholder.attr("x", this._placeholderX + 80 - this._timelineShift);
        this.adjustHorizontalLine();
        this.adjustSlideAddObjectPosition();
        this.drawSeekBar();
        this.drawGrid(this._placeholderX + this._originPosition - this._timelineShift);
        this.fixDrawingPriorities();
        this.displayGridLevel();
        allExistingNodes.exit().remove();
    }
}

export { SlideDeckVisualization };
//# sourceMappingURL=slide-deck-visualization.es5.js.map
