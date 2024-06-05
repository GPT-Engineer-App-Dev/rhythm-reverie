import { useState } from "react";
import { Container, VStack, Text, Heading, Box, Image, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Input, Textarea } from "@chakra-ui/react";

const Index = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [playlistName, setPlaylistName] = useState("");
  const [playlistDescription, setPlaylistDescription] = useState("");
  const [playlists, setPlaylists] = useState([]);

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
            <Box key={index} p={4} borderWidth="1px" borderRadius="md" mb={4}>
              <Heading as="h3" size="md">{playlist.name}</Heading>
              {playlist.description && <Text mt={2}>{playlist.description}</Text>}
            </Box>
          ))}
        </Box>
      )}
    </Container>
  );
};

export default Index;