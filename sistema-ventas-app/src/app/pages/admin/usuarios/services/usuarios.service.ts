import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../../../../environments/environment.development';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Usuario } from '../../../../shared/models/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  createUsuario(user: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${environment.API_URL}/users/usuarios`, user);
  }

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${environment.API_URL}/users/usuarios`,{headers: {"requireToken":"true"}}).pipe(catchError((error)=>this.handlerError(error)));
  }

  getUsuario(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${environment.API_URL}/users/usuarios/${id}`,{headers: {"requireToken":"true"}});
  }

  updateUsuario(id: number, usuario: any): Observable<Usuario> {
    return this.http.put<Usuario>(`${environment.API_URL}/users/usuarios/${id}`, usuario,{headers: {"requireToken":"true"}});
  }

  deleteUsuario(id: number): Observable<any> {
    return this.http.delete<Usuario>(`${environment.API_URL}/users/usuarios/${id}`,{headers: {"requireToken":"true"}});
  }

  private handlerError(error: any){
    var message = "";
    if(error.error) {
      if(error.error.message) message= error.error.message;
      else message = "Ocurrió un error"
    }

    this.snackBar.open(message, '', {
      duration: 3000
    })

    return throwError(() => Error(message));
}

}