import type { Tile, ResourceType } from '../models/Tile';
import type { Vertex } from '../models/Vertex';
import type { Edge } from '../models/Edge';

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

export function initializeVertices(tiles: Tile[]): Vertex[]{
    const vertices: Vertex[] = [];
    let nextId = 1;

    // 1
    nextId = topLeftVertexInsertion(vertices, tiles[0], nextId);
    // 2
    nextId = topMiddleVertexInsertion(vertices, tiles[1], nextId);
    // 3
    nextId = topRightVertexInsertion(vertices, tiles[2], nextId);
    // 4
    nextId = topMiddleLeftVertexInsertion(vertices, tiles[3], nextId);
    // 5
    nextId = topMiddleMiddleLeftVertexInsertion(vertices, tiles[4], nextId);
    // 6
    nextId = topMiddleMiddleVertexInsertion(vertices, tiles[5], nextId);
    // 7
    nextId = topMiddleRightVertexInsertion(vertices, tiles[6], nextId);
    // 8
    nextId = middleLeftVertexInsertion(vertices, tiles[7], nextId);
    // 9
    nextId = middleMiddleLeftVertexInsertion(vertices, tiles[8], nextId);
    // 10
    nextId = middleMiddleVertexInsertion(vertices, tiles[9], nextId);
    // 11
    nextId = middleMiddleRightVertexInsertion(vertices, tiles[10], nextId);
    // 12
    nextId = middleRightVertexInsertion(vertices, tiles[11], nextId);
    // 13
    nextId = bottomMiddleLeftVertexInsertion(vertices, tiles[12], nextId);
    // 14
    nextId = bottomMiddleMiddleLeftVertexInsertion(vertices, tiles[13], nextId);
    // 15
    nextId = bottomMiddleMiddleRightVertexInsertion(vertices, tiles[14], nextId);
    // 16
    nextId = bottomMiddleRightVertexInsertion(vertices, tiles[15], nextId);
    // 17
    nextId = bottomLeftVertexInsertion(vertices, tiles[16], nextId);
    // 18
    nextId = bottomMiddleVertexInsertion(vertices, tiles[17], nextId);
    // 19
    nextId = bottomRightVertexInsertion(vertices, tiles[18], nextId);
    return vertices;
}

function topLeftVertexInsertion(vertices: Vertex[], tile: Tile, nextId: number) {
    // top right of tile
    vertices.push({id: nextId++, tileIds: [tile.id, tile.id + 1], cornerIndices: [0, 4], owner: null});
    // bottom right of tile
    vertices.push({id: nextId++, tileIds: [tile.id, tile.id + 1, tile.id + 4], cornerIndices: [1, 3, 5], owner: null});
    // bottom of tile
    vertices.push({id: nextId++, tileIds: [tile.id, tile.id + 4, tile.id + 3], cornerIndices: [2, 4, 0], owner: null});
    // bottom left of tile
    vertices.push({id: nextId++, tileIds: [tile.id, tile.id + 3], cornerIndices: [3, 5], owner: null});
    // top left of tile
    vertices.push({id: nextId++, tileIds: [tile.id], cornerIndices: [4], owner: null});
    // top of tile
    vertices.push({id: nextId++, tileIds: [tile.id], cornerIndices: [5], owner: null});
    // return new nextId
    return nextId;
}

function topMiddleVertexInsertion(vertices: Vertex[], tile: Tile, nextId: number) {
    // top right of tile
    vertices.push({id: nextId++, tileIds: [tile.id, tile.id + 1], cornerIndices: [0, 4], owner: null});
    // bottom right of tile
    vertices.push({id: nextId++, tileIds: [tile.id, tile.id + 1, tile.id + 4], cornerIndices: [1, 3, 5], owner: null});
    // bottom of tile
    vertices.push({id: nextId++, tileIds: [tile.id, tile.id + 4, tile.id + 3], cornerIndices: [2, 4, 0], owner: null});
    // top of tile
    vertices.push({id: nextId++, tileIds: [tile.id], cornerIndices: [5], owner: null});
    // return new nextId
    return nextId;
}

