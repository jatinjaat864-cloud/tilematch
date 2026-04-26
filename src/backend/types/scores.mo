import Time "mo:core/Time";

module {
  public type UserId = Principal;
  public type Timestamp = Time.Time;

  /// A single game result submitted by a user.
  public type GameResult = {
    userId    : UserId;
    score     : Nat;
    level     : Nat;
    timestamp : Timestamp;
  };

  /// Aggregated per-user statistics.
  public type UserStats = {
    userId        : UserId;
    totalGames    : Nat;
    bestScore     : Nat;
    highestLevel  : Nat;
    totalScore    : Nat; // used to derive average on the frontend
  };
};
