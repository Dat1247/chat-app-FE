import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import ChatInput from "./ChatInput";
import Logout from "./Logout";
import { getAllMessageRoute, sendMessageRoute } from "../util/APIRoutes";
import { v4 as uuidv4 } from "uuid";

export default function ChatContainer({ currentChat, currentUser, socket }) {
	const [messages, setMessages] = useState([]);
	const [arrivalMessage, setArrivalMessage] = useState(null);
	const scrollRef = useRef();

	useEffect(() => {
		const getAllMsg = async () => {
			if (currentUser) {
				const response = await axios.post(getAllMessageRoute, {
					from: currentUser.id,
					to: currentChat._id,
				});
				setMessages(response.data);
			}
		};
		getAllMsg();
	}, [currentChat]);

	const handleSendMsg = async (msg) => {
		const result = await axios.post(sendMessageRoute, {
			from: currentUser.id,
			to: currentChat._id,
			message: msg,
		});

		socket.current.emit("send-msg", {
			to: currentChat._id,
			from: currentUser.id,
			message: msg,
		});
		const msgs = [...messages];
		msgs.push({ fromSelf: true, message: msg });
		setMessages(msgs);
	};

	useEffect(() => {
		if (socket.current) {
			socket.current.on("msg-receive", (msg) => {
				setArrivalMessage({ fromSelf: false, message: msg });
			});
		}
	}, []);

	useEffect(() => {
		arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
	}, [arrivalMessage]);

	useEffect(() => {
		scrollRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	return (
		<>
			{currentChat && (
				<Container>
					<div className='chat-header'>
						<div className='user-detail'>
							<div className='avatar'>
								<img
									src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
									alt='avatar'
								/>
							</div>
							<div className='username'>
								<h3>{currentChat.username}</h3>
							</div>
						</div>
						<Logout />
					</div>
					<div className='messages-container'>
						{messages.map((msg, index) => {
							return (
								<div key={uuidv4()} ref={scrollRef}>
									<div
										className={`message ${
											msg.fromSelf ? "sended" : "received"
										}`}>
										<div className='content'>
											<p>{msg.message}</p>
										</div>
									</div>
								</div>
							);
						})}
					</div>
					<ChatInput handleSendMsg={handleSendMsg} />
				</Container>
			)}
		</>
	);
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	overflow: hidden;
	border: ${(props) => props.theme.borderApp};
	border-left: none;

	@media screen and (min-width: 720px) and (max-width: 1080px) {
		grid-template-rows: 15% 70% 15%;
	}

	.chat-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.5rem 2rem;
		box-shadow: 0px 0px 10px 0px rgba(75, 75, 75, 0.5);
		.user-detail {
			display: flex;
			align-items: center;
			gap: 1rem;

			.avatar {
				img {
					height: 3rem;
				}
			}

			.username {
				h3 {
					color: ${(props) => props.theme.color};
				}
			}
		}
	}

	.messages-container {
		padding: 1rem 2rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		height: 100%;
		overflow: auto;
		&::-webkit-scrollbar {
			width: 0.2rem;
			&-thumb {
				background-color: ${(props) => props.theme.bgContact};
				width: 0.1rem;
				border-radius: 1rem;
			}
		}

		.message {
			display: flex;
			align-items: center;

			.content {
				max-width: 40%;
				overflow-wrap: break-word;
				padding: 1rem;
				font-size: 1rem;
				border-radius: 1rem;
				color: ${(props) => props.theme.colorMsg};
			}
		}

		.sended {
			justify-content: flex-end;

			.content {
				background-color: ${(props) => props.theme.bgSended};
			}
		}

		.received {
			justify-content: flex-start;

			.content {
				background-color: ${(props) => props.theme.bgReceived};
			}
		}
	}

	@media screen and (max-width: 576px) {
		.chat-header {
			padding: 1rem 0.5rem;
			.user-detail {
				gap: 0.5rem;
				.avatar {
					img {
						height: 2rem;
					}
				}
				.username {
					h3 {
						font-size: 1rem;
					}
				}
			}
		}
		.messages-container {
			padding: 0.5rem;
			.message {
				.content {
					max-width: 60%;
				}
			}
		}
	}
`;