function topRightVertexInsertion(vertices: Vertex[], tile: Tile, nextId: number) {
    // top right of tile
    vertices.push({id: nextId++, tileIds: [tile.id], cornerIndices: [0], owner: null});
    // bottom right of tile
    vertices.push({id: nextId++, tileIds: [tile.id, tile.id + 4], cornerIndices: [1, 5], owner: null});
    // bottom of tile
    vertices.push({id: nextId++, tileIds: [tile.id, tile.id + 4, tile.id + 3], cornerIndices: [2, 4, 0], owner: null});
    // top of tile
    vertices.push({id: nextId++, tileIds: [tile.id], cornerIndices: [5], owner: null});
    // return new nextId
    return nextId;
}

function topMiddleLeftVertexInsertion(vertices: Vertex[], tile: Tile, nextId: number) {
    // bottom right of tile
    vertices.push({id: nextId++, tileIds: [tile.id, tile.id + 1, tile.id + 5], cornerIndices: [1, 3, 5], owner: null});
    // bottom of tile
    vertices.push({id: nextId++, tileIds: [tile.id, tile.id + 5, tile.id + 4], cornerIndices: [2, 4, 0], owner: null});
    // bottom left of tile
    vertices.push({id: nextId++, tileIds: [tile.id, tile.id + 4], cornerIndices: [3, 5], owner: null});
    // top left of tile
    vertices.push({id: nextId++, tileIds: [tile.id], cornerIndices: [4], owner: null});
    // return new nextId
    return nextId;
}

function topMiddleMiddleLeftVertexInsertion(vertices: Vertex[], tile: Tile, nextId: number) {
    // bottom right of tile
    vertices.push({id: nextId++, tileIds: [tile.id, tile.id + 1, tile.id + 5], cornerIndices: [1, 3, 5], owner: null});
    // bottom of tile
    vertices.push({id: nextId++, tileIds: [tile.id, tile.id + 5, tile.id + 4], cornerIndices: [2, 4, 0], owner: null});
    // return new nextId
    return nextId;
}

function topMiddleMiddleVertexInsertion(vertices: Vertex[], tile: Tile, nextId: number) {
    // same logic as topMiddleMiddleLeftVertexInsertion
    return topMiddleMiddleLeftVertexInsertion(vertices, tile, nextId);
}

function topMiddleRightVertexInsertion(vertices: Vertex[], tile: Tile, nextId: number) {
    // top right of tile
    vertices.push({id: nextId++, tileIds: [tile.id], cornerIndices: [0], owner: null});
    // bottom right of tile
    vertices.push({id: nextId++, tileIds: [tile.id, tile.id + 5], cornerIndices: [1, 5], owner: null});
    // bottom of tile
    vertices.push({id: nextId++, tileIds: [tile.id, tile.id + 5, tile.id + 4], cornerIndices: [2, 4, 0], owner: null});
    // return new nextId
    return nextId;
}

function middleLeftVertexInsertion(vertices: Vertex[], tile: Tile, nextId: number) {
    // bottom right of tile
    vertices.push({id: nextId++, tileIds: [tile.id, tile.id + 1, tile.id + 5], cornerIndices: [1, 3, 5], owner: null});
    // bottom of tile
    vertices.push({id: nextId++, tileIds: [tile.id, tile.id + 5], cornerIndices: [2, 4], owner: null});
    // bottom left of tile
    vertices.push({id: nextId++, tileIds: [tile.id], cornerIndices: [3], owner: null});
    // top left of tile
    vertices.push({id: nextId++, tileIds: [tile.id], cornerIndices: [4], owner: null});  
    // return new nextId
    return nextId;
}

function middleMiddleLeftVertexInsertion(vertices: Vertex[], tile: Tile, nextId: number) {
    // same logic as topMiddleMiddleLeftVertexInsertion
    return topMiddleMiddleLeftVertexInsertion(vertices, tile, nextId); 
}

function middleMiddleVertexInsertion(vertices: Vertex[], tile: Tile, nextId: number) {
    // same logic as topMiddleMiddleLeftVertexInsertion
    return topMiddleMiddleLeftVertexInsertion(vertices, tile, nextId); 
}

function middleMiddleRightVertexInsertion(vertices: Vertex[], tile: Tile, nextId: number) {
    // same logic as topMiddleMiddleLeftVertexInsertion
    return topMiddleMiddleLeftVertexInsertion(vertices, tile, nextId); 
}

