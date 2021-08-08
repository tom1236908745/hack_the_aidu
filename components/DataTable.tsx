import React from 'react';
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

function createData(nendo: number, subject: string, field: string, kind: string, url: string, insert_data: string) {
  return { nendo, subject, field, kind, url, insert_data };
}

const rows = [
  createData(2010, 'math', 'CN', '期末', 'https://drive.google.com/drive/folders/1iihGfgsklS-N5X3lBS4SLiwiGAWzjX6r', '2021/8/8'),
  createData(2010, 'math', 'CN', '期末', 'https://drive.google.com/drive/folders/1iihGfgsklS-N5X3lBS4SLiwiGAWzjX6r', '2021/8/8'),
  createData(2010, 'math', 'CN', '期末', 'https://drive.google.com/drive/folders/1iihGfgsklS-N5X3lBS4SLiwiGAWzjX6r', '2021/8/8'),
  createData(2010, 'math', 'CN', '期末', 'https://drive.google.com/drive/folders/1iihGfgsklS-N5X3lBS4SLiwiGAWzjX6r', '2021/8/8'),
  createData(2010, 'math', 'CN', '期末', 'https://drive.google.com/drive/folders/1iihGfgsklS-N5X3lBS4SLiwiGAWzjX6r', '2021/8/8'),
  createData(2010, 'math', 'CN', '期末', 'https://drive.google.com/drive/folders/1iihGfgsklS-N5X3lBS4SLiwiGAWzjX6r', '2021/8/8'),
];

export default function DataTable() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">年度</TableCell>
            <TableCell　align="right">教科</TableCell>
            <TableCell align="right">フィールド</TableCell>
            <TableCell align="right">種類</TableCell>
            <TableCell align="right">url</TableCell>
            <TableCell align="right">更新日</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.nendo}>
              <TableCell align="right">{row.nendo}</TableCell>
              <TableCell align="right">{row.subject}</TableCell>
              <TableCell align="right">{row.field}</TableCell>
              <TableCell align="right">{row.kind}</TableCell>
              <TableCell align="right">{row.url}</TableCell>
              <TableCell align="right">{row.insert_data}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}