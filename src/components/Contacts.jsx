import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Logo from "../assets/logo.svg";
import ErrorImage from "../assets/errorImg.png";

export default function Contacts({ contacts, currentUser, changeChat }) {
	const [state, setState] = useState({
		currentUserName: undefined,
		currentUserImage: undefined,
		currentSelected: undefined,
	});
	useEffect(() => {
		if (currentUser) {
			setState({
				...state,
				currentUserImage: currentUser.avatarImage,
				currentUserName: currentUser.username,
			});
		}
	}, [currentUser]);

	const changeCurrentChat = (index, contact) => {
		setState({ ...state, currentSelected: index });
		changeChat(contact);
	};

	return (
		<>
			{state.currentUserName && state.currentUserImage && (
				<Container>
					<div className='brand'>
						<img src={Logo} alt='logo' />
						<h3>Chat chill</h3>
					</div>
					<div className='contacts'>
						{contacts.map((contact, index) => {
							return (
								<div
									className={`contact ${
										index === state.currentSelected ? "selected" : ""
									}`}
									key={index}
									onClick={() => {
										changeCurrentChat(index, contact);
									}}>
									<div className='avatar'>
										<img
											src={
												contact.avatarImage
													? `data:image/svg+xml;base64,${contact.avatarImage}`
													: ErrorImage
											}
											alt='avatar'
										/>
									</div>
									<div className='username'>
										<h3>{contact.username}</h3>
									</div>
								</div>
							);
						})}
					</div>
					<div className='current-user'>
						<div className='avatar'>
							<img
								src={`data:image/svg+xml;base64,${state.currentUserImage}`}
								alt='avatar'
							/>
						</div>
						<div className='username'>
							<h1>{state.currentUserName}</h1>
						</div>
					</div>
				</Container>
			)}
		</>
	);
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	background-color: #080420;
	overflow: hidden;

	.brand {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 1rem;
		padding: 1.5rem 0;
		img {
			height: 3rem;
		}

		h3 {
			color: white;
			text-transform: uppercase;
		}
	}

	.contacts {
		display: flex;
		flex-direction: column;
		align-items: center;
		overflow: auto;
		gap: 0.8rem;
		flex-grow: 1;

		&::-webkit-scrollbar {
			width: 0.2rem;
			&-thumb {
				background-color: #ffffff39;
				width: 0.1rem;
				border-radius: 1rem;
			}
		}

		.contact {
			background-color: #ffffff39;
			min-height: 5rem;
			width: 90%;
			border-radius: 0.2rem;
			padding: 0.4rem;
			gap: 1rem;
			align-items: center;
			display: flex;
			transition: 0.5s ease-in-out;
			cursor: pointer;

			.avatar {
				img {
					height: 3rem;
					border-radius: 50%;
				}
			}

			.username {
				h3 {
					color: white;
				}
			}
		}

		.selected {
			background-color: #9186f3;
		}
	}

	.current-user {
		background-color: #0d0d30;
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 2rem;
		padding: 1rem 0;

		.avatar {
			img {
				height: 4rem;
				max-inline-size: 100%;
			}
		}

		.username {
			h1 {
				color: white;
			}
		}
	}

	@media screen and (max-width: 575.99px) {
		.brand {
			flex-direction: column;
			padding: 1rem 0;
			img {
				height: 2rem;
			}
			h3 {
				font-size: 1rem;
			}
		}
		.contacts {
			.contact {
				.avatar {
					img {
						height: 2rem;
						width: 2rem;
					}
				}
				.username {
					h3 {
						font-size: 1rem;
					}
				}
			}
		}
		.current-user {
			gap: 0.5rem;
			.avatar {
				img {
					height: 2.5rem;
				}
			}
			.username {
				h1 {
					font-size: 1.1rem;
				}
			}
		}
	}
`;
