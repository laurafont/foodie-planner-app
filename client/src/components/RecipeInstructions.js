import React from "react";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";

class RecipeInstructions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: null,
      analyzedInstructions: [],
      ingredients: [],
      summary: "",
      loading: true,
      error: false,
    };
  }

  componentDidMount() {
    this.fetchRecipes();
    this.fetchIngredients();
  }

  fetchIngredients() {
    fetch(`/recipe/${this.props.match.params.id}/ingredientWidget`)
      .then((response) => response.json())
      .then((response) => {
        if (response && response.ingredients) {
          this.setState({ ingredients: response.ingredients });
        }
      })
      .catch(() => {
        // Silently handle ingredient fetch errors
      });
  }

  fetchRecipes() {
    fetch(`/recipe/${this.props.match.params.id}`)
      .then((response) => response.json())
      .then((response) => {
        if (!response || response.status === "failure") {
          this.setState({ loading: false, error: true });
          return;
        }

        let steps = [];
        const instructions = response.analyzedInstructions;
        
        if (instructions && instructions.length > 0 && instructions[0].steps) {
          let arrayOfSteps = instructions[0].steps;
          for (let i = 0; i < arrayOfSteps.length; i++) {
            steps.push(arrayOfSteps[i].step);
          }
        }

        this.setState({
          recipe: response,
          analyzedInstructions: steps,
          summary: response.summary || "",
          loading: false,
        });
      })
      .catch(() => {
        this.setState({ loading: false, error: true });
      });
  }

  render() {
    // Loading state
    if (this.state.loading) {
      return (
        <Container>
          <Box p={5} style={{ textAlign: "center" }}>
            <CircularProgress style={{ color: "rgb(248, 183, 53)" }} />
            <Typography variant="h6">Loading recipe...</Typography>
          </Box>
        </Container>
      );
    }

    // Error state
    if (this.state.error || !this.state.recipe) {
      return (
        <Container>
          <Box p={5}>
            <Typography variant="h4">Recipe not found</Typography>
            <Typography variant="body1">
              Unable to load recipe details. Please make sure you have a valid API key configured.
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

    const { recipe, analyzedInstructions, ingredients, summary } = this.state;

    return (
      <div>
        <Container>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <br />
              <Paper>
                <Box p={3}>
                  <Typography variant="h4">
                    {recipe.title}
                  </Typography>
                  <hr />
                  <div>
                    <Box p={2}>
                      <Card>
                        <CardContent>
                          <Typography variant="h6">
                            Ready in minutes:{" "}
                            <b>{recipe.readyInMinutes}</b>
                          </Typography>
                          <Typography variant="h6">
                            Serves: {recipe.servings}
                          </Typography>
                          <br />
                          <CardMedia />
                          {recipe.id && (
                            <img
                              src={
                                "https://spoonacular.com/recipeImages/" +
                                recipe.id +
                                "-480x360.jpg"
                              }
                              alt={recipe.title}
                            />
                          )}
                          <div>
                            <br />
                            <Typography component="div">
                              {analyzedInstructions.length > 0
                                ? analyzedInstructions.map((step, index) => (
                                    <div key={index}>
                                      <p>{index + 1}. {step}</p>
                                    </div>
                                  ))
                                : summary && (
                                    <div dangerouslySetInnerHTML={{ __html: summary }} />
                                  )}
                            </Typography>
                          </div>
                        </CardContent>
                      </Card>
                    </Box>
                  </div>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <br />
              <Paper>
                <Box p={3}>
                  <Typography variant="h4">
                    Ingredients <span role="img" aria-label="pointing down">&#128071;</span>
                  </Typography>
                  <hr />
                  <div>
                    <div>
                      <Box p={2}>
                        <div>
                          <Typography variant="subtitle1" component="div">
                            {Array.isArray(ingredients) && ingredients.length > 0 ? (
                              ingredients.map((ingredient, index) => (
                                <div key={index}>
                                  <ul>
                                    &#10004;&nbsp;&nbsp;
                                    {ingredient.amount?.metric?.value || ""}{" "}
                                    {ingredient.amount?.metric?.unit || ""}{" "}
                                    <b>{ingredient.name}</b>
                                  </ul>
                                </div>
                              ))
                            ) : (
                              <p>Loading ingredients...</p>
                            )}
                          </Typography>
                        </div>
                      </Box>
                    </div>
                  </div>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default RecipeInstructions;
