import React, { Component } from 'react';
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import CircularProgress from '@material-ui/core/CircularProgress';


export default class ShoppingList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            recipes: this.props.location.state.recipesPlanner,
            ingredients: [],
            ingredientsArray: [],
            ingredientsObject: {
                name: "",
                image: "",
                amount: {
                    value: 0,
                    unit: ""
                }
            },
            updatedIngredientsArray: []
        }
    };

     componentDidMount() {
        this.fetchIngredientsFromRecipes();
    }

    async fetchIngredientsFromRecipes() {
        for(let i = 0; i<this.state.recipes.length; i++) {
            let response = await fetch(`recipe/${this.state.recipes[i].id}/ingredientWidget`);
            let json = await response.json();
            this.setState({ ingredients: [...this.state.ingredients, json]});     
        }
        await this.createIngredientsObject();
       // await this.generateShoppingList();
        await this.removeDuplicates();
        await this.setState({loading: false});
    }

    createIngredientsObject() {
        for(let i=0; i<this.state.ingredients.length; i++) {
            let array = this.state.ingredients[i].ingredients
             for(let j=0; j<array.length; j++){
                let ingredientsObject = {...this.state.ingredientsObject};
                ingredientsObject.name = array[j].name;
                ingredientsObject.image = array[j].image;
                ingredientsObject.amount = array[j].amount.metric;               
                this.setState({ingredientsObject});
                this.setState({ ingredientsArray: [...this.state.ingredientsArray, this.state.ingredientsObject]});
            }
            
        };
    }

/*        generateShoppingList() {
        const array = this.state.ingredientsArray;
        for(let i=0; i<array.length; i++) {
            for(let j=0; j<array.length; j++) {
                if(i !== j) {
                    if(array[i].name !== array[j].name) {
                        this.setState({ updatedIngredientsArray: [...this.state.updatedIngredientsArray, array[i]]});
                        console.log(this.state.updatedIngredientsArray)
                    } //name is not repeated
                    //push to updatedIngredientsArray
                    
                   // this.setState({ updatedIngredientsArray: [...this.state.updatedIngredientsArray, array[i]]});
                    } else {
                    //add amounts
                    array[i].amount.value += array[j].amount.value
                    //push to updatedIngredientsArray
                    this.setState({ updatedIngredientsArray: [...this.state.updatedIngredientsArray, array[i]]});
                }        
                
            }
            
        } */

        removeDuplicates() {
            let lookup = {};
            let result = [];
            const array = this.state.ingredientsArray;
            for(let i=0; i<array.length; i++) {
                if(!lookup[array[i].name]){
                    lookup[array[i].name] = true;
                    result.push(array[i]);
                }
            }
            this.setState({ updatedIngredientsArray: result});
        }

/*         removeDuplicates() {
            const array = this.state.ingredientsArray;
            const newArray = array.filter((value, index) => array.indexOf(value) === index);
            this.setState({ updatedIngredientsArray: newArray});
        } */
  

    render() {
        return (
            <div>
                <div>
                {this.state.loading ? <CircularProgress /> : "Page Loaded"}
                </div>
                <Box p={3}>
                    <Typography variant="h4">Shopping List</Typography>
                </Box>
                <Box p={3}>
                    {this.state.updatedIngredientsArray.map((ingredient, index) => {
                      return (
                      <div key={index}>
                            <h4>{ingredient.name}</h4>
                            <img src={"https://spoonacular.com/cdn/ingredients_100x100/" + ingredient.image} />
                            <p>{ingredient.amount.value} {ingredient.amount.unit}</p>
                      </div>
                      );
                    })}
                </Box>
            </div>
        )
    }
}

