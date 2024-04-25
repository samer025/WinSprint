import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Article} from "../Models/article";
import {Recipe} from "../Models/recipe";

@Injectable({
    providedIn: 'root'
})
export class RecipeService{
    private baseUrl = 'http://localhost:8082/SpringMVC/api/recipes';

    constructor(private http: HttpClient) { }

    getAllArticles(): Observable<Recipe[]> {
        return this.http.get<Recipe[]>(`${this.baseUrl}`);
    }
}
