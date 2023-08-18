import './styles/App.css';
import Navbar from './components/Navbar';
import NoteList from './components/NoteList';
import { NotesProvider } from './contexts/NotesContext';

function App() {
  return (
    <NotesProvider>
      <Navbar />
      <NoteList />
    </NotesProvider>
  );
}

export default App;