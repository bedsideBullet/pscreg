import React, { useState } from "react";
import {
	Container,
	Box,
	Typography,
	Grid,
	TextField,
	Button,
	FormGroup,
	FormControlLabel,
	Checkbox,
} from "@mui/material";
import StateSelect from "./StateSelect";
import PhoneInput from "./PhoneInput";
import YearSelect from "./Yearselect";
import MakeSelect from "./MakeSelect";
import axios from "axios";

const RegistrationForm: React.FC = () => {
	const [firstName, setFirstName] = useState<string>("");
	const [lastName, setLastName] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [emailError, setEmailError] = useState<string>("");
	const [vehicleModel, setVehicleModel] = useState<string>("");
	const [otherNotes, setOtherNotes] = useState<string>("");
	const [formError, setFormError] = useState<boolean>(false);

	const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		setFirstName(e.target.value);
	const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		setLastName(e.target.value);
	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setEmail(value);
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		setEmailError(!emailRegex.test(value) ? "Invalid email address" : "");
	};
	const handleVehicleModelChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		setVehicleModel(e.target.value);
	const handleOtherNotesChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		setOtherNotes(e.target.value);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!firstName || !lastName || !email || emailError) {
			setFormError(true);
			return;
		}

		const formData = { firstName, lastName, email, vehicleModel, otherNotes };

		try {
			const response = await axios.post(
				"http://localhost:5000/api/register",
				formData
			);
			alert("Registration successful: " + response.data.message);
			setFirstName("");
			setLastName("");
			setEmail("");
			setVehicleModel("");
			setOtherNotes("");
			setFormError(false);
		} catch (error) {
			const message = axios.isAxiosError(error)
				? error.response?.data?.message || error.message
				: error instanceof Error
				? error.message
				: "An unknown error occurred.";
			alert("Registration failed: " + message);
		}
	};

	return (
		<>
			<Container
				component="header"
				maxWidth={false}
				sx={{
					position: "fixed",
					top: 0,
					width: "100%",
					bgcolor: "black",
					zIndex: 1100,
					maxHeight: 100,
					left: 0,
				}}
			>
				<Box
					component="img"
					src="src/assets/PSC_logo.png"
					alt="PSC Logo"
					sx={{
						height: 75,
						pt: 0.5,
						pb: 0.5,
					}}
				/>
			</Container>

			<Box
				sx={{
					position: "fixed",
					top: 0,
					left: 0,
					width: "100vw",
					height: "100vh",
					backgroundImage: "url('src/assets/Untitled (26).png')",
					backgroundSize: "cover",
					backgroundPosition: "center",
					backgroundRepeat: "no-repeat",
					zIndex: -1,
				}}
			/>

			<Container
				component="main"
				maxWidth="sm"
				sx={{
					position: "relative",
					top: "100px",
					zIndex: 1,
					overflowY: "auto",
					height: "calc(100vh - 100px)",
				}}
			>
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						bgcolor: "rgba(255, 255, 255, 0.8)",
						padding: "8px 32px",
						borderRadius: 2,
					}}
				>
					<Typography component="h1" variant="h3">
						Contest Registration
					</Typography>
					<Typography component="p" variant="h6">
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et, vero
						consequuntur. Iure ea, aut ratione perspiciatis
					</Typography>
					<Box
						component="form"
						onSubmit={handleSubmit}
						noValidate
						sx={{ mt: 3 }}
					>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={6}>
								<TextField
									autoComplete="given-name"
									name="firstName"
									required
									fullWidth
									id="firstName"
									label="First Name"
									autoFocus
									value={firstName}
									onChange={handleFirstNameChange}
									error={formError && !firstName}
									helperText={
										formError && !firstName ? "First name is required" : ""
									}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									required
									fullWidth
									id="lastName"
									label="Last Name"
									name="lastName"
									autoComplete="family-name"
									value={lastName}
									onChange={handleLastNameChange}
									error={formError && !lastName}
									helperText={
										formError && !lastName ? "Last name is required" : ""
									}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField fullWidth id="city" label="City" type="string" />
							</Grid>
							<Grid item xs={12} sm={6}>
								<StateSelect />
							</Grid>

							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									id="email"
									label="Email Address"
									name="email"
									autoComplete="email"
									value={email}
									onChange={handleEmailChange}
									error={!!emailError}
									helperText={emailError}
								/>
							</Grid>
							<Grid item xs={12} sm={8}>
								<PhoneInput />
							</Grid>
							<Grid item xs={12} sm={4}>
								<YearSelect />
							</Grid>
							<Grid item xs={12} sm={6}>
								<MakeSelect />
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									fullWidth
									id="vehicleModel"
									label="Vehicle Model"
									name="vehicleModel"
									value={vehicleModel}
									onChange={handleVehicleModelChange}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									fullWidth
									id="VehicleNotes"
									label="Vehicle Notes (motor swap etc...)"
									name="otherNotes"
									multiline
									rows={2}
									value={otherNotes}
									onChange={handleOtherNotesChange}
								/>
							</Grid>
						</Grid>
						<FormGroup sx={{ pt: 1 }}>
							<FormControlLabel
								control={<Checkbox color="primary" required />}
								label="By checking this box, you confirm that you are 18 years or older."
								sx={{
									typography: "body2",
									"& .MuiTypography-root": {
										fontSize: "0.9rem",
									},
								}}
							/>
						</FormGroup>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="error"
							sx={{ mt: 1, mb: 2 }}
						>
							Register
						</Button>
					</Box>
				</Box>
			</Container>
		</>
	);
};

export default RegistrationForm;
