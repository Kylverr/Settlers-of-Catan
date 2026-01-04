import type { Edge } from "./Edge";
import type { Tile } from "./Tile";
import type { Vertex } from "./Vertex";

export interface Board {
    tiles: Tile[];
    vertices: Vertex[];
    edges: Edge[];
}