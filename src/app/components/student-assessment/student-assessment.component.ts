import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from "@angular/router";

import { StudentService } from "../../services/student.service";

@Component({
  selector: 'app-student-assessment',
  templateUrl: './student-assessment.component.html',
  styleUrls: ['./student-assessment.component.css']
})
export class StudentAssessmentComponent implements OnInit {
  _id: String = " ";
  testID: String = " ";
  studentUSN: String = " ";
  studentName: String = " ";
  questionID: String = " ";
  questionBody: any = "Loading...";
  optionBody: Array<Object> = [];
  counter: any = 0;
  totalCount: any = 0;
  userAnswer: Array<Object> = [];
  progress: Number = 0;

  constructor(private router: Router, private studentService: StudentService) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation.extras.state as {
      studentUSN: String,
      testID: String
      _id: String
      studentName: String
    }

    if (state.studentUSN != " " && state.testID != " ") {
      this.testID = state.testID;
      this.studentUSN = state.studentUSN;
      this._id = state._id;
      this.studentName = state.studentName
    } else {
      this.testID = " ";
      this.studentUSN = " ";
      this._id = " ";
      this.studentName = " ";
    }

  }

  ngOnInit() {
    this.loadQuestions(this.counter);
  }

  loadQuestions(counter) {
    this.optionBody = [];
    const getQuestionParams = {
      iv: localStorage.getItem('iv'),
      testID: this.testID
    }
    this.studentService.studentGetQuestion(getQuestionParams).subscribe((data: any) => {
      if (data.result === 1) {
        this.totalCount = data.data.length;
        this.questionID = data.data[this.counter]._id;
        this.questionBody = data.data[this.counter].question;
        this.optionBody.push({ key: "a", value: data.data[this.counter].a });
        this.optionBody.push({ key: "b", value: data.data[this.counter].b });
        this.optionBody.push({ key: "c", value: data.data[this.counter].c });
        this.optionBody.push({ key: "d", value: data.data[this.counter].d });
      } else if (data.result === 0) {
        alert("Something went wrong")
      }
    })
  }

  onSelectionChange(option, questionID, question) {
    const newObject = {
      option: option,
      questionID: questionID,
      question: question
    };
    if (this.userAnswer.length === 0) {
      this.userAnswer.push(newObject);
    } else {
      var index = this.userAnswer.findIndex((item: any) => {
        return newObject.questionID == item.questionID;
      });
      if (index === -1) {
        this.userAnswer.push(newObject);
      } else {
        this.userAnswer.splice(index, 1, newObject);
      }
    }
  }

  onNext() {
    if (this.counter + 1 != this.totalCount) {
      this.loadQuestions(this.counter += 1);
    }
  }

  onPrevious() {
    if (this.counter + 1 <= this.totalCount) {
      this.loadQuestions(this.counter -= 1);
    }
  }

  onFinish() {
    const finalSubmission = {
      iv: localStorage.getItem('iv'),
      _id: this._id,
      testID: this.testID,
      studentUSN: this.studentUSN,
      studentName: this.studentName,
      answers: this.userAnswer
    };
    this.studentService.studentSubmitAnswer(finalSubmission).subscribe((data: any) => {
      if (data.result === 1) {
        alert(data.message);
        const navigationExtras: NavigationExtras = {
          state: {
            studentName: this.studentName,
            studentUSN: this.studentUSN
          }
        }
        this.router.navigate(["/student/studentDashboard"], navigationExtras);
      }
    });
  }

  onLogout() {
    const finalSubmission = {
      iv: localStorage.getItem('iv'),
      _id: this._id,
      testID: this.testID,
      studentUSN: this.studentUSN,
      studentName: this.studentName,
      answers: this.userAnswer
    };

    const logoutParams = {
      iv: localStorage.getItem('iv')
    }
    this.studentService.studentSubmitAnswer(finalSubmission).subscribe((data: any) => {
      if (data.result === 1) {
        alert(data.message);
        this.studentService.studentLogout(logoutParams).subscribe((data: any) => {
          if(data.result === 1){
            this.router.navigate(["/student/studentLogin"]);
            alert(data.message+" "+" Your answers are submitted.\n Time: "+data.logoutTime);
            localStorage.clear();
          }
        });
      }
    });
  }
}
