export type ResourceType = "none" | "wood" | "wheat" | "ore" | "brick" | "sheep";

export interface Tile {
    id: number;
    resource: ResourceType;
    number: number | null;
    q: number;
    r: number;
    s: number;
}