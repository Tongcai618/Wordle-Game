import { http } from "./http";

export const GameAPI = {
  async createGame() {
    const { data } = await http.post("/api/wordle/new");
    return data; // { gameId }
  },

  async guess(gameId, guess) {
    const { data } = await http.post(`/api/wordle/games/guess?id=${gameId}&guess=${guess}`);
    return data; // GuessOutcome
  },

  async getGame(gameId) {
    const { data } = await http.get(`/api/wordle/games/${gameId}`);
    return data; // Game
  },

  // if you add it on backend:
  async listMyGames() {
    const { data } = await http.get("/api/wordle/games");
    return data;
  },
};
