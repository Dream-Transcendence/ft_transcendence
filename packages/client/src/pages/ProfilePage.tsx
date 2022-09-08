import styled from '@emotion/styled/types/base';
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

function ProfilePage() {
  return (
    <div className="profilePage">
      <header>
        <nav>
          <NavigationBar></NavigationBar>
        </nav>
      </header>
      <section></section>
      <footer></footer>
    </div>
  );
}

export default ProfilePage;
