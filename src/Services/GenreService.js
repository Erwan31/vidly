import http from './httpService';
import { apiUrl } from './config.json';
/* import { Component } from 'react'; */

/*
class GenreService extends Component {
  state = {
    posts: []
  };

  async componentDidMount() {
    // pending
    const { data: posts } = await http.get(config.apiEndPointGenres);
    this.setState( { posts });
  }

  handleAdd = async () => {
    const obj = { title: 'a', body: 'b'};
    const { data: post } = await http.post(config.apiEndPointGenres, obj);
    console.log("Add ", post);

    const posts = [post, this.state.posts];
    this.setState( { posts });
  };

  handleUpdate = async post => {
    post.title = "UPDATED";
    await http.put(config.apiEndPoint + '/' + post.id, post);
    
    const posts = [...this.state.posts];
    const index = posts.indexOf(post);
    this.setState( { posts });
  };

  handleDelete = async post => {
    const originalPosts = this.state.posts;

    const posts = this.state.posts.filter( p => p.id !== post.id );
    this.setState( { posts });


    try{
          await http.delete( 's' + config.apiEndPoint + '/' + post.id);
    }
    catch (ex) {
      if( ex.response && ex.response.status === 404 ){
        alert('This post has already been deleted.');
      }

     alert('Something failedwhile deleting a post!!');
      this.setState({ posts: originalPosts });
    }

  };

}
*/

export function getGenres() {


  return http.get( apiUrl + '/genres');
  // { data: genres } = await http.get(config.apiEndPoint);
  //console.log("Get Genres: ", genres);
  //return genres.filter(g => g);
}
