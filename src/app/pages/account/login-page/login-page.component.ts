import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user.model';
import { DataService } from 'src/app/services/data.service';
import { Security } from 'src/app/utils/security.util';
import { CustomValidator } from 'src/app/validators/custom.validator';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page-component.css']
})
export class LoginPageComponent implements OnInit {

  constructor(
    private router: Router,
    private service: DataService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    this.form = this.fb.group({
      username: ['', Validators.compose([
        Validators.minLength(14),
        Validators.maxLength(14),
        Validators.required,
        CustomValidator.isCpf()
      ])],
      password: ['', Validators.compose([
        Validators.minLength(6),
        Validators.maxLength(20),
        Validators.required
      ])]
    })
  }

  public form: FormGroup;
  public busy = false;


  ngOnInit(): void {
    const token = Security.getToken();

    if (token) {
      this.busy = true;
      this.service
        .refreshToken()
        .subscribe((data: any) => {
          this.busy = false;
          this.setUser(data.customer, data.token);
        },
          (err) => {
            localStorage.clear();
            this.busy = false;
          }
        )
    }
  }

  submit() {
    this.busy = true;

    this.service
      .authenticate(this.form.value)
      .subscribe((data: any) => {
        this.setUser(data.customer, data.token);
        this.busy = false;
      },
        (err) => {
          this.toastr.error(err, "Erro")
          this.busy = false;

        }
      )
  }

  setUser(user: User, token: string) {
    Security.set(user, token);
    this.router.navigate(['/']);
  }

}
