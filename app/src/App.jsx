import { useEffect, useState } from 'react';
import styled from 'styled-components';
import SearchResult from './component/SearchResult';


export const BASE_URL = "http://localhost:9000";

const App = () => {


  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [selectedButton, setSelectedButton] = useState("all");


  useEffect(() => {

    const fetchFoodData = async () => {
      setLoading(true);

      try {
        const response = await fetch(BASE_URL);
        const json = await response.json();
        console.log(json);
        setData(json);
        setFilteredData(json);
        setLoading(false);

      } catch (error) {
        setError("Unable to fetch Data");
      }

    }

    fetchFoodData();

  }, [])

  // const searchFood = (e) => {
  //   const searchValue = e.target.value.toLowerCase();
  //   console.log(searchValue);
  
  //   if (!searchValue) {
  //     setFilteredData(data?.filter((food) => 
  //       selectedButton === "all" ? true : food.type.toLowerCase().includes(selectedButton.toLowerCase())
  //     ));
  //     return;
  //   }
  
//   const filter = data?.filter((food) => 
  //     food.name.toLowerCase().includes(searchValue) &&
  //     (selectedButton === "all" || food.type.toLowerCase().includes(selectedButton.toLowerCase()))
  //   );
  
  //   setFilteredData(filter);
  //   console.log(filter);
  // };
  
  // const filterFood = (type) => {
  //   setSelectedButton(type);
  
  //   const filter = data?.filter((food) => 
  //     type === "all" ? true : food.type.toLowerCase().includes(type.toLowerCase())
  //   );
  
  //   setFilteredData(filter);
  // };
  
  

  const searchFood = (e) => {
    const searchValue = e.target.value;
    console.log(searchValue);

    if (searchValue == "") {
      setFilteredData(null);
    }

    const filter = data?.filter((food) => food.name.toLowerCase().includes(searchValue.toLowerCase()));
    setFilteredData(filter)
    console.log(filter)
  }

  const filterFood = (type)=>{
    if (type == "all"){
      setFilteredData(data);
      setSelectedButton("all");
      return;
    }

    const filter = data?.filter((food) => food.type.toLowerCase().includes(type.toLowerCase()));
    setFilteredData(filter)
    setSelectedButton(type)
  }

  const filterBtns = [

    {
      name: "All",
      type: "all",
    },
    {
      name: "Breakfast",
      type: "breakfast",
    },
    {
      name: "Lunch",
      type: "lunch",
    },
    {
      name: "Dinner",
      type: "dinner",
    },

  ];

  if (error) { <div>{error}</div> }
  if (loading) { <div>loading....</div> }


  return (
    <Container>
      <TopContainer>
        <div className='logo'>
          <img src="logo.svg" alt="logo" />
        </div>
        <div className="search">
          <input type="text" placeholder='Search' onChange={searchFood} />
        </div>
      </TopContainer>
      <FiterContainer>
        {
          filterBtns.map((value)=>(<Button isSelected={selectedButton === value.type} key={value.type} onClick={()=>filterFood(value.type)}>{value.name}</Button>))
        }
      </FiterContainer>
      <SearchResult data={filteredData} />
    </Container>
  )
}

export const Container = styled.section`
  max-width: 1200px;
  margin: 0 auto;
`;

const TopContainer = styled.div`
  height: 140px;
  display: flex;
  justify-content: space-between;
  padding: 16px;
  align-items: center;

  .search input{
    background-color: transparent;
    border: 1px solid red;
    color: white;
    border-radius: 5px;
    height: 40px;
    font-size: 15px;
    padding: 0 10px;
    &::placeholder{
      color: white;
    }
  }

  @media (0 < width < 600px){
    flex-direction: column;
    height: 120px;
  }

`;

const FiterContainer = styled.section`
  display: flex;
  justify-content: center;
  gap: 10px;
  padding-bottom: 40px;
`;

export const Button = styled.button`
  background-color: ${({isSelected})=> (isSelected ? "#f22f2f" : "#ff4343")} ;
  outline: 1px solid ${({isSelected})=> (isSelected ? "white" : "#ff4343")};
  border-radius: 5px;
  padding: 6px 12px;
  border: none;
  color: white;
  font-size: 15px;
  cursor: pointer;
  &:hover{
    background-color: #f22f2f;
  }
`;

export default App