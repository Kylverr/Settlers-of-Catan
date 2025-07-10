import type { Player } from './Player';

export interface Edge {
    id: number;
    tileId: number;
    edgeIndex: number;
    owner: Player | null;
}