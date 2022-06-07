import { gql } from "@apollo/client";

export const QUERY_PLAYERS = gql`
  query allplayers {
    players {
      _id
      playerName
      password
      account
      games {
        _id
      }

    }
  }
`;

export const QUERY_SINGLE_PLAYER = gql`
  query singlePlayer($playerID: ID!) {
    player(playerId: $playerId) {
      _id
      name
      games
      account
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      name
      games
      account
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
  query location {
    location {
      _id
      location
      difficult
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
      players
    }
  }
`;

export const QUERY_SINGLE_GAME = gql`
  query game {
    game {
      _id
      winner
      playerLimit
      type
      createdAt
      players
    }
  }
`;
