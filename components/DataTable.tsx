import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { test_object } from '../interfaces/test_get_type'
import EditDialog from '../components/EditDialog'
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

// function createData(nendo: number, subject: string, field: string, kind: string, url: string, insert_data: string) {
//   return { nendo, subject, field, kind, url, insert_data };
// }

// const rows = [
//   createData(2010, 'math', 'CN', '期末', 'https://drive.google.com/drive/folders/1iihGfgsklS-N5X3lBS4SLiwiGAWzjX6r', '2021/8/8'),
//   createData(2010, 'math', 'CN', '期末', 'https://drive.google.com/drive/folders/1iihGfgsklS-N5X3lBS4SLiwiGAWzjX6r', '2021/8/8'),
//   createData(2010, 'math', 'CN', '期末', 'https://drive.google.com/drive/folders/1iihGfgsklS-N5X3lBS4SLiwiGAWzjX6r', '2021/8/8'),
//   createData(2010, 'math', 'CN', '期末', 'https://drive.google.com/drive/folders/1iihGfgsklS-N5X3lBS4SLiwiGAWzjX6r', '2021/8/8'),
//   createData(2010, 'math', 'CN', '期末', 'https://drive.google.com/drive/folders/1iihGfgsklS-N5X3lBS4SLiwiGAWzjX6r', '2021/8/8'),
//   createData(2010, 'math', 'CN', '期末', 'https://drive.google.com/drive/folders/1iihGfgsklS-N5X3lBS4SLiwiGAWzjX6r', '2021/8/8'),
// ];

export interface data_table_type {
  test: any,
  fetch_test_mutation: any
}

export const DataTable = ({ test, fetch_test_mutation }: data_table_type) => {


  const classes = useStyles();
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">年度</TableCell>
            <TableCell align="right">更新日</TableCell>
            <TableCell align="right">リンク</TableCell>


          </TableRow>
        </TableHead>
        <TableBody>
          {test.map((test) => (
            <TableRow key={test.insert_date}>
              <TableCell align="right">{test.nendo}</TableCell>
              <TableCell align="right">{test.insert_date.toString()}</TableCell>
              <TableCell align="right">
                <a href={test.file_url}>{test.file_url}</a>
              </TableCell>
              <TableCell align="right">
                <EditDialog test={test} fetch_test_mutation={fetch_test_mutation} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}


export default DataTable