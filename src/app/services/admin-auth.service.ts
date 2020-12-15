import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AdminAuthService {
  adminToken: any;
  admin: any;
  newTest: any;
  newStudent: any;
  newQuestion: any;
  getTestQuestion: any;
  deleteStudentParams: any;
  deleteTestParams: any;
  deleteQuestionParams: any;
  logoutParams: any;
  changePasswordParams: any;
  getTestByID: any;
  updateTestParams: any;
  updateQuestionParams: any;
  updateStudentParams: any;
  reportParams: any;

  constructor(private httpClient: HttpClient) { }

  tokenExist() {
    return !!localStorage.getItem('iv');
  }

  getToken() {
    return localStorage.getItem('iv');
  }

  changeAdminPassword(changePasswordParams) {
    let headers = new HttpHeaders();
    headers.append("Content-Type", "application/json");
    return this.httpClient.post(
      "http://localhost:8081/admin/adminChangePassword",
      changePasswordParams,
      {
        headers: headers,
      }
    );
  }

  loginAdmin(admin) {
    let headers = new HttpHeaders();
    headers.append("Content-Type", "application/json");
    return this.httpClient.post(
      "http://localhost:8081/admin/adminLogin",
      admin,
      {
        headers: headers,
      }
    );
  }

  addNewTest(newTest) {
    let headers = new HttpHeaders();
    headers.append("Content-Type", "application/json");
    return this.httpClient.post(
      "http://localhost:8081/admin/addTest",
      newTest,
      { headers: headers }
    );
  }

  updateTest(updateTestParams) {
    let headers = new HttpHeaders();
    headers.append("Content-Type", "application/json");
    return this.httpClient.post(
      "http://localhost:8081/admin/updateTest",
      updateTestParams,
      {
        headers: headers,
      }
    );
  }

  deleteTest(deleteTestParams) {
    let headers = new HttpHeaders();
    headers.append("Content-Type", "application/json");
    return this.httpClient.post(
      "http://localhost:8081/admin/deleteTest",
      deleteTestParams,
      {
        headers: headers,
      }
    );
  }

  addNewStudents(newStudent) {
    let headers = new HttpHeaders();
    headers.append("Content-Type", "application/json");
    return this.httpClient.post(
      "http://localhost:8081/admin/addStudents",
      newStudent,
      {
        headers: headers,
      }
    );
  }

  updateStudent(updateStudentParams) {
    let headers = new HttpHeaders();
    headers.append("Content-Type", "application/json");
    return this.httpClient.post(
      "http://localhost:8081/admin/updateStudent",
      updateStudentParams,
      {
        headers: headers,
      }
    );
  }


  deleteStudent(deleteStudentParams) {
    let headers = new HttpHeaders();
    headers.append("Content-Type", "application/json");
    return this.httpClient.post(
      "http://localhost:8081/admin/deleteStudent",
      deleteStudentParams,
      {
        headers: headers,
      }
    );
  }

  addNewQuestions(newQuestion) {
    let headers = new HttpHeaders();
    headers.append("Content-Type", "application/json");
    return this.httpClient.post(
      "http://localhost:8081/admin/uploadQuestions",
      newQuestion,
      {
        headers: headers,
      }
    );
  }

  updateQuestion(updateQuestionParams) {
    let headers = new HttpHeaders();
    headers.append("Content-Type", "application/json");
    return this.httpClient.post(
      "http://localhost:8081/admin/updateQuestion",
      updateQuestionParams,
      {
        headers: headers,
      }
    );
  }

  deleteQuestion(deleteQuestionParams) {
    let headers = new HttpHeaders();
    headers.append("Content-Type", "application/json");
    return this.httpClient.post(
      "http://localhost:8081/admin/deleteQuestion",
      deleteQuestionParams,
      {
        headers: headers,
      }
    );
  }

  getTestQuestions(getTestQuestion) {
    let headers = new HttpHeaders();
    headers.append("Content-Type", "application/json");
    return this.httpClient.post("http://localhost:8081/admin/getTestQuestions", getTestQuestion, {
      headers: headers,
    });
  }

  getAllTests(adminToken) {
    let headers = new HttpHeaders();
    headers.append("Content-Type", "application/json");
    return this.httpClient.post("http://localhost:8081/admin/getTests", adminToken, {
      headers: headers,
    });
  }

  getEnrollTotal(getTestByID){
    let headers = new HttpHeaders();
    headers.append("Content-Type", "application/json");
    return this.httpClient.post("http://localhost:8081/admin/getTestByID", getTestByID, {
      headers: headers,
    });
  }

  getAllStudents(adminToken) {
    let headers = new HttpHeaders();
    headers.append("Content-Type", "application/json");
    return this.httpClient.post("http://localhost:8081/admin/getStudents", adminToken, {
      headers: headers,
    });
  }

  generateReport(reportParams) {
    let headers = new HttpHeaders();
    headers.append("Content-Type", "application/json");
    return this.httpClient.post(
      "http://localhost:8081/admin/studentReport",
      reportParams,
      {
        headers: headers,
      }
    );
  }

  adminLogout(logoutParams) {
    let headers = new HttpHeaders();
    headers.append("Content-type", "application/json");

    return this.httpClient.post("http://localhost:8081/admin/adminLogout", logoutParams, {
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
