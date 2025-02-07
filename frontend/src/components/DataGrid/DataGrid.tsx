import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import { GridDataType } from "../../@types/SynopsisData/grid.type";

export default function DataGrid({ row }: { row: GridDataType }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableBody>
          <TableRow
            key={"title"}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              <Typography variant="h5">Title</Typography>
            </TableCell>
            <TableCell align="right">{row.title}</TableCell>
          </TableRow>

          <TableRow
            key={"authors"}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              <Typography variant="h5">Authors</Typography>
            </TableCell>
            <TableCell align="right">
              {row.authors.map((author) => (
                <Typography key={author}>{author}</Typography>
              ))}
            </TableCell>
          </TableRow>
          <TableRow
            key={"publicationDate"}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              <Typography variant="h5">Publication Date</Typography>
            </TableCell>
            <TableCell align="right">
              {row.publicationDate.toLocaleDateString()}
            </TableCell>
          </TableRow>
          <TableRow key={"relatedtopics"}>
            <TableCell component="th" scope="row">
              <Typography variant="h5">Related Topics</Typography>
            </TableCell>
            <TableCell align="right">
              {row.relatedtopics.map((topic) => (
                <Typography key={topic}>{topic}</Typography>
              ))}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
