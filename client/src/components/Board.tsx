import HexTile from "./HexTile";
import { HexGrid, Layout } from "react-hexgrid";
import { useMemo, useState } from "react";
import type { Vertex } from "../models/Vertex";
import type { Edge } from "../models/Edge";
import { VertexHoverHighlight } from "./VertexHoverHighlight";
import { EdgeHoverHighlight } from "./EdgeHoverHighlight";
import type { Action, GameState } from "../models/GameState";
import { applyAction, initializeGameState } from "../game/gameState";
import { initializeBoard } from "../game/initializeBoard";


function Board() {
  const board = useMemo(() => initializeBoard(), []); // immutable
  const [gameState, setGameState] = useState<GameState>(initializeGameState());

  const [hoveredVertex, setHoveredVertex] = useState<Vertex | null>(null);
  const [hoveredEdge, setHoveredEdge] = useState<Edge | null>(null);

  function dispatch(action: Action) {
    setGameState(prev => applyAction(prev, action));
  }

  return (
    <HexGrid width={1200} height={800} viewBox="-50 -50 100 100">
      <Layout size={{ x: 10, y: 10 }} flat={false} spacing={1.0}>
        {/* Tiles */}
        {board.tiles.map((tile) => (
          <HexTile key={tile.id} tile={tile} />
        ))}

        {/* Vertices */}
        {board.vertices.map((vertex) => {
          const hasSettlement = gameState.settlements.some(
            (s) => s.vertexId === vertex.id
          );

          const tile = board.tiles.find(
            (t) => t.id === vertex.tileIds[0]
          )!;

          return !hasSettlement ? (
            <circle
              key={vertex.id}
              cx={vertex.x}
              cy={vertex.y}
              r={0.8}
              fill="gray"
              stroke="black"
              strokeWidth={0.2}
              onMouseOver={() => setHoveredVertex(vertex)}
              onMouseOut={() => setHoveredVertex(null)}
              onMouseDown={() => dispatch({ type: "PLACE_SETTLEMENT", playerId: gameState.players[gameState.currentPlayerIndex].id, vertexId: vertex.id} )}
            />
          ) : (
            <rect
              key={vertex.id}
              x={vertex.x - 1.5}
              y={vertex.y - 1.5}
              width={3}
              height={3}
              fill={gameState.players.find(p => p.id === gameState.settlements.find(s => s.vertexId === vertex.id)?.owner)?.color}
              pointerEvents="none"
            />
          );
        })}

        {/* Edges */}
        {board.edges.map((edge) => {
          const hasRoad = gameState.roads.some(
            (r) => r.edgeId === edge.id
          );

          const vA = board.vertices.find((v) => v.id === edge.vertexA)!;
          const vB = board.vertices.find((v) => v.id === edge.vertexB)!;

          const pAx = vA.x;
          const pAy = vA.y;
          const pBx = vB.x;
          const pBy = vB.y;

          const x = (pAx + pBx) / 2;
          const y = (pAy + pBy) / 2;

          const angle =
            (Math.atan2(pBy - pAy, pBx - pAx) * 180) / Math.PI + 90;

          return !hasRoad ? (
            <circle
              key={edge.id}
              cx={x}
              cy={y}
              r={0.8}
              fill="white"
              stroke="black"
              strokeWidth={0.2}
              onMouseOver={() => setHoveredEdge(edge)}
              onMouseOut={() => setHoveredEdge(null)}
              onMouseDown={() => dispatch({ type: "PLACE_ROAD", playerId: gameState.players[gameState.currentPlayerIndex].id, edgeId: edge.id })}
            />
          ) : (
            <rect
              key={edge.id}
              x={x - 1}
              y={y - 2.5}
              width={2}
              height={5}
              fill={gameState.players.find(p => p.id === gameState.roads.find(r => r.edgeId === edge.id)?.owner)?.color}
              pointerEvents="none"
              transform={`rotate(${angle} ${x} ${y})`}
            />
          );
        })}


        <VertexHoverHighlight
          hoveredVertex={hoveredVertex}
          color={gameState.players[gameState.currentPlayerIndex].color}
        />
        <EdgeHoverHighlight
          hoveredEdge={hoveredEdge}
          vertices={board.vertices}
          color={gameState.players[gameState.currentPlayerIndex].color}
        />
      </Layout>
    </HexGrid>
  );
}

export default Board;
