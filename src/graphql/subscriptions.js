// eslint-disable
// this is an auto generated file. This will be overwritten

export const onCreateApplicant = `subscription OnCreateApplicant {
  onCreateApplicant {
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
export const onUpdateApplicant = `subscription OnUpdateApplicant {
  onUpdateApplicant {
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
export const onDeleteApplicant = `subscription OnDeleteApplicant {
  onDeleteApplicant {
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
export const onCreateLocation = `subscription OnCreateLocation {
  onCreateLocation {
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
export const onUpdateLocation = `subscription OnUpdateLocation {
  onUpdateLocation {
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
export const onDeleteLocation = `subscription OnDeleteLocation {
  onDeleteLocation {
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
