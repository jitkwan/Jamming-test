import React from 'react';

import './TrackList.css';
import Track from '../Track/Track';

class TrackList extends React.Component {


    render(){
        // console.log(this.props.tracks)
        return(
            <div className ="TrackList">
                {
                    this.props.tracks.map(track => {
                        // console.log('jane ja',track)
                        return <Track track={track}
                                      key={track.id}
                                      onAdd={this.props.onAdd}
                                      onRemove={this.props.onRemove} 
                                      isRemoval={this.props.isRemoval}/>

                })
            }
            </div>
        )
    }
}

export default TrackList;