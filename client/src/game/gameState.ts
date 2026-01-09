import type { Action, GameState } from "../models/GameState";

export function initializeGameState(): GameState {
    return {
        phase: "SETUP_1",
        settlements: [],
        roads: [],
        players: [
            { id: "p1", name: "player1", color: "blue", resources: {
                none: 0,
                wood: 0,
                wheat: 0,
                ore: 0,
                brick: 0,
                sheep: 0
            }, settlements: [], roads: [], cities: []
            },
            { id: "b1", name: "bot1", color: "red", resources: {
                none: 0,
                wood: 0,
                wheat: 0,
                ore: 0,
                brick: 0,
                sheep: 0
            }, settlements: [], roads: [], cities: []
            },
            { id: "b2", name: "bot2", color: "black", resources: {
                none: 0,
                wood: 0,
                wheat: 0,
                ore: 0,
                brick: 0,
                sheep: 0
            }, settlements: [], roads: [], cities: []
            },
            { id: "b3", name: "bot3", color: "green", resources: {
                none: 0,
                wood: 0,
                wheat: 0,
                ore: 0,
                brick: 0,
                sheep: 0
            }, settlements: [], roads: [], cities: []
            }

        ],
        currentPlayerIndex: 0,
        currentRoll: 0,
        robberTileId: 0
    }
}

export function applyAction(state: GameState, action: Action): GameState {
    if (!isActionLegal(state, action)) {
        console.warn("Illegal action", action);
        return state;
    }

    console.log("Applying action", action);

    const next = structuredClone(state);

    switch (action.type) {
        case "PLACE_SETTLEMENT":
        placeSettlement(next, action);
        advanceAfterSettlement(next);
        return next;

        case "PLACE_ROAD":
        placeRoad(next, action);
        advanceAfterRoad(next);
        return next;

        case "END_TURN":
        advanceTurn(next);
        return next;
    }
}

function isActionLegal(state: GameState, action: Action): boolean {
    // correct turn?
    if (action.playerId !== state.players[state.currentPlayerIndex].id) {
        return false;
    }

    switch (action.type) {
        case "PLACE_SETTLEMENT":
        return canPlaceSettlement(state, action);

        case "PLACE_ROAD":
        return canPlaceRoad(state, action);

        case "END_TURN":
        return canEndTurn(state, action);
    }
}

export function placeSettlement(state: GameState, action: { vertexId: string}) {
    state.settlements.push({
        vertexId: action.vertexId,
        owner: state.players[state.currentPlayerIndex].id,
        isCity: false
    });
}

function canPlaceSettlement(state: GameState, action: { vertexId: string }): boolean {
    // Check if vertex is already occupied
    const existingSettlement = state.settlements.find(s => s.vertexId === action.vertexId);
    if (existingSettlement) return false;

    // TODO: Check if there is a settlement or city adjacent to this vertex
    return true;
}

function advanceAfterSettlement(next: GameState) {
    next.pendingPlacement = "ROAD";
}
function placeRoad(state: GameState, action: { type: "PLACE_ROAD"; playerId: string; edgeId: string; }) {
    state.roads.push({
        edgeId: action.edgeId,
        owner: state.players[state.currentPlayerIndex].id
    })
}

function advanceAfterRoad(next: GameState) {
    if (next.phase === "SETUP_1") {
        // Move to next player
        
    };
}

function canPlaceRoad(state: GameState, action: { edgeId: string }): boolean {
    const existingRoad = state.roads.find(r => r.edgeId === action.edgeId);
    if (existingRoad) return false;

    return true;
}

function advanceTurn(next: GameState) {
    throw new Error("Function not implemented.");
}


function canEndTurn(state: GameState, action: { type: "END_TURN"; playerId: string; }): boolean {
    throw new Error("Function not implemented.");
}
