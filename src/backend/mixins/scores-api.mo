import Map       "mo:core/Map";
import List      "mo:core/List";
import Time      "mo:core/Time";
import Types     "../types/scores";
import ScoresLib "../lib/scores";

mixin (
  results  : List.List<Types.GameResult>,
  statsMap : Map.Map<Types.UserId, Types.UserStats>,
) {
  /// Submit a score on game-over or level completion.
  /// Caller is used as the user identity (anonymous or II principal).
  public shared ({ caller }) func submitScore(score : Nat, level : Nat) : async () {
    let result : Types.GameResult = {
      userId    = caller;
      score;
      level;
      timestamp = Time.now();
    };
    ScoresLib.submitResult(results, statsMap, result);
  };

  /// Retrieve the calling user's aggregated stats.
  public shared query ({ caller }) func getMyStats() : async ?Types.UserStats {
    ScoresLib.getStats(statsMap, caller);
  };

  /// Retrieve raw game history for the calling user.
  public shared query ({ caller }) func getMyHistory() : async [Types.GameResult] {
    ScoresLib.getUserResults(results, caller);
  };
};
