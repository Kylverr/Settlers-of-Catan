import type { Player } from './Player';

export interface Vertex {
    id: number;
    tileId: number;
    cornerIndex: number;
    owner: Player | null;
}