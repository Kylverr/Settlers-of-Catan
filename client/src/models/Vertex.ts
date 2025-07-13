import type { PlayerId } from './Player';

export interface Vertex {
    id: number;
    tileIds: number[];
    cornerIndices: number[];
    owner: PlayerId | null;
}