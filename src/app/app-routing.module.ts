import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";

import { HomeComponent } from "./core/home/home.component";

const appRoutes: Routes =
[
    { path: '', component: HomeComponent },

    { path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule'},      // [KEY]: Enable "Lazy Loading"!!! 

    { path: 'shopping-list', loadChildren: './shopping-list/shopping-list.module#ShoppingListModule' }
];

@NgModule({
    imports: [ 
        RouterModule.forRoot( 
            appRoutes, 
            { preloadingStrategy: PreloadAllModules }           // [KEY]: Preload all modules including the lazy loading modules
        ) 
    ],
    exports: [ 
        RouterModule 
    ]
})
export class AppRoutingModule
{
}