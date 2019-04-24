// eslint-disable
// this is an auto generated file. This will be overwritten

export const createApplicant = `mutation CreateApplicant($input: CreateApplicantInput!) {
  createApplicant(input: $input) {
    id
    email
    username
    firstName
    lastName
    phone
    professionalField
    linkedin
  }
}
`;
export const updateApplicant = `mutation UpdateApplicant($input: UpdateApplicantInput!) {
  updateApplicant(input: $input) {
    id
    email
    username
    firstName
    lastName
    phone
    professionalField
    linkedin
  }
}
`;
export const deleteApplicant = `mutation DeleteApplicant($input: DeleteApplicantInput!) {
  deleteApplicant(input: $input) {
    id
    email
    username
    firstName
    lastName
    phone
    professionalField
    linkedin
  }
}
`;
export const createLocation = `mutation CreateLocation($input: CreateLocationInput!) {
  createLocation(input: $input) {
    id
    email
    lat
    lon
    timestamp
  }
}
`;
export const updateLocation = `mutation UpdateLocation($input: UpdateLocationInput!) {
  updateLocation(input: $input) {
    id
    email
    lat
    lon
    timestamp
  }
}
`;
export const deleteLocation = `mutation DeleteLocation($input: DeleteLocationInput!) {
  deleteLocation(input: $input) {
    id
    email
    lat
    lon
    timestamp
  }
}
`;
