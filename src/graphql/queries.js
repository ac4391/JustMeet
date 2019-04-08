// eslint-disable
// this is an auto generated file. This will be overwritten

export const getApplicant = `query GetApplicant($id: ID!) {
  getApplicant(id: $id) {
    email
    username
    locations {
      items {
        timestamp
        latitude
        longitude
      }
      nextToken
    }
  }
}
`;
export const listApplicants = `query ListApplicants(
  $filter: ModelApplicantFilterInput
  $limit: Int
  $nextToken: String
) {
  listApplicants(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      email
      username
      locations {
        nextToken
      }
    }
    nextToken
  }
}
`;
export const getLocation = `query GetLocation($id: ID!) {
  getLocation(id: $id) {
    Applicant {
      email
      username
      locations {
        nextToken
      }
    }
    timestamp
    latitude
    longitude
  }
}
`;
export const listLocations = `query ListLocations(
  $filter: ModelLocationFilterInput
  $limit: Int
  $nextToken: String
) {
  listLocations(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      Applicant {
        email
        username
      }
      timestamp
      latitude
      longitude
    }
    nextToken
  }
}
`;
