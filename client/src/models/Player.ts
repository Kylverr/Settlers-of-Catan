import type { ResourceType } from "./Tile";

export type PlayerId = string;

export interface Player {
    id: PlayerId,
    name: string,
    resources: Record<ResourceType, number>,
    settlements: number[],
    roads: number[],
    cities: number[]
}