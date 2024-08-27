import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Usuario } from '../../../shared/models/usuario.interface';
import { MatDialog } from '@angular/material/dialog';
import { UsuarioDialogComponent } from './components/usuario-dialog/usuario-dialog.component';
import { UsuariosService } from './services/usuarios.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit, OnDestroy, AfterViewInit {

  private destroy$ = new Subject();

  dataSource = new MatTableDataSource<Usuario>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['nombre', 'apellidos', 'username', 'rol', 'acciones'];

  constructor(private dialog: MatDialog, private usuariosService: UsuariosService) { }

  ngOnInit(): void {
    this.listar();
  }

  listar(){
    this.usuariosService.getUsuarios().pipe(takeUntil(this.destroy$)).subscribe((usuarios: Usuario[])=>{
      this.dataSource.data = usuarios;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  onOpenModal(user = {}): void {
    const dialogRef = this.dialog.open(UsuarioDialogComponent, {
      width: '80%',
      data: {
        user
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

  eliminarUsuario(element: any): void {
    const cveUsuario = element.cveUsuario;
    this.usuariosService.deleteUsuario(cveUsuario).subscribe((response: any) => {
      if (response.success) {
        this.dataSource.data = this.dataSource.data.filter((usuario: Usuario) => usuario.cveUsuario !== element.cveUsuario);
      } else {
        console.error('Error al eliminar usuario:', response.error);
      }
    });
  }
}