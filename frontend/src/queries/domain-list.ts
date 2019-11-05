import gql from "graphql-tag";

export const QUERY_DOMAIN_LIST = gql`
    query domainList {
        allDomains {
            id,
            name,
            uuid,
            info { state }
        }
    }
`;
