import { Button } from "@chakra-ui/react";
import styled from "@emotion/styled";
import TextBox from "../../atoms/TextBox";
import BottonComponent from "../../components/button/block/Button";
import ImageComponent from "../../components/Image/Image";
import GameCreateMainOrganism from "../../organisms/GameCreateSection/GameCreateMainSection";

const GameTemplateLayout = styled('section')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    backgroundColor: '#194DD2',
    width: '80%',
    height: '85%',
    gridAutoColumns: '1fr 1fr',
    gridAutoRows: '20%',
}))

const GameHeaderLayout = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '10%',
}))

const GameSectionLayout = styled('div')(({ theme }) => ({
    width: '100%',
    height: '70%',
}))


const GameFooterLayout = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '20%',
}))

const ButtonComponent = styled('div')(({ theme }) => ({
    backgroundColor: '#312ECE',
}))


function GameCreateTemplate(props: { buttonType: string | undefined }) {
    const { buttonType } = props;

    return (
        <GameTemplateLayout>
            <GameHeaderLayout>
                <TextBox value={'Enjoy Game!'} />
            </GameHeaderLayout>
            <GameSectionLayout>
                <GameCreateMainOrganism />
            </GameSectionLayout>
            <GameFooterLayout>
                <ButtonComponent>
                    <BottonComponent value={buttonType ? buttonType : 'start'} />
                </ButtonComponent>
            </GameFooterLayout>
        </GameTemplateLayout>
    );
}

export default GameCreateTemplate;



