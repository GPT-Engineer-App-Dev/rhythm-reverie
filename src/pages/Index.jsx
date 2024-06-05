import { useState, useEffect } from "react";
import { Container, VStack, Text, Heading, Box, Image, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Input, Textarea, IconButton, HStack } from "@chakra-ui/react";
import { FaPlay, FaPause, FaForward, FaBackward } from "react-icons/fa";

const Index = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [playlistName, setPlaylistName] = useState("");
  const [playlistDescription, setPlaylistDescription] = useState("");
  const [playlists, setPlaylists] = useState([]);

  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState(new Audio());

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const savePlaylist = () => {
    if (playlistName.trim() !== "") {
      setPlaylists([...playlists, { name: playlistName, description: playlistDescription }]);
      setPlaylistName("");
      setPlaylistDescription("");
      closeModal();
    }
  };

  useEffect(() => {
    if (currentSong) {
      audio.src = currentSong;
      audio.play();
      setIsPlaying(true);
    }
  }, [currentSong]);

  useEffect(() => {
    audio.addEventListener("ended", () => setIsPlaying(false));
    return () => {
      audio.removeEventListener("ended", () => setIsPlaying(false));
    };
  }, [audio]);

  const playSong = (song) => {
    setCurrentSong(song);
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const skipSong = (direction) => {
    const currentIndex = playlists.findIndex((playlist) => playlist.name === currentSong);
    let newIndex = currentIndex + direction;
    if (newIndex < 0) newIndex = playlists.length - 1;
    if (newIndex >= playlists.length) newIndex = 0;
    setCurrentSong(playlists[newIndex].name);
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Heading as="h1" size="2xl" mb={4}>Welcome to MusicStream</Heading>
        <Text fontSize="lg" textAlign="center">Your ultimate destination for streaming music. Discover new tracks, create playlists, and enjoy your favorite tunes.</Text>
        <Box boxSize="sm" mt={6}>
          <Image src="/images/music-streaming.jpg" alt="Music Streaming" borderRadius="md" />
        </Box>
        <Button colorScheme="teal" size="lg" mt={6}>Get Started</Button>
        <Button colorScheme="teal" size="lg" mt={6} onClick={openModal}>Create Playlist</Button>
      </VStack>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Playlist</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input 
              placeholder="Playlist Name" 
              value={playlistName} 
              onChange={(e) => setPlaylistName(e.target.value)} 
              mb={4} 
            />
            <Textarea 
              placeholder="Description (optional)" 
              value={playlistDescription} 
              onChange={(e) => setPlaylistDescription(e.target.value)} 
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={savePlaylist}>Save</Button>
            <Button variant="ghost" onClick={closeModal}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {playlists.length > 0 && (
        <Box mt={10} width="100%">
          <Heading as="h2" size="lg" mb={4}>Your Playlists</Heading>
          {playlists.map((playlist, index) => (
            <Box key={index} p={4} borderWidth="1px" borderRadius="md" mb={4} onClick={() => playSong(playlist.name)}>
              <Heading as="h3" size="md">{playlist.name}</Heading>
              {playlist.description && <Text mt={2}>{playlist.description}</Text>}
            </Box>
          ))}
        </Box>
      )}
    {currentSong && (
        <Box mt={10} width="100%" p={4} borderWidth="1px" borderRadius="md">
          <Heading as="h3" size="md" mb={4}>Now Playing: {currentSong}</Heading>
          <HStack spacing={4}>
            <IconButton icon={<FaBackward />} onClick={() => skipSong(-1)} />
            <IconButton icon={isPlaying ? <FaPause /> : <FaPlay />} onClick={togglePlayPause} />
            <IconButton icon={<FaForward />} onClick={() => skipSong(1)} />
          </HStack>
        </Box>
      )}
    </Container>
  );
};

export default Index;