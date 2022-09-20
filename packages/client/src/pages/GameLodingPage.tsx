import styled from '@emotion/styled';
import TextBox from '../atoms/TextBox';
import ButtonByText from '../components/button/block/ButtonCompenent';

const GameLodingLayout = styled('section')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#194DD2',
    height: '100%',
    width: '100%',
}));

const LodingImageLayout = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    width: '100%',
    height: '80%',
}));

const BottomLayout = styled('div')(({ theme }) => ({
    display: 'flex',
    justifyContent: 'end',
    width: '100%',
    height: '3.5%',
}));

const ButtonLayout = styled('div')(({ theme }) => ({
    backgroundColor: '#0E359B'
}));

function GameLodingPage() {
    return (
        <GameLodingLayout>
            <LodingImageLayout>
                <TextBox value={'상대방을 기다리는 중입니다.'} size={'3rem'} fontColor={'white'}></TextBox>
                <TextBox value={'🏓'} size={'30rem'} fontColor={'white'}></TextBox>
            </LodingImageLayout>
            <BottomLayout>
                <ButtonLayout>  {/*배경색 주기 위함*/}
                    <ButtonByText value={'취소하기'} />
                </ButtonLayout>
            </BottomLayout>
        </GameLodingLayout>
    );
}

export default GameLodingPage;
