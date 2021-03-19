import React from 'react';
import './App.css';
import Draggable from 'react-draggable';
import Application from './Application';
import Terminal from './Apps/Terminal';
import AboutMe from './Apps/AboutMe';
import Calculator from './Apps/Calculator';
import Config from './Apps/Config';
import { SelectableGroup, createSelectable } from 'react-selectable';

class App extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        appFocus: -1,
        ativoMenu: false,
        appOpeneds: [],
        zIndex: 1,
        hours: `00:00`,
        appsOptionsBar: [
          {
            'name': 'Terminal',
            'image': './apps/terminal.png',
            'opened': Terminal
          },
          {
            'name': 'Me',
            'image': './apps/me.png',
            'app': AboutMe
          },
          {
            'name': 'Calculator',
            'image': './apps/calculator.png',
            'app': Calculator,
            'zIndex': 9001,
            'fullScreen': false,
            'mini': false
          },
          {
            'name': 'Settings',
            'image': './apps/settings.png',
            'app': Config,
            'zIndex': 9001,
            'fullScreen': false,
            'mini': false,
            'seeDesktop': true
          },
        ],
        allApps: [
          {
            'name': 'Terminal',
            'image': './apps/terminal.png',
            'app': Terminal,
            'zIndex': 9001,
            'fullScreen': false,
            'mini': false,
            'seeDesktop': true
          },
          {
            'name': 'Me',
            'image': './apps/me.png',
            'app': AboutMe,
            'zIndex': 9001,
            'fullScreen': false,
            'mini': false,
            'seeDesktop': true
          },
          {
            'name': 'Calculator',
            'image': './apps/calculator.png',
            'app': Calculator,
            'zIndex': 9001,
            'fullScreen': false,
            'mini': false,
            'seeDesktop': false
          },
          {
            'name': 'Settings',
            'image': './apps/settings.png',
            'app': Config,
            'zIndex': 9001,
            'fullScreen': false,
            'mini': false,
            'seeDesktop': true
          },
        ]
      }
  }
  componentDidMount(){
    this.horario()
  }
  horario(){
    setInterval(() => {
      const now = new Date();
      var auxMinutes = ''
      var auxHours = ''
      if(parseFloat(now.getMinutes()) < 10){
        auxMinutes = '0'
      }
      if(parseFloat(now.getHours()) < 10){
        auxHours = '0'
      }
      this.setState({hours: `${auxHours}${now.getHours()}:${auxMinutes}${now.getMinutes()}`})
    }, 1000);
  }
  zIndexApp(name){
    var array = [...this.state.allApps]
    var itemFound = array.find(e => e.name == name)
    var foundId = array.indexOf(itemFound)
    if(itemFound){
      var zIndex = array[foundId].zIndex
      zIndex = zIndex += 1
      array[foundId].zIndex = zIndex
      this.setState({allApps: array})
    }
  }
  openApp(app, name, image, cond){
    if(!this.state.appOpeneds.find(element => element.title == name)){
      this.zIndexApp(name)
      this.setState(appOpeneds => ({
      appOpeneds: [...this.state.appOpeneds, {
        'app': app, 
        'title': name, 
        'image': image,
        'zIndex': this.state.zIndex
        }]
      }))
    } 
    this.onStartDrag()
  }
  closeApp(name){
    if(this.state.appOpeneds.find(element => element.title == name)){
      var array = [...this.state.appOpeneds]
      var itemFound = this.state.appOpeneds.find(e => e.title == name)
      var foundId = this.state.appOpeneds.indexOf(itemFound)
      if(itemFound){
        array.splice(foundId, 1)
        this.setState({appOpeneds: array})
      }
    } 
  }
  fullScreen(name){
    var array = [...this.state.allApps]
    var itemFound = this.state.allApps.find(e => e.name == name)
    var foundId = this.state.allApps.indexOf(itemFound)
    if(itemFound){
      array[foundId].fullScreen = !array[foundId].fullScreen
      this.setState({allApps: array})
    }
  }
  onStartDrag(){
    this.setState({appFocus: -1})
    this.setState({ativoMenu: false})
  }
  onDragApp(name){
    this.zIndexApp(name)
    this.setState({appFocus: -1})
    this.setState({ativoMenu: false})
  }
  mini(name){
    const found = this.state.allApps.find(element => element.name == name)
    if(found){
      var array = [...this.state.allApps]
      var foundId = array.indexOf(found)
      array[foundId].mini = true
      this.setState({allApps: array})
    }
  }
  openAppBar(name){
    const found = this.state.allApps.find(element => element.name == name)
    if(found){
      var array = [...this.state.allApps]
      var foundId = array.indexOf(found)
      array[foundId].mini = !array[foundId].mini
      this.setState({allApps: array})
    }
  }
  render(){
    return (
    <div
    className="App"
    style={{ backgroundImage: `url(${window.localStorage.getItem('background')})` }}>
      <div className="desktop">
        <SelectableGroup>
          <div className="allScreen">
            <h1 className="hoursScreen">
            { this.state.hours }
            </h1>
          </div>
        </SelectableGroup>
        <div className="apps">
          {
          this.state.allApps.map((item, i) =>  (
          item.seeDesktop &&
          <Draggable
            grid={[95, 45]}
            onDrag={() => this.onStartDrag()}
            >
            <div
            onDoubleClick={() => this.openApp(item.opened, item.name, item.image, false)}>
              <Application
              name={item.name}
              image={item.image}></Application>
            </div>
          </Draggable>
          ))
          }
        </div>
        <div className={`optionsBar ${(this.state.ativoMenu ? 'abertoFocus' : 'dontAberto')}`}>
          <div className="applicationBar">
          {
          this.state.appsOptionsBar.map((item, i) =>  (
          <div 
          onMouseEnter={() => this.setState({appFocus: i})}
          onMouseLeave={() => this.setState({appFocus: -1})}
          onClick={() => this.openApp(item.opened, item.name, item.image, false)}>
          <Application
              name={item.name}
              image={item.image}
              focus={(this.state.appFocus == i ? true : false)}></Application>
          </div>
          ))}
          </div>
          <div className="appsSearch">
            <input type="text" placeholder="Search app's"></input>
          </div>
        </div>
        <div className="bottomBar">
          <div 
          onClick={() => this.setState({ativoMenu: !this.state.ativoMenu})}
          className={`appLogo ${(this.state.ativoMenu ? 'appLogoAtivo' : 'AppLogoDontAtivo')}`}>
            <img src="./apps/logo.png"/>
          </div>
          {
          this.state.appOpeneds.map((item, i) =>  (
          <div 
          onClick={() => this.openAppBar(item.title)}
          className={`appLogo inlineApp
          ${(
            this.state.allApps.find(e => e.name == item.title).mini ? 'isNotMini': 'isMini')}
          `}>
            <img src={item.image}/>
          </div>
          ))}
          <div className="right">
            <div className="hours">
              <span>{ this.state.hours }</span>
            </div>
          </div>
        </div>
        {
        this.state.allApps.map((item, i) => (
        <Draggable
            handle=".move"
            onDrag={() => this.onDragApp(item.name)}
        >
        <div className="relativeApp" style={{zIndex: item.zIndex}}>
          <div className={`appL
          ${(this.state.appOpeneds.find(element => element.title == item.name) ? 'appAberto': 'appNaoAberto')}
          ${(item.mini ? 'mini' : 'notMini')}
          `}
          >
          <div className="header">
            <div 
            onClick={() => this.onDragApp(item.name)}
            className="move">

            </div>
              <span>
                  { item.name }
              </span>
              <div className="right">
                <button
                onClick={() => this.mini(item.name)}>
                  <i class="fas fa-minus"></i>
                </button>
                <button onClick={() => this.closeApp(item.name)}>
                    <i class="fas fa-times"></i>
                </button>
          </div>
          </div>
          <item.app>
          </item.app>
          </div>
          </div>
        </Draggable>
        ))} 
        <span
        className="demoPort"
        >Version Portfólio, created by kaway404</span>
      </div>
    </div>
  )
}
}

export default App;
