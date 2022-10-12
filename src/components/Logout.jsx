import React from "react";
import { BiPowerOff } from "react-icons/bi";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export default function Logout() {
	const navigate = useNavigate();

	const handleClick = () => {
		localStorage.clear();
		navigate("/login");
	};

	return (
		<Button onClick={handleClick}>
			<BiPowerOff />
		</Button>
	);
}

const Button = styled.button`
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 0.5rem;
	border-radius: 0.5rem;
	background-color: ${(props) => props.theme.colorButton};
	cursor: pointer;
	border: none;
	transition: 0.3s ease-in-out;
	&:hover {
		background-color: ${(props) => props.theme.colorButtonHover};
	}

	svg {
		font-size: 1.3rem;
		color: ${(props) => props.theme.colorSvg};
	}

	@media screen and (max-width: 576px) {
		svg {
			font-size: 1rem;
		}
	}
`;
