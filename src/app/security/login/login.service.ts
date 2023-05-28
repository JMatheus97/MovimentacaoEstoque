import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { catchError, map } from 'rxjs/operators';
import { environment } from "src/environments/environments";


@Injectable({
  providedIn: 'root',
})

export class LoginService {

  constructor(private httpClient: HttpClient){}

  public login(username: string, password: string): Observable<any>{

    const url = `${environment.baseUrlBackend}/login`
    return this.httpClient.post(url, { username, password}, {responseType: 'json'}).pipe(
      map((data) => this.setTokenLocalStorage(data)),
      catchError((err) => {
        this.removerTokenLocalStorage();
        throw 'Falha ao efetuar login'
      })
    )
  }

  public getToken(): string | null {
    return localStorage.getItem(environment.token);
  }

  private setTokenLocalStorage(response: any){
    const  {  type, token, usuario } = response;
    localStorage.setItem(environment.token, token);
    localStorage.setItem(environment.usuarioPefil, usuario.perfil);
  }

  private removerTokenLocalStorage(): void {
    localStorage.removeItem(environment.token);
  }
}
