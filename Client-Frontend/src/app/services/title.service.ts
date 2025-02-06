import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class TitleService {
    constructor(private title: Title, private router: Router, private route: ActivatedRoute) {
        this.router.events
            .pipe(
                filter((event) => event instanceof NavigationEnd),
                map(() => {
                    let activatedRoute = this.route;
                    while (activatedRoute.firstChild) {
                        activatedRoute = activatedRoute.firstChild;
                    }
                    return activatedRoute.snapshot.data['title'] || 'Campus Connect';
                })
            )
            .subscribe((pageTitle) => {
                this.title.setTitle(pageTitle);
            });
    }
}
