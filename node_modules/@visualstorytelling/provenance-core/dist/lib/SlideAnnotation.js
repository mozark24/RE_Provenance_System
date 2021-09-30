"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
var mitt_1 = require("./mitt");
var SlideAnnotation = /** @class */ (function () {
    function SlideAnnotation(data) {
        this._id = utils_1.generateUUID();
        this._data = data;
        this._mitt = mitt_1.default();
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
exports.SlideAnnotation = SlideAnnotation;
//# sourceMappingURL=SlideAnnotation.js.map