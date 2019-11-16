import React from 'react';
import './App.css';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            albumsList: [],
            pictures: []
        }
    }

    componentDidMount() {
        fetch("https://jsonplaceholder.typicode.com/albums")
            .then(res => res.json())
            .then(albumsList => {
                this.setState({albumsList});
            });
    }

    onAlbumSelected(event) {
        fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${event.target.value}`)
            .then(res => res.json())
            .then(pictures => {
                this.setState({pictures});
            });
    }

    render() {
        return (
            <div className="App">
                <h1>Select an album:</h1>
                <select onChange={this.onAlbumSelected.bind(this)} className="albumSelect">
                    <option label="Select..."/>
                    {this.state.albumsList.map(album => {
                        return <option value={album.id} key={album.id}>{album.title}</option>;
                    })}
                </select>
                <hr/>
                <div>
                    {this.state.pictures.map(picture => {
                        return <a href={picture.url} key={picture.id}><img src={picture.thumbnailUrl} alt={picture.title}/></a>;
                    })}
                </div>
            </div>

        );
    }

}

export default App;
