export class Exam {
  testID: String;
  testDate: String;
  testDuration: String;
  totalQuestion: Number;
  enrolledUser: [
    {
      studentUSN: String;
    }
  ];
  marksForRightAnswer: Number;
  marksForWrongAnswer: Number;
}
