export class Sound {
 context?:AudioContext; muted=false; active=new Set<OscillatorNode>();
 stop(){for(const o of this.active){try{o.stop();}catch{}}this.active.clear();}
 start(){this.context??=new AudioContext();void this.context.resume();}
 play(frequency=440,duration=.06,type:OscillatorType='sine',volume=.035){if(this.muted||!this.context||this.context.state!=='running')return;const t=this.context.currentTime,o=this.context.createOscillator(),g=this.context.createGain();o.type=type;o.frequency.setValueAtTime(frequency,t);o.frequency.exponentialRampToValueAtTime(frequency*.6,t+duration);g.gain.setValueAtTime(volume,t);g.gain.exponentialRampToValueAtTime(.001,t+duration);o.connect(g);g.connect(this.context.destination);this.active.add(o);o.onended=()=>this.active.delete(o);o.start(t);o.stop(t+duration);}
}