function middleRightVertexInsertion(vertices: Vertex[], tile: Tile, nextId: number) {
    // top right of tile
    vertices.push({id: nextId++, tileIds: [tile.id], cornerIndices: [0], owner: null});
    // bottom right of tile
    vertices.push({id: nextId++, tileIds: [tile.id], cornerIndices: [1], owner: null});
    // bottom of tile
    vertices.push({id: nextId++, tileIds: [tile.id, tile.id + 4], cornerIndices: [2, 0], owner: null});
    // return new nextId
    return nextId;
}

function bottomMiddleLeftVertexInsertion(vertices: Vertex[], tile: Tile, nextId: number) {
    // bottom right of tile
    vertices.push({id: nextId++, tileIds: [tile.id, tile.id + 1, tile.id + 4], cornerIndices: [1, 3, 5], owner: null});
    // bottom of tile
    vertices.push({id: nextId++, tileIds: [tile.id, tile.id + 4], cornerIndices: [2, 4], owner: null});
    // bottom left of tile
    vertices.push({id: nextId++, tileIds: [tile.id], cornerIndices: [3], owner: null});
    // return new nextId
    return nextId;
}


function bottomMiddleMiddleLeftVertexInsertion(vertices: Vertex[], tile: Tile, nextId: number) {
    // bottom of tile
    vertices.push({id: nextId++, tileIds: [tile.id, tile.id + 4, tile.id + 3], cornerIndices: [2, 4, 0], owner: null});
    // bottom right of tile
    vertices.push({id: nextId++, tileIds: [tile.id, tile.id + 1, tile.id + 4], cornerIndices: [1, 3, 5], owner: null});
    // return new nextId
    return nextId;
}

function bottomMiddleMiddleRightVertexInsertion(vertices: Vertex[], tile: Tile, nextId: number) {
    // same logic as bottomMiddleMiddleLeftVertexInsertion
    return bottomMiddleMiddleLeftVertexInsertion(vertices, tile, nextId);
}

function bottomMiddleRightVertexInsertion(vertices: Vertex[], tile: Tile, nextId: number) {
    // bottom right of tile
    vertices.push({id: nextId++, tileIds: [tile.id], cornerIndices: [1], owner: null});
    // bottom of tile
    vertices.push({id: nextId++, tileIds: [tile.id, tile.id + 3], cornerIndices: [2, 0], owner: null});   
    // return new nextId
    return nextId;
}

function bottomLeftVertexInsertion(vertices: Vertex[], tile: Tile, nextId: number) {
    // bottom right of tile
    vertices.push({id: nextId++, tileIds: [tile.id, tile.id + 1], cornerIndices: [1, 3], owner: null});    
    // bottom of tile
    vertices.push({id: nextId++, tileIds: [tile.id], cornerIndices: [2], owner: null});
    // bottom left of tile
    vertices.push({id: nextId++, tileIds: [tile.id], cornerIndices: [3], owner: null});
    // return new nextId
    return nextId;
}

function bottomMiddleVertexInsertion(vertices: Vertex[], tile: Tile, nextId: number) {
    // bottom right of tile
    vertices.push({id: nextId++, tileIds: [tile.id, tile.id + 1], cornerIndices: [1, 3], owner: null});
    // bottom of tile
    vertices.push({id: nextId++, tileIds: [tile.id], cornerIndices: [2], owner: null});
    // return new nextId
    return nextId;
}

function bottomRightVertexInsertion(vertices: Vertex[], tile: Tile, nextId: number) {
    // bottom right of tile
    vertices.push({id: nextId++, tileIds: [tile.id], cornerIndices: [1], owner: null});
    // bottom of tile
    vertices.push({id: nextId++, tileIds: [tile.id], cornerIndices: [2], owner: null});
    // return new nextId
    return nextId;
}


export function initializeEdges(tiles: Tile[]): Edge[] {
    const edges: Edge[] = [];
    let nextId = 1;

    for(const tile of tiles) {
        for(let i = 0; i < 6; i++) {
            edges.push( {
                id: nextId++,
                tileId: tile.id,
                edgeIndex: i,
                owner: null,
            })
        }
    }

    return edges;
}