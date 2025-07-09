import type { Player } from './Player';

export interface Edge {
    id: number;
    q: number;
    r: number;
    s: number;
    owner: Player | null;
}