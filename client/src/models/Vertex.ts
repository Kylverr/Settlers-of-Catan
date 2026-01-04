export interface Vertex {
    id: number;
    tileIds: number[]; // always length 2 or 3
    x: number;
    y: number;
}
