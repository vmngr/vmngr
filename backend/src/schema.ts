import { gql } from "apollo-server";

export const typeDefs = gql`

    enum DomainState {
        NOSTATE
        RUNNING
        BLOCKED
        PAUSED
        SHUTDOWN
        SHUTOFF
        CRASHED
        PMSUSPENDED
    }

    type DomainInfo {
        state: DomainState!
        maxMem: Int!
        memory: Int!
        nrVirtCpu: Int!
        cpuTime: Float!
    }

    type Domain {
        id: Int
        name: String!
        uuid: String!
        info: DomainInfo!
    }

    type Query {
        allDomains: [Domain]!
    }

`;
