import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  addStudent: any;
  studentLoginParams: any;
  enrollParams: any;
  getQuestionParams: any;
  finalSubmission: any;
  logoutParams: any;
  profileParams: any;

  constructor(private httpClient: HttpClient) { }

  tokenExist(){
    return !!localStorage.getItem('iv');
  }

  getToken() {
    return localStorage.getItem('iv');
  }

  studentRegistration(addStudent) {
    let headers = new HttpHeaders();
    headers.append("Content-type", "application/json");

    return this.httpClient.post("http://localhost:8081/student/studentRegister", addStudent, {
      headers: headers
    });
  }

  studentLogin(studentLoginParams) {
    let headers = new HttpHeaders();
    headers.append("Content-type", "application/json");

    return this.httpClient.post("http://localhost:8081/student/studentLogin", studentLoginParams, {
      headers: headers
    });
  }

  studentAllTests(token){
    let headers = new HttpHeaders();
    headers.append("Content-type", "application/json");

    return this.httpClient.post("http://localhost:8081/student/studentAllAssessment", token, {
      headers: headers
    });
  }

  studentGetTest(token) {
    let headers = new HttpHeaders();
    headers.append("Content-type", "application/json");

    return this.httpClient.post("http://localhost:8081/student/studentGetTests", token, {
      headers: headers
    });
  }

  studentProfile(profileParams) {
    let headers = new HttpHeaders();
    headers.append("Content-type", "application/json");

    return this.httpClient.post("http://localhost:8081/student/studentProfile", profileParams, {
      headers: headers
    });
  }

  alreadyEnrolled(enrollParams){
    let headers = new HttpHeaders();
    headers.append("Content-type", "application/json");

    return this.httpClient.post("http://localhost:8081/student/checkEnrolled", enrollParams, {
      headers: headers
    });
  }

  enrollStudent(enrollParams){
    let headers = new HttpHeaders();
    headers.append("Content-type", "application/json");

    return this.httpClient.post("http://localhost:8081/student/studentEnroll", enrollParams, {
      headers: headers
    });
  }

  studentGetQuestion(getQuestionParams) {
    let headers = new HttpHeaders();
    headers.append("Content-type", "application/json");

    return this.httpClient.post("http://localhost:8081/student/studentGetQuestions", getQuestionParams, {
      headers: headers
    });
  }

  studentSubmitAnswer(finalSubmission) {
    let headers = new HttpHeaders();
    headers.append("Content-type", "application/json");

    return this.httpClient.post("http://localhost:8081/student/studentSubmitAnswer", finalSubmission, {
      headers: headers
    });
  }

  studentLogout(logoutParams) {
    let headers = new HttpHeaders();
    headers.append("Content-type", "application/json");

    return this.httpClient.post("http://localhost:8081/student/studentLogout", logoutParams, {
      headers: headers
    });
  }

  private _listeners = new Subject<any>();
  listen(): Observable<any> {
    return this._listeners.asObservable();
  }

  filter(filterBy: string) {
    this._listeners.next(filterBy);
  }

}
