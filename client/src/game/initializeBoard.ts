import type { Tile, ResourceType } from '../models/Tile';
import type { Vertex } from '../models/Vertex';
import type { Edge } from '../models/Edge';
import type { Board } from '../models/Board';
import { hexToPixel, pointyHexCorner } from '../utils/hexMath';

function initializeArray() {
    const tiles: Tile[] = [];
    let id = 1;
    for (let r = -2; r <= 2; r++) {
        for (let q = -2 - (r < 0 ? r : 0); q <= 2 - (r < 0 ? 0 : r); q++) {
        tiles.push({
            id: id++,
            resource: "none",
            number: 0,
            q: q,
            r: r,
            s: 0,
        });
        }
    }
    return tiles;
}

function shuffleArray<T>(arr: T[]) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

export function initializeTiles() {
    const tiles = initializeArray();

    // initialize array with all dice values
    const nums = [0, 2, 3, 3, 4, 4, 5, 5, 6, 6, 8, 8, 9, 9, 10, 10, 11, 11, 12];
    shuffleArray(nums);

    // initialize array with resource values
    const resources: ResourceType[] = ["none"];
    const four_resources: ResourceType[] = ["wheat", "sheep", "wood"];
    const three_resources: ResourceType[] = ["brick", "ore"];

    four_resources.forEach((res) => {
        for (let i = 0; i < 4; i++) resources.push(res);
    });
    three_resources.forEach((res) => {
        for (let i = 0; i < 3; i++) resources.push(res);
    });

    shuffleArray(resources);

    // find desert location in resources
    const desertIndex = resources.findIndex((r) => r === "none");

    // find 0 location in nums
    const zeroIndex = nums.findIndex((n) => n === 0);

    // swap them so desert gets 0
    [nums[desertIndex], nums[zeroIndex]] = [nums[zeroIndex], nums[desertIndex]];

    nums.map((num, index) => {
        tiles[index].number = num;
        tiles[index].resource = resources[index];
    });

    // swap 0 with the desert tile

    return tiles;
}

export function initializeVertices(tiles: Tile[]): Vertex[] {
    const vertices: Vertex[] = [];
    const vertexMap = new Map<string, Vertex>();

    for (const tile of tiles) {
        const { x: cx, y: cy } = hexToPixel(tile);

        for (let corner = 0; corner < 6; corner++) {
            const { x, y } = pointyHexCorner(cx, cy, 10, corner);

            // Quantize to avoid floating-point drift
            const key = `${x.toFixed(4)},${y.toFixed(4)}`;

            let vertex = vertexMap.get(key);

            if (!vertex) {
                vertex = {
                    id: `v_${key}`,
                    tileIds: [tile.id],
                    x,
                    y,
                };
                vertexMap.set(key, vertex);
                vertices.push(vertex);
            } else {
                vertex.tileIds.push(tile.id);
            }
        }
    }

    return vertices;
}

export function initializeEdges(vertices: Vertex[], tiles: Tile[]): Edge[] {
    const edges: Edge[] = [];
    const seen = new Set<string>();

    // Coordinate → vertex map
    const coordMap = new Map<string, Vertex>();
    for (const v of vertices) {
        const key = `${v.x.toFixed(4)},${v.y.toFixed(4)}`;
        coordMap.set(key, v);
    }

    for (const tile of tiles) {
        const { x: cx, y: cy } = hexToPixel(tile);

        for (let corner = 0; corner < 6; corner++) {
        const { x: x1, y: y1 } = pointyHexCorner(cx, cy, 10, corner);
        const { x: x2, y: y2 } = pointyHexCorner(cx, cy, 10, (corner + 1) % 6);

        const key1 = `${x1.toFixed(4)},${y1.toFixed(4)}`;
        const key2 = `${x2.toFixed(4)},${y2.toFixed(4)}`;

        const v1 = coordMap.get(key1);
        const v2 = coordMap.get(key2);

        if (!v1 || !v2) continue;

        // Canonical ordering
        const [a, b] =
            v1.id < v2.id ? [v1.id, v2.id] : [v2.id, v1.id];

        const edgeKey = `${a}|${b}`;

        if (!seen.has(edgeKey)) {
            seen.add(edgeKey);

            edges.push({
                id: `e_${edgeKey}`,
                vertexA: a,
                vertexB: b,
            });
        }
        }
    }

    return edges;
}



export function initializeBoard(): Board {
    const tiles = initializeTiles();
    const vertices = initializeVertices(tiles);
    const edges = initializeEdges(vertices, tiles);

    return {
        tiles,
        vertices,
        edges,
    };
}
