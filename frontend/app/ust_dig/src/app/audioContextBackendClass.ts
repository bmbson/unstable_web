import { time } from "console";
import { fancyTimeFormat } from "./ts/timeManipulationHelpers";

class audioContextHelper {
	audioCtx: AudioContext | undefined;
	audioElement: HTMLAudioElement | undefined;
	audioSourceNode: MediaElementAudioSourceNode | undefined;
	gainNode!: GainNode;
	isAudioPlaying: boolean;

	constructor() {
		this.audioCtx;
		this.gainNode;
		this.audioElement;
		this.audioSourceNode = undefined;
		this.isAudioPlaying = false;
	}

	initAudioContext() {
		if (this.audioCtx != undefined) {
			console.log('audioCTX already created.');
		} else {
			this.audioCtx = new AudioContext;
			console.log('audioCTX initialized.');
		}
	}

	/*Need to figure a way to add audioNode to context*/
	createAudioContext() {
		if (this.audioCtx == undefined) {
			console.log('Error: AudioContext not initialized!');
		} else {
			this.gainNode = this.audioCtx!.createGain();
			this.createMediaElementSourceNode();
			this.connectAudioElements();
			console.log('Elements Connected');
		}
		return this.audioCtx;
	};

	getCTXInfo() {
		console.log(this.audioCtx)
		console.log(this.audioSourceNode)
		console.log(this.audioElement)
	}

	resumeAudioContext() {
		if (this.audioCtx != undefined) {
			if (this.audioCtx.state === "suspended") {
				this.audioCtx.resume();
			};
		} else {
			console.log('audioCtx is not defined (is it initialized?)');
		};
	};

	changeCurrentTime(timeToChangeTo: number) {
		this.audioSourceNode!.mediaElement.currentTime = timeToChangeTo;
		return fancyTimeFormat(timeToChangeTo);
	};

	closeAudioContext(context: AudioContext) {
		context.close()
		this.audioCtx = undefined
		console.log('audioCTX closed.');
	};

	changeAudioContextVolume(volume: number) {
		this.gainNode.gain.value = volume;
	};

	setAudioElement(audioRef: HTMLAudioElement | undefined) {
		this.audioElement = audioRef;
	};

	createMediaElementSourceNode() {
		if (this.audioElement == null) {
			console.log("audioElement is null")
		} else {
			try {
				this.audioSourceNode = this.audioCtx?.createMediaElementSource(this.audioElement!);
			} catch (error) {
				console.log(error);
			};
		};
	};

	changeAudioTrack(audioRef: HTMLAudioElement | undefined) {
		this.audioElement!.src = audioRef!.src
	}

	connectAudioElements() {
		this.audioSourceNode?.connect(this.gainNode);
		this.gainNode.connect(this.audioCtx?.destination!);
	};

	playAudioElement() {
		this.isAudioPlaying = true;
		this.audioElement?.play();
	};

	pauseAudioElement() {
		this.audioElement?.pause();
	};

	getCurrentAudioTime() {
		var currentTime = fancyTimeFormat(Number(this.audioSourceNode?.mediaElement.currentTime.toFixed()));
		return currentTime;
	};

	getAudioLength() {
		var audioLength = fancyTimeFormat(Number(this.audioSourceNode?.mediaElement.duration.toFixed()));
		return audioLength;
	};
};

export var ctx = new audioContextHelper;
