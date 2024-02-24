//prevent the form from submission
document.getElementById("insertForm")
.addEventListener("submit", function (event) {
  event.preventDefault();

  let Firstname = document.getElementById("Firstname").value;
  let Lastname = document.getElementById("Lastname").value;
  let email = document.getElementById("email").value;
  let mobile = document.getElementById("mobile").value;
  let section = document.getElementById("section").value;
  let category = document.getElementById("category").value;
  let Ticketnumber = document.getElementById("Ticketnumber").value;
  let time = document.getElementById("time").value;

  if (!Firstname || !Lastname || !email || !mobile || !section || !category || !Ticketnumber || !time) {
    alert("الرجـاء كتـابة جميع الحقول");
    return;
  }
  if (!/^[a-zA-Z\u0600-\u06FF\s]+$/.test(Firstname)) {
    alert("الرجاء كتابة الأسم بشكل صحيح");
    return;
  }

  if (!/^[a-zA-Z\u0600-\u06FF\s]+$/.test(Lastname)) {
    alert("الرجاء كتابة الأسم بشكل صحيح");
    return;
  }

  if (!/^\d+$/.test(mobile)) {
    alert("الرجاء كتابة الرقم بشكل صحيح");
    return;
  }

  if (!/^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/i.test(email)) {
    alert("الرجاء كتابة البريد الألكتروني بشكل صحيح");
    return;
  }
  
  if (Firstname.length > 15) {
    alert("الأسم الأول يجب أن يكون أقل من 15 حرف");
    return;
  }

  if (Lastname.length > 15) {
    alert("الأسم الأخير يجب أن يكون أقل من 15 حرف");
    return;
  }

  if (email.length > 200) {
    alert("البريد الألكتروني يجب أن يكون أقل من 200 ");
    return;
  }

  if (mobile.length !== 10 || isNaN(mobile)) {
    alert("رقم الهاتف  يجب أن يكون 10 أرقام");
    return;
  }






  fetch("/insert", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ Firstname: Firstname,Lastname:Lastname,email: email,
      mobile:mobile, section:section,category: category ,Ticketnumber:Ticketnumber,time:time}),
  })
  .then(function (response) {
    if (response.ok) {
      alert("شــكرا لحجزك!");
      document.getElementById("Firstname").value = "";
      document.getElementById("Lastname").value = "";
      document.getElementById("email").value = "";
      document.getElementById("mobile").value = "";
      document.getElementById("section").value = "";
      document.getElementById("category").value = "";
      document.getElementById("Ticketnumber").value = "";
      document.getElementById("time").value = "";
      getData();
    } else {
      alert("تعذر الحجز الحفظ في قاعدة البيانات!");
    }
  })
    .catch(function (error) {
      console.error("Error:", error);
      alert("عذرا حدث خطاء!");
    });
});

function getData() {
  //clear any existing data
  const dataList = document.getElementById("dataList");
  while (dataList.firstChild) {
    dataList.removeChild(dataList.lastChild);
  }

  //refresh
  fetch("/view")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      data.forEach(function (item) {
        let listItem = document.createElement("li");
        listItem.innerHTML = item.Firstname + " " +
        item.Lastname  + "<br> رقم الجـوال : " +
        item.mobile + "<br> المعلــقة : " + item.section + "<br> الفئـة : " +
        item.category + "<br> عدد التذاكر : " + item.Ticketnumber + "<br> الوقت : " +
        item.time + "<br>"; // Add a line break with <br>
        dataList.appendChild(listItem);
      });
    })
    .catch(function (error) {
      console.error("Error:", error);
      alert("عذرا حدث خطاء!");
    });
}
//calling function
getData();