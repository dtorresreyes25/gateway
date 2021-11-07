import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseDto, User } from '../models';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {}

  public getAll(): Observable<User[]> {
    return this.http
      .get<ResponseDto<User[]>>(`${environment.apiEndpoint}/users`)
      .pipe(
        map((users) => {
          return users.data;
        })
      );
  }

  public getById(id: string): Observable<User> {
    return this.http
      .get<ResponseDto<User>>(`${environment.apiEndpoint}/user/${id}`)
      .pipe(
        map((user) => {
          return user.data;
        })
      );
  }

  public getCurrentUser(): User {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      return JSON.parse(currentUser);
    }
    return {} as User;
  }

  public create(user: User): Observable<User> {
    return this.http
      .post<ResponseDto<User>>(`${environment.apiEndpoint}/users`, user)
      .pipe(map((user) => user.data));
  }

  public update(user: User): Observable<User> {
    return this.http
      .put<ResponseDto<User>>(
        `${environment.apiEndpoint}/user/${user._id}`,
        user
      )
      .pipe(map((user) => user.data));
  }

  public changePassword(
    id: string,
    oldPassword: string,
    newPassword: string
  ): Observable<string> {
    return this.http
      .put<ResponseDto<unknown>>(
        `${environment.apiEndpoint}/user/changepassword/${id}`,
        {
          newPassword,
          oldPassword,
        }
      )
      .pipe(map((response) => response.message));
  }

  public delete(id: string): Observable<string> {
    return this.http
      .delete<ResponseDto<unknown>>(`${environment.apiEndpoint}/user/${id}`)
      .pipe(map((response) => response.message));
  }
}
