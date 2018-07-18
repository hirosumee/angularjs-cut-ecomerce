import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Call from './components/Call';
import Search from './components/Search'

ReactDOM.render(
    <App/>
    , document.getElementById('root'));
registerServiceWorker();
{/*<Router>*/
}
{/*<div>*/
}
{/*<Route path='/' exact component={App}/>*/
}
{/*<Route path="/call/:type(call|receive)/:option(audio|video)/:id" component={Call}/>*/
}
{/*<Route path="/search/:text/:mode" component={Search}/>*/
}
{/*</div>*/
}
{/*</Router>*/
}
