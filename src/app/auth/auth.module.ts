import { NgModule } from "@angular/core";
import { SignupComponent } from "./signup/signup.component";
import { SigninComponent } from "./signin/signin.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@NgModule({
    declarations: [
        SigninComponent,
        SignupComponent
    ],
    imports: [
        FormsModule
    ]
})
export class AuthModule {
}