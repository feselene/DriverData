import * as React from "react";
import { useState } from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { TablePagination, Typography } from "@mui/material";
import Title from "../../common/Title";
import HouseIcon from "@mui/icons-material/House";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

export default function HousingPagination(data) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (evt, newPage) => {
    setPage(newPage);
  };

  function handleChangeRowsPerPage(evt) {
    setRowsPerPage(parseInt(evt.target.value, 10));
    setPage(1);
  }

  return (
    <Grid item xs={12}>
      <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
        <React.Fragment>
          <Title>Recent Listings</Title>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={data.data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Address</TableCell>
                <TableCell># Beds</TableCell>
                <TableCell># Baths</TableCell>
                <TableCell>Square Feet</TableCell>
                <TableCell>Listing</TableCell>
                <TableCell align="right">Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((house) => (
                  <TableRow key={house.id}>
                    <TableCell>{house.address}</TableCell>
                    <TableCell>{house.beds}</TableCell>
                    <TableCell>{house.baths}</TableCell>
                    <TableCell>{house.squareFeet}</TableCell>
                    <TableCell>
                      <Link color="primary" href={house.url}>
                        <HouseIcon />
                      </Link>
                    </TableCell>
                    <TableCell align="right">{`$${house.price}`}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <Link
            color="primary"
            href="https://www.redfin.com/city/17151/CA/San-Francisco"
            sx={{ mt: 3 }}
          >
            <Typography>View More Homes On Redfin</Typography>
          </Link>
        </React.Fragment>
      </Paper>
    </Grid>
  );
}
