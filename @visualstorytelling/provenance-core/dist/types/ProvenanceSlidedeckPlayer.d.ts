export interface ISlide {
    duration: number;
    delay: number;
}
export declare enum STATUS {
    IDLE = 0,
    PLAYING = 1
}
export declare class ProvenanceSlidedeckPlayer<T extends ISlide> {
    private readonly _selectCallback;
    private readonly _slides;
    private _currentSlideIndex;
    private _status;
    constructor(slides: T[], selectCallback: (slide: T) => any);
    setSlideIndex(slideIndex: number): void;
    readonly slides: T[];
    currentSlideIndex: number;
    play(): Promise<void>;
    next(): void;
    readonly status: STATUS;
    stop(): void;
}
