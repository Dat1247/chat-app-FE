import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Logo from "../assets/logo.svg";
import ErrorImage from "../assets/errorImg.png";

export default function Contacts({
	contacts,
	currentUser,
	changeChat,
	dispatch,
	darkMode,
}) {
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
					<div className='dark-mode-toggle'>
						<h3>Dark Mode: </h3>
						<div>
							<span>Off</span>
							<label htmlFor='checkbox'>
								<input
									type='checkbox'
									name=''
									id='checkbox'
									checked={darkMode.isDarkMode}
									onChange={() => {
										dispatch({
											type: "TOGGLE_DARK_MODE",
										});
									}}
								/>
								<div className='slider'></div>
							</label>
							<span>On</span>
						</div>
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
	background-color: ${(props) => props.theme.bgDetail};
	border: ${(props) => props.theme.borderApp};
	overflow: hidden;

	.brand {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 1rem;
		padding: 1.5rem 0 0.5rem;
		img {
			height: 3rem;
		}

		h3 {
			color: ${(props) => props.theme.color};
			text-transform: uppercase;
		}
	}

	.dark-mode-toggle {
		padding-bottom: 1.5rem;
		display: flex;
		justify-content: center;
		align-items: center;
		h3 {
			color: ${(props) => props.theme.color};
			margin-right: 0.4rem;
			font-size: 1rem;
		}
		& > div {
			display: flex;
			justify-content: center;
			align-items: center;
			span {
				color: ${(props) => props.theme.color};
				font-size: 0.8rem;
			}
			label {
				height: 25px;
				width: 48px;
				position: relative;
				margin: 0 5px;
				input {
					display: none;
					&:checked + .slider::before {
						transform: translateX(22px);
					}
				}
				.slider {
					background-color: ${(props) => props.theme.bgSlide};
					position: absolute;
					top: 0;
					left: 0;
					bottom: 0;
					right: 0;
					border-radius: 34px;
					cursor: pointer;
					&::before {
						content: "";
						position: absolute;
						width: 18px;
						height: 18px;
						background-color: ${(props) => props.theme.bgToggleButton};
						border-radius: 50%;
						display: inline-block;
						bottom: 4px;
						left: 4px;
						transition: 0.5s;
					}
				}
			}
		}
	}

	.contacts {
		display: flex;
		flex-direction: column;
		align-items: center;
		overflow: auto;
		gap: 0.8rem;
		flex-grow: 1;
		position: relative;

		&::-webkit-scrollbar {
			width: 0.2rem;
			&-thumb {
				background-color: ${(props) => props.theme.bgContact};
				width: 0.1rem;
				border-radius: 1rem;
			}
		}

		.contact {
			background-color: ${(props) => props.theme.bgContact};
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
				display: block;
				h3 {
					color: ${(props) => props.theme.color};
				}
			}
		}

		.selected {
			background-color: ${(props) => props.theme.bgContactSelect};
		}
	}

	.current-user {
		background-color: ${(props) => props.theme.bgInfoUser};
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 1rem;
		padding: 1rem 0;

		.avatar {
			img {
				height: 4rem;
				max-inline-size: 100%;
			}
		}

		.username {
			h1 {
				color: ${(props) => props.theme.color};
			}
		}
	}

	@media screen and (max-width: 576px) {
		.brand {
			flex-direction: column;
			padding: 1rem 0;
			img {
				height: 2rem;
			}
			h3 {
				font-size: 1.1rem;
			}
		}
		.dark-mode-toggle {
			flex-direction: column;
			h3 {
				font-size: 0.9rem;
			}
			& > div {
				span {
					font-size: 0.75rem;
				}
				label {
					width: 40px;
					height: 20px;
					input:checked + .slider::before {
						transform: translateX(17px);
					}
					.slider::before {
						bottom: 2px;
						left: 2px;
					}
				}
			}
		}
		.contacts {
			.contact {
				justify-content: center;
				min-height: 0;
				gap: 0;
				flex-direction: column;
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
