import type { Tile, ResourceType } from './models/Tile';
import type { Vertex } from './models/Vertex';

function initializeArray() {
  const tiles: Tile[] = [];
  let id = 1;
  for (let r = -2; r <= 2; r++) {
    for (let q = -2 - (r < 0 ? r : 0); q <= 2 - (r < 0 ? 0 : r); q++) {
      tiles.push({
        id: ++id,
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

    for(const tile of tiles) {
        for(let i = 0; i < 6; i++) {
            vertices.push( {
                id: nextId++,
                tileId: tile.id,
                cornerIndex: i,
                owner: null,
            })
        }
    }

    return vertices;
}
