
import logo from '../../logo.svg';
import '../../App.css';

function AppHeaderView() {
  return (
    <div className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h1 style={{"marginTop": "-15px", "color": "white", "marginBottom": "-15px"}}>A React Chess App</h1>
      <big style={{"color": "white", "display": "inline-block"}}>Written by</big> <a className="App-link" href="https://github.com/Moe82">@Moe82</a>
    </div>
  )
}

export default AppHeaderView;