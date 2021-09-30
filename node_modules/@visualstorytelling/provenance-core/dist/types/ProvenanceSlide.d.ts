import { IProvenanceSlide, ProvenanceNode, Handler } from './api';
import { SlideAnnotation } from './SlideAnnotation';
export declare class ProvenanceSlide implements IProvenanceSlide {
    private _id;
    private _node;
    private _name;
    private _duration;
    private _transitionTime;
    private _annotations;
    private _mitt;
    private _xPosition;
    constructor(name: string, duration: number, transitionTime: number, annotations?: SlideAnnotation[], node?: ProvenanceNode | null);
    readonly id: string;
    node: ProvenanceNode | null;
    name: string;
    duration: number;
    transitionTime: number;
    addAnnotation(annotation: SlideAnnotation): void;
    removeAnnotation(annotation: SlideAnnotation): void;
    readonly annotations: SlideAnnotation[];
    on(type: string, handler: Handler): void;
    off(type: string, handler: Handler): void;
    xPosition: number;
}
