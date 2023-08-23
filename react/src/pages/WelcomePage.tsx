import styled from "styled-components";

const LandingPage = styled.div`
    padding: 32px;
    font-size: 300%;
`;


export function WelcomePage() {
    return <LandingPage>
        <h1>
            Welcome!
        </h1>
            <div>
            This is heavily work in-progress.
        </div>
    </LandingPage>
}