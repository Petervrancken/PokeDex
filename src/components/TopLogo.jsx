import React from 'react'
import Logo from "../afbeeldingen/Daco_4983345.png"
import like from "../sounds/opening.mp3";
import {
    Center,
    Box,
    Image
} from "@chakra-ui/react";





function TopLogo() {

    const likeAudio = new Audio(like);
    const playSound = audioFile => {
    audioFile.play();
    }
 
    
    return (
        <>
        <Box marginBottom="50px">
        <Center>
        <Image src={Logo} />
        </Center>
        <Center>
            <button className="pokeSong" onClick={()=> playSound(likeAudio)}>Play Song!</button>
        </Center>
        </Box>
        </>
        
    )
}

export default TopLogo
