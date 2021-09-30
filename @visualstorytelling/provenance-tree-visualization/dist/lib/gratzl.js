"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = GratzlLayout;
//# sourceMappingURL=gratzl.js.map