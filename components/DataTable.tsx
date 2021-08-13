import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import EditDialog from "../components/EditDialog";
import { Button } from "@material-ui/core";
import { useMutation } from "react-query";
import { test_fix } from "../apis/test_fix";
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  link: {
    color: "red",
    "&:hover": {
      color: "yellow",
    },
    "&:active": {
      color: "green",
    },
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
  test: any;
  fetch_test_mutation: any;
}

export const DataTable = ({ test, fetch_test_mutation }: data_table_type) => {
  const classes = useStyles();

  const {
    mutate: post_delete_test_mutation,
    isLoading: mutateIsLoading,
  } = useMutation((data: any) => test_fix(data), {
    onSuccess: () => {
      fetch_test_mutation();
    },
  });

  const handleSave = (test) => {
    let new_test = Object.assign({}, test);
    new_test.delete_flg = true;
    post_delete_test_mutation(new_test);
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">年度</TableCell>
            <TableCell align="center">更新日</TableCell>
            <TableCell align="center">リンク</TableCell>
            <TableCell align="center">編集</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {test.map((test) => {
            const timeStamp = test.insert_date.toDate();
            const formatTime = `${timeStamp.getFullYear()}/${
              timeStamp.getMonth() + 1
            }/${timeStamp.getDate()}`;
            const link = test.file_url.slice(0, 40) + "...";
            if (!test.delete_flg)
              return (
                <TableRow key={test.insert_date}>
                  <TableCell align="center">{test.nendo}</TableCell>
                  <TableCell align="center">
                    {formatTime}
                  </TableCell>
                  <TableCell align="center">
                    <Button className={classes.link}>
                      <a href={test.file_url}>{link}</a>
                    </Button>
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      onClick={() => {
                        handleSave(test);
                      }}
                    >
                      削除
                    </Button>

                    <EditDialog
                      test={test}
                      fetch_test_mutation={fetch_test_mutation}
                    />
                  </TableCell>
                </TableRow>
              );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
