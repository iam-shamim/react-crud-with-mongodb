import React,{Component} from "react";
import classnames from 'classnames'


class GameForm extends Component{
    state = {
        _id: this.props.game? this.props.game._id:null,
        title: this.props.game? this.props.game.title:'',
        cover: this.props.game? this.props.game.cover:'',
        errors: {},
        loading: false,
    };
    componentWillReceiveProps = (nextProps) =>{
      this.setState({
         _id: nextProps.game._id,
          title: nextProps.game.title,
          cover: nextProps.game.cover,
      });
    };

    handleChange = (e) => {
        if(!!this.state.errors[e.target.name]){
            let errors = Object.assign({},this.state.errors);
            delete errors[e.target.name];
            this.setState({
                [e.target.name]: e.target.value,
                errors
            });
        }else{
            this.setState({[e.target.name]: e.target.value});
        }
    };
    hanleSubmit = (e) => {
        e.preventDefault();

        // validation
        let errors = {};
        if(this.state.title === '') errors.title = "Can't be empty";
        if(this.state.cover === '') errors.cover = "Can't be empty";
        this.setState({errors});
        const isValid = Object.keys(errors).length === 0;

        if(isValid){
            this.setState({loading: true});
            this.props.saveGame({_id:this.state._id, title: this.state.title, cover: this.state.cover})
                .catch((err) => err.response.json().then(({errors})=>this.setState({errors,loading:false})));

        }
    };
    render(){
        return(
            <div>
                <form className={classnames('ui','form',{loading: this.state.loading})} onSubmit={this.hanleSubmit}>
                    <h1>Add New Game</h1>
                    { !!this.state.errors.global && <div className="ui negative message"><p>{this.state.errors.global}</p></div> }
                    <div className={classnames('field',{ error: !!this.state.errors.title })}>
                        <label htmlFor="title">Title</label>
                        <input
                            id="title"
                            name="title"
                            value={this.state.title}
                            onChange={this.handleChange}
                            autoComplete="off"
                        />
                        <span>{this.state.errors.title}</span>
                    </div>
                    <div className={classnames('field',{ error: !!this.state.errors.cover })}>
                        <label htmlFor="cover">Cover URL</label>
                        <input
                            id="cover"
                            name="cover"
                            value={this.state.cover}
                            onChange={this.handleChange}
                            autoComplete="off"
                        />
                        <span>{this.state.errors.cover}</span>
                    </div>
                    <div className="field">
                        {
                            this.state.cover !=='' && <img src={this.state.cover} alt="cover" className="ui small bordered image"/>
                        }
                    </div>
                    <div className="field">
                        <button className="ui primary button">Save</button>
                    </div>

                </form>
            </div>
        );
    }
}
export default GameForm;