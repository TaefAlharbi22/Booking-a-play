document.getElementById("insertcontact")
.addEventListener("submit", function (event) {
  event.preventDefault();
  let Firstname = document.getElementById("Firstname").value;
  let email = document.getElementById("email").value;
  let mobile = document.getElementById("mobile").value;
  let textListL = document.getElementById("textListL").value;
  let textar = document.getElementById("textar").value;
  if (!Firstname || !email || !mobile || !textListL || !textar) {
    alert("الرجـاء كتـابة جميع الحقول");
    return;
  }
  if (!/^[a-zA-Z\u0600-\u06FF\s]+$/.test(Firstname)) {
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

  if (email.length > 200) {
    alert("البريد الألكتروني يجب أن يكون أقل من 200 ");
    return;
  }

  if (mobile.length !== 10 || isNaN(mobile)) {
    alert("رقم الهاتف  يجب أن يكون 10 أرقام");
    return;
  }
  if (textar.length > 2000) {
    alert("النص يجب أن يكون أقل من 2000 حرف");
    return;
  }

  fetch("/insert", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ Firstname: Firstname,email: email,
      mobile:mobile, textListL:textListL,textar:textar}),
  })
  .then(function (response) {
    if (response.ok) {
      alert("شــكرا لتواصلـك!");
      document.getElementById("Firstname").value = "";
      document.getElementById("email").value = "";
      document.getElementById("mobile").value = "";
      document.getElementById("textListL").value = "";
      document.getElementById("textar").value = "";
      getData();
    } else {
      alert("Failed to insert data!");
    }
  })
    .catch(function (error) {
      console.error("Error:", error);
      alert("An error occurred!");
    });
});
