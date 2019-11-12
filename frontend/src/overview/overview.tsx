import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

import MaterialTable from "material-table";

import "./overview.css";

const OVERVIEW_QUERY = gql`
    query {
        hypervisors {
            hostname
            domains {
                id
                uuid
                name
                info {
                    state
                }
            }
        }
    }
`;

export default function Overview() {

    const { data, loading, error } = useQuery(OVERVIEW_QUERY);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error!</p>;

    const columns = [
        { title: "ID", field: "id" },
        { title: "Hypervisor", field: "hypervisor" },
        { title: "name", field: "name" },
        { title: "state", field: "state" },
    ];

    const domains = [];
    for (const hypervisor of data.hypervisors) {
        for (const domain of hypervisor.domains) {
            domains.push({
                uuid: domain.uuid,
                id: domain.id,
                hypervisor: hypervisor.hostname,
                name: domain.name,
                state: domain.info.state,
            });
        }
    }

    return (
        <MaterialTable
            title="Domain Overview"
            columns={columns}
            data={domains}
            options={{ grouping: true }}>
        </MaterialTable>
    );

}
