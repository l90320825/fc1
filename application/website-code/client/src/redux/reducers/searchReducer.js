//take state of entire app
//new home component if you leave to about

const initState = () => ({
    searchTerm: '',
});

//keep track of current app state
//modify satet given action on an object
const searchReducer = (state = initState(), action) => {
    //all actions have type
    switch (action.type) {
        case 'SEARCH_TERM_SET':
            return {
                ...state, //copy old state
                searchTerm: action.searchTerm, //input new search
            };
    
        default:
            //ignore
            return state;
    }
};

export default searchReducer;