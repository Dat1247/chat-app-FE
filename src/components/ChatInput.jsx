import React, { useState } from "react";
import styled from "styled-components";
import EmojiPicker from "emoji-picker-react";
import { IoMdSend } from "react-icons/io";
import { BsEmojiSmileFill } from "react-icons/bs";

export default function ChatInput({ handleSendMsg }) {
	const [state, setState] = useState({
		showEmojiPicker: false,
		msg: "",
	});

	const handleEmojiPicker = () => {
		setState({
			...state,
			showEmojiPicker: !state.showEmojiPicker,
		});
	};

	const handleEmojiClick = (event, emoji) => {
		let message = state.msg;
		message += event.emoji;
		setState({
			...state,
			msg: message,
		});
	};

	const handleChangeInput = (e) => {
		setState({ ...state, msg: e.target.value });
	};

	const sendChat = (e) => {
		e.preventDefault();
		if (state.msg.length > 0) {
			handleSendMsg(state.msg);
			setState({
				...state,
				msg: "",
			});
		}
	};

	return (
		<Container>
			<div className='button-container'>
				<div className='emoji'>
					<BsEmojiSmileFill onClick={handleEmojiPicker} />
					{state.showEmojiPicker && (
						<EmojiPicker onEmojiClick={handleEmojiClick} />
					)}
				</div>
			</div>
			<form className='form-container' onSubmit={(e) => sendChat(e)}>
				<input
					type='text'
					placeholder='Type your message here'
					value={state.msg}
					onChange={handleChangeInput}
				/>

				<button className='submit'>
					<IoMdSend />
				</button>
			</form>
		</Container>
	);
}

const Container = styled.div`
	display: grid;
	grid-template-columns: 5% 95%;
	align-items: center;
	background-color: ${(props) => props.theme.bgDetail};
	padding: 2.1rem 2rem;
	box-shadow: 0px 0px 10px 0px rgba(75, 75, 75, 0.5);

	.button-container {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		color: ${(props) => props.theme.color};

		.emoji {
			position: relative;

			svg {
				font-size: 1.5rem;
				color: ${(props) => props.theme.colorEmoji};
				transition: 0.6s;
				cursor: pointer;
				&:hover {
					color: ${(props) => props.theme.colorEmojiHover};
				}
			}

			.EmojiPickerReact {
				position: absolute;
				top: -460px;
				background-color: ${(props) => props.theme.bgEmoji};
				box-shadow: 0 5px 10px #9a86f3;
				border-color: ${(props) => props.theme.borderColorEmoji};

				.epr-search {
					background-color: transparent;
				}
				.epr-emoji:hover > img {
					background-color: ${(props) => props.theme.bgEmojiHover} !important;
				}
				.epr-emoji-category-label {
					background-color: ${(props) => props.theme.bgEmoji};
					color: ${(props) => props.theme.colorLabelEmoji};
				}
				.epr-preview {
					display: none;
				}
			}
		}
	}

	.form-container {
		width: 100%;
		border-radius: 2rem;
		display: flex;
		align-items: center;
		gap: 1rem;
		background-color: ${(props) => props.theme.bgInput};
		position: relative;

		input {
			width: 90%;
			background-color: transparent;
			color: ${(props) => props.theme.color};
			border: none;
			padding-left: 1rem;
			font-size: 1rem;
			height: 2rem;
			&::selection {
				background-color: #9186f3;
			}
			&:focus {
				outline: none;
			}
		}

		button {
			position: absolute;
			top: 0;
			right: 0;
			padding: 0.3rem 1rem;
			border-radius: 2rem;
			display: flex;
			justify-content: center;
			align-items: center;
			background-color: ${(props) => props.theme.colorButton};
			border: none;
			cursor: pointer;
			transition: 0.6s;
			&:hover {
				background-color: ${(props) => props.theme.colorButtonHover};
			}

			svg {
				font-size: 1.5rem;
				color: ${(props) => props.theme.colorSvg};
			}
		}
	}

	@media screen and (min-width: 768.01px) and (max-width: 1000px) {
		gap: 1rem;
	}

	@media screen and (max-width: 768px) {
		padding: 2.2rem 1rem;
		gap: 0.5rem;
		.button-container {
			.emoji {
				.EmojiPickerReact {
					height: 350px !important;
					width: 40vw !important;
					top: -370px;
				}
			}
		}
		.form-container {
			gap: 1rem;
			input {
				font-size: 1rem;
				padding-left: 0.8rem;
			}
			button {
				padding: 0.5rem 1rem;
				svg {
					font-size: 1.1rem;
				}
			}
		}
	}

	@media screen and (max-width: 576px) {
		grid-template-columns: 15% 85%;
		padding: 1.5rem 0.5rem;
		gap: 0;
		.button-container {
			.emoji {
				svg {
					font-size: 1rem;
				}
				.EmojiPickerReact {
					top: -275px;
					height: 250px !important;
					width: 150px !important;
					.epr-header {
						.epr-header-overlay {
							padding: 0.5rem;
							.epr-skin-tones {
								display: none;
							}
						}
						.epr-category-nav {
							display: none;
						}
					}
					.epr-emoji-category-label {
						font-size: 0.9rem;
					}
					.epr-emoji-category-content {
						button {
							img {
								width: 30px;
							}
						}
					}
				}
			}
		}
		.form-container {
			gap: 0.5rem;
			input {
				font-size: 0.9rem;
				padding-left: 0.8rem;
			}
			button {
				padding: 0.5rem 0.8rem;
				svg {
					font-size: 1rem;
				}
			}
		}
	}
`;
