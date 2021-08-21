import { Theme } from "@material-ui/core/styles";
import { createStyles, makeStyles } from "@material-ui/core/styles";

export const buttonStyles = makeStyles((theme: Theme) =>
  createStyles({
    textForm: {
      "& label.Mui-focused": {
        color: "green",
      },
      "& .MuiInput-underline:after": {
        borderBottomColor: "#4050B5",
      },
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor: "#4050B5",
        },
        "&:hover fieldset": {
          borderColor: "yellow",
        },
        "&.Mui-focused fieldset": {
          borderColor: "green",
        },
      },
    },
    color: {
      color: theme.palette.grey[800],
    },
  })
);
