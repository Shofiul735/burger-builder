import React,{Component} from 'react';
import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Aux from './hoc/Aux';

class App extends Component {
  
  render(){
    return (
      <Aux>
        <Layout>
          
        </Layout>
        <BurgerBuilder>
          
        </BurgerBuilder>
      </Aux>
    );
  }
  
}


export default App;
