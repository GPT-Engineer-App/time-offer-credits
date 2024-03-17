import React, { useState } from "react";
import { Box, Heading, Text, Button, VStack, HStack, Image, useToast } from "@chakra-ui/react";
import { FaWallet, FaClock, FaCheckCircle } from "react-icons/fa";

const Index = () => {
  const [userCredits, setUserCredits] = useState(100);
  const [selectedService, setSelectedService] = useState(null);
  const toast = useToast();

  const services = [
    {
      id: 1,
      name: "Service 1",
      description: "This is the description for Service 1",
      duration: 30,
      price: 50,
      image: "https://images.unsplash.com/photo-1707759642885-42994e023046?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxzZXJ2aWNlJTIwMSUyMGljb258ZW58MHx8fHwxNzEwNjQ3ODMxfDA&ixlib=rb-4.0.3&q=80&w=1080",
    },
    {
      id: 2,
      name: "Service 2",
      description: "This is the description for Service 2",
      duration: 60,
      price: 80,
      image: "https://images.unsplash.com/photo-1600439614353-174ad0ee3b25?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxzZXJ2aWNlJTIwMiUyMGljb258ZW58MHx8fHwxNzEwNjQ3ODMyfDA&ixlib=rb-4.0.3&q=80&w=1080",
    },
    // Add more services...
  ];

  const handleServiceSelect = (service) => {
    setSelectedService(service);
  };

  const handleServiceAccept = () => {
    if (userCredits >= selectedService.price) {
      setUserCredits(userCredits - selectedService.price);
      toast({
        title: "Service Accepted",
        description: `You have accepted ${selectedService.name}`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setSelectedService(null);
    } else {
      toast({
        title: "Insufficient Credits",
        description: "You don't have enough credits to accept this service",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={8}>
      <Heading as="h1" size="xl" mb={8}>
        Service Provider
      </Heading>
      <HStack align="start" spacing={8}>
        <Box flex={1}>
          <Heading as="h2" size="lg" mb={4}>
            Available Services
          </Heading>
          <VStack align="stretch" spacing={4}>
            {services.map((service) => (
              <Box key={service.id} p={4} borderWidth={1} borderRadius="md" cursor="pointer" onClick={() => handleServiceSelect(service)} bg={selectedService === service ? "gray.100" : "white"}>
                <HStack align="center" mb={2}>
                  <Image src={service.image} boxSize={8} mr={2} />
                  <Heading as="h3" size="md">
                    {service.name}
                  </Heading>
                </HStack>
                <Text>{service.description}</Text>
                <HStack mt={4}>
                  <FaClock />
                  <Text>{service.duration} minutes</Text>
                </HStack>
                <HStack mt={2}>
                  <FaWallet />
                  <Text>{service.price} credits</Text>
                </HStack>
              </Box>
            ))}
          </VStack>
        </Box>
        <Box flex={1}>
          <Heading as="h2" size="lg" mb={4}>
            Selected Service
          </Heading>
          {selectedService ? (
            <Box p={4} borderWidth={1} borderRadius="md">
              <Heading as="h3" size="md" mb={2}>
                {selectedService.name}
              </Heading>
              <Text mb={4}>{selectedService.description}</Text>
              <HStack mb={4}>
                <FaClock />
                <Text>{selectedService.duration} minutes</Text>
              </HStack>
              <HStack mb={4}>
                <FaWallet />
                <Text>{selectedService.price} credits</Text>
              </HStack>
              <Button colorScheme="blue" leftIcon={<FaCheckCircle />} onClick={handleServiceAccept}>
                Accept Service
              </Button>
            </Box>
          ) : (
            <Text>No service selected</Text>
          )}
          <Box mt={8}>
            <Heading as="h3" size="md" mb={2}>
              Your Wallet
            </Heading>
            <HStack>
              <FaWallet />
              <Text>{userCredits} credits</Text>
            </HStack>
          </Box>
        </Box>
      </HStack>
    </Box>
  );
};

export default Index;
