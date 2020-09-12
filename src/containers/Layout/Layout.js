import React,{Component} from 'react'
import Aux from '../../hoc/Aux';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state={
        sideDrawerOpen:false
    }
    cancelSideDrawer = ()=>{
        this.setState({sideDrawerOpen: false})
    }
    sideDrawerToggleHandler = () =>{
        this.setState((prevState)=>{
            return {sideDrawerOpen:!prevState.sideDrawerOpen}
        })
    }

    render(){
        return (
            <Aux>
                <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}/>
                <SideDrawer open={this.state.sideDrawerOpen} clicked={this.cancelSideDrawer}/>
                <main className={ classes.Content }>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}
export default Layout;