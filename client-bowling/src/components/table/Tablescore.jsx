import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(frame, roll1, roll2, bonus, relevantScore,totalFrameScore) {
  return { frame, roll1, roll2, bonus, relevantScore,totalFrameScore };
}

const rows = [
  createData(1, 2, 8 , 'spare', 10),

];

 function Tablescore(props) {
  const classes = useStyles();
  
return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>frame</TableCell>
            <TableCell align="right">Roll1</TableCell>
            <TableCell align="right">Roll2</TableCell>
            <TableCell align="right">BonusType</TableCell>
            <TableCell align="right">BonusScore</TableCell>
            <TableCell align="right">relevantScore</TableCell>
            <TableCell align="right">totalFrameScore</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
         {props.data.map((row,id) => (
            <TableRow key={id}>
              <TableCell component="th" scope="row">
                {(id + 1)}
              </TableCell>
              <TableCell align="right">{row.throws[0]}</TableCell>
              <TableCell align="right">{row.throws[1] ?row.throws[1]:"X"}</TableCell>
              <TableCell align="right">{row.bonusScore ? row.bonusScore : "X"}</TableCell>
              <TableCell align="right">{row.bonus}</TableCell>
              <TableCell align="right">{row.relevantScore}</TableCell>
              <TableCell align="right">{row.totalFrameScore}</TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
export default React.memo(Tablescore)