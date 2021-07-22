import { Link } from "react-router-dom";
import styled from "styled-components";
import { routes } from "../routes/index";

interface Props {}

export default function Home(props: Props) {
  return (
    <div>
      <h1>Home 입니다.</h1>
      <Link to={routes.home}>Home</Link>
      <br />
      <Link to={routes.meetingRoom}>Meeting room</Link>
    </div>
  );
}

