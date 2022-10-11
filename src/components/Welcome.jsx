import React from "react";
import styled from "styled-components";
import Robot from "../assets/robot.gif";

export default function Welcome({ currentUser }) {
	return (
		<Container>
			<img src={Robot} alt='robot' />
			<h1>
				Welcome, <span>{currentUser.username}</span>
			</h1>
			<h3>Please select a chat to Start Messaging.</h3>
		</Container>
	);
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	color: white;
	padding: 0 1rem;

	img {
		height: 20rem;
	}

	span {
		color: #4e0eff;
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
