import React,{Component} from "react";
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { saveGame, fetchGame, updateGame } from './actions';
import GameForm from "./GameForm";

class GameFormPage extends Component{
    state = {
      redirect: false
    };
    componentDidMount = () => {
        if(this.props.match.params._id){
            this.props.fetchGame(this.props.match.params._id);
        }
    };
    saveGame = ({_id, title, cover}) => {
        if(_id){
            return this.props.updateGame({_id, title, cover}).then(
                () => { this.setState({ redirect: true }) },
            );
        }else{
            return this.props.saveGame({title, cover}).then(
                () => { this.setState({ redirect: true }) },
            );
        }
    };
    render(){
        if(this.state.redirect){
            return <Redirect to="/games" />
        }
        return(
            <div>
                <GameForm
                    game={this.props.game}
                    saveGame={this.saveGame }
                />
            </div>
        );
    }
}const  mapStateToProps =(state,props) => {
    console.log('state.games: ',state.games);
    if(state.games && props.match.params._id){
        return {
            game: state.games.find(item => item._id === props.match.params._id)
        }
    }
    return {
        game: null
    }
};
export default connect(mapStateToProps,{ saveGame, fetchGame, updateGame })(GameFormPage)