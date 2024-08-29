import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BaseForm } from '../../../../../shared/utils/base-forms';
import { Subject, takeUntil } from 'rxjs';
import { UsuariosService } from '../../services/usuarios.service';
import { RolesService } from '../../services/roles.service';
import { Usuario } from '../../../../../shared/models/usuario.interface';
import { Rol } from '../../../../../shared/models/rol.interface';
import { Router } from '@angular/router';

enum Action {
  EDIT = 'edit',
  NEW = 'new'
}

@Component({
  selector: 'app-usuario-dialog',
  templateUrl: './usuario-dialog.component.html',
  styleUrls: ['./usuario-dialog.component.scss']
})
export class UsuarioDialogComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject<any>();

  roles: any[] = [];

  titleButton = "Guardar";
  actionTODO = Action.NEW;
  userForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    public baseForm: BaseForm,
    private usuarioService: UsuariosService,
    private rolesService: RolesService,
    public dialogRef: MatDialogRef<UsuarioDialogComponent>,
    private router: Router
  ) {
    this.userForm = this.fb.group({
      cveUsuario: [''],
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      apellidos: ['', [Validators.required, Validators.minLength(3)]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      //email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      rol: [[], [Validators.required]],
    }, { validator: this.passwordMatchValidator });
  }

  getRoles() {
    this.rolesService.getRoles()
      .pipe(takeUntil(this.destroy$))
      .subscribe( (roles: Rol[]) => {
        this.roles = roles;
        this.pathData();
      });
  }

  ngOnInit(): void {
    this.pathData();
    this.getRoles();
  }

  pathData() {
    if (this.data.user.cveUsuario) {
      this.titleButton = "Actualizar";
      this.actionTODO = Action.EDIT;
      this.userForm.updateValueAndValidity();
      this.userForm.patchValue({
        cveUsuario: this.data.user.cveUsuario,
        nombre: this.data.user.nombre,
        apellidos: this.data.user.apellidos,
        rol: this.data.user.roles.map((role: any) => role.id)
      });
      this.userForm.controls['username'].disable();
      this.userForm.controls['password'].disable();
      this.userForm.controls['confirmPassword'].disable();
    } else {
      this.titleButton = "Guardar";
      this.actionTODO = Action.NEW;
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

  onSave() {
    if (this.userForm.invalid) return;

    var formValue = this.userForm.getRawValue();

    if (this.actionTODO == Action.NEW) {
      var newUser: Usuario = {
        nombre: formValue.nombre!,
        apellidos: formValue.apellidos!,
        username: formValue.username!,
        password: formValue.password!,
        rol: formValue.rol!
      }

      this.usuarioService.createUsuario(newUser)
          .pipe(takeUntil(this.destroy$))
          .subscribe( (data: Usuario) => {
            this.dialogRef.close(data);
            this.router.navigate(['/']);
          });
          
    } else {
      var { confirmPassword, password, username, ...updateUser } = formValue;
      const id = this.data.user.cveUsuario;
      this.usuarioService.updateUsuario(id, updateUser)
          .pipe(takeUntil(this.destroy$))
          .subscribe( (data: Usuario) => {
            this.dialogRef.close(data);
            this.router.navigate(['/']);
          });
    }
  }

  private passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      formGroup.get('confirmPassword')?.setErrors({ mismatch: true });
    } else {
      formGroup.get('confirmPassword')?.setErrors(null);
    }
  }
}
