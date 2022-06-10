import { gql } from "@apollo/client";

export const QUERY_PLAYERS = gql`
  query allplayers {
    players {
      _id
      playerName
      account
      games {
        _id
        gameName
      }

    }
  }
`;

export const QUERY_SINGLE_PLAYER = gql`
  query singlePlayer($playerID: ID!) {
    player(playerId: $playerId) {
      _id
      playerName
      account
      games {
        _id
        gameName
      }
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      playerName
      account
      games {
        _id
        gameName
      }
    }
  }
`;

export const QUERY_LOCATIONS = gql`
  query locatons {
    locations {
      _id
      location
      difficulty
    }
  }
`;

export const QUERY_SINGLE_LOCATION = gql`
  query location ($locationId: ID!) {
    location (locationId: $locationId) {
      _id
      location
      difficulty
    }
  }
`;

export const QUERY_GAMES = gql`
  query games {
    games {
      _id
      winner
      playerLimit
      type
      createdAt
      players {
        _id
        playerName
      }
    }
  }
`;

export const QUERY_SINGLE_GAME = gql`
  query game ($gameId: ID!) {
    game (gameId: $gameId) {
      _id
      gameName
      winner
      playerLimit
      gameType
      createdAt
      players {
        _id
        playerName
      }
    }
  }
`;
