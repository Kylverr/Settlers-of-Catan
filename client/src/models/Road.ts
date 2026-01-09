import type { PlayerId } from "./Player";

export interface Road {
    edgeId: string;
    owner: PlayerId;
}