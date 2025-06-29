import styled from "styled-components";
import JoinButton from "./JoinButton";
import { useTranslation } from "react-i18next";

const DiscordCard = () => {
  const { t } = useTranslation();

  return (
    <StyledWrapper>
      <div className="card">
        <div className="card-info flex-col">
          <h3 className="text-2xl text-center">
            {t("We’re bringing the best and brightest traders together")}
          </h3>
          <div className="text-3xl text-center font-bold flex gap-5 mb-10">
            {t("On")} <img src="/image/discord-brand.svg" alt="discord" />
          </div>
          <JoinButton />
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .card {
    --background: linear-gradient(to right, #00CCFF 10%,
        #8CD384 45%,
        #8CD384 67%,
        #FFD80E 87%);
    width: 400px;
    height: 450px;
    padding: 5px;
    border-radius: 1rem;
    overflow: visible;
    background: #f7ba2b;
    background: var(--background);
    position: relative;
    z-index: 1;
  }

  .card::after {
    position: absolute;
    content: "";
    top: 30px;
    left: 0;
    right: 0;
    z-index: -1;
    height: 100%;
    width: 100%;
    transform: scale(0.8);
    filter: blur(25px);
    background: #f7ba2b;
    background: var(--background);
    transition: opacity 0.5s;
  }

  .card-info {
    --color: #181818;
    background: var(--color);
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    overflow: visible;
    border-radius: 0.7rem;
  }

  .card .title {
    font-weight: bold;
    letter-spacing: 0.1em;
  }
`;

export default DiscordCard;
