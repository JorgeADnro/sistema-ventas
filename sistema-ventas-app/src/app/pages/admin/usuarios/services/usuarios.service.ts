import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../../../../environments/environment.development';
import { Usuario } from '../../../../shared/models/usuario.interface';
import { Rol } from '../../../../shared/models/rol.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private snackBar: MatSnackBar,
              private http: HttpClient  ) { }
  
  listarUsuarios(): Observable <Usuario[]> {
    return this.http.get<Usuario []>(`${environment.API_URL}/users/usuarios`, {headers: {"requireToken": "true"}}).pipe(catchError((error) => this.handlerError(error)));
  }

  listarRoles(): Observable <Rol[]> {
    return this.http.get<Rol []>(`${environment.API_URL}/roles/roles`, {headers: {"requireToken": "true"}}).pipe(catchError((error) => this.handlerError(error)));
  }

  insertarUsuario(user: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${environment.API_URL}/users/usuarios`, user, {headers: {"requireToken": "true"}}).pipe(catchError((error) => this.handlerError(error)));
  }

  actualizarUsuario(cveUsuario: number, usuario: any): Observable <Usuario> {
    return this.http.put<Usuario>(`${environment.API_URL}/users/usuarios/${cveUsuario}`, usuario,{headers: {"requireToken": "true"}}).pipe(catchError((error) => this.handlerError(error)));
}

  eliminarUsuario(cveUsuario: number): Observable <Usuario> {
    return this.http.delete<Usuario>(`${environment.API_URL}/users/usuarios/${cveUsuario}`, {headers: {"requireToken": "true"}}).pipe(catchError((error) => this.handlerError(error)));
}

private handlerError(error: any){
  console.log(error);
  var message = "Ocurrió un error";
  if(error.error) {
    if(error.error.message) message= error.error.message;
    else message = "Ocurrió un error"
  }

  this.snackBar.open(message, '', {
    duration: 3000
  });

  return throwError(() => new Error(message));
}


}