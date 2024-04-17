import {Color} from '../../css/types/color';

export type RenderConfigurations = RenderOptions & {
    backgroundColor: Color | null;
};

export interface RenderOptions {
    scale: number;
    canvas?: HTMLCanvasElement;
    x: number;
    y: number;
    width: number;
    height: number;
}
