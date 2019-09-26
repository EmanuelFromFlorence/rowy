import React, { useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Popper from "@material-ui/core/Popper";
import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import { onSubmit } from "components/Table/grid-fns";
import { TextField } from "@material-ui/core";
import algoliasearch from "algoliasearch/lite";

import {
  InstantSearch,
  Hits,
  SearchBox,
  Pagination,
  Highlight,
  ClearRefinements,
  RefinementList,
  Configure,
} from "react-instantsearch-dom";
const searchClient = algoliasearch(
  process.env.REACT_APP_ALGOLIA_APP_ID
    ? process.env.REACT_APP_ALGOLIA_APP_ID
    : "",
  process.env.REACT_APP_ALGOLIA_SEARCH_KEY
    ? process.env.REACT_APP_ALGOLIA_SEARCH_KEY
    : ""
);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: "relative",

      display: "flex",
      flexWrap: "wrap",
    },
    typography: {
      padding: theme.spacing(2),
    },
    textArea: {
      fontSize: 14,
      minWidth: 230,
    },
    paper: { minWidth: 200 },
  })
);
interface Props {
  value: any;
  row: { ref: firebase.firestore.DocumentReference; id: string };
  onSubmit: Function;
  collectionPath: string;
}

const DocSelect = (props: Props) => {
  const { value, row, onSubmit, collectionPath } = props;
  const [query, setQuery] = useState(value ? value : "");

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const classes = useStyles();

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setAnchorEl(event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "no-transition-popper" : undefined;
  const onClickAway = (event: any) => {
    if (event.target.id !== id) {
      //  onSubmit();
      // setAnchorEl(null);
    }
  };
  return (
    <div className={classes.root}>
      <ClickAwayListener onClickAway={onClickAway}>
        <div>
          <IconButton onClick={handleClick}>
            <SearchIcon />
          </IconButton>
          {value}
          <Popper id={id} open={open} anchorEl={anchorEl}>
            <Paper>
              {/* <TextField id={id} placeholder={`searching ${collectionPath}`} /> */}

              <div className="ais-InstantSearch">
                <InstantSearch
                  indexName={collectionPath}
                  searchClient={searchClient}
                >
                  <SearchBox />
                  <Hits hitComponent={Hit} />
                </InstantSearch>
              </div>
            </Paper>
          </Popper>
        </div>
      </ClickAwayListener>
    </div>
  );
};

const Hit = (props: any) => {
  return (
    <div>
      <Highlight attribute="firstName" hit={props.hit} />

      <p>{props.hit.email}</p>
    </div>
  );
};

export default DocSelect;