import { useEffect, useRef } from "react";
import { useLogin } from "@pankod/refine-core";
import { Container, Box } from "@pankod/refine-mui";
import { yariga } from "../assets";
import { CredentialResponse } from "../interfaces/google";

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
          size: "medium",
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
          boxShadow: '0px 5px 5px rgba(0, 0, 0, 0.25)'
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
          <div><img src={yariga} alt="Yariga Logo" /></div>
          <Box mt={4}><GoogleButton /></Box>
        </Box>
      </Container>
    </Box>
  );
};
