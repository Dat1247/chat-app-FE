import React from "react";
import styled from "styled-components";
import Robot from "../assets/robot.gif";
import Logout from "./Logout";

export default function Welcome({ currentUser }) {
	return (
		<Container>
			<img src={Robot} alt='robot' />
			<h1>
				Welcome, <span>{currentUser.username}</span>
			</h1>
			<h3>Please select a chat to Start Messaging.</h3>
			<div>
				<Logout />
			</div>
		</Container>
	);
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	color: ${(props) => props.theme.color};
	border: ${(props) => props.theme.borderApp};
	border-left: none;
	padding: 0 1rem;
	position: relative;
	& > div {
		position: absolute;
		top: 5%;
		right: 5%;
	}
	img {
		height: 20rem;
	}

	span {
		color: ${(props) => props.theme.colorName};
	}

	@media screen and (max-width: 576px) {
		img {
			height: 10rem;
		}
		h1 {
			font-size: 1.5rem;
		}
		h3 {
			font-size: 1rem;
		}
	}
`;
