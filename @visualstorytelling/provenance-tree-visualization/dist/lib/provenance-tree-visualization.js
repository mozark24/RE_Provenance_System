"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var provenance_core_1 = require("@visualstorytelling/provenance-core");
var d3 = require("d3");
var gratzl_1 = require("./gratzl");
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
        this.svg = d3
            .select(elm)
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
            if (provenance_core_1.isStateNode(node.data)) {
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
        var treeLayout = gratzl_1.default().size([100 / 2, 100]);
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
            .text(function (d) { return (provenance_core_1.isStateNode(d.data) ? d.data.label : ''); })
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
//# sourceMappingURL=provenance-tree-visualization.js.map