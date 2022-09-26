import styled from "@emotion/styled";
import TextBox from "../../texts/TextBox";
import ImageComponent from "../../atoms/Image/Image";


const GameMapModuleLayout = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    backgroundColor: '#945402',
    width: '100%',
    height: '100%',
}))

const GameMapTextLayout = styled('div')(({ theme }) => ({ //받아오는 이미지의 크기가 정해져있어 height를 맞추어 주기 위해서
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#7921D2',
    width: '100%',
    height: '10%',
}))

const GameMapLayout = styled('div')(({ theme }) => ({ //받아오는 이미지의 크기가 정해져있어 height를 맞추어 주기 위해서
    backgroundColor: '#7777D2',
    width: '100%',
    height: '100%',
}))

function GameMapModule() {
    return (
        <GameMapModuleLayout>
            <GameMapTextLayout>
                <TextBox value={'Game Map'} size={'1rem'} fontColor={'black'} />
            </GameMapTextLayout>
            <GameMapLayout>
                <ImageComponent title={'GameMap'} image='https://www.imaginarycloud.com/blog/content/images/2019/02/Pong.jpg' />
            </GameMapLayout>
        </GameMapModuleLayout>
    )

}

export default GameMapModule;