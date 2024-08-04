import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private _HttpClient:HttpClient) { }

  departmentApi():Observable<any>{
    return this._HttpClient.get("http://192.236.163.206:8005/api/AutoComplete/Lookups?categoryCode=HIS_CompanyDepartment");
  }

  branchesApi(id:string):Observable<any>{
    return this._HttpClient.get(`http://192.236.163.206:8005/api/AutoComplete/Lookups?categoryCode=HIS_BranchesBasedDepartment&Id1=+${id}`);
  }

  dataArray: string[] = [];

    insertData(data: string){
        this.dataArray.unshift(data);
    }
  

}
