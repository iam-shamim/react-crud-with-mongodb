export const SET_GAMES = 'SET_GAMES';
export const ADD_GAME = 'ADD_GAME';

export function setGames(games) {
    return {
        type: SET_GAMES,
        games
    }
}
export function addGame(game) {
    return{
        type: ADD_GAME,
        game
    }
}
function handleResponse(res) {
    if(res.ok){
        return res.json();
    }else{
        let error = new Error(res.statusText);
        error.response = res;
        throw error;
        return {
            error:{
                global: 'Something wrong.'
            }
        };
    }
}
export const fetchGames = () => {
    return dispatch => {
        fetch('/api/games')
            .then(res => res.json())
            .then(data => dispatch(setGames(data.games)))
        ;
    };
};
export const saveGame = (data) => {
    return dispatch => {
      return fetch('/api/games',{
          method: 'post',
          body: JSON.stringify(data),
          headers: {
              'Content-Type': 'application/json'
          }
      }).then(handleResponse).then(data=>dispatch(addGame(data.game)));
    };
};