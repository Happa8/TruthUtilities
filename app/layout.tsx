import {
  Box,
  Button,
  Card,
  Container,
  Heading,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Link, Outlet, useSearchParams } from "react-router";
import type { Route } from "./+types/layout";
import { getToken, loginWithRedirect, logout } from "./utils/auth";
import { toaster } from "./components/ui/toaster";
import { use, useEffect } from "react";
import { getVerifyCredentials } from "./utils/account";

export const clientLoader = async ({
  params,
  request,
}: Route.ClientLoaderArgs) => {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  let toasterMessage = "";
  let accessToken = localStorage.getItem("access_token");

  if (code) {
    await getToken(code).then((res) => {
      if (res.access_token) {
        localStorage.setItem("access_token", res.access_token);
        accessToken = res.access_token;
        toasterMessage = "ログインしました";
      }
    });
  }

  const isLogin = !!accessToken;

  if (isLogin && accessToken) {
    const myAccount = await getVerifyCredentials(accessToken);

    return {
      accessToken,
      isLogin,
      toasterMessage,
      myAccount,
    };
  }

  return {
    accessToken,
    isLogin,
    toasterMessage,
  };
};

export default function Layout({ loaderData }: Route.ComponentProps) {
  const { isLogin, accessToken, toasterMessage, myAccount } = loaderData;

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.has("code")) {
      setSearchParams({});
    }
  }, [searchParams]);

  useEffect(() => {
    if (toasterMessage && toasterMessage.length > 0) {
      toaster.create({ description: toasterMessage });
    }
  }, [toasterMessage]);

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
            <HStack gap={4}>
              {myAccount && (
                <Text fontSize={"sm"} color={"gray.500"}>
                  @{myAccount.acct} としてログイン中
                </Text>
              )}
              {!isLogin && (
                <Button asChild variant={"outline"}>
                  <Link to={loginWithRedirect()}>ログイン</Link>
                </Button>
              )}
              {isLogin && (
                <Button
                  variant={"outline"}
                  onClick={() => {
                    logout();
                    location.reload();
                  }}
                >
                  ログアウト
                </Button>
              )}
            </HStack>
          </HStack>
        </Container>
      </Box>
      <Container p={4}>
        <Card.Root>
          <Card.Body>
            <Card.Title>Truth Utils</Card.Title>
            <Card.Description>
              純米国産SNS
              TruthSocialの便利ツール群です。多分バグいっぱいあります。
              ご利用は自己責任でどうぞ。要望や文句は{" "}
              <Link to="https://truthsocial.com/@happa8">@happa8</Link>{" "}
              まで。ログインして使ってね。
            </Card.Description>
          </Card.Body>
        </Card.Root>
      </Container>
      <Container p={4}>
        <Outlet />
      </Container>
    </VStack>
  );
}
