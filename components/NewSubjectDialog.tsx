import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { subject_patch } from "../apis/subjects_post";
import RainbowTextField from "./RainbowTextField";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: "absolute",
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
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
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

export default function NewSubjectDialogs(props) {

  const [new__subject_data, setNew_subject_data] = useState<string>("");
  const queryClient = useQueryClient();

  const [open, setOpen] = React.useState(false);

  const {
    mutate: new_field_mutation,
    isLoading: mutateIsLoading,
  } = useMutation((data: any) => subject_patch(data), {
    onSuccess: () => {
      props.subjects_remove();
    },
    onError: (errorMessage: string) => {
      alert("failed");
    },
  });

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleSave = () => {
    new__subject_data !== "" && new_field_mutation(new__subject_data);
    setOpen(false);
  };
  const handlerSubject = (e) => setNew_subject_data(e.target.value);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Button variant="outlined" color="inherit" onClick={handleClickOpen}>
        科目追加
      </Button>
      <Dialog
        onClose={() => setOpen(false)}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle
          id="customized-dialog-title"
          onClose={() => setOpen(false)}
        >
          科目追加
        </DialogTitle>

        <DialogContent dividers>
          <Box mx={5} mb={5}>
            <RainbowTextField
              label="input subject"
              value={new__subject_data}
              handleFunc={handlerSubject}
            />
          </Box>
        </DialogContent>

        <DialogActions>
          <Button autoFocus onClick={handleSave} color="primary">
            保存
          </Button>
          <Button autoFocus onClick={handleClose} color="primary">
            閉じる
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
