import React, { useState } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Entries from "../entries/Entries";
import LinearProgress from "@material-ui/core/LinearProgress";
import "../../index.css";

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
    minWidth: 500,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const useStyles_ = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const Topics = (props) => {
  const { topics } = props;
  const classes = useStyles();
  const clasess_ = useStyles_();
  const initialState = "cYc955rUg1lYXmlEpU7F";
  const [entriId, setentriId] = useState(initialState);
  const [currentPage, setcurrentPage] = useState(1);
  const [topicsPerPage, settopicsPerPage] = useState(5);

  const handleClick = (event) => {
    setcurrentPage({
      currentPage: Number(event.target.id),
    });
  };

  function PaginationComponent(props) {
    return (
      <div style={{ float: "right" }}>
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <h6 style={{ marginTop: 5 }}>Pages</h6>

            {props.value.map((number) => (
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
    );
  }

  function TopicsComponent(props) {
    return (
      <div style={{ marginTop: 60,overflow:"auto",maxHeight:500}}>
        {props.value.map((item) => (
          <div>
            <Card className="cart-items" onClick={() => setentriId(item.id)}>
              <CardContent>
                <Typography variant="h5" component="h2">
                  {item.title}
                </Typography>
              </CardContent>
            </Card>
            <hr></hr>
          </div>
        ))}
      </div>
    );
  }

  //console.log(currentPage)

  if (topics) {
    var currentTopics = [];
    //console.log("currentPage:" + currentPage.currentPage)

    var isNanPreventerCurrentPage;
    if (isNaN(currentPage.currentPage)) isNanPreventerCurrentPage = 1;
    else isNanPreventerCurrentPage = currentPage.currentPage;

    //console.log("temp:" + isNanPreventerCurrentPage)

    var indexOfLastTopic = isNanPreventerCurrentPage * topicsPerPage;
    const indexOfFirstTopic = indexOfLastTopic - topicsPerPage;
    if (indexOfLastTopic > topics.length) {
      indexOfLastTopic = topics.length;
    }
    //console.log(topics.length)
    //console.log(currentPage.currentPage * topicsPerPage)
    for (let i = indexOfFirstTopic; i < indexOfLastTopic; i++) {
      currentTopics.push(topics[i]);
    }

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(topics.length / topicsPerPage); i++) {
      pageNumbers.push(i);
    }

    //console.log(currentTopics);

    return (
      <div class="row">
        <div class="col-sm-3">
          <div>
            <h2 style={{ float: "left" }}>
              <span class="badge badge-pill badge-light">Topics</span>
            </h2>
            <PaginationComponent value={pageNumbers} />
          </div>

          <TopicsComponent value={currentTopics} />
        </div>
        <div class="col-sm-5">
          <Entries style={{ float: "left" }} topicId={entriId} />
        </div>
        <div class="col-sm-3">
          <div>
            <h2>
              <span class="badge badge-pill badge-light">Chat</span>
            </h2>

            <div style={{marginTop:18}}>
          it gonna be chat layout or something like that 
            <div class="container"></div>
          </div>
            <hr></hr>
          </div>
           
          </div>

          

      </div>
    );
  } else {
    return (
      <div className="container center">
        <br></br>
        <ColorLinearProgress className={classes.margin} />
      </div>
    );
  }
};

const mapStateToProps = (state, ownProps) => {
  const topic = state.firestore.ordered.entries;
  //console.log(topic)
  return {
    topics: topic,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "entries" }])
)(Topics);
