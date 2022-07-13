import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    html,
    body {
        padding: 0;
        margin: 0;
        font-family: Droid Sans, Helvetica Neue, sans-serif;
            background-color: white;
            color: black;
    }

    a {
        color: inherit;
        text-decoration: none;
    }

    * {
        box-sizing: border-box;
    }

    @keyframes fadeout {
        0% {
            opacity: 1;
        }

        50% {
            opacity: 0
        }

        100% {
            opacity: 1;
        }
    }

    @keyframes dropped {
        from {
            clip-path: circle(25%)
        }

        to {
            clip-path: circle(75%)
        }
    }

    .animate-dropped {
        animation: dropped 0.5s ease-in;
    }

    .animate-fadeout {
        animation: fadeout 1s ease-in-out;
    }
`;
