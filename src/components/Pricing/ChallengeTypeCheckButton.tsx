import styled from "styled-components";

const ChallengeTypeCheckButton = ({ valid }: { valid: boolean }) => {
  return (
    <StyledWrapper>
      <div className="checkbox-wrapper">
        <label>
          {valid === true && <input type="checkbox" />}

          <span className="checkbox" />
        </label>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .checkbox-wrapper *,
  .checkbox-wrapper *::before,
  .checkbox-wrapper *::after {
    box-sizing: border-box;
  }

  .checkbox-wrapper label {
    display: block;
    width: 35px;
    height: 35px;
    cursor: pointer;
  }

  .checkbox-wrapper input {
    visibility: hidden;
    display: none;
  }

  .checkbox-wrapper input:checked ~ .checkbox {
    transform: rotate(45deg);
    width: 14px;
    margin-left: 12px;
    border-color: #ffffff;
    border-top-color: transparent;
    border-left-color: transparent;
    border-radius: 0;
  }

  .checkbox-wrapper .checkbox {
    display: block;
    width: inherit;
    height: inherit;
    border: 3px solid #ffffff;
    border-radius: 6px;
    transition: all 0.375s;
  }
`;

export default ChallengeTypeCheckButton;
