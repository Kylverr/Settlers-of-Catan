import type { PlayerId } from './Player';

export interface Settlement {
    vertexId: number;
    owner: PlayerId;
    isCity: boolean;
}