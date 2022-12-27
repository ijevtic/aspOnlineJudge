import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import * as React from 'react';
import { MyPopup } from './popup';

function createRow(data) {
  return {
    'time': data['time'],
    'test_cases_num': data['test_cases_num'],
    'passed': data['passed'],
    'status': data['status'],
    'error': data['error'],
    'task_code': data['task_code']
  }
}

function formatTime(unix) {
  let date = new Date(unix * 1000);
  return date.toLocaleDateString("en-GB") + " " + date.toLocaleTimeString("it-IT");
}

export default function BasicTable(props) {
  return (
    props.data == null ? <></> :
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>time</TableCell>
              <TableCell align="right">status</TableCell>
              <TableCell align="right">test cases num</TableCell>
              <TableCell align="right">passed</TableCell>
              <TableCell align="right">error</TableCell>
              <TableCell align="right">task code</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.data
            .sort((a,b) => a.time > b.time?-1:1)
            .map((row) => {
              row = createRow(row)
              return (
                <TableRow
                  key={row.time}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {formatTime(row.time)}
                  </TableCell>
                  <TableCell style={{ 'color': 'red' }} align="right"><b>{row.status}</b></TableCell>
                  <TableCell align="right">{row.test_cases_num}</TableCell>
                  <TableCell align="right">{row.passed}</TableCell>
                  <TableCell align="right">{row.error !== "" ? <MyPopup code={row.error} text={"Prikaži grešku"} title={"Greška"}/> : <>Nema greške</>}</TableCell>
                  <TableCell align="right"><MyPopup code={row.task_code} text={"Prikaži kod"} title={"Kod"}/></TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
  );
}