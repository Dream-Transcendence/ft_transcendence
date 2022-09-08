import styled from '@emotion/styled';
import NavigationBar from '../components/bar/NavigationBar';

// const ProfileLayout = styled('section')(({ theme }) => ({
//   display: 'grid',
//   alignItems: 'center',
//   gridTemplateColumns: '1fr 2fr',
//   //     gridTemplateAreas:
//   // 		'a a a',
//   // 		'b c c',
//   // 		'b d g'
//   // 		'e f g'
//   // }
// }));
const Chatroom = styled('section')(({ theme }) => ({
  width: '100%',
  height: '100%',
  //     gridTemplateAreas:
  // 		'a a a',
  // 		'b c c',
  // 		'b d g'
  // 		'e f g'
  // }
}));

const MainSection = styled('section')(({ theme }) => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'row',
  gridTemplateColumns: '1fr 1fr',
  justifyContent: 'center',
  //     gridTemplateAreas:
  // 		'a a a',
  // 		'b c c',
  // 		'b d g'
  // 		'e f g'
  // }
}));

const Section = styled('section')(({ theme }) => ({
  width: '59%',
  height: '100%',
  backgroundColor: '#432AC5',
}));

const Aside = styled('section')(({ theme }) => ({
  width: '19%',
  height: '100%',
  backgroundColor: '#194DD2',
}));

function ChatroomPage() {
  return (
    <Chatroom>
      <header>
        <nav>
          <NavigationBar></NavigationBar>
        </nav>
      </header>
      <MainSection>
        <Aside></Aside>
        <Section></Section>
      </MainSection>
      <footer></footer>
    </Chatroom>
  );
}

export default ChatroomPage;
