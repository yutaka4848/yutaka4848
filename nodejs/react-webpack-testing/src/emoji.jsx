
const React = require('react');
const ReactDOM = require('react-dom/client');

let emojiTag = document.createElement('div');
emojiTag.setAttribute('id', 'emoji');
const emojiRoot = ReactDOM.createRoot(emojiTag);

class EmojiSearch extends React.Component {
  constructor(props){
    super(props)
    this.state = {};
    this.state.code = '&#128510;';
    this.handleInput = this.handleInput.bind(this);
    this.codeToHtml = this.codeToHtml.bind(this);
  }

  handleInput(e){
    console.assert(!e.key, `** press key is ${e.key}`);
    this.setState({code: e.target.form.elements.code.value}); 
  }

  codeToHtml(){
    let span = document.createElement('span');
    const drop = /\D/g;
    const number = this.state.code.replaceAll(drop, '');
    if(number.length !== 6) return 'Invalid Code';
    span.innerHTML = `&#${number};`;
    console.log(`** ${JSON.stringify(this.props)}`);
    return span.innerHTML;
  }

  render(){
    return (
      <div>
        <form id='emoji'>
          <fieldset>
            <label for='code'>Raw Code for emoji</label>
            &#<input id='code' name='code' placeholder='128510'></input>;
          </fieldset>
          <button type='button' for='emoji' value='show'  onClick={this.handleInput} onKeyUp={this.handleInput} onKeyDown={(e) => {}}>SHOW</button>
        </form>
        <div className='fs-2'>Emoji: <span>{this.codeToHtml()}</span></div>
      </div>
    );
  }
}

emojiRoot.render(<EmojiSearch />);
document.querySelector('main').append(emojiTag);