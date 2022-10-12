import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import "./App.css";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SetAvatar from "./pages/SetAvatar";
import { darkTheme } from "./util/DarkTheme";
import { whiteTheme } from "./util/WhiteTheme";

export const initialState = {
	isDarkMode: true,
	theme: darkTheme,
};
export const reducer = (state, action) => {
	switch (action.type) {
		case "TOGGLE_DARK_MODE": {
			state.isDarkMode = !state.isDarkMode;
			state.theme = state.isDarkMode ? darkTheme : whiteTheme;
			return {
				...state,
			};
		}
		default:
			return state;
	}
};

function App() {
	return (
		<ThemeProvider theme={initialState.theme}>
			<BrowserRouter>
				<Routes>
					<Route path='/register' element={<Register />} />
					<Route path='/login' element={<Login />} />
					<Route path='/setAvatar' element={<SetAvatar />} />
					<Route path='/' element={<Chat />} />
				</Routes>
			</BrowserRouter>
		</ThemeProvider>
	);
}

export default App;
