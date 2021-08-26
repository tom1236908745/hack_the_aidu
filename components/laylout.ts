import { Theme } from "@material-ui/core/styles";
import { createStyles, makeStyles } from "@material-ui/core/styles";

export const buttonStyles = makeStyles((theme: Theme) =>
  createStyles({
    
    color: {
      color: theme.palette.grey[800],
    },
  })
);
