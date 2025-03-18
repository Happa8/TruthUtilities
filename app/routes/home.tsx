import { Button, Card, Stack } from "@chakra-ui/react";
import type { Route } from "./+types/home";
import { NavLink } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <Stack w={"100%"} direction={"row"}>
      {/* <Card.Root width="320px" maxWidth={"100%"}>
        <Card.Body>
          <Card.Title>一括削除</Card.Title>
          <Card.Description>自分のTruthを全て削除します</Card.Description>
        </Card.Body>
        <Card.Footer justifyContent="flex-end">
          <Button asChild>
            <NavLink to="/delete-all-truth">利用する</NavLink>
          </Button>
        </Card.Footer>
      </Card.Root> */}

      <Card.Root width="320px" maxWidth={"100%"}>
        <Card.Body>
          <Card.Title>一括バックアップ</Card.Title>
          <Card.Description>
            自分のTruthデータを一括ダウンロードします
          </Card.Description>
        </Card.Body>
        <Card.Footer justifyContent="flex-end">
          <Button>利用する</Button>
        </Card.Footer>
      </Card.Root>
    </Stack>
  );
}
