import { Handler, ISlideAnnotation } from './api';
export declare type AnnotationData = any;
export declare class SlideAnnotation implements ISlideAnnotation {
    private readonly _id;
    private _data;
    private _mitt;
    constructor(data: any);
    readonly id: string;
    data: AnnotationData | null;
    on(type: string, handler: Handler): void;
    off(type: string, handler: Handler): void;
}
