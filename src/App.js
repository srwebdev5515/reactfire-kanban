import { getFirestore } from 'firebase/firestore';
import { FirestoreProvider, useFirebaseApp } from 'reactfire';


import './App.css';
import Kanban from './components/Kanban';

function App() {
  const firestoreInstance = getFirestore(useFirebaseApp());

  return (
    <FirestoreProvider sdk={firestoreInstance}>
      <div className="App">
        <Kanban />
      </div>
    </FirestoreProvider>
  );
}

export default App;
