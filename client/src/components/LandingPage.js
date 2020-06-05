import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormLabel from "@material-ui/core/FormLabel";
import { Typography } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import AddCircleIcon from "@material-ui/icons/AddCircle";

import { Link } from "react-router-dom";

export default class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dietValue: 0,
      eggValue: false,
      dairyValue: false,
      glutenValue: false,
      excludeIngredientValue: 0,
      cuisineValue: 0,
      diet: "",
      excludeIngredients: "",
      intolerances: "",
      cuisine: "",
      recipes: [],
      setOpen: false,
      ingredient: "",
      ingredients: [],
    };
  }

  handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    this.setState({
      [name]: value,
    });
  };

  handleCheckChange = (e) => {
    const name = e.target.name;
    this.setState({
      [name]: e.target.checked,
    });
  };

  handleClose = () => {
    this.setState({
      setOpen: false,
    });
  };

  checkIntolerances() {
    if (
      this.state.eggValue === false &&
      this.state.dairyValue === false &&
      this.state.glutenValue === false
    ) {
      this.setState({
        intolerances: 0,
      });
    }
    if (this.state.eggValue === true) {
      this.setState({
        intolerances: "egg",
      });
    }
    if (this.state.dairyValue === true) {
      this.setState({
        intolerances: "dairy",
      });
    }
    if (this.state.glutenValue === true) {
      this.setState({
        intolerances: "gluten",
      });
    }
    if (this.state.eggValue === true && this.state.dairyValue === true) {
      this.setState({
        intolerances: "egg,dairy",
      });
    }
    if (
      this.state.eggValue === true &&
      this.state.dairyValue === true &&
      this.state.glutenValue === true
    ) {
      this.setState({
        intolerances: "egg,dairy,gluten",
      });
    }
    if (this.state.eggValue === true && this.state.glutenValue === true) {
      this.setState({
        intolerances: "egg,gluten",
      });
    }
    if (this.state.dairyValue === true && this.state.glutenValue === true) {
      this.setState({
        intolerances: "dairy,gluten",
      });
    }
  }

  checkIngredients() {
    if (this.state.excludeIngredientsValue === 0) {
      this.setState({
        excludeIngredients: 0,
      });
    } else {
      this.setState({
        excludeIngredients: this.state.excludeIngredientValue,
      });
    }
  }

  checkCuisine() {
    if (this.state.excludeCuisineValue === 0) {
      this.setState({
        cuisine: 0,
      });
    } else {
      this.setState({
        cuisine: this.state.cuisineValue,
      });
    }
  }

  async submit() {
    
  //  await this.checkIngredients();
  //  await this.checkCuisine();
    this.setState({
      diet: this.state.dietValue,
      cuisine: this.state.cuisineValue,
      excludeIngredients: this.state.excludeIngredientValue,
      setOpen: true,
    });
    await this.checkIntolerances();
    await fetch(
      `/recipe/search/${this.state.diet}/${this.state.excludeIngredients}/${this.state.intolerances}/${this.state.cuisine}`
    )
      .then((response) => response.json())
      .then((response) => {
        this.setState({ recipes: response });
      });
    await this.extraFetch();
  }

  extraFetch() {
    const array = this.state.recipes.results;
    if (array.length !== 21) {
      fetch(
        `/recipe/search/0/0/0/0`
      )
        .then((response) => response.json())
        .then((response) => {
          this.setState({ recipes: response });
        });
    }
  }
  addIngredient = () => {
    this.setState({
      ingredients: [...this.state.ingredients, this.state.ingredient],
    });
  };

  render() {
    return (
      <div>
        <img width="100%" src="/dishes.jpg" alt="" />
        <br />
        <Container>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <br />
              <Paper>
                <Box p={3}>
                  <Typography variant="h4">
                    Create your weekly meal planner
                  </Typography>
                  <hr />
                  <div>
                    <FormControl component="fieldset">
                      <Box p={2}>
                        <FormLabel component="legend">
                          <Typography
                            style={{ color: "rgb(33, 48, 55)" }}
                            variant="h6"
                          >
                            Choose your diet:
                          </Typography>
                        </FormLabel>

                        <RadioGroup
                          aria-label="diet"
                          name="dietValue"
                          value={this.state.dietValue}
                          onChange={this.handleChange}
                        >
                          <FormControlLabel
                            value="0"
                            control={
                              <Radio style={{ color: "rgb(248, 183, 53)" }} />
                            }
                            label="Any"
                          />
                          <FormControlLabel
                            value="vegan"
                            control={
                              <Radio style={{ color: "rgb(248, 183, 53)" }} />
                            }
                            label="Vegan"
                          />
                          <FormControlLabel
                            value="lacto-vegetarian"
                            control={
                              <Radio style={{ color: "rgb(248, 183, 53)" }} />
                            }
                            label="Lacto Vegetarian"
                          />
                          <FormControlLabel
                            value="ovo-vegetarian"
                            control={
                              <Radio style={{ color: "rgb(248, 183, 53)" }} />
                            }
                            label="Ovo Vegetarian"
                          />
                          <FormControlLabel
                            value="paleo"
                            control={
                              <Radio style={{ color: "rgb(248, 183, 53)" }} />
                            }
                            label="Paleo"
                          />
                        </RadioGroup>
                      </Box>
                    </FormControl>
                  </div>
                  <div>
                    <FormControl component="fieldset">
                      <Box p={2}>
                        <FormLabel component="legend">
                          <Typography
                            style={{ color: "rgb(33, 48, 55)" }}
                            variant="h6"
                          >
                            Any intolerances?
                          </Typography>
                        </FormLabel>
                        <FormGroup>
                          <FormControlLabel
                            control={
                              <Checkbox
                                style={{ color: "rgb(248, 183, 53)" }}
                                checked={this.state.eggValue}
                                onChange={this.handleCheckChange}
                                name="eggValue"
                              />
                            }
                            label="Egg"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                style={{ color: "rgb(248, 183, 53)" }}
                                checked={this.state.dairyValue}
                                onChange={this.handleCheckChange}
                                name="dairyValue"
                              />
                            }
                            label="Dairy"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                style={{ color: "rgb(248, 183, 53)" }}
                                checked={this.state.glutenValue}
                                onChange={this.handleCheckChange}
                                name="glutenValue"
                              />
                            }
                            label="Gluten"
                          />
                        </FormGroup>
                      </Box>
                    </FormControl>
                  </div>
                  <div>
                    <Box p={2}>
                      <FormLabel component="legend">
                        <Typography
                          style={{ color: "rgb(33, 48, 55)" }}
                          variant="h6"
                        >
                          Any ingredient you want to exclude?
                        </Typography>
                      </FormLabel>
                      <TextField
                        label="Type ingredient"
                        type="text"
                        name="excludeIngredientValue"
                        onChange={this.handleChange}
                      />
                    </Box>
                  </div>
                  <div>
                    <Box p={2}>
                      <FormLabel component="legend">
                        <Typography
                          style={{ color: "rgb(33, 48, 55)" }}
                          variant="h6"
                        >
                          Select a type of cuisine:
                        </Typography>
                      </FormLabel>
                      <FormControl>
                        <InputLabel>Select</InputLabel>
                        <Select
                          native
                          value={this.state.cuisineValue}
                          onChange={this.handleChange}
                          name="cuisineValue"
                        >
                          <option aria-label="None" value="" />
                          <option value={"italian"}>Italian</option>
                          <option value={"chinese"}>Chinese</option>
                          <option value={"mexican"}>Mexican</option>
                          <option value={"thai"}>Thai</option>
                          <option value={"american"}>American</option>
                          <option value={"jewish"}>Jewish</option>
                          <option value={"african"}>African</option>
                          <option value={"spanish"}>Spanish</option>
                          <option value={"greek"}>Greek</option>
                        </Select>
                      </FormControl>
                    </Box>
                  </div>
                  <div>
                    <Box p={2}>
                      <div>
                        <Button
                          onClick={(e) => this.submit()}
                          variant="contained"
                          style={{
                            backgroundColor: "rgb(43, 137, 139)",
                            color: "white",
                          }}
                        >
                          Submit
                        </Button>
                      </div>
                      <br />
                      <div></div>
                    </Box>
                  </div>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <br />
              <Paper>
                <Box p={3}>
                  <Typography variant="h4">Get recipe ideas</Typography>
                  <hr />
                  <div>
                    <div>
                      <Box p={2}>
                        <div>
                          <FormLabel component="legend">
                            <Typography
                              style={{ color: "rgb(33, 48, 55)" }}
                              variant="h6"
                            >
                              Add a list of ingredients
                            </Typography>
                          </FormLabel>
                          <br />
                          <TextField
                            label="Type ingredient"
                            type="text"
                            name="ingredient"
                            onChange={this.handleChange}
                          />
                          <Button
                            onClick={(e) => this.addIngredient()}
                            variant="contained"
                            style={{
                              backgroundColor: "rgb(43, 137, 139)",
                              color: "white",
                            }}
                          >
                            Add
                          </Button>
                        </div>
                        <div>
                          <br></br>
                          <Typography variant="h6">
                            {this.state.ingredients.map((item, index) => (
                              <div key={index}>
                                <ul>{item}</ul>
                              </div>
                            ))}
                          </Typography>
                        </div>
                        <br />
                        <div>
                          <Link
                            to={{
                              pathname: "/recipes-by-ingredients",
                              state: {
                                ingredientsForRecipes: this.state.ingredients,
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
                              Get Recipes
                            </Button>
                          </Link>
                        </div>
                      </Box>
                    </div>
                  </div>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Container>
        <div>
          <Dialog
            open={this.state.setOpen}
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Thank you for submitting your preferences"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                You can now access your personal meal planner by clicking on the
                "Get Meal Planner" button. If you need to modify any
                preferences, please close this window and submit your new
                options.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Close
              </Button>
              <Link
                to={{
                  pathname: "/meal-planner",
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
                  Get Meal Planner
                </Button>
              </Link>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    );
  }
}
