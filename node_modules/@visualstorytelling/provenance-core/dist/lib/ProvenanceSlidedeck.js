"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mitt_1 = require("./mitt");
var ProvenanceSlide_1 = require("./ProvenanceSlide");
var ProvenanceSlidedeck = /** @class */ (function () {
    function ProvenanceSlidedeck(application, traverser) {
        this._slides = [];
        this._captainPlaceholder = new ProvenanceSlide_1.ProvenanceSlide('Captain Placeholder', 0, 0);
        this._mitt = mitt_1.default();
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
            slide = new ProvenanceSlide_1.ProvenanceSlide(node.label, 1, 0, [], node);
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
exports.ProvenanceSlidedeck = ProvenanceSlidedeck;
//# sourceMappingURL=ProvenanceSlidedeck.js.map