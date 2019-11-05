import React from "react";
import { useQuery } from "@apollo/react-hooks";

import { QUERY_DOMAIN_LIST } from "./queries/domain-list";

import "./app.css";

export default function App() {

    const { data, loading, error } = useQuery(QUERY_DOMAIN_LIST);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error!</p>;

    return (
        <table id="domainList">
            <thead>
                <tr>
                    <td>id</td>
                    <td>uuid</td>
                    <td>name</td>
                    <td>state</td>
                </tr>
            </thead>
            <tbody>
            {data.allDomains && data.allDomains.map((domain: any) =>
                <tr key={domain.uuid}>
                    <td>{domain.id}</td>
                    <td>{domain.uuid}</td>
                    <td>{domain.name}</td>
                    <td>{domain.info.state}</td>
                </tr>
            )}
            </tbody>
        </table>
    );

}
