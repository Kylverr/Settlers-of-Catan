import type {Tile} from '../models/Tile';

export function hexToPixel(tile: Tile) {
  let x = Math.sqrt(3) * tile.q + (Math.sqrt(3) / 2) * tile.r;
  let y = (3 / 2) * tile.r;
  x = x * 10;
  y = y * 10;
  return { x, y };
}

export function pointyHexCorner(x: number, y: number, size: number, i: number) {
  if (i < 0) i = 5;
  const angles = [-30, 30, 90, 150, 210, 270];
  const angleRad = (Math.PI / 180) * angles[i];
  x = x + size * Math.cos(angleRad);
  y = y + size * Math.sin(angleRad);
  return { x, y };
}

export function pointyHexEdge(x: number, y: number, size: number, i: number) {
  let { x: x1, y: y1 } = pointyHexCorner(x, y, size, i - 1);
  let { x: x2, y: y2 } = pointyHexCorner(x, y, size, i);
  return findPointBetweenTwoPoints(x1, x2, y1, y2);
}

export function findPointBetweenTwoPoints(
  x1: number,
  x2: number,
  y1: number,
  y2: number
) {
  const x = (x1 + x2) / 2;
  const y = (y1 + y2) / 2;
  return { x, y };
}

