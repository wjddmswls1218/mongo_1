
import express from "express"; // express framework를 사용하기 위해 import함
import morgan from "morgan"; // debugging을 위해 morgan을 import함
import mongoose from "mongoose"; // mongoose를 통해 데이터를 연결하기 위해 import함
import Lecture from "./models/Lecture"; // Lecture DB조회를 위해 import함
import Snack from "./models/Snack";
import path from "path"; // path->경로 경로를 추적할 수 있는 것을 impoert함

// 192.168.219.115/admin

// webserver 실행 port를 70000번으로 실행하기위해 미리 상수 PORT에 7000을 저장한다.
const PORT = 7000;

// express를 app에 넣는다.
const app = express();

app.use(morgan(`dev`));

// app.js 에게 pug 써야한다고 신호를 줌
app.set("view engine", "pug");

// 현재 경로 뒤에 /assets안에 있는 폴더를 사용해라.
app.use(express.static(path.join(__dirname, "/assets")));

// connect(); <--- 함수
mongoose.connect(
  `mongodb://4leaf:fourleaf0309@192.168.219.115:27017/admin`,
  {
    dbName: `EDU_1`,
    useNewUrlParser: true,
    useCreateIndex: true,
  },
  (error) => {
    if (error) {
      console.log("Failed To DB Connect");
    } else {
      console.log("✅ CUNNECT TO DB!");
    }
  }
);

// 사용자가 "/"을 요청하면 async await을 통하여 데이터들을 find로 찾아서 console에 뿌려준다.
app.get("/", async (req, res) => {
  console.log(" ⭕️ CALLED BY USER!");

  const result = await Lecture.find({}, {});
  // mongoose를 find로 database로 찾는다.

  // res.render("home") <-- pug 연결
  // 사용자에게 home.pug 를 준다.
  // lectureList 이름으로 result를 보여준다.
  return res.render("home", { lectureList: result });
});

app.get("/snack", async (req, res) => {
  const result = await Snack.find({}, {});
  // mongoose를 find로 database로 찾는다.

  console.log(result);
});

app.get("/lecture", async (req, res) => {
  res.render("lecture");
});

// 설정 끝난 후 Server Start
app.listen(PORT, () => {
  console.log(`${PORT} server start`);
});
// home.pug each data in lectureList 설명
//lectureList가 뭔데? 우리가 database에서 find 한 것을 보여주는데 lectureList는 반복해준다.
