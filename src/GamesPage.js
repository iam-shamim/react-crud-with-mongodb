import React,{Component} from "react";
import { connect } from 'react-redux'
import GamesList from './GamesList';
import { fetchGames } from './actions'

class GamesPage extends Component{
    componentDidMount(){
        this.props.fetchGames();
    }
    render(){
        return(
            <div>
                <h1>Games List</h1>
                <GamesList games={this.props.games} />
            </div>
        );
    }
}

/*GamesPage.propTypes = {
    games: React.PropTypes.array.required
};*/

const mapStateToProps = state => {
    return{
        games: state.games
    }
};
export default connect(mapStateToProps,{fetchGames})(GamesPage);