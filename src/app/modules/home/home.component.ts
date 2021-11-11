import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    providers: [PokemonService]
})
export class HomeComponent implements OnInit {
    public list = [];
    public pokemons = [];
    public pokemonsOrdered = [];
    public idsBack = JSON.parse(localStorage.getItem('idsBack')) || [];
    public current = 0;
    public isFront = true;
    //public skin = localStorage.getItem('isShiny') || 'false';

    constructor(
       public service: PokemonService
    ) { }

    ngOnInit(): void {
        this.pokemonList();
    }

    public pokemonList() {
        this.pokemons = [];
        this.service.list(this.current).subscribe((response:any) => {
            this.list = response.results;

            for (let i = 1 + this.current; i <= this.list.length + this.current; i++) {
                this.service.listEachPokemon(i).subscribe((response:any) => {
                    response.isFront = true;
                    for (let id of this.idsBack) {
                        if (id == response.id) {
                            response.isFront = false;
                        }
                    }
                    this.pokemons.push(response);
                    this.pokemons.sort((a,b) => a.id > b.id ? 1 : -1);

                })
            }
        })

    }

    public changePosition(pokemon) {
        if (pokemon.isFront) {
            pokemon.isFront = false;

            this.idsBack.push(pokemon.id);
            let idsString = JSON.stringify(this.idsBack);
    
            localStorage.setItem('idsBack', idsString);
        }
        else {
            pokemon.isFront = true;

            let index = this.idsBack.indexOf(pokemon.id)

            this.idsBack.splice(index, 1);
            let idsString = JSON.stringify(this.idsBack);
    
            localStorage.setItem('idsBack', idsString);
            
        }
        
    }

    public skin() {
        return localStorage.getItem('isShiny') || 'false';
    }

    public nextPage() {
        this.current += 10
        this.pokemonList();
    }

    public previousPage() {
        this.current -= 10
        this.pokemonList();
    }
}
