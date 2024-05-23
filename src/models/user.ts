// mongoose에서 Schema, model, models를 임포트합니다.
import { Schema, model, models } from "mongoose";

// User 스키마를 정의합니다.
const UserSchema = new Schema({
  // email 필드는 문자열 타입이며, 고유해야 하고 필수로 지정되어 있습니다.
  email: {
    type: String,
    unique: [true, "Email already exists!"], // 고유해야 합니다.
    required: [true, "Email is required!"], // 필수 입력 필드입니다.
  },
  // username 필드는 문자열 타입이며, 필수로 지정되어 있습니다. 정규식을 사용하여 유효성을 검사합니다.
  username: {
    type: String,
    required: [true, "Username is required!"], // 필수 입력 필드입니다.
    match: [
      /^(?=.{1,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._가-힣]+(?<![_.])$/,
      // 유효성 검사를 위한 정규식입니다. 8-20자의 알파벳, 숫자, 밑줄, 마침표 및 한글이 허용됩니다.
      "Username invalid, it should contain 8-20 alphanumeric letters, Korean characters, and be unique!",
    ],
  },
  // image 필드는 문자열 타입입니다.
  image: {
    type: String,
  },
});

// 이미 생성된 User 모델이 있으면 사용하고, 없으면 새로운 모델을 생성합니다.
const User = models.User || model("User", UserSchema);

// User 모델을 내보냅니다.
export default User;
