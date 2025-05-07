import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'  
})
export class ApiService {
  public apiUrl = 'https://pokeapi.co/api/v2/pokemon/';
  public AbiUrl = 'https://pokeapi.co/api/v2/ability/';
  public MovUrl = 'https://pokeapi.co/api/v2/move/';
  public TypUrl = 'https://pokeapi.co/api/v2/type/';
  public DmgUrl = 'https://pokeapi.co/api/v2/type/';
  constructor(public http: HttpClient) { }

  getPokemon(name: string): Observable<any> {
    return this.http.get(`${this.apiUrl}${name}`);
  }
  getAbility(name: string): Observable<any> {
    return this.http.get(`${this.AbiUrl}${name}`);
  }
  getMove(name: string): Observable<any> {
    return this.http.get(`${this.MovUrl}${name}`);
  }
  getTyping(name: string):Observable<any>{
    return this.http.get(`${this.TypUrl}${name}`)
  }
  getDmgRelation(name: string):Observable<any>{
    return this.http.get(`${this.DmgUrl}${name}`)
  }
}
