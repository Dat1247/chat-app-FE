import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import Loader from "../assets/loader.gif";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Buffer } from "buffer";
import { setAvatarRoute } from "../util/APIRoutes";

export default function SetAvatar() {
	const [state, setState] = useState({
		avatars: [],
		isLoading: true,
		selectedAvatar: undefined,
	});
	const navigate = useNavigate();

	useEffect(() => {
		if (!localStorage.getItem("chat-app-user")) {
			navigate("/login");
		}
	}, []);

	const api = "https://api.multiavatar.com";

	const toastOptions = {
		position: "bottom-right",
		autoClose: 5000,
		pauseOnHover: true,
		draggable: true,
		theme: "dark",
	};

	const setProfilePicture = async () => {
		if (state.selectedAvatar === undefined) {
			toast.error("Please select an avatar", toastOptions);
		} else {
			const user = await JSON.parse(localStorage.getItem("chat-app-user"));
			const result = await axios.post(`${setAvatarRoute}/${user.id}`, {
				image: state.avatars[state.selectedAvatar],
			});

			if (result.data.isSet) {
				user.isAvatarImageSet = true;
				user.avatarImage = result.data.avatarImage;
				localStorage.setItem("chat-app-user", JSON.stringify(user));
				navigate("/");
			} else {
				toast.error("Error setting avatar. Please try again!", toastOptions);
			}
		}
	};

	useEffect(() => {
		const getDataAvatar = async () => {
			const data = [];
			for (let i = 0; i < 4; i++) {
				const random = Math.floor(Math.random() * 1000);
				const image = await axios.get(
					`${api}/${random}?apikey='cbvE5lw4dCmsH9'`
				);
				const buffer = new Buffer(image.data);

				data.push(buffer.toString("base64"));
			}

			setState({
				...state,
				avatars: data,
				isLoading: false,
			});
		};
		getDataAvatar();
	}, []);

	return (
		<>
			{state.isLoading ? (
				<Container>
					<img src={Loader} alt='loader' className='loader' />
				</Container>
			) : (
				<Container>
					<div className='title-container'>
						<h1>Pick an avatar as your profile picture</h1>
					</div>
					<div className='avatars'>
						{state.avatars.map((avatar, index) => {
							return (
								<div
									className={`avatar ${
										state.selectedAvatar === index ? "selected" : ""
									}`}
									key={index}>
									<img
										src={`data:image/svg+xml;base64,${avatar}`}
										alt='avatar'
										onClick={() => {
											setState({ ...state, selectedAvatar: index });
										}}
									/>
								</div>
							);
						})}
					</div>
					<button
						className='btn-select'
						onClick={() => {
							setProfilePicture();
						}}>
						Set as Profile Picture
					</button>
				</Container>
			)}

			<ToastContainer />
		</>
	);
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background-color: #131324;
	height: 100vh;
	width: 100vw;

	.loader {
		max-inline-size: 100%;
	}

	.title-container {
		h1 {
			color: white;
		}
	}

	.avatars {
		display: flex;
		gap: 2rem;
		margin-bottom: 2rem;
		.avatar {
			border: 0.4rem solid transparent;
			padding: 0.4rem;
			border-radius: 5rem;
			display: flex;
			justify-content: center;
			align-items: center;
			cursor: pointer;
			transition: 0.5s ease-in-out;

			img {
				height: 6rem;
			}
		}

		.selected {
			border: 0.4rem solid #4e0eff;
		}
	}

	.btn-select {
		background-color: #997af0;
		color: white;
		padding: 1rem 2rem;
		font-size: 1rem;
		font-weight: bold;
		border: none;
		cursor: pointer;
		border-radius: 0.4rem;
		text-transform: uppercase;
		transition: all 0.3s ease-in-out;
		&:hover {
			background-color: #4e0eff;
		}
	}
`;
