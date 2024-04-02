import React, { useState } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CreateSubEntries from "../entries/CreateSubEntries";
import LinearProgress from "@material-ui/core/LinearProgress";

const ColorLinearProgress = withStyles({
  colorPrimary: {
    backgroundColor: "#b2dfdb",
  },
  barColorPrimary: {
    backgroundColor: "#00695c",
  },
})(LinearProgress);

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 20,
  },
  pos: {
    marginBottom: 12,
  },
});

const Entries = (props) => {
  const classes = useStyles();
  //const classesGrid = useStylesGrid();
  const [entriId, setentriId] = useState(props);
  const [currentPage, setcurrentPage] = useState(1);
  const [entriesPerPage, setentriesPerPage] = useState(5);

  const handleClick = (event) => {
    setcurrentPage({
      currentPage: Number(event.target.id),
    });
  };

  //console.log(props.topicId)

  const { entries } = props;
  const { myMessages } = props;
  //console.log(myMessages)

  if (entries && myMessages) {
    var currentEntries = [];

    var isNanPreventerCurrentPage;
    if (isNaN(currentPage.currentPage)) isNanPreventerCurrentPage = 1;
    else isNanPreventerCurrentPage = currentPage.currentPage;

    //console.log("temp:" + isNanPreventerCurrentPage);

    var indexOfLastEntries = isNanPreventerCurrentPage * entriesPerPage;
    const indexOfFirstEntries = indexOfLastEntries - entriesPerPage;
    if (indexOfLastEntries > myMessages.length) {
      indexOfLastEntries = myMessages.length;
    }
    //console.log(myMessages.length);
    //console.log(indexOfLastEntries);
    for (let i = indexOfFirstEntries; i < indexOfLastEntries; i++) {
      currentEntries.push(myMessages[i]);
    }

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(entries.length / entriesPerPage); i++) {
      pageNumbers.push(i);
    }
    //console.log(indexOfFirstEntries)
    //console.log(currentEntries);

    return (
      <div className="useStylesGrid">
        <div style={{marginBottom:18}}>
            <span style={{fontSize:24,marginTop:10}} class="badge badge-pill badge-light">Entries</span>

           <div style={{float:"right"}}>
          <nav aria-label="Page navigation example">
          <ul className="pagination">
            <h6 style={{ marginTop: 5 }}>Pages</h6>

            {pageNumbers.map((number) => (
              <li
                className="page-item"
                key={number}
                id={number}
                onClick={handleClick}
              >
                {number}
              </li>
            ))}
          </ul>
        </nav>
          </div>
        </div>

        {currentEntries
          .filter((item) => item.id === props.topicId)
          .map((item) => (
            <div className="cart-items" > 
              <Card
              className="cart-items"
                variant="outlined"
                style={{
                  backgroundImage:
                    " radial-gradient( circle 827px at 47.3% 48%,  rgba(255,255,255,1) 0%, rgba(138,192,216,1) 90% )",
                }}
              >
                <CardContent>
                  <Typography
                    variant="h5"
                    component="h2"
                    onClick={() => setentriId(item.id)}
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    variant="h4"
                    component="h2"
                    onClick={() => setentriId(item.id)}
                  >
                    {item.detail}
                  </Typography>
                  <Typography
                    className={classes.title}
                    color="textSecondary"
                    gutterBottom
                  >
                    <div class="row">
                      {item.author}
                      {item.date}
                    </div>
                  </Typography>
                </CardContent>
              </Card>
              <hr></hr>
            </div>
          ))}
        {currentEntries.map((item) => (
          <div > 
            <Card
              className="entries-cart"
              variant="outlined"
             
            >
              <CardContent>
                <Typography
                  variant="h3"
                  component="h2"
                  onClick={() => setentriId(item.id)}
                >
                  {item.title}
                </Typography>
                <Typography
                  variant="h4"
                  component="h2"
                  onClick={() => setentriId(item.id)}
                >
                  {item.detail}
                </Typography>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  <div class="row">
                    <div class="col-sm">{item.author}</div>
                    <div class="col-sm"></div>
                    <div class="col-sm">{item.date}</div>
                  </div>
                </Typography>
              </CardContent>
            </Card>
            <hr></hr>
          </div>
        ))}

        <CreateSubEntries topicId={props.topicId} />
      </div>
    );
  } else {
    return (
      <div className="container center">
        <div className="container center">
          <br></br>
          <ColorLinearProgress className={classes.margin} />
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state, ownProps) => {
  //console.log(state)
  const projects = state.firestore.ordered.entries;
  const mymessages = state.firestore.ordered.myMessages;

  return {
    entries: projects,
    myMessages: mymessages,
  };
};
export default compose(
  connect(mapStateToProps),

  firestoreConnect((props) => {
    //console.log(props.topicId)

    return [
      {
        collection: "entries",
        doc: props.topicId,
        subcollections: [{ collection: "subentries" }],
        storeAs: "myMessages",
      },
    ];
  }),
  firestoreConnect([{ collection: "entries" }])
)(Entries);
