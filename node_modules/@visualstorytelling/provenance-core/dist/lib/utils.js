"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.generateUUID = generateUUID;
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
exports.generateTimestamp = generateTimestamp;
function isStateNode(node) {
    return 'parent' in node;
}
exports.isStateNode = isStateNode;
function isReversibleAction(action) {
    return 'undo' in action;
}
exports.isReversibleAction = isReversibleAction;
//# sourceMappingURL=utils.js.map