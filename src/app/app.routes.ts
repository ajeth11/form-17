import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:'',
        loadChildren: () => import('./table/table.module').then(e => e.TableModule)
    }
];
