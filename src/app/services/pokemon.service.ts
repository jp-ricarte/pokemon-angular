import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PokemonService  {
 
    constructor(
        public http: HttpClient
    ) { }

    public list(number) { 
        return this.http.get(`https://pokeapi.co/api/v2/pokemon?offset=${number}&limit=10`);     
    }
    
    public listEachPokemon(id) { 
        return this.http.get('https://pokeapi.co/api/v2/pokemon/' + id);     
    } 
          
} 