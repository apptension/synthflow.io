
# Synthflow
A Web Audio experiment.  
It's a creative synth with mesmerizing 3D visualisation.
Built with React, [Tone.js](https://tonejs.github.io/) and [Three.js](https://threejs.org/)

#### [ Play with it!](https://synthflow.io/)

## Synth
SynthFlow is a custom-built synthesiser composed of the modules exposed by Tone.js.\
It can play 3 separate voices simultaneously.\
Melodies can be created in the sequencer.

Features:
- **2 Oscillators** - They generate the main signal, both with wave type selection and frequency correction
- **Envelope** - Responsible for how the sound changes during the time note is played
- **Master volume control**
- **BPM control** - (Beats per minute) it's how fast the notes are played
- **Filter** - An effect which cuts frequencies above specified threshold
- **Noise** - Controllable separate 'pink' noise signal mixed into master
- **Reverb** - An effect where millions decaying reflections of sounds off of multiple surfaces heard after the initial sound source
- **Chebyshev** - An effect using chebyshev waveshaper algorithm, which distorts sound in an interesting way. It's like a  frequency multiplier. Read more at [music.columbia.edu](http://sites.music.columbia.edu/cmc/MusicAndComputers/chapter4/04_06.php)
- **Sequencer** - A grid divided by **8 / 16 / 32** beats which allows for creating melodies by setting specific notes for each of **3 voices**. Each voice has its own **octave selection**

## Visualisation
It’s an interactive **‘blob’** which dynamically changes with the sound and current synth settings.\
Its shape and colors are defined by custom WebGL shaders. It’s deformed using **Perlin Noise** algorithm variation and other displacement functions. The colors rely on RGB color model manipulations, reflecting light, normals and current vertices positions.

To learn more about shaders and WebGL:
- [thebookofshaders.com](https://thebookofshaders.com/)
- [webglfundamentals.org](https://webglfundamentals.org/)
- [Yuri Artyukh youtube channel](https://www.youtube.com/user/flintyara)
- [Understanding Perlin Noise](https://adrianb.io/2014/08/09/perlinnoise.html)

## Scripts

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn build`

Builds the app for production to the `build` folder.\
See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.