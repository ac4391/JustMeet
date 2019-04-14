// eslint-disable
// this is an auto generated file. This will be overwritten

export const getApplicant = `query GetApplicant($id: ID!) {
  getApplicant(id: $id) {
    id
    email
    username
    firstName
    lastName
    professionalField
    linkedin
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
      id
      email
      username
      firstName
      lastName
      professionalField
      linkedin
    }
    nextToken
  }
}
`;
export const getLocation = `query GetLocation($id: ID!) {
  getLocation(id: $id) {
    id
    email
    lat
    lon
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
      id
      email
      lat
      lon
    }
    nextToken
  }
}
`;
