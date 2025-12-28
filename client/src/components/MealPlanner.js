import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";

class mealPlanner extends React.Component {
  constructor(props) {
    super(props);
    const recipes = this.props.location?.state?.recipesPlanner?.results || [];
    this.state = {
      recipes: recipes,
      imgExt: [],
      loading: recipes.length === 0,
    };
  }

  componentDidMount() {
    if (this.state.recipes.length === 0) return;
    
    let imgExt = [];
    for (let i = 0; i < this.state.recipes.length; i++) {
      let ext = this.state.recipes[i].image?.split(".").pop() || "jpg";
      imgExt.push(ext);
    }
    this.setState({ imgExt: imgExt, loading: false });
  }

  render() {
    // Show message if no recipes data
    if (this.state.loading || this.state.recipes.length < 21) {
      return (
        <Container>
          <Box p={5}>
            <Typography variant="h4">No meal plan available</Typography>
            <Typography variant="body1">
              Please go back to the home page and submit your preferences first.
            </Typography>
            <br />
            <Link to="/" style={{ textDecoration: "none" }}>
              <Button
                variant="contained"
                style={{
                  backgroundColor: "rgb(43, 137, 139)",
                  color: "white",
                }}
              >
                Go to Home
              </Button>
            </Link>
          </Box>
        </Container>
      );
    }

    return (
      <div>
        <Container>
          <Box p={5}>
            <div>
              <br />
              <Box p={1}>
                <Typography variant="h4">Your Meal Plan</Typography>
                <hr />
              </Box>
              <br />
              <Grid
                container
                spacing={5}
                direction="row"
                justify="space-evenly"
                alignItems="center"
              >
                <Grid container item xs={12} spacing={1}>
                  {" "}
                  {/* this is a row */}
                  <React.Fragment>
                    <Grid item xs={1}>
                      <Paper></Paper>
                    </Grid>
                    <Grid item xs={1}>
                      <Paper
                        variant="contained"
                        style={{
                          backgroundColor: "rgb(248, 183, 53)",
                          color: "black",
                          textAlign: "center",
                        }}
                      >
                        MONDAY
                      </Paper>
                    </Grid>
                    <Grid item xs={1}>
                      <Paper
                        variant="contained"
                        style={{
                          backgroundColor: "rgb(248, 183, 53)",
                          color: "black",
                          textAlign: "center",
                        }}
                      >
                        TUESDAY
                      </Paper>
                    </Grid>
                    <Grid item xs={1}>
                      <Paper
                        variant="contained"
                        style={{
                          backgroundColor: "rgb(248, 183, 53)",
                          color: "black",
                          textAlign: "center",
                        }}
                      >
                        {" "}
                        WEDNESDAY
                      </Paper>
                    </Grid>
                    <Grid item xs={1}>
                      <Paper
                        variant="contained"
                        style={{
                          backgroundColor: "rgb(248, 183, 53)",
                          color: "black",
                          textAlign: "center",
                        }}
                      >
                        THURSDAY
                      </Paper>
                    </Grid>
                    <Grid item xs={1}>
                      <Paper
                        variant="contained"
                        style={{
                          backgroundColor: "rgb(248, 183, 53)",
                          color: "black",
                          textAlign: "center",
                        }}
                      >
                        FRIDAY
                      </Paper>
                    </Grid>
                    <Grid item xs={1}>
                      <Paper
                        variant="contained"
                        style={{
                          backgroundColor: "rgb(248, 183, 53)",
                          color: "black",
                          textAlign: "center",
                        }}
                      >
                        SATURDAY
                      </Paper>
                    </Grid>
                    <Grid item xs={1}>
                      <Paper
                        variant="contained"
                        style={{
                          backgroundColor: "rgb(248, 183, 53)",
                          color: "black",
                          textAlign: "center",
                        }}
                      >
                        SUNDAY
                      </Paper>
                    </Grid>
                  </React.Fragment>
                </Grid>
                <Grid container item xs={12} spacing={2}>
                  {" "}
                  {/* this is a row */}
                  <React.Fragment>
                    <Grid item xs={1}>
                      <Paper
                        variant="contained"
                        style={{
                          backgroundColor: "rgb(248, 183, 53)",
                          color: "black",
                          textAlign: "center",
                        }}
                      >
                        BREAKFAST
                      </Paper>
                    </Grid>
                    <Grid item xs={1}>
                      <Link to={`/recipe/${this.state.recipes[0].id}`}>
                        <img width={90} height={90}
                          src={
                            "https://spoonacular.com/recipeImages/" +
                            this.state.recipes[0].id +
                            "-90x90." +
                            this.state.imgExt[0]
                          }
                          alt="Recipe"
                        />
                      </Link>
                    </Grid>
                    <Grid item xs={1}>
                      <Link to={`/recipe/${this.state.recipes[1].id}`}>
                        <img width={90} height={90}
                          src={
                            "https://spoonacular.com/recipeImages/" +
                            this.state.recipes[1].id +
                            "-90x90." +
                            this.state.imgExt[1]
                          }
                          alt="Recipe"
                        />
                      </Link>
                    </Grid>
                    <Grid item xs={1}>
                      <Link to={`/recipe/${this.state.recipes[2].id}`}>
                        <img width={90} height={90}
                          src={
                            "https://spoonacular.com/recipeImages/" +
                            this.state.recipes[2].id +
                            "-90x90." +
                            this.state.imgExt[2]
                          }
                          alt="Recipe"
                        />
                      </Link>
                    </Grid>
                    <Grid item xs={1}>
                      <Link to={`/recipe/${this.state.recipes[3].id}`}>
                        <img width={90} height={90}
                          src={
                            "https://spoonacular.com/recipeImages/" +
                            this.state.recipes[3].id +
                            "-90x90." +
                            this.state.imgExt[3]
                          }
                          alt="Recipe"
                        />
                      </Link>
                    </Grid>
                    <Grid item xs={1}>
                      <Link to={`/recipe/${this.state.recipes[4].id}`}>
                        <img width={90} height={90}
                          src={
                            "https://spoonacular.com/recipeImages/" +
                            this.state.recipes[4].id +
                            "-90x90." +
                            this.state.imgExt[4]
                          }
                          alt="Recipe"
                        />
                      </Link>
                    </Grid>
                    <Grid item xs={1}>
                      <Link to={`/recipe/${this.state.recipes[5].id}`}>
                        <img width={90} height={90}
                          src={
                            "https://spoonacular.com/recipeImages/" +
                            this.state.recipes[5].id +
                            "-90x90." +
                            this.state.imgExt[5]
                          }
                          alt="Recipe"
                        />
                      </Link>
                    </Grid>
                    <Grid item xs={1}>
                      <Link to={`/recipe/${this.state.recipes[6].id}`}>
                        <img width={90} height={90}
                          src={
                            "https://spoonacular.com/recipeImages/" +
                            this.state.recipes[6].id +
                            "-90x90." +
                            this.state.imgExt[6]
                          }
                          alt="Recipe"
                        />
                      </Link>
                    </Grid>
                  </React.Fragment>
                </Grid>
              </Grid>
              <Grid
                container
                spacing={3}
                direction="row"
                justify="space-evenly"
                alignItems="center"
              >
                <Grid container item xs={12} spacing={2}>
                  {" "}
                  {/* this is a row */}
                  <React.Fragment>
                    <Grid item xs={1}>
                      <Paper
                        variant="contained"
                        style={{
                          backgroundColor: "rgb(248, 183, 53)",
                          color: "black",
                          textAlign: "center",
                        }}
                      >
                        LUNCH
                      </Paper>
                    </Grid>
                    <Grid item xs={1}>
                      <Link to={`/recipe/${this.state.recipes[7].id}`}>
                        <img width={90} height={90}
                          src={
                            "https://spoonacular.com/recipeImages/" +
                            this.state.recipes[7].id +
                            "-90x90." +
                            this.state.imgExt[7]
                          }
                          alt="Recipe"
                        />
                      </Link>
                    </Grid>
                    <Grid item xs={1}>
                      <Link to={`/recipe/${this.state.recipes[8].id}`}>
                        <img width={90} height={90}
                          src={
                            "https://spoonacular.com/recipeImages/" +
                            this.state.recipes[8].id +
                            "-90x90." +
                            this.state.imgExt[8]
                          }
                          alt="Recipe"
                        />
                      </Link>
                    </Grid>
                    <Grid item xs={1}>
                      <Link to={`/recipe/${this.state.recipes[9].id}`}>
                        <img width={90} height={90}
                          src={
                            "https://spoonacular.com/recipeImages/" +
                            this.state.recipes[9].id +
                            "-90x90." +
                            this.state.imgExt[9]
                          }
                          alt="Recipe"
                        />
                      </Link>
                    </Grid>
                    <Grid item xs={1}>
                      <Link to={`/recipe/${this.state.recipes[10].id}`}>
                        <img width={90} height={90}
                          src={
                            "https://spoonacular.com/recipeImages/" +
                            this.state.recipes[10].id +
                            "-90x90." +
                            this.state.imgExt[10]
                          }
                          alt="Recipe"
                        />
                      </Link>
                    </Grid>
                    <Grid item xs={1}>
                      <Link to={`/recipe/${this.state.recipes[11].id}`}>
                        <img width={90} height={90}
                          src={
                            "https://spoonacular.com/recipeImages/" +
                            this.state.recipes[11].id +
                            "-90x90." +
                            this.state.imgExt[11]
                          }
                          alt="Recipe"
                        />
                      </Link>
                    </Grid>
                    <Grid item xs={1}>
                      <Link to={`/recipe/${this.state.recipes[12].id}`}>
                        <img width={90} height={90}
                          src={
                            "https://spoonacular.com/recipeImages/" +
                            this.state.recipes[12].id +
                            "-90x90." +
                            this.state.imgExt[12]
                          }
                          alt="Recipe"
                        />
                      </Link>
                    </Grid>
                    <Grid item xs={1}>
                      <Link to={`/recipe/${this.state.recipes[13].id}`}>
                        <img width={90} height={90}
                          src={
                            "https://spoonacular.com/recipeImages/" +
                            this.state.recipes[13].id +
                            "-90x90." +
                            this.state.imgExt[13]
                          }
                          alt="Recipe"
                        />
                      </Link>
                    </Grid>
                  </React.Fragment>
                </Grid>
              </Grid>
              <Grid
                container
                spacing={3}
                direction="row"
                justify="space-evenly"
                alignItems="center"
              >
                <Grid container item xs={12} spacing={2}>
                  {" "}
                  {/* this is a row */}
                  <React.Fragment>
                    <Grid item xs={1}>
                      <Paper
                        variant="contained"
                        style={{
                          backgroundColor: "rgb(248, 183, 53)",
                          color: "black",
                          textAlign: "center",
                        }}
                      >
                        DINNER
                      </Paper>
                    </Grid>
                    <Grid item xs={1}>
                      <Link to={`/recipe/${this.state.recipes[14].id}`}>
                        <img width={90} height={90}
                          src={
                            "https://spoonacular.com/recipeImages/" +
                            this.state.recipes[14].id +
                            "-90x90." +
                            this.state.imgExt[14]
                          }
                          alt="Recipe"
                        />
                      </Link>
                    </Grid>
                    <Grid item xs={1}>
                      <Link to={`/recipe/${this.state.recipes[15].id}`}>
                        <img width={90} height={90}
                          src={
                            "https://spoonacular.com/recipeImages/" +
                            this.state.recipes[15].id +
                            "-90x90." +
                            this.state.imgExt[15]
                          }
                          alt="Recipe"
                        />
                      </Link>
                    </Grid>
                    <Grid item xs={1}>
                      <Link to={`/recipe/${this.state.recipes[16].id}`}>
                        <img width={90} height={90}
                          src={
                            "https://spoonacular.com/recipeImages/" +
                            this.state.recipes[16].id +
                            "-90x90." +
                            this.state.imgExt[16]
                          }
                          alt="Recipe"
                        />
                      </Link>
                    </Grid>
                    <Grid item xs={1}>
                      <Link to={`/recipe/${this.state.recipes[17].id}`}>
                        <img width={90} height={90}
                          src={
                            "https://spoonacular.com/recipeImages/" +
                            this.state.recipes[17].id +
                            "-90x90." +
                            this.state.imgExt[17]
                          }
                          alt="Recipe"
                        />
                      </Link>
                    </Grid>
                    <Grid item xs={1}>
                      <Link to={`/recipe/${this.state.recipes[18].id}`}>
                        <img width={90} height={90}
                          src={
                            "https://spoonacular.com/recipeImages/" +
                            this.state.recipes[18].id +
                            "-90x90." +
                            this.state.imgExt[18]
                          }
                          alt="Recipe"
                        />
                      </Link>
                    </Grid>
                    <Grid item xs={1}>
                      <Link to={`/recipe/${this.state.recipes[19].id}`}>
                        <img width={90} height={90}
                          src={
                            "https://spoonacular.com/recipeImages/" +
                            this.state.recipes[19].id +
                            "-90x90." +
                            this.state.imgExt[19]
                          }
                          alt="Recipe"
                        />
                      </Link>
                    </Grid>
                    <Grid item xs={1}>
                      <Link to={`/recipe/${this.state.recipes[20].id}`}>
                        <img width={90} height={90}
                          src={
                            "https://spoonacular.com/recipeImages/" +
                            this.state.recipes[20].id +
                            "-90x90." +
                            this.state.imgExt[20]
                          }
                          alt="Recipe"
                        />
                      </Link>
                    </Grid>
                  </React.Fragment>
                </Grid>
              </Grid>
            </div>
            <br />
            <br />
            <div>
              <Link
                to={{
                  pathname: "/shopping-list",
                  state: {
                    recipesPlanner: this.state.recipes,
                  },
                }}
                style={{ textDecoration: "none" }}
              >
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: "rgb(43, 137, 139)",
                    color: "white",
                  }}
                >
                  Get Shopping List
                </Button>
              </Link>
            </div>
            <br />
          </Box>
        </Container>
      </div>
    );
  }
}

export default mealPlanner;
