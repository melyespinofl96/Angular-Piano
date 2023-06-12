import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Angular-Piano'

  private audioContext: AudioContext;
  private oscillator: OscillatorNode | null = null; // Assign default value of null
  private pitch: number = 0;

  constructor() {
    this.audioContext = new (window as any).AudioContext || (window as any).webkitAudioContext();
  }

  ngOnInit() {

  }

  getPitch(pitch: number){
    this.pitch = pitch
    console.log(pitch)
  }

  onMouseDown() {
    this.generateTone();
  }
  
  onMouseUp() {
    if (this.oscillator) {
      this.oscillator.stop();
      this.oscillator = null;
    }
  }

  generateTone() {
    this.oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
  
    this.oscillator.type = 'sine';
    this.oscillator.frequency.value = this.pitch;
  
    gainNode.gain.value = 1.0; // Set volume (0 to 1)
  
    this.oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
  
    this.oscillator.start();
  }

  
  ngOnDestroy() {
    window.removeEventListener('mousedown', this.onMouseDown);
    window.removeEventListener('mouseup', this.onMouseUp);
  }
  
}


/*
Hertz fot pitches
source https://pages.mtu.edu/~suits/notefreqs.html

C3	130.81
C#3 138.59
D3	146.83
D#3 155.56
E3	164.81
F3	174.61
F#3 185.00
G3	196.00
G#3 207.65
A3	220.00
A#3 233.08
B3	246.94
C4	261.63 **
C#4 277.18
D4	293.66
D#4 311.13
E4	329.63
F4	349.23
F#4 369.99
G4	392.00
G#4 415.30
A4	440.00
A#4 466.16
B4	493.88
C5	523.25
C#5 554.37
D5	587.33
D#5 622.25
E5	659.25 **
F5	698.46
F#5 739.99
G5	783.99
G#5	830.61
A5	880.00
A#5 932.33
B5	987.77
*/