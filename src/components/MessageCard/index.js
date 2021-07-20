import styled from "styled-components";

const MessageContainer = styled.li`
  display: flex;
  margin-bottom: 10px;
  background-color: ${({ theme }) => theme.colors.gray5};
  border-radius: 8px;
  padding: 20px;
  @media(max-width: 1110px) {
    flex-direction: column;
    align-items: center;
  }
  img {
    border-radius: 50%;
    width: 140px;
    height: 140px;
  }
  div {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    font-size: 16px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.gray1};
    width: 100%;
    padding: 16px;
    text-align: justify;
    @media(max-width: 1110px) {
      text-align: center;
    }
  }
  a {
    text-decoration: none;
    font-weight: bold;
    font-size: 14px;
    line-height: 17px;
    color: ${({ theme }) => theme.colors.primaryText};
  }
  p {
    font-size: 16px;
    font-weight: 400;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  span {
    align-self: flex-end;
    font-size: 10px;
    line-height: 17px;
    font-style: italic;
    color: ${({ theme }) => theme.colors.primaryElement};
  }
`;


export default function MessageCard({ item }) {
  const created = new Date(item.createdAt);

  return (
    <>
      <MessageContainer>
        <img src={`https://github.com/${item.githubUser}.png`} />

        <div>
          <a href={`https://github.com/${item.githubUser}`} target="_blank">
            @{item.githubUser}
          </a>
          <p>
            {item.message}
          </p>

          <span>
            adicionado em {created.toLocaleString()}
          </span>
        </div>

      </MessageContainer>
    </>
  );
}