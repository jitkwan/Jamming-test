import React from 'react';
import './App.css';

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

import Spotify from '../../util/Spotify';

class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      searchResults: [],
      playlistName: 'New Playlist',
      playlistTracks: []
    };


    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);  
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }


  addTrack(track) {
    let tracks = this.state.playlistTracks;
    if (tracks.find(savedTrack => savedTrack.id === track.id)) {     //ใช้ฟังก์ชันfind เช็คว่า id ใหม่ที่รับเข้ามา ตรงกับที่มีอยู่มั้ย ถ้าตรงไม่ต้องทำไร ถ้าไม่ตรงก้ให้เพิ่มเข้ามา
      return;
    }

    tracks.push(track);
    this.setState({playlistTracks: tracks}); //tracks ตอนนี้เป็น array เพราะโดน push เข้ามา
  }

  removeTrack(track) {
    let tracks = this.state.playlistTracks;
    tracks = tracks.filter(currentTrack => currentTrack.id !== track.id); //ใช้ filter method กรองออกจากเงื่อนไข กลับมาดูด้วย งงชิปเป๋ง

    this.setState({playlistTracks: tracks});
  }

  updatePlaylistName(name) {
    this.setState({playlistName: name});
  }

  savePlaylist() {
    const trackUris = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackUris).then(() => {
      this.setState({
        playlistName: 'New Playlist',
        playlistTracks: []
      });
    });
  }


  search(term) {
    Spotify.search(term).then(searchResults => {
      this.setState({searchResults: searchResults});
    });
  }

  render(){
    return (
      <div>
        <h1>Ja<span className ="highlight">mmm</span>ing</h1>
        <div className ="App">
          <SearchBar onSearch={this.search} />                        
          <div className ="App-playlist">
            <SearchResults searchResults = {this.state.searchResults} 
                           onAdd={this.addTrack} />    
            <Playlist playlistName={this.state.playlistName}
                      playlistTracks={this.state.playlistTracks}
                      onRemove={this.removeTrack}
                      onNameChange={this.updatePlaylistName}
                      onSave={this.savePlaylist}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
