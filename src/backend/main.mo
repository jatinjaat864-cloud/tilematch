import Map       "mo:core/Map";
import List      "mo:core/List";
import Types     "types/scores";
import ScoresApi "mixins/scores-api";

actor {
  let gameResults : List.List<Types.GameResult>              = List.empty();
  let statsMap    : Map.Map<Types.UserId, Types.UserStats>   = Map.empty();

  include ScoresApi(gameResults, statsMap);
};
