import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
  styleUrl: './usuarios.component.scss'
})
export class UsuariosComponent implements OnInit, OnDestroy, AfterViewInit {

  constructor(private dialog: MatDialog, 
              private usuarioSvc: UsuariosService) {}

  private destroy$ = new Subject();
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: String[] = ['nombre', 'apellidos', 'username', 'rol', 'acciones'];

  // ng g s pages/admin/usuarios/services/usuarios

  ngOnInit(): void {
    this.listar();
  }

  listar() {
    this.usuarioSvc.listarUsuarios()
      .pipe(takeUntil(this.destroy$))
      .subscribe( (usuarios: Usuario[]) => {
        this.dataSource.data = usuarios;
      });
  }

  ngAfterViewInit(): void {
      this.dataSource.paginator = this.paginator;
  }

  onOpenModal(user = {}) {
    const dialogRef = this.dialog.open(UsuarioDialogComponent, {
      maxWidth: '100%',
      width: '80%',
      data: {
        user
      }
    });

    dialogRef.afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe( result => {
        if (result) {
          this.listar();
        }
      });
  }

  onDelete(cveUsuario: number) {
    this.usuarioSvc.eliminarUsuario(cveUsuario)
      .pipe(takeUntil(this.destroy$))
      .subscribe( (result: Usuario) => {
        this.listar();
      });
  }

  ngOnDestroy(): void {
      this.destroy$.next({});
      this.destroy$.complete();
  }

}