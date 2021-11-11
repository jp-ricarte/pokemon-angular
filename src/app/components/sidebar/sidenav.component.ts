import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.css']
})
export class SideNavComponent {

    public sidenavWidth: any = localStorage.getItem('sidenavWidth');
    public isShiny = localStorage.getItem('isShiny');

    constructor(
        private router: Router
    ) { }


   public toogleSidenav() {
        if (this.sidenavWidth == 4) {
            this.sidenavWidth = 15;
            localStorage.setItem('sidenavWidth', '15');
        } 
        else {
            this.sidenavWidth = 4;
            localStorage.setItem('sidenavWidth', '4');
        }
    }

    public themeClass() {
        return localStorage.getItem('themeClass') || 'branco';
    }

    public changeTheme(theme) {
        localStorage.setItem('themeClass', theme);
    }

    public changeSkin(event) {

        if (event.checked) {
            localStorage.setItem('isShiny', 'true');
        }
        else {
            localStorage.setItem('isShiny', 'false');
        }
    }

}
