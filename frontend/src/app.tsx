import React from "react";
import { useQuery } from "@apollo/react-hooks";

import CssBaseline from "@material-ui/core/CssBaseline";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { withStyles } from "@material-ui/core/styles";

import { QUERY_DOMAIN_LIST } from "./queries/domain-list";

import "./app.css";

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.common.white,
    },
}))(TableCell);

export default function App() {
    const { data, loading, error } = useQuery(QUERY_DOMAIN_LIST);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error!</p>;

    return <React.Fragment>

        <CssBaseline />

        <Table id="domainList">
            
            <TableHead>
                <TableRow>
                    <StyledTableCell>ID</StyledTableCell>
                    <StyledTableCell>UUID</StyledTableCell>
                    <StyledTableCell>Name</StyledTableCell>
                    <StyledTableCell>State</StyledTableCell>
                </TableRow>
            </TableHead>

            <TableBody>
                {data.allDomains && data.allDomains.map((domain: any) =>
                    <TableRow key={domain.uuid}>
                        <TableCell>{domain.id}</TableCell>
                        <TableCell>{domain.uuid}</TableCell>
                        <TableCell>{domain.name}</TableCell>
                        <TableCell>{domain.info.state}</TableCell>
                    </TableRow>
                )}
            </TableBody>

        </Table>

    </React.Fragment>;

}
