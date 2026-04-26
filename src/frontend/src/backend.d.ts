import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type UserId = Principal;
export type Timestamp = bigint;
export interface GameResult {
    userId: UserId;
    level: bigint;
    score: bigint;
    timestamp: Timestamp;
}
export interface UserStats {
    userId: UserId;
    highestLevel: bigint;
    bestScore: bigint;
    totalScore: bigint;
    totalGames: bigint;
}
export interface backendInterface {
    getMyHistory(): Promise<Array<GameResult>>;
    getMyStats(): Promise<UserStats | null>;
    submitScore(score: bigint, level: bigint): Promise<void>;
}
