import { useEffect, useRef } from "react";
import { useLogin } from "@pankod/refine-core";
import { homeharbor } from "../assets";
import { CredentialResponse } from "../interfaces/google";
import { Container, Box, TextField, Button, Typography } from "@pankod/refine-mui";

export const Login: React.FC = () => {
  const { mutate: login } = useLogin<CredentialResponse>();

  const GoogleButton = (): JSX.Element => {
    const divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (typeof window === "undefined" || !window.google || !divRef.current) {
        return;
      }

      try {
        window.google.accounts.id.initialize({
          ux_mode: "popup",
          client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
          callback: async (res: CredentialResponse) => {
            if (res.credential) {
              login(res);
            }
          },
        });
        window.google.accounts.id.renderButton(divRef.current, {
          theme: "filled_blue",
          size: "large",
          type: "standard",
        });
      } catch (error) {
        console.log(error);
      }
    }, []); // you can also add your client id as dependency here

    return <div ref={divRef} />;
  };

  return (
    <Box
      component="div"
      sx={{
        backgroundImage: `url('https://res.cloudinary.com/dw6dekesu/image/upload/v1677911769/bg_lgofpr.jpg')`,
        height: '100vh',
        backgroundSize: 'cover',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}

    >
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "#FFFFFF",
          borderRadius: '30px',
          boxShadow: '0px 5px 5px rgba(0, 0, 0, 0.25)',
          height: '75%'
        }}
      >
        <Box
          sx={{
            my: "40px",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div><img src={homeharbor} alt="HomeHarbor Logo" width="250px" /></div>
          <TextField label="Username" variant="outlined" margin="normal" sx={{ width: "360px", mt: "30px" }} />
          <TextField label="Password" variant="outlined" margin="normal" sx={{ width: "360px", mt: "10px" }} type="password" />
          <Button type="submit" variant="contained" color="primary" sx={{ mt: "20px", width: "360px", height: "56px" }}>Login</Button>
          <Button type="submit" variant="contained" sx={{ mt: "20px", width: "360px", height: "56px", backgroundColor: 'blue', '&:hover': { backgroundColor: '#00056e', } }}>Sign Up</Button>
          <Typography fontSize={20} fontWeight={700} mt={2}>OR</Typography>
          <Box mt={2}><GoogleButton /></Box>
        </Box>
      </Container>
    </Box>
  );
};
