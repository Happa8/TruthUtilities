import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  VStack,
} from "@chakra-ui/react";
import { Outlet } from "react-router";

export default function Layout() {
  return (
    <VStack align={"flex-start"}>
      <Box
        w="100%"
        bgColor={"gray.50"}
        borderBottom={1}
        borderColor="gray.200"
        borderBottomStyle={"solid"}
      >
        <Container p={4}>
          <HStack justify={"space-between"}>
            <Heading>Truth Utils</Heading>
            <HStack>
              <Button variant={"ghost"}>About</Button>
              <Button variant={"outline"}>ログイン</Button>
            </HStack>
          </HStack>
        </Container>
      </Box>
      <Container p={4}>
        <Outlet />
      </Container>
    </VStack>
  );
}
