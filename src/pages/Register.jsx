import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import Logo from "../assets/logo.svg";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { registerRoute } from "../util/APIRoutes";

function Register() {
	const [values, setValues] = useState({
		username: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
	const navigate = useNavigate();

	useEffect(() => {
		if (localStorage.getItem("chat-app-user")) {
			navigate("/");
		}
	}, []);

	const toastOptions = {
		position: "bottom-right",
		autoClose: 5000,
		pauseOnHover: true,
		draggable: true,
		theme: "dark",
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setValues({ ...values, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (handleValidation()) {
			const { username, email, password } = values;
			try {
				const result = await axios.post(registerRoute, {
					username,
					email,
					password,
				});

				if (result.status === 201) {
					navigate("/login");
				}
			} catch (err) {
				toast.error(err.response?.data.message, toastOptions);
			}
		}
	};

	const handleValidation = () => {
		const { email, password, confirmPassword } = values;
		if (password !== confirmPassword) {
			toast.error(
				"Password and Confirm Password should be same!",
				toastOptions
			);
			return false;
		} else if (password.length < 6) {
			toast.error(
				"Password should be equal or greater than 6 characters!",
				toastOptions
			);
			return false;
		} else if (email === "") {
			toast.error("Email is required!", toastOptions);
			return false;
		}
		return true;
	};

	return (
		<>
			<FormComponent>
				<form onSubmit={handleSubmit}>
					<div className='brand'>
						<img src={Logo} alt='logo' />
						<h1>chat chill</h1>
					</div>
					<input
						type='text'
						placeholder='Enter Username'
						name='username'
						onChange={handleChange}
					/>
					<input
						type='email'
						placeholder='Enter Email'
						name='email'
						onChange={handleChange}
					/>
					<input
						type='password'
						placeholder='Enter Password'
						name='password'
						onChange={handleChange}
					/>
					<input
						type='password'
						placeholder='Confirm Password'
						name='confirmPassword'
						onChange={handleChange}
					/>
					<button type='submit'>Create User</button>
					<span>
						Already have an account ? <Link to='/login'>Login</Link>{" "}
					</span>
				</form>
			</FormComponent>
			<ToastContainer />
		</>
	);
}

const FormComponent = styled.div`
	height: 100vh;
	width: 100vw;
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 1rem;
	align-items: center;
	background-color: #131324;

	.brand {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1rem;

		img {
			height: 5rem;
		}

		h1 {
			color: white;
			text-transform: uppercase;
		}
	}

	form {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		background-color: #00000076;
		border-radius: 2rem;
		padding: 3rem 5rem;

		input {
			background-color: transparent;
			padding: 1rem;
			color: white;
			border: 0.1rem solid #4e0eff;
			border-radius: 0.4rem;
			width: 100%;
			font-size: 1rem;
			&:focus {
				border: 0.1rem solid #997af0;
				outline: none;
			}
		}

		button {
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

		span {
			color: white;
			text-transform: uppercase;
			a {
				color: #4e0eff;
				text-decoration: none;
				font-weight: bold;
			}
		}
	}
`;

export default Register;
