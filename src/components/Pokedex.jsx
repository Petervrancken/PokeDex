import React, {useState, useEffect} from 'react'
import loadImage from "../afbeeldingen/pokeball.png"
import ReactPaginate from 'react-paginate';
import {
    Center,
    Text,
    Box,
    Image,
    Grid,
} from "@chakra-ui/react";

function Pokedex() {
    const [catchInput, setCatchInput] = useState("");
    const [buttonInput, setButtonInput] = useState("");
    //const [buttonCatch, setButtonCatch] = useState(false);
    const [catchEm, setCatchEm] = useState("");
    const [loading, setLoading] = useState(false);
    const [pokemons, setPokemons] = useState(0);
    const [powers, setPowers] = useState("");
    const [error, setError] = useState("");
    const [catchEmAll, setCatchEmAll] = useState(false);
    const [allPokemons, setAllPokemons] = useState("");

    //pagination tryout
    const [pageNumber, setPageNumber] = useState(0);


    

    

    useEffect(()=>{
        if(catchEmAll){
            setPokemons("")
            //setButtonInput("")
            setLoading(true)
            setCatchInput("");
            
            setError('')
            console.log("Start Loading catchEmAll")
            fetch(`https://pokeapi.co/api/v2/pokemon?offset=20&limit=100`)
            .then(response=>response.json())
            .then(data=>{
                //const posts = data.results;
                //console.log(data.sprites.front_default);
                //console.log(data.abilities);
                //console.log(data.results) //&& data.results.map(result=> result.name))
                setAllPokemons(data.results);
                //setPowers(powers)
            })
            .catch(error=> {
                console.log("ERROR!!!!",error)
    
            })
            .finally(()=>{
                setLoading(false);
                setError("");
                console.log("Loading finished")
            })
        }


        if(catchEm || buttonInput){
        setLoading(true)
        setPokemons("");
        
        //setCatchInput("");
        setPowers("")
        setError('') //hiermee verwijder je de foutmelding na het ingeven van een juiste pokemon :)
        console.log("Start loading catchEm")
        fetch(`https://pokeapi.co/api/v2/pokemon/${catchInput || buttonInput}`)
        .then(response => response.json())
        .then(data =>{
            const powers = data.abilities
            //console.log(data.sprites.front_default);
            //console.log(data.abilities);
            //console.log([data])
            setPokemons([data]);
            setPowers(powers)
            
        })
        .catch(error=> {
            console.log("ERROR!!!!",error)
            setError(error); // aangeven dat er een error is met een foute naamgeving

        })
        .finally(()=>{
            setLoading(false);
            console.log("Loading finished")
        })
        }

    },[catchEm, catchEmAll, buttonInput])


    // bij loading is de image te zwaar bij traag internet
    if(loading) {
        return (
            <Center>
            <Box pt="150px">
            <Image pt="50px" id="rotation" src={loadImage} h="200px" w="200px" />
            </Box>
            </Center>
    )}

    //PAGINATION
    const usersPerPage = 12;
    const pagesVisited = pageNumber * usersPerPage;
    const showPokemons = allPokemons.slice(pagesVisited, pagesVisited + usersPerPage);
    //console.log(showPokemons, 'test')
    //console.log(allPokemons.length)
    const pageCount = Math.ceil(allPokemons.length / usersPerPage);
    //console.log(pageCount)
    const changePage=({selected})=>{
        setPageNumber(selected)
    }

    return (
        <Box>
        <Center>
        <Box>
        <form onSubmit={(e)=>{
            e.preventDefault();
            setCatchEm(catchInput);
        }}>
            <Box>
            <input 
            id="submitInput"
            placeholder="Insert pokemon"
            type="text"
            value={catchInput}
            onChange={(e)=>{setCatchInput(e.target.value)}}
             />
            <Box>
            <button id="submitButton">Catch one</button>
            </Box>
            {error && <Text w="200px" fontFamily="arial" color="red">Pokemon doesn't exist, please try again</Text>}
            </Box>
        </form>

        <form onSubmit={(e)=>{
            e.preventDefault();
            setCatchEmAll(true);
        }}>
            <Box>
            <button id="submitButton">Catch em all!</button>
            </Box>
        </form>
        </Box>
        </Center>


        <Center>
        <Box>
        {pokemons.length > 0 && pokemons.map((pokemon) => (
        <div key={pokemon.id}>
        <Image h="300px" w="300px" src={pokemon.sprites.front_default} />
        <Text fontFamily="arial" mt="0px" mb="5px" fontSize="22px">{pokemon.name.charAt(0).toUpperCase()+ pokemon.name.slice(1)}:</Text>
        </div>)
        )}

        {powers &&  <Box bgColor="blue" borderRadius="10px" p="10px">
                    <Text fontFamily="arial" color="white" mb="8px" mt="0px">Powers:</Text>
                    {powers.length > 0 && powers.map((power) => (<>
                    <Text mt="0px" mb="5px" fontFamily="arial" color="lightgreen" fontSize="14px" key={2}>{power.ability.name.charAt(0).toUpperCase()+ power.ability.name.slice(1)}</Text>
                    </>)
                    )}
                    </Box> 
        }
        </Box>
        </Center>

        <Center>
        <Box w="80%" pt="25px">
        <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        {showPokemons.length > 1 && showPokemons.map((pokemon) => (
                            <Center>
                            <div id="allPokemonsFlex" key={pokemon.id}>
                            <form onSubmit={(e)=>{
                            e.preventDefault();
                            console.log("click")
                            setButtonInput(pokemon.url.slice(-3));
                                }}>
                                    <Box>
                                    <button id="listButton" fontFamily="arial" mt="0px" mb="5px" fontSize="22px">{pokemon.name.charAt(0).toUpperCase()+ pokemon.name.slice(1)}:</button>
                                    </Box>
                                </form>
                            
                            </div>
                            </Center>
                            )
                            )
        }
        
        </Grid>
        {showPokemons.length > 1 &&
        <ReactPaginate 
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"buttons"}
        previousLinkClassName={"previousButton"}
        nextLinkClassName={"nextButton"}
        disabledClassName={"disabled"}
        activeClassName={"active"}
    />
        }
        
        </Box>
        </Center>
        </Box>
    )
}

export default Pokedex


