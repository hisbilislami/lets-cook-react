import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

function Recipe() {
  const [details, setDetails] = useState<{ [key: string]: any }>({});

  const [activeTab, setActiveTab] = useState<string>("instructions");

  let params = useParams();
  const fetchDetails = async () => {
    const data = await fetch(
      `https://api.spoonacular.com/recipes/${params.id}/information?apiKey=${process.env.REACT_APP_API_KEY}`
    );
    const detailData = await data.json();
    setDetails(detailData);
  };

  useEffect(() => {
    fetchDetails();
  }, [params.id]);

  return (
    <DetailWrapper>
      <div>
        <h2>{details.title}</h2>
        <img src={details.image} alt={details.title} />
      </div>
      <Info>
        <Button
          onClick={() => setActiveTab("instructions")}
          className={activeTab === "instructions" ? "active" : ""}
        >
          Instructions
        </Button>
        <Button
          onClick={() => setActiveTab("ingredients")}
          className={activeTab === "ingredients" ? "active" : ""}
        >
          Ingredients
        </Button>
        {activeTab === "instructions" && (
          <div>
            <p
              dangerouslySetInnerHTML={{ __html: details.instructions }}
              style={{ marginBottom: "2rem", marginTop: "2rem" }}
            ></p>
            <p dangerouslySetInnerHTML={{ __html: details.summary }}></p>
          </div>
        )}
        {activeTab === "ingredients" && (
          <ul>
            {details.extendedIngredients.map((eg: any) => {
              return <li key={eg.id}>{eg.original}</li>;
            })}
          </ul>
        )}
      </Info>
    </DetailWrapper>
  );
}

const DetailWrapper = styled.div`
  margin-top: 2rem;
  margin-bottom: 1rem;
  display: flex;

  &.active {
    background: linear-gradient(35deg, #494949, #313131);
    color: white;
  }
  h2 {
    margin-bottom: 1rem;
    font-size: 1.2rem;
  }
  li {
    font-size: 1.2rem;
    line-height: 1.5rem;
  }
  ul {
    margin-top: 1rem;
  }
  img {
    width: 100%;
  }
  p {
    margin-bottom: 1rem;
    font-size: 0.5rem;
  }
`;

const Button = styled.button`
  padding: 0.2rem 0.7rem;
  color: #313131;
  background: white;
  border: 2px solid black;
  margin-right: 2rem;
  font-weight: 600;

  &.active {
    background: linear-gradient(35deg, #494949, #313131);
    color: white;
  }
`;

const Info = styled.div`
  width: 100%;
  margin-left: 5rem;
`;

export default Recipe;
