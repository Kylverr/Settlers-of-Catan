export interface Vertex {
    id: string;
    tileIds: number[]; // always length 2 or 3
    x: number;
    y: number;
}
