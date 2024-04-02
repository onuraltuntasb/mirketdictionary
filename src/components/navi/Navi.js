import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import logo from "../assets/mirket-icon-fixed.png";
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";
import { blue } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow:1,
    marginLeft: 20,
  },

  list: {
    width: 250,
    backgroundColor: "red",
  },
  fullList: {
    width: "auto",
    backgroundColor: "red",
  },
}));

function Navi({ auth, profile }) {
  const classes = useStyles();
  //console.log(auth.email)

  const links = auth.uid ? (
    <SignedInLinks profile={profile} />
  ) : (
    <SignedOutLinks />
  );
  return (
    <div>
      <AppBar
        style={{ background: "#F20746", height: "75px" }}
        position="static"
      >
        <Toolbar>
          <Link style={{ textDecoration: "none", color: "#fff" }} to="/">
            <img
              style={{ marginTop: 10, marginLeft: 50 }}
              src={logo}
              alt="logo"
              height="100"
              width="200"
            ></img>
          </Link>

          <div style={{maxWidth:300,minWidth:100,marginLeft:300}} class="input-group mb-3">
            <input
              type="text"
              class="form-control"
              placeholder="Title,author"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
            />
            <div class="input-group-append">
              <button style={{backgroundColor:"#F2F2F2"}} class="btn btn-outline-secondary" type="button">
              🔍
              </button>
            </div>
          </div>

          <Typography variant="h4" className={classes.title}>
            <Link
              style={{ textDecoration: "none", color: "#fff" }}
              to="/"
            ></Link>
          </Typography>
          <h1> {links} </h1>
        </Toolbar>
      </AppBar>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};

export default connect(mapStateToProps)(Navi);
