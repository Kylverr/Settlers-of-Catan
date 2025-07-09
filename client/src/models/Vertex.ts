import type { Player } from './Player';

export interface Vertex {
    id: number;
    q: number;
    r: number;
    s: number;
    owner: Player | null;
}