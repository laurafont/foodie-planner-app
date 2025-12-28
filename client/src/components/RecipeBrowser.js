import React from "react";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Box from "@material-ui/core/Box";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import FavoriteIcon from "@material-ui/icons/Favorite";
import IconButton from "@material-ui/core/IconButton";
import ShareIcon from "@material-ui/icons/Share";
import Button from "@material-ui/core/Button";

class RecipeBrowser extends React.Component {
  constructor(props) {
    super(props);
    const ingredients = this.props.location?.state?.ingredientsForRecipes || [];
    this.state = {
      ingredients: ingredients,
      recipes: [],
      loading: true,
      error: ingredients.length === 0,
    };
  }

  componentDidMount() {
    if (this.state.error || this.state.ingredients.length === 0) {
      this.setState({ loading: false });
      return;
    }

    const ingredientsList = this.state.ingredients.toString();

    fetch(`/recipe/findByIngredients/${ingredientsList}`)
      .then((response) => response.json())
      .then((response) => {
        // Ensure response is an array
        const recipes = Array.isArray(response) ? response : [];
        this.setState({ recipes: recipes, loading: false });
      })
      .catch(() => {
        this.setState({ recipes: [], loading: false, error: true });
      });
  }

  render() {
    // Show error state if no ingredients provided
    if (this.state.error) {
      return (
        <Container>
          <Box p={5}>
            <Typography variant="h4">No ingredients provided</Typography>
            <Typography variant="body1">
              Please go back to the home page and add some ingredients first.
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
          <Box p={1}>
            <div>
              <br></br>
              <Typography variant="h4">Choose your recipe <span role="img" aria-label="pointing right">&#128073;</span></Typography>
            </div>
          </Box>
          <Grid
            container
            spacing={3}
            direction="row"
            justify="space-evenly"
            alignItems="center"
          >
            {Array.isArray(this.state.recipes) && this.state.recipes.map((recipe) => {
              return (
                <Grid container item xs={12} sm={6} md={3}>
                  <br></br>
                  <Card>
                    <CardHeader title={recipe.title}></CardHeader>
                    <Link
                      to={`/recipe/${recipe.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <CardMedia />{" "}
                      <img
                        src={
                          "https://spoonacular.com/recipeImages/" +
                          recipe.id +
                          "-480x360.jpg"
                        }
                        alt={recipe.title}
                      />
                    </Link>
                    <CardContent>
                      <Typography
                        variant="body2"
                        color="subtitle"
                        component="p"
                      >
                        This impressive paella is a perfect party dish and a fun
                        meal to cook together with your guests. Add 1 cup of
                        frozen peas along with the mussels, if you like.
                      </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                      <IconButton
                        aria-label="add to favorites"
                        color="secondary"
                      >
                        <FavoriteIcon />
                      </IconButton>
                      <IconButton aria-label="share">
                        <ShareIcon />
                      </IconButton>
                    </CardActions>
                  </Card>
                  <br></br>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </div>
    );
  }
}

export default RecipeBrowser;
