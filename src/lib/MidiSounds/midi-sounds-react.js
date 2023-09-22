import { Component } from "react";
import WebAudioFontPlayer from "./webaudiofont";

export class MIDISounds extends Component {
  constructor(props) {
    super(props);
    console.log("MIDISounds v1.2.48. African groove mod.");
    this.state = {
      drums: this.props.drums,
      master: 1.0,
      echo: 0.05,
    };

    this.midiStatus = "?";
    this.initAudio();
  }
  render() {
    this.refreshCache();
    return null;
  }
  contextTime() {
    return this.audioContext.currentTime;
  }
  refreshCache() {
    if (this.state.drums) {
      for (var k = 0; k < this.state.drums.length; k++) {
        this.cacheDrum(this.state.drums[k]);
      }
    }
  }
  initAudio() {
    if (this.player) {
      if (this.audioContext) {
        this.player.cancelQueue(this.audioContext);
      }
    }
    var AudioContextFunc = window.AudioContext || window.webkitAudioContext;
    this.audioContext = new AudioContextFunc();
    this.destination = this.audioContext.destination;
    this.player = new WebAudioFontPlayer();
    this.equalizer = this.player.createChannel(this.audioContext);
    this.output = this.audioContext.createGain();
    this.echo = this.player.createReverberator(this.audioContext);
    this.echo.wet.gain.setTargetAtTime(this.state.echo, 0, 0.0001);
    this.echo.output.connect(this.output);
    this.equalizer.output.connect(this.echo.input);
    this.output.connect(this.destination);
    this.volumesDrum = [];
  }
  cacheDrum(n) {
    var info = this.player.loader.drumInfo(n);
    if (window[info.variable]) {
      return;
    }
    this.player.loader.startLoad(this.audioContext, info.url, info.variable);
  }
  playDrum(when, drum) {
    var info = this.player.loader.drumInfo(drum);
    if (window[info.variable]) {
      var pitch = window[info.variable].zones[0].keyRangeLow;
      var volume = this.volumeDrumAdjust(drum);
      this.player.queueWaveTable(
        this.audioContext,
        this.equalizer.input,
        window[info.variable],
        when,
        pitch,
        3,
        volume
      );
    } else {
      this.cacheDrum(drum);
    }
  }
  playDrumsAt(when, drums) {
    for (var i = 0; i < drums.length; i++) {
      this.playDrum(when, drums[i]);
    }
  }
  volumeInstrumentAdjust(instrument) {
    if (!(this.volumesInstrument[instrument] === undefined)) {
      return this.volumesInstrument[instrument];
    }
    return 1;
  }
  volumeDrumAdjust(drum) {
    if (!(this.volumesDrum[drum] === undefined)) {
      return this.volumesDrum[drum];
    }
    return 1;
  }
  startPlayLoop(beats, bpm, density, fromBeat, onBeat) {
    const MAX_LAG_MS = 5;
    this.stopPlayLoop();
    this.loopStarted = true;
    var wholeNoteDuration = (4 * 60) / bpm;
    if (fromBeat < beats.length) {
      this.beatIndex = fromBeat;
    } else {
      this.beatIndex = 0;
    }
    this.playBeatAt(this.contextTime(), beats[this.beatIndex], bpm);
    var nextLoopTime = this.contextTime() + density * wholeNoteDuration;
    var me = this;
    this.loopIntervalID = setInterval(function () {
      if (me.contextTime() > nextLoopTime - density * wholeNoteDuration) {
        me.beatIndex++;
        if (me.beatIndex >= beats.length) {
          me.beatIndex = 0;
        }

        me.playBeatAt(nextLoopTime, beats[me.beatIndex], bpm);
        nextLoopTime = nextLoopTime + density * wholeNoteDuration;

        if (onBeat) {
          onBeat(me.beatIndex);
        }
      }
    }, MAX_LAG_MS);
  }
  stopPlayLoop() {
    this.loopStarted = false;
    clearInterval(this.loopIntervalID);
    this.cancelQueue();
  }
  cancelQueue() {
    this.player.cancelQueue(this.audioContext);
  }
  playBeatAt(when, beat) {
    this.playDrumsAt(when, beat[0]);
  }
  playDrumsNow(drums) {
    this.playDrumsAt(0, drums);
  }
  setMasterVolume(volume) {
    this.output.gain.setTargetAtTime(volume, 0, 0.0001);
    this.setState({
      master: volume,
    });
  }
  setDrumVolume(drum, volume) {
    this.volumesDrum[drum] = volume;
  }
  setEchoLevel(value) {
    this.echo.wet.gain.setTargetAtTime(value, 0, 0.0001);
    this.setState({
      echo: value,
    });
  }
}

export default MIDISounds;
