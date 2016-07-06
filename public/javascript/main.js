var mountNode = document.getElementById('content');

var ButtonToolbar = ReactBootstrap.ButtonToolbar,
    Button  = ReactBootstrap.Button;

const ACTIVE = { color: 'red' };

const App = ({ children }) => (
    <div>
        <h1>APP!</h1>
        <ul>
            <li><Link      to="/"           activeStyle={ACTIVE}>/</Link></li>
            <li><IndexLink to="/"           activeStyle={ACTIVE}>/ IndexLink</IndexLink></li>

            <li><Link      to="/users"      activeStyle={ACTIVE}>/users</Link></li>
            <li><IndexLink to="/users"      activeStyle={ACTIVE}>/users IndexLink</IndexLink></li>

            <li><Link      to="/users/ryan" activeStyle={ACTIVE}>/users/ryan</Link></li>
            <li><Link      to={{ pathname: '/users/ryan', query: { foo: 'bar' } }}
                           activeStyle={ACTIVE}>/users/ryan?foo=bar</Link></li>

            <li><Link      to="/about"      activeStyle={ACTIVE}>/about</Link></li>
        </ul>

        {children}
    </div>
);

const About = React.createClass({
    render: function() {
        var ButtonToolbar = ReactBootstrap.ButtonToolbar,
            Button  = ReactBootstrap.Button;
        return <ButtonToolbar>
            {/* Standard button */}
            <Button>About</Button>

            {/* Provides extra visual weight and identifies the primary action in a set of buttons */}
            <Button bsStyle="primary">About</Button>

            {/* Indicates a successful or positive action */}
            <Button bsStyle="success">About</Button>

            {/* Contextual button for informational alert messages */}
            <Button bsStyle="info">About</Button>

            {/* Indicates caution should be taken with this action */}
            <Button bsStyle="warning">About</Button>

            {/* Indicates a dangerous or potentially negative action */}
            <Button bsStyle="danger">About</Button>

            {/* Deemphasize a button by making it look like a link while maintaining button behavior */}
            <Button bsStyle="link">About</Button>
        </ButtonToolbar>;
}});

const NoMatch = React.createClass({
    render: function() {
        var ButtonToolbar = ReactBootstrap.ButtonToolbar,
            Button = ReactBootstrap.Button;
        return <ButtonToolbar>
            {/* Standard button */}
            <Button>About</Button>

            {/* Provides extra visual weight and identifies the primary action in a set of buttons */}
            <Button bsStyle="primary">NoMatch</Button>

            {/* Indicates a successful or positive action */}
            <Button bsStyle="success">NoMatch</Button>

            {/* Contextual button for informational alert messages */}
            <Button bsStyle="info">NoMatch</Button>

            {/* Indicates caution should be taken with this action */}
            <Button bsStyle="warning">NoMatch</Button>

            {/* Indicates a dangerous or potentially negative action */}
            <Button bsStyle="danger">NoMatch</Button>

            {/* Deemphasize a button by making it look like a link while maintaining button behavior */}
            <Button bsStyle="link">NoMatch</Button>
        </ButtonToolbar>;
}});

var users = [{id: '_1_1', name: "John"}, {id: '_1_2', name: "Snow"}];

const Users = React.createClass({
    getInitialState() {
        return {
            users: users
        }
    },
    render() {
        return (
            <div>
                <h1>Users</h1>
                <div className="master">
                    <ul>
                        {/* use Link to route around the app */}
                        {
                            console.log(this.state)
                        }
                        {
                            this.state && this.state.users && this.state.users.map(user => (
                            <li key={user.id}><Link to={`/user/${user.id}`}>{user.name}</Link></li>
                        ))}
                    </ul>
                </div>
                <div className="detail">
                    {this.props.children}
                </div>
            </div>
        )
    }
});

function findUserById(userId) {
    return users.find(function (user) {
        return user.id === userId;
    });
}

const User = React.createClass({
    getInitialState() {
        console.log('getInitialState: ' + findUserById(this.props.params.userId).name);
        return {
            user: findUserById(this.props.params.userId)
        }
    },

    componentDidMount() {
        console.log('componentDidMount: ' + findUserById(this.props.params.userId).name);
        this.setState({
            // route components are rendered with useful information, like URL params
            user: findUserById(this.props.params.userId)
        })
    },

    render() {
        return (
            <div>
                <h2>{this.state.user.name}</h2>
                {/* etc. */}
            </div>
        )
    }
});

var Router = ReactRouter.Router,
    Route  = ReactRouter.Route,
    Link  = ReactRouter.Link,
    IndexLink = ReactRouter.IndexLink,
    browserHistory   = ReactRouter.browserHistory;

// Declarative route configuration (could also load this config lazily
// instead, all you really need is a single root route, you don't need to
// colocate the entire config).
ReactDOM.render((
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <Route path="/about" component={About}/>
            <Route path="/users" component={Users}>
                <Route path="/user/:userId" component={User}/>
            </Route>
            <Route path="*" component={NoMatch}/>
        </Route>
    </Router>
), mountNode);