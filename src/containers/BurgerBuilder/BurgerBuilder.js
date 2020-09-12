import React,{Component} from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';


const INGREDIENTS_PRICE = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon:0.7
}; 

class BurgerBuilder extends Component {
    state = {
        ingredients:{
            salad:0,
            bacon:0,
            cheese:0,
            meat:0
        },
        totalPrice:4,
        purchasable: false,
        purchasing: false,
        loading:false
    }
    componentDidMount(){
        console.log('Burger-builder component did mount');
    }
    updatePurchaseState=()=>{
        const ingredients = {
            ...this.state.ingredients
        }
        const sum = Object.keys(ingredients).map(
            igKey =>{
                return ingredients[igKey];
            }
        ).reduce((sum,el) =>{
            return sum+el;
        },0);

        this.setState({purchasable: sum>0});
    }


    addIngredientHandler = (type) =>{
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount+1;

        let updatedIngredients = {
            ...this.state.ingredients
        };

        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENTS_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = priceAddition+oldPrice;
        
        
        this.setState(
            {

                ingredients: updatedIngredients,
                totalPrice:newPrice
            },()=>{this.updatePurchaseState();}
        );
        //this.updatePurchaseState(updatedIngredients);
    }


    removeIngredientHandler = (type) =>{
        const oldCount = this.state.ingredients[type];
        if(oldCount<=0)
            return;
        const updatedCount = oldCount-1;

        let updatedIngredients = {
            ...this.state.ingredients
        };

        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENTS_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice-priceDeduction;
        
        
        this.setState(
            {

                ingredients: updatedIngredients,
                totalPrice:newPrice
            },()=>{
                this.updatePurchaseState();
            }//use this if you want to use a function after executing setState;
        );
        //this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler=()=>{
        this.setState({purchasing:true});
    }
    purchaseCancelHandler = () =>{
        this.setState({purchasing:false});
    } 

    purchaseContinueHandler = () =>{
        //alert('You continue!');
        console.log('purchaseContinueHandler clicked!');
        this.setState({loading:true})
        const order = {
            ingredients:this.state.ingredients,
            price:this.state.totalPrice,
            customer:{
                name:'Alif kladin',
                address:{
                    street: 10,
                    zipcode:63822,
                    country:'Bangladesh'
                },
                email:'test@test.com',
                deliverMethod:'fastest'
            }
        }
        Axios.post('/orders.json',order).then(
            response=>{
                this.setState({loading:false,purchasing:false});
            }
        ).catch(error=>{
            this.setState({loading:false,purchasing:false});
        });
    } 

    render(){
        console.log('Render method called!');
        let disableInfo = {
            ...this.state.ingredients
        }
        for(let key in disableInfo){
            disableInfo[key] = disableInfo[key]<=0;
        }
        let orderSummary = (<OrderSummary ingredients={this.state.ingredients}
            purchaseCancelled = {this.purchaseCancelHandler}
            purchaseContinued = {this.purchaseContinueHandler}
            price={this.state.totalPrice.toFixed(2)}
            />);
        if(this.state.loading)
            orderSummary = (<Spinner/>);
        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                <Burger ingredients = {this.state.ingredients}/>
                <BuildControls 
                    ingredientAdded = {this.addIngredientHandler}
                    ingredientRemove = {this.removeIngredientHandler}
                    disabled = {disableInfo}
                    price = {this.state.totalPrice}
                    purchasable = {this.state.purchasable}
                    ordered = {this.purchaseHandler}
                />
            </Aux>);
    }       
}
export default BurgerBuilder;