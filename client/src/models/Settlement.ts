import type { PlayerId } from './Player';

export interface Settlement {
    vertexId: string;
    owner: PlayerId;
    isCity: boolean;
}