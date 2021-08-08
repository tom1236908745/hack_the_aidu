import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from 'react-query';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import { field_get } from '../apis/field_get'
import { subjects_get } from '../apis/subjects_get'
import SelectLabels from '../components/SelectLabels'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { test_object } from '../interfaces/test_get_type'
import { test_post } from '../apis/test_post';


const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });

export interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}


const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme: Theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function NewSubjectDialogs() {

  var test: test_object = {
    file_url: "",
    insert_date: null,
    nendo: 0,
    kind: null,
    field: "",
    subject: ""
  }


  const [field, setField] = useState<string>(null)
  const [subject, setSubject] = useState<string>(null)

  const [select__fileUrl, setSelect_fileUrl] = useState<string>(null)
  const [select__nendo, setSelects_nendo] = useState<number>(2021)
  const types = ["期末", "中間", "対策", "レポート"]
  const [select__type_data, setSelect_type_data] = useState<number>(0)
  const [select__field_data, setSelect_field_data] = useState<string>("c1-c2")
  const [select__subject_data, setSelect_subject_data] = useState<string>("fu09")



  const { data: subjects_data, isLoading: subjects_isLoading } = useQuery('subjects_get', () =>
    subjects_get())

  const { data: field_data, isLoading: field_isLoading } = useQuery('field_get', () =>
    field_get())

  useEffect(() => {
    if (subjects_isLoading) {
      return
    } else {
      if (subjects_data) {
        setSubject(subjects_data)
      }
    }
  }, [subjects_isLoading])

  useEffect(() => {
    if (field_isLoading) {
      return
    } else {
      if (field_data) {
        setField(field_data)
      }
    }
  }, [field_isLoading])
  const [open, setOpen] = React.useState(false);

  const {
    mutate: new_test_mutation,
  } = useMutation((data: any) => test_post(data), {
    onSuccess: () => {
      //OK
    },
    onError: (errorMessage: string) => {
      alert("failed")
    }
  })

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleSave = () => {
    test.file_url = select__fileUrl,
      test.insert_date = new Date(),
      test.nendo = select__nendo,
      test.kind = select__type_data,
      test.field = select__field_data,
      test.subject = select__subject_data
    new_test_mutation(test)
    console.log(test);

    setOpen(false);
  }
  return (
    <div>
      <Button variant="outlined" color="inherit" onClick={handleClickOpen}>
        テスト追加
      </Button>
      <Dialog onClose={() => setOpen(false)} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={() => setOpen(false)}>
          テスト追加
        </DialogTitle>
        <DialogContent dividers>
          <h3> URL</h3>
          <input value={select__fileUrl} name="url" onChange={(e) => setSelect_fileUrl(e.target.value)} />
          <h3> 年度</h3>
          <input value={select__nendo} name="年度" onChange={(e) => setSelects_nendo(parseInt(e.target.value !== "" ? e.target.value : "0"))} />
          <h3> データの種類</h3>
          <SelectLabels value={types[select__type_data]} items={types} name="種類" onChange={(e) => setSelect_type_data(types.indexOf(e.target.value))} />
          <h3> フィールド</h3>
          <SelectLabels value={select__field_data} items={field} name="フィールド" onChange={(e) => setSelect_field_data(e.target.value)} />
          <h3> 教科</h3>
          <SelectLabels value={select__subject_data} items={subject} name="教科" onChange={(e) => setSelect_subject_data(e.target.value)} />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleSave} color="primary">
            保存
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
