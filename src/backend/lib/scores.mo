import Map       "mo:core/Map";
import List      "mo:core/List";
import Principal "mo:core/Principal";
import Types     "../types/scores";

module {
  public type GameResult = Types.GameResult;
  public type UserStats  = Types.UserStats;
  public type UserId     = Types.UserId;

  /// Submit a game result and update the user's stats map.
  public func submitResult(
    results  : List.List<GameResult>,
    statsMap : Map.Map<UserId, UserStats>,
    result   : GameResult,
  ) : () {
    results.add(result);
    let existing = statsMap.get(result.userId);
    let updated : UserStats = switch (existing) {
      case null {
        {
          userId       = result.userId;
          totalGames   = 1;
          bestScore    = result.score;
          highestLevel = result.level;
          totalScore   = result.score;
        }
      };
      case (?s) {
        {
          s with
          totalGames   = s.totalGames + 1;
          bestScore    = if (result.score > s.bestScore) result.score else s.bestScore;
          highestLevel = if (result.level > s.highestLevel) result.level else s.highestLevel;
          totalScore   = s.totalScore + result.score;
        }
      };
    };
    statsMap.add(result.userId, updated);
  };

  /// Retrieve stats for a specific user; returns null if no games recorded.
  public func getStats(
    statsMap : Map.Map<UserId, UserStats>,
    userId   : UserId,
  ) : ?UserStats {
    statsMap.get(userId);
  };

  /// Return all stored game results for a specific user.
  public func getUserResults(
    results : List.List<GameResult>,
    userId  : UserId,
  ) : [GameResult] {
    results.filter(func(r) { Principal.equal(r.userId, userId) }).toArray();
  };
};
