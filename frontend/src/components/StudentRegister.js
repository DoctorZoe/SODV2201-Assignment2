import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function StudentRegister(props) {
  const navigate = useNavigate();
  const [students, setStudents] = useState([])
  const [student, updateStudentInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    department: "",
    program: "",
    studentID: "",
    username: "",
    password: "",
    registeredCourses: [],
  });

  async function handleSubmit(event) {
    event.preventDefault();

    if(students.some(s => s.username.toLowerCase() === student.username.toLowerCase()))
      alert("Username already in use.")
    else if(students.some(s => s.email.toLowerCase() === student.email.toLowerCase()))
      alert("Email already in use.")
    else
      fetch('http://localhost:5000/newstudent',{
        method: 'POST',
        body: JSON.stringify(student),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        if(response.status >= 200 && response.status < 300)
          navigate('/')
        else
          alert('Something went wrong, please try again later.')
      })

    //Front end only
    // //Input Validations
    // var isValid = true;

    // props.students.forEach((s) => {
    //   console.log("test loop");
    //   console.log(s);
    //   if (student.username === s.username) {
    //     alert("Username is already in use! please enter a different one");
    //     console.log("Username is already in use! please enter a different one");
    //     isValid = false;
    //   }
    // });

    // if (isValid) {
    //   student.studentID = GenerateNewStudentID();

    //   props.onSignup(student);

    //   console.log(
    //     "Succesfully registered new student: " +
    //       student.firstName +
    //       " " +
    //       student.lastName +
    //       ", id: " +
    //       student.studentID
    //   );
    //   console.log(student);

    //   updateStudentInfo({
    //     firstName: "",
    //     lastName: "",
    //     email: "",
    //     phone: "",
    //     dateOfBirth: "yyyy-mm-dd",
    //     department: "",
    //     program: "",
    //     studentID: "",
    //     username: "",
    //     password: "",
    //     registeredCourses: [],
    //   });
    //   navigate('/')
    // } else {
    //   console.log("Something went wrong with the submit");
    // }

    // ****In use in the backend server****
    // function GenerateNewStudentID() {
    //   var tempID;

    //   var isUniqueStudentID = false;

    //   //This loop runs and keeps generating ids until a unique id is generated.

    //   while (!isUniqueStudentID) {
    //     isUniqueStudentID = true;

    //     //Generate random number between 000000 - 999999

    //     tempID = Math.floor(Math.random() * 999999);

    //     props.students.forEach((s) => {
    //       //Debugging logs

    //       //console.log('test loop')

    //       //console.log(s)

    //       if (tempID === s.studentID) {
    //         isValid = false;

    //         console.log("id was repeated: generating new one.");
    //       }
    //     });
    //   }

    //   console.log("Succesfully generated a new unique id: " + tempID);

    //   return tempID;
    // }
  }

  useEffect(() => {
    fetch("http://localhost:5000/studentlist")
      .then(response => response.json())
      .then(data => setStudents(data));
  }, []);

  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit}>
        <h2>Name: </h2>
        <input
          name="fname"
          type="text"
          placeholder="First Name"
          value={student.firstName}
          required
          onChange={(e) =>
            updateStudentInfo({ ...student, firstName: e.target.value })
          }
        ></input>
        <input
          name="lname"
          type="text"
          placeholder="Last Name"
          value={student.lastName}
          required
          onChange={(e) =>
            updateStudentInfo({ ...student, lastName: e.target.value })
          }
        />
        <br></br>

        <h2>Contact Information: </h2>
        <input
          name="email"
          type="email"
          placeholder="Email "
          value={student.email}
          required
          onChange={(e) =>
            updateStudentInfo({ ...student, email: e.target.value })
          }
        />
        <input
          name="phone"
          type="tel"
          placeholder="123-456-7890"
          value={student.phone}
          title="Format 123-456-7890"
          required
          onInvalid={e => e.target.setCustomValidity('Format 123-456-7890')}
          onInput={e => e.target.setCustomValidity('')}
          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          onChange={(e) =>
            updateStudentInfo({ ...student, phone: e.target.value })
          }
        />
        <br></br>

        <h2>Date of Birth: </h2>
        <input
          name="dob"
          type="date"
          value={student.dateOfBirth}
          required
          max={new Date().toLocaleDateString('en-ca')}
          onChange={(e) =>
            updateStudentInfo({ ...student, dateOfBirth: e.target.value })
          }
        />
        <br></br>

        <h2>Education Information: </h2>

        <label>Select Deparment: </label>
        <select
          name="department"
          required
          value={student.department}
          onChange={(e) =>
            updateStudentInfo({ ...student, department: e.target.value })
          }
        >
          <option value=""></option>
          <option value="IT">IT</option>
          <option value="Other">Other</option>
        </select>
        <label>Select Program: </label>
        <select
          name="program"
          required
          value={student.program}
          onChange={(e) =>
            updateStudentInfo({ ...student, program: e.target.value })
          }
        >
          <option value=""></option>
          <option value="Diploma (2 Years)">Diploma(2 Years)</option>
          <option value="Post-Diploma (1 Year)">Post-Diploma (1 Year)</option>
          <option value="Certificate (3 Months)">Certificate (3 Months)</option>
          <option value="Certificate (6 Months)">Certificate (6 Months)</option>
          <option value="Upgrade">Upgrade</option>
          <option value="Other">Other</option>
        </select>
        <h2>Account Information: </h2>
        <input
          name="username"
          type="text"
          placeholder="Enter username "
          value={student.username}
          required
          onChange={(e) =>
            updateStudentInfo({ ...student, username: e.target.value })
          }
        />
        <input
          name="password"
          type="password"
          placeholder="Enter password "
          value={student.password}
          required
          onChange={(e) =>
            updateStudentInfo({ ...student, password: e.target.value })
          }
        />

        <br></br>

        <button type="submit" className="submitBtn">
          Register
        </button>
      </form>
    </div>
  );
}

export default StudentRegister;
