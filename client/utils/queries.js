import { gql } from '@apollo/client';

export const QUERY_PLAYERS = gql`
  query allplayers {
    players {
      _id
      name
      games
    }
  }
`;

export const QUERY_SINGLE_PLAYER = gql`
  query singlePlayer($playerID: ID!){
    player(playerId: $playerId){
      _id
      name
      games
    }
  }
`;

export const QUERY_ME = gql`
  query me{
    me{
      _id
      name
      games
    }
  }
`