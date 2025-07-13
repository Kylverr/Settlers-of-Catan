import type { PlayerId } from './Player';

export interface Edge {
    id: number;
    tileId: number;
    edgeIndex: number;
    owner: PlayerId | null;
}