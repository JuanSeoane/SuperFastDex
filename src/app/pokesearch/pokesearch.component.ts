import { Component, effect, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'pokesearch',
  standalone: true,
  imports: [FormsModule, NgbProgressbarModule, CommonModule],
  templateUrl: './pokesearch.component.html',
  styleUrls: ['./pokesearch.component.css'],
})
export class PokesearchComponent {
  search = '';
  abilityDescription: string = '';
  selectedAbility: string = '';
  pokemon = signal<any>(null);
  selectedMove: string = '';
  shortEffect: string = '';
  movePower: any = '';
  moveType: string = '';
  moveCat: string = '';
  pokemonType: string = '';
  moveTypeStyle: any = '';
  tiposDelPoke: string = '';
  dmgRelation: any = '';

  typeStyles: any = {
    fire: { color: '#F08030', icon: '🔥' },
    water: { color: '	#276cc7', icon: '💧' },
    grass: { color: '#78C850', icon: '🌿' },
    electric: { color: '#F8D030', icon: '⚡' },
    ground: { color: '#E0C068', icon: '🌍' },
    rock: { color: '#B8A038', icon: '⛰️' },
    fairy: { color: '#EE99AC', icon: '✨' },
    psychic: { color: '#F85888', icon: '🔮' },
    ice: { color: '#98D8D8', icon: '❄️' },
    fighting: { color: '#C03028', icon: '🥊' },
    poison: { color: '#A040A0', icon: '☠️' },
    bug: { color: '#A8B820', icon: '🐛' },
    ghost: { color: '#705898', icon: '👻' },
    dragon: { color: '#7038F8', icon: '🐉' },
    dark: { color: '#705848', icon: '🌑' },
    steel: { color: '#B8B8D0', icon: '⚙️' },
    normal: { color: '#A8A878', icon: '⚪' },
    flying: { color: '#93d5ed', icon: '🦅' },
  };

  noDamage = " " ;
  halfDamage = " " ;
  doubleDamage = " ";

  constructor(private apiService: ApiService) {
    effect(() => {
      if (this.pokemon()) {
        const types$ = this.pokemon().types.map((t: any) =>
          this.apiService.getDmgRelation(t.type.name)
        );
        forkJoin(types$).subscribe((dmgRelations: any) => {
          console.log(dmgRelations);
          this.noDamage = [...new Set(
            dmgRelations.flatMap((dmg: any) =>
              dmg.damage_relations.no_damage_from.map((nd: any) => nd.name)
            )
          )].join(", ");
          this.halfDamage = [...new Set(
            dmgRelations.flatMap((dmg: any) =>
              dmg.damage_relations.half_damage_from.map((nd: any) => nd.name)
            )
          )].join(", ");
          this.doubleDamage = [...new Set(
            dmgRelations.flatMap((dmg: any) =>
              dmg.damage_relations.double_damage_from.map((nd: any) => nd.name)
            )
          )].join(", ");
          console.log(this.noDamage);
        });
      }
    });
  }

  pokesearch() {
    if (this.search) {
      this.apiService
        .getPokemon(this.search.toLowerCase().trim().replace(' ', '-'))
        .subscribe((pokemon) => {
          console.log(pokemon);
          this.pokemon.set(pokemon);
          this.tiposDelPoke = pokemon.types.name;
        });
    } else {
      console.log('Digite o nombre de um Pokémon.');
    }
  }
  getTipoStyle(type: string): any {
    return this.typeStyles[type];
  }

  grabTyping() {}

  abilitysearch() {
    if (this.selectedAbility) {
      this.apiService.getAbility(this.selectedAbility).subscribe((ability) => {
        console.log(ability);

        this.selectedAbility = ability.effect_entries[1].short_effect;
        console.log(this.selectedAbility);
      });
    }
  }

  movesearch() {
    if (this.selectedMove) {
      this.apiService.getMove(this.selectedMove).subscribe((move) => {
        console.log(this.shortEffect);
        console.log(move);
        this.shortEffect = move.effect_entries[0]?.short_effect;
        this.movePower = move.power;
        this.moveType = move.type.name;
        this.moveCat = move.damage_class.name;
        this.updateMoveImage(this.moveCat);
        this.moveTypeStyle = this.getTipoStyle(this.moveType);
      });
    }
  }

  updateMoveImage(moveCat: string) {
    if (moveCat === 'physical') {
      this.moveCat =
        'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e8ddc4da-23dd-4502-b65b-378c9cfe5efa/dfgb60u-0487066d-d95f-4b5e-9501-73fe14ecf981.png/v1/fill/w_1280,h_1280/physical_move_icon_by_jormxdos_dfgb60u-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiJcL2ZcL2U4ZGRjNGRhLTIzZGQtNDUwMi1iNjViLTM3OGM5Y2ZlNWVmYVwvZGZnYjYwdS0wNDg3MDY2ZC1kOTVmLTRiNWUtOTUwMS03M2ZlMTRlY2Y5ODEucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.1oShRDrq7t5ZzLkHA_JbjMGypMuj0dCSpD-o7nTzZYw';
    } else if (moveCat === 'special') {
      this.moveCat =
        'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e8ddc4da-23dd-4502-b65b-378c9cfe5efa/dfgb60n-b67f8e0e-fdb5-439f-92da-107c846ce339.png/v1/fill/w_894,h_894/special_move_icon_by_jormxdos_dfgb60n-pre.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiJcL2ZcL2U4ZGRjNGRhLTIzZGQtNDUwMi1iNjViLTM3OGM5Y2ZlNWVmYVwvZGZnYjYwbi1iNjdmOGUwZS1mZGI1LTQzOWYtOTJkYS0xMDdjODQ2Y2UzMzkucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.DddyteuXo5KMMbJrb_fI7MWanhrTZ6J2CrnTprEy5zc';
    } else if (moveCat === 'status') {
      this.moveCat =
        'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e8ddc4da-23dd-4502-b65b-378c9cfe5efa/dfgb616-756e9623-02db-436d-b587-2e0f386b5fc0.png/v1/fill/w_1280,h_1280/status_move_icon_by_jormxdos_dfgb616-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiJcL2ZcL2U4ZGRjNGRhLTIzZGQtNDUwMi1iNjViLTM3OGM5Y2ZlNWVmYVwvZGZnYjYxNi03NTZlOTYyMy0wMmRiLTQzNmQtYjU4Ny0yZTBmMzg2YjVmYzAucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.0qmX3MYYbcZWiV52L6gv1dOUOjz1N_0pg3EHstlowDk';
    } else {
      this.moveCat =
        'https://static-00.iconduck.com/assets.00/perspective-dice-random-icon-469x512-mm6xb9so.png';
    }
  }

  getProgressBarType(value: number): string {
    if (value <= 65) {
      return 'danger';
    } else if (value <= 95) {
      return 'warning'; // Entre 65 y 130, color amarillo
    } else if (value <= 120) {
      return 'success'; // Mayor que 130, color rojo
    } else {
      return `dark`;
    }
  }
}
