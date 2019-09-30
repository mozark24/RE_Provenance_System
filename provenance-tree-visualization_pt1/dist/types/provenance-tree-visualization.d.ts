import { ProvenanceGraphTraverser } from '@visualstorytelling/provenance-core';
export declare class ProvenanceTreeVisualization {
    private taskId;
    private taskName;
    private newTaskNodes;
    private taskList;
    private counter;
    private traverser;
    private svg;
    private treeNodes;
    private tasksTable;
    private currentIndex;
    private checkBoxY;
    constructor(traverser: ProvenanceGraphTraverser, elm: HTMLDivElement);
    addTask(): void;
    private createNewTask;
    private createRadioButton;
    private createCheckbox;
    private enableEdit;
    private updateTaskName;
    private createLabel;
    private setCurrentIndex;
    private updateTreeNodes;
    private addMetaData;
    update(): void;
}
