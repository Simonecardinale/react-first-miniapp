import React from 'react';

class Clock extends React.Component{
    constructor(props){
        super(props);
        // this.toggleWatch = this.toggleWatch.bind(this);
        // lo state va inserito solo nel costruttore
        // react creerà un oggetto su app.js che ha il suo stato che si aggiornerà col setInterval


        // this.state = {
        //     date: new Date(),  
        //     timezone: 1,
        // };


        this.state = {
            timestamp: Date.now(),
            date: new Date(),  
            timezone: 0,
            stopped: false,
        };
    }
    render(){
        const d = new Date(this.state.timestamp);
        const tempo = d.getTime() + this.props.timezone * 3600 * 1000;
        const data = new Date(tempo);
    
        return <li>{data.toLocaleTimeString()}
        <button onClick={this.toggleWatch}>{this.state.stopped ? 'start' : 'stop'}</button>
        <button onClick={this.restart}>Restart</button>
        </li>
    }

    // tick è il nome generico di una funzione. Con il metodo setState andiamo a renderizzare di volta in volta un elemento dell'oggetto, in questo caso il date. Ogni componente viene renderizzato indipendemente. Il this fa riferimento al Clock.

    toggleWatch = (e) => {
        e.target.style.color = 'blue';
        this.state.stopped ? this.startWatch() : clearInterval(this.interval);
        this.setState((state, props)=>{
           return {stopped: ! state.stopped};
        });
        console.log(this.state.stopped);
    };
    
    tick = () => {
        this.setState((precState, props) =>{
            return{
                timestamp: precState.timestamp + props.secs*1000,
                
            }
        });
    };


    startWatch(){
        this.interval = setInterval(this.tick, this.props.secs*1000);
    };

    restart = () =>{
        this.setState((precState, props) =>{
            return{
               timestamp: props.timezone*3600*1000,
            }
        });
    }



    // il componentDidMount viene montato dopo che è stato montata tutta la pagina e solo una volta. E' il setInterval a far aggiornare il tutto.  

    componentDidMount(){
        this.startWatch();
    }

    // componentWillUnmount serve per smontare tutto.
    componentWillUnmount(){
        clearInterval(this.interval);
    }
}

export default Clock;