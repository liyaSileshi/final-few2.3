import React, {Component} from 'react';
import './StarWars.css'

class StarWars extends Component{
  constructor(props) {
      super(props)
      this.state = {swData : null,
                    isLoading: false, // to check if data is still being loaded or already loaded
                    num: 1,
                    characters: [],
                    homeworld : {},
                    }
  }
    
  async getStarWarsData(url) {
    try{
      const res = await fetch(url)
      const json = await res.json()     
      
      const response = await fetch(json.homeworld)
      const homejson = await response.json()
      
      this.setState({ swData: json, isLoading: false })
      this.state.swData.homeworld = homejson
      console.log(this.state)

    } catch(err) {
        this.setState({ swData: null }) 
        console.log('-- Error fetching --')
        console.log(err.message)
        // You may want to display an error to the screen here. 
      }
  }

  handleSubmit(e) {
    this.setState({isLoading : true})
    e.preventDefault();
    console.log(this.state.num)
    const url = `https://swapi.dev/api/people/${this.state.num}`
    this.getStarWarsData(url)
  }

  renderCharacter() {
    const swData = this.state.swData
    if (swData === null) { //
      // If there is no data return undefined
      return undefined
    }
    console.log(swData)
    return <div>
            <p>{swData.name}</p>
            <p>Hair color: {swData.hair_color}</p>
            <p>Eye color: {swData.eye_color}</p>
            <p>Height: {swData.height}</p>
            <p>Mass: {swData.mass}</p>
        </div>

  }

  checkRender() {
    if (this.state.isLoading) { //renders when waiting for json request data
    //   return <Loading />
        return 'Loading'
    } 
    return this.renderCharacter()
  }

  handleSave(swdata) {
    let {characters} = this.state
    this.setState({characters: [...characters, swdata]})
  }

  renderSaved() {
    const {homeworld} = this.state
    console.log(homeworld)
    let {characters} = this.state
    const arrChar = characters.map((person) => {
        console.log(person.name)
        return (
        <div>
            <h2>{person.name}</h2>
            <p>Hair color: {person.hair_color}</p>
            <p>Eye color: {person.eye_color}</p>
            <p>Height: {person.height}</p>
            <p>Mass: {person.mass}</p>
            <p>Homeworld: {person.homeworld.name}</p>
            <p>Rotation period: {person.homeworld.rotation_period}</p>
            <p>Climate: {person.homeworld.climate}</p>
            <p>Diameter: {person.homeworld.diameter}</p>
            <p>Gravity: {person.homeworld.gravity}</p>
            <p>Orbital period: {person.homeworld.orbital_period}</p>
            <p>Population: {person.homeworld.population}</p>
            <p>Surface water: {person.homeworld.surface_water}</p>
            <p>Terrain: {person.homeworld.terrain}</p>
        </div>
        )})
    console.log(arrChar)
    return arrChar
    }

  render() {
    return (
      <div className = 'starWars'>
        <div className='starWars-form'>
          <form onSubmit={e => this.handleSubmit(e)}>
          <input 
            value={this.state.num} 
            onChange={e => this.setState({ num: e.target.value })}
            type="text" 
            placeholder="enter number"
            />
            <button className='submit-btn' type="submit">Search</button>
          </form>
              <div>{this.checkRender()}</div>
              <button className='save' onClick={() => this.handleSave(this.state.swData)}>Save Character</button>
          </div>
        <div>
          {this.renderSaved()}
        </div>
      </div> 
    )
  }
}

export default StarWars;