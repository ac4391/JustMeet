// eslint-disable
// this is an auto generated file. This will be overwritten

export const createApplicant = `mutation CreateApplicant($input: CreateApplicantInput!) {
  createApplicant(input: $input) {
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
export const updateApplicant = `mutation UpdateApplicant($input: UpdateApplicantInput!) {
  updateApplicant(input: $input) {
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
export const deleteApplicant = `mutation DeleteApplicant($input: DeleteApplicantInput!) {
  deleteApplicant(input: $input) {
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
export const createLocation = `mutation CreateLocation($input: CreateLocationInput!) {
  createLocation(input: $input) {
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
export const updateLocation = `mutation UpdateLocation($input: UpdateLocationInput!) {
  updateLocation(input: $input) {
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
export const deleteLocation = `mutation DeleteLocation($input: DeleteLocationInput!) {
  deleteLocation(input: $input) {
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
