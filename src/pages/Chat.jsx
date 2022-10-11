import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getAllUserRoute, host } from "../util/APIRoutes";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";
import { io } from "socket.io-client";

export default function Chat() {
	const socket = useRef();
	const [state, setState] = useState({
		contactsList: [],
		currentUser: undefined,
		currentChat: undefined,
		isLoaded: false,
	});

	const navigate = useNavigate();

	useEffect(() => {
		if (!localStorage.getItem("chat-app-user")) {
			navigate("/login");
		} else {
			const user = JSON.parse(localStorage.getItem("chat-app-user"));
			setState({
				...state,
				currentUser: user,
				isLoaded: true,
			});
		}
	}, []);

	useEffect(() => {
		if (state.currentUser) {
			socket.current = io(host);
			socket.current.emit("add-user", state.currentUser.id);
		}
	}, [state.currentUser]);

	useEffect(() => {
		const getContactsAPI = async () => {
			if (state.currentUser) {
				if (state.currentUser.isAvatarImageSet) {
					const data = await axios.get(
						`${getAllUserRoute}/${state.currentUser.id}`
					);
					setState({
						...state,
						contactsList: data.data,
					});
				} else {
					navigate("/setAvatar");
				}
			}
		};
		getContactsAPI();
	}, [state.currentUser]);

	const handleChatChange = (chat) => {
		setState({
			...state,
			currentChat: chat,
		});
	};

	return (
		<>
			<Container>
				<div className='container'>
					<Contacts
						contacts={state.contactsList}
						currentUser={state.currentUser}
						changeChat={handleChatChange}
					/>
					{state.isLoaded && state.currentChat === undefined ? (
						<Welcome currentUser={state.currentUser} />
					) : (
						<ChatContainer
							currentChat={state.currentChat}
							currentUser={state.currentUser}
							socket={socket}
						/>
					)}
				</div>
			</Container>
		</>
	);
}

const Container = styled.div`
	height: 100vh;
	width: 100vw;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 2rem;
	background-color: #131324;

	.container {
		height: 85vh;
		width: 85vw;
		background-color: #00000076;
		display: grid;
		grid-template-columns: 25% 75%;
		@media screen and (max-width: 767.99px) {
			grid-template-columns: 40% 60%;
		}
		@media screen and (min-width: 768px) and (max-width: 1000px) {
			grid-template-columns: 35% 65%;
		}
	}
`;
