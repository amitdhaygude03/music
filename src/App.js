import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Text, Sphere } from '@react-three/drei';
import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import ReactHowler from 'react-howler';
import { Button } from '@/components/ui/button';

const songs = [
  {
    title: "Blinding Lights",
    artist: "The Weeknd",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
  },
  {
    title: "Shape of You",
    artist: "Ed Sheeran",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
  },
  {
    title: "Stay",
    artist: "The Kid LAROI & Justin Bieber",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
  }
];

export default function Music3DApp() {
  const [playing, setPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);

  const togglePlay = () => setPlaying(!playing);
  const nextSong = () => setCurrentSongIndex((currentSongIndex + 1) % songs.length);

  return (
    <div className="h-screen w-full bg-black text-white">
      <Canvas className="h-3/5">
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <OrbitControls enableZoom={false} />
        <Stars />
        <Sphere visible args={[1.5, 32, 32]} position={[0, 0, 0]}>
          <meshStandardMaterial attach="material" color="#ff0080" wireframe />
        </Sphere>
        <Text
          fontSize={0.5}
          color="white"
          position={[0, -2.5, 0]}
          anchorX="center"
          anchorY="middle"
        >
          {songs[currentSongIndex].title} - {songs[currentSongIndex].artist}
        </Text>
      </Canvas>

      <motion.div className="p-6 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="text-3xl font-bold mb-4">🎧 3D Music Player</h1>
        <div className="flex justify-center gap-4">
          <Button onClick={togglePlay}>{playing ? 'Pause' : 'Play'}</Button>
          <Button onClick={nextSong}>Next</Button>
        </div>
      </motion.div>

      <ReactHowler
        src={songs[currentSongIndex].url}
        playing={playing}
        volume={0.7}
        onEnd={nextSong}
      />
    </div>
  );
}
